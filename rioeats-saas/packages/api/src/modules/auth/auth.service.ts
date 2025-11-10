import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';
import { LoginDto, RegisterDto, GoogleAuthDto, RefreshTokenDto } from './dto/auth.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { User, Company } from '@prisma/client';

export interface AuthResponse {
  user: Omit<User, 'password'>;
  company?: Company;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Authenticate user with email and password
   */
  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: {
        company: true,
      },
    });

    if (!user || !user.password) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return null;
    }

    return user;
  }

  /**
   * Login with email and password
   */
  async login(loginDto: LoginDto): Promise<AuthResponse> {
    const { email, password } = loginDto;
    
    const user = await this.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('Conta desativada');
    }

    // Update last login
    await this.prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    return this.generateTokens(user);
  }

  /**
   * Register new user
   */
  async register(registerDto: RegisterDto): Promise<AuthResponse> {
    const { email, password, name, phone } = registerDto;

    // Check if user already exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('Email já está em uso');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        phone,
        role: 'CUSTOMER',
        isActive: true,
      },
    });

    return this.generateTokens(user);
  }

  /**
   * Google OAuth authentication
   */
  async googleAuth(googleAuthDto: GoogleAuthDto): Promise<AuthResponse> {
    const { token } = googleAuthDto;

    try {
      // In a real implementation, you would verify the Google token
      // For now, we'll simulate the process
      const googleUser = await this.verifyGoogleToken(token);
      
      if (!googleUser) {
        throw new UnauthorizedException('Token do Google inválido');
      }

      // Find or create user
      let user = await this.prisma.user.findUnique({
        where: { googleEmail: googleUser.email },
      });

      if (!user) {
        // Create new user from Google data
        user = await this.prisma.user.create({
          data: {
            email: googleUser.email,
            googleId: googleUser.id,
            googleEmail: googleUser.email,
            googleName: googleUser.name,
            googleAvatar: googleUser.picture,
            name: googleUser.name,
            role: 'CUSTOMER',
            isActive: true,
          },
        });
      }

      if (!user.isActive) {
        throw new UnauthorizedException('Conta desativada');
      }

      // Update last login
      await this.prisma.user.update({
        where: { id: user.id },
        data: { lastLoginAt: new Date() },
      });

      return this.generateTokens(user);
    } catch (error) {
      throw new UnauthorizedException('Falha na autenticação do Google');
    }
  }

  /**
   * Refresh access token
   */
  async refreshToken(refreshTokenDto: RefreshTokenDto): Promise<AuthResponse> {
    const { refreshToken } = refreshTokenDto;

    try {
      const payload: JwtPayload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get('JWT_SECRET'),
      });

      const user = await this.prisma.user.findUnique({
        where: { id: payload.sub },
        include: {
          company: true,
        },
      });

      if (!user || !user.isActive) {
        throw new UnauthorizedException('Usuário não encontrado ou inativo');
      }

      return this.generateTokens(user);
    } catch (error) {
      throw new UnauthorizedException('Refresh token inválido');
    }
  }

  /**
   * Logout user
   */
  async logout(userId: string): Promise<void> {
    // In a real implementation, you might want to blacklist the token
    // For now, we'll just update the last login time
    await this.prisma.user.update({
      where: { id: userId },
      data: { lastLoginAt: new Date() },
    });
  }

  /**
   * Verify Google token (placeholder - implement with Google API)
   */
  private async verifyGoogleToken(token: string): Promise<any> {
    // This is a placeholder. In a real implementation, you would:
    // 1. Call Google OAuth API to verify the token
    // 2. Get user profile information
    // 3. Return user data
    
    // For demo purposes, return mock data
    return {
      id: 'google-id-123',
      email: 'user@gmail.com',
      name: 'User Name',
      picture: 'https://example.com/avatar.jpg',
    };
  }

  /**
   * Generate JWT tokens
   */
  private async generateTokens(user: User): Promise<AuthResponse> {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      companyId: user.companyId,
    };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: this.configService.get('JWT_EXPIRES_IN', '15m'),
    });

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: this.configService.get('JWT_REFRESH_EXPIRES_IN', '7d'),
    });

    // Get company info if user is associated with one
    let company = null;
    if (user.companyId) {
      company = await this.prisma.company.findUnique({
        where: { id: user.companyId },
      });
    }

    const expiresIn = this.parseExpiration(this.configService.get('JWT_EXPIRES_IN', '15m'));

    return {
      user: {
        ...user,
        password: undefined, // Remove password from response
      },
      company,
      accessToken,
      refreshToken,
      expiresIn,
    };
  }

  /**
   * Parse JWT expiration string to seconds
   */
  private parseExpiration(expiration: string): number {
    if (expiration.endsWith('m')) {
      return parseInt(expiration) * 60;
    } else if (expiration.endsWith('h')) {
      return parseInt(expiration) * 3600;
    } else if (expiration.endsWith('d')) {
      return parseInt(expiration) * 86400;
    }
    return 900; // Default 15 minutes
  }
}
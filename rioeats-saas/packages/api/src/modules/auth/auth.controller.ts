import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
  Get,
  Request,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
} from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';

import { AuthService, AuthResponse } from './auth.service';
import { LoginDto, RegisterDto, GoogleAuthDto, RefreshTokenDto } from './dto/auth.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Public, GetCurrentUser } from './decorators';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @Throttle({ short: { ttl: 1000, limit: 3 } })
  @ApiOperation({ summary: 'Login com email e senha' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: 200,
    description: 'Login realizado com sucesso',
    schema: {
      type: 'object',
      properties: {
        user: { type: 'object' },
        accessToken: { type: 'string' },
        refreshToken: { type: 'string' },
        expiresIn: { type: 'number' },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Credenciais inválidas' })
  async login(@Body() loginDto: LoginDto): Promise<AuthResponse> {
    return this.authService.login(loginDto);
  }

  @Public()
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @Throttle({ short: { ttl: 1000, limit: 5 } })
  @ApiOperation({ summary: 'Registro de novo usuário' })
  @ApiBody({ type: RegisterDto })
  @ApiResponse({
    status: 201,
    description: 'Usuário criado com sucesso',
  })
  @ApiResponse({ status: 409, description: 'Email já em uso' })
  async register(@Body() registerDto: RegisterDto): Promise<AuthResponse> {
    return this.authService.register(registerDto);
  }

  @Public()
  @Post('google')
  @HttpCode(HttpStatus.OK)
  @Throttle({ short: { ttl: 1000, limit: 5 } })
  @ApiOperation({ summary: 'Autenticação com Google OAuth' })
  @ApiBody({ type: GoogleAuthDto })
  @ApiResponse({
    status: 200,
    description: 'Autenticação Google realizada com sucesso',
  })
  @ApiResponse({ status: 401, description: 'Token do Google inválido' })
  async googleAuth(@Body() googleAuthDto: GoogleAuthDto): Promise<AuthResponse> {
    return this.authService.googleAuth(googleAuthDto);
  }

  @Public()
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Renovar access token' })
  @ApiBody({ type: RefreshTokenDto })
  @ApiResponse({
    status: 200,
    description: 'Token renovado com sucesso',
  })
  @ApiResponse({ status: 401, description: 'Refresh token inválido' })
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto): Promise<AuthResponse> {
    return this.authService.refreshToken(refreshTokenDto);
  }

  @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Logout do usuário' })
  @ApiResponse({ status: 204, description: 'Logout realizado com sucesso' })
  async logout(@Request() req): Promise<void> {
    await this.authService.logout(req.user.id);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Obter informações do usuário atual' })
  @ApiResponse({
    status: 200,
    description: 'Informações do usuário',
  })
  @ApiResponse({ status: 401, description: 'Não autenticado' })
  async getProfile(@GetCurrentUser() user) {
    return {
      user,
      company: user.currentCompany,
    };
  }

  @Get('validate')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Validar token atual' })
  @ApiResponse({
    status: 200,
    description: 'Token válido',
  })
  @ApiResponse({ status: 401, description: 'Token inválido' })
  async validateToken(@GetCurrentUser() user) {
    return {
      valid: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    };
  }
}
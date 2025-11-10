export interface JwtPayload {
  sub: string; // User ID
  email: string;
  role: string;
  companyId?: string;
  iat?: number;
  exp?: number;
}

export interface TokenPayload {
  userId: string;
  email: string;
  role: string;
  companyId?: string;
}

export interface GoogleUserInfo {
  id: string;
  email: string;
  name: string;
  picture: string;
  verified_email: boolean;
}
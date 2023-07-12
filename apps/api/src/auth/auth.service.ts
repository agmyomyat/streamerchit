import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthAccessTokenData } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(private jwt: JwtService) {}
  verifyAccessToken(token: string) {
    return this.jwt.verify(token) as AuthAccessTokenData;
  }
}

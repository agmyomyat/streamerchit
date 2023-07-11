import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
export interface AuthTokenData {
  user_id: string;
}
export const USER_ID_QUERY_TOKEN = '__internal_auth_data__';
@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(private jwt: JwtService) {}
  canActivate(context: ExecutionContext): boolean {
    const request: Request = context.switchToHttp().getRequest();
    const token = request.headers.authorization;
    if (!token) throw new ForbiddenException();
    const verified: AuthTokenData = this.jwt.verify(token);
    request.query[USER_ID_QUERY_TOKEN] = verified.user_id;
    return true;
  }
}

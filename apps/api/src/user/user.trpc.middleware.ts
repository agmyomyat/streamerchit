import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { REQUEST } from '@nestjs/core';
import { TRPCError } from '@trpc/server';
import { TrpcService } from '../lib/trpc/trpc.service';
import { AuthService } from '../auth/auth.service';
import { AuthAccessTokenData } from '../auth/dto/auth.dto';

@Injectable()
export class UserTrpcMiddleware {
  constructor(
    private trpcService: TrpcService,
    private authService: AuthService,
    @Inject(REQUEST) private request: Request
  ) {}
  auth() {
    const middleware = this.trpcService.use.middleware(async ({ next }) => {
      let payload: AuthAccessTokenData;
      const at = this.request.headers['authorization'];
      if (!at)
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'token not provided',
        });
      try {
        payload = this.authService.verifyAccessToken(at);
      } catch (e) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'token invalid',
        });
      }

      return next({ ctx: { email: payload.email, id: payload.id } });
    });
    return middleware;
  }
}

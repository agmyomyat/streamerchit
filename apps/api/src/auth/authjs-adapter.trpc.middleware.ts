import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { TRPCError } from '@trpc/server';
import { TrpcService } from '../lib/trpc/trpc.service';
import { ConfigService } from '@nestjs/config';
import { ENV_VARS } from '../env.schema';

@Injectable()
export class AuthjsAdapterTrpcMiddleware {
  constructor(
    private trpcService: TrpcService,
    private config: ConfigService<ENV_VARS>,
    @Inject(REQUEST) private request: Request
  ) {}
  auth() {
    const middleware = this.trpcService.use.middleware(async ({ next }) => {
      const token = this.request.headers['authorization'];
      const [, secret] = token.split('AuthJsAdapter ');
      console.log(secret);
      if (!secret)
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'token not provided',
        });
      const at = this.config.getOrThrow('AUTHJS_ADAPTER_ACCESS_SECRET');
      if (at !== secret)
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'token invalid',
        });
      return next();
    });
    return middleware;
  }
}

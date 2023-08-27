import { Injectable } from '@nestjs/common';
import { TrpcService } from '../lib/trpc/trpc.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../lib/prisma/prisma.service';
import { StreamlabsService } from '../lib/streamlabs/streamlabs.service';
import { AuthService } from './auth.service';
import { z } from 'zod';

@Injectable()
export class SlAuthResolver {
  constructor(
    private t: TrpcService,
    private streamlabsService: StreamlabsService,
    private authService: AuthService,
    private prisma: PrismaService,
    private jwt: JwtService
  ) {}
  private publicProcedure = this.t.use.procedure;
  disconnectAccount() {
    return this.publicProcedure
      .input(z.object({ access_token: z.string() }))
      .mutation(async ({ input }) => {
        const user = this.authService.verifyAccessToken(input.access_token);
        await this.prisma.account.delete({
          where: {
            provider_providerAccountId: {
              provider: 'streamlabs',
              providerAccountId: user.id,
            },
          },
        });
        return { deleted: true };
      });
  }
  connectAccount() {
    return this.publicProcedure
      .input(z.object({ code: z.string(), access_token: z.string() }))
      .mutation(async ({ input }) => {
        const user = this.authService.verifyAccessToken(input.access_token);
        const sl_credentials =
          await this.streamlabsService.getCredentialsFromCallbackCode(
            input.code
          );
        const decode_credential = this.jwt.decode(
          sl_credentials.access_token
        ) as {
          scopes: string[];
        };
        await this.prisma.user.update({
          where: { id: user.id },
          data: {
            accounts: {
              create: {
                provider: 'streamlabs',
                providerAccountId: user.id,
                type: 'oauth',
                access_token: sl_credentials.access_token,
                refresh_token: sl_credentials.refresh_token,
                expires_at: sl_credentials.expires_in,
                token_type: sl_credentials.token_type,
                scope: JSON.stringify(decode_credential.scopes),
              },
            },
          },
        });
        return { success: true };
      });
  }
}

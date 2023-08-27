import { Controller, Get, Query, Res } from '@nestjs/common';
import { StreamlabsService } from '../lib/streamlabs/streamlabs.service';
import { AuthService } from './auth.service';
import { PrismaService } from '../lib/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Controller('apps/sl')
export class StreamLabsController {
  constructor(
    private streamlabsService: StreamlabsService,
    private authService: AuthService,
    private prisma: PrismaService,
    private jwt: JwtService
  ) {}

  @Get('callback')
  async callback(
    @Query('code') code: string,
    @Query('state') access_token: string,
    @Res() response: Response
  ) {
    const user = this.authService.verifyAccessToken(access_token);
    const sl_credentials =
      await this.streamlabsService.getCredentialsFromCallbackCode(code);
    const decode_credential = this.jwt.decode(sl_credentials.access_token) as {
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
    return response.redirect('https://streamerchit.com/dashboard/account');
  }
}

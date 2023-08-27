import { Module } from '@nestjs/common';
import { AuthjsAdapterService } from './authjs-adapter.service';
import { AuthjsAdapterResolver } from './authjs-adapter.trpc.resolver';
import { JwtModule } from '@nestjs/jwt';
import { AlertboxModule } from '../alert-box/alert-box.module';
import { AuthService } from './auth.service';
import { StreamlabsModule } from '../lib/streamlabs/streamlabs.module';
import { StreamLabsController } from './sl-callback.controller';
import { SlAuthResolver } from './sl-auth.trpc.resolver';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.AUTH_ACCESS_TOKEN_SECRET,
    }),
    AlertboxModule,
    StreamlabsModule,
  ],
  providers: [
    AuthService,
    AuthjsAdapterService,
    AuthjsAdapterResolver,
    SlAuthResolver,
  ],
  exports: [AuthjsAdapterResolver, AuthService, SlAuthResolver],
  controllers: [StreamLabsController],
})
export class AuthModule {}

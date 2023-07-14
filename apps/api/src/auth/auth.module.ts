import { Module } from '@nestjs/common';
import { AuthjsAdapterService } from './authjs-adapter.service';
import { AuthjsAdapterResolver } from './authjs-adapter.trpc.resolver';
import { JwtModule } from '@nestjs/jwt';
import { AlertboxModule } from '../alert-box/alert-box.module';
import { AuthService } from './auth.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.AUTH_ACCESS_TOKEN_SECRET,
    }),
    AlertboxModule,
  ],
  providers: [AuthService, AuthjsAdapterService, AuthjsAdapterResolver],
  exports: [AuthjsAdapterResolver, AuthService],
})
export class AuthModule {}

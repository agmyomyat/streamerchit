import { Module } from '@nestjs/common';
import { AuthService } from './authjs-adapter.service';
import { AuthjsAdapterResolver } from './authjs-adapter.trpc.resolver';
import { JwtModule } from '@nestjs/jwt';
import { AlertboxModule } from '../alert-box/alert-box.module';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.AUTH_ACCESS_TOKEN_SECRET,
    }),
    AlertboxModule,
  ],
  providers: [AuthService, AuthjsAdapterResolver],
  exports: [AuthjsAdapterResolver],
})
export class AuthModule {}

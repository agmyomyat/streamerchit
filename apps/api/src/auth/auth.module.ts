import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthjsAdapterResolver } from './auth.trpc.resolver';

@Module({
  providers: [AuthService, AuthjsAdapterResolver],
  exports: [AuthjsAdapterResolver],
})
export class AuthModule {}

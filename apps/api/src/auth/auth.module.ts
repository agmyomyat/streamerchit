import { Module } from '@nestjs/common';
import { AuthService } from './authjs-adapter.service';
import { AuthjsAdapterResolver } from './authjs-adapter.trpc.resolver';

@Module({
  providers: [AuthService, AuthjsAdapterResolver],
  exports: [AuthjsAdapterResolver],
})
export class AuthModule {}

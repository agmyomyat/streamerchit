import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserTrpcResolver } from './user.trpc.resolver';

@Module({
  providers: [UserService, UserTrpcResolver],
  controllers: [UserController],
  exports: [UserTrpcResolver],
})
export class UserModule {}

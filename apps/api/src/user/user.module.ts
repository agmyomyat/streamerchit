import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserTrpcResolver } from './user.trpc.resolver';
import { AuthModule } from '../auth/auth.module';
import { UserTrpcMiddleware } from './user.trpc.middleware';
import { DonationModule } from '../donation/donation.module';
import { FileModule } from '../file/file.module';

@Module({
  providers: [UserService, UserTrpcResolver, UserTrpcMiddleware],
  controllers: [UserController],
  imports: [AuthModule, DonationModule, FileModule],
  exports: [UserTrpcResolver],
})
export class UserModule {}

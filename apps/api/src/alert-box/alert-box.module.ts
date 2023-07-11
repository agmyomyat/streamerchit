import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AlertboxService } from './alert-box.service';
import { AlertboxController } from './alert-box.controller';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.ALERTBOX_JWT_SECRET,
    }),
  ],
  providers: [AlertboxService],
  controllers: [AlertboxController],
  exports: [AlertboxService],
})
export class AlertboxModule {}

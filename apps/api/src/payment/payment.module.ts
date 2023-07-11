import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { AlertboxModule } from '../alert-box/alert-box.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    AlertboxModule,
    JwtModule.register({
      secret: process.env.PAYMENT_JWT_SECRET,
    }),
  ],
  providers: [PaymentService],
  exports: [PaymentService],
  controllers: [PaymentController],
})
export class PaymentModule {}

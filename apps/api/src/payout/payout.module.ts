import { Module } from '@nestjs/common';
import { PayoutService } from './payout.service';

@Module({
  providers: [PayoutService],
  exports: [PayoutService],
})
export class PayoutModule {}

import { Module } from '@nestjs/common';
import { DonationService } from './donation.service';
import { DonationTrpcResolver } from './donation.trpc.resolver';
import { PaymentModule } from '../payment/payment.module';

@Module({
  imports: [PaymentModule],
  exports: [DonationTrpcResolver, DonationService],
  providers: [DonationService, DonationTrpcResolver],
})
export class DonationModule {}

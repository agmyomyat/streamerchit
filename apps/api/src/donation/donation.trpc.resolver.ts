import { DonationService } from './donation.service';
import { Injectable } from '@nestjs/common';
import {
  CreateDonationTransactionDtoZod,
  CreatePaymentSessionDtoZod,
  GetDonationTransactionStatusDtoZod,
} from './dto/donation.dto';
import { TrpcService } from '../lib/trpc/trpc.service';
import { PaymentService } from '../payment/payment.service';
import { DingerService } from '../lib/dinger/dinger.service';

@Injectable()
export class DonationTrpcResolver {
  constructor(
    private t: TrpcService,
    private donationService: DonationService,
    private paymentService: PaymentService,
    private dinger: DingerService
  ) {}
  private readonly publicProcedure = this.t.use.procedure;
  getDonationTransactionStatus() {
    return this.publicProcedure
      .input(GetDonationTransactionStatusDtoZod)
      .query(async ({ input }) => {
        const transaction = await this.donationService.getPaymentTransaction(
          input.id
        );
        const status = transaction?.completed_at ? 'SUCCESS' : 'PENDING';
        return { status };
      });
  }
  createPaymentSession() {
    return this.publicProcedure
      .input(CreatePaymentSessionDtoZod)
      .mutation(async ({ input }) => {
        const streamer = await this.donationService.getStreamer({
          page_handle: input.donation_page_handle,
        });
        const sessionToken = await this.paymentService.createPaymentSession({
          amount: input.amount,
          donarMessage: input.message,
          donarName: input.name,
          paymentMethod: '',
          paymentProvider: input.payment_name,
          streamerId: streamer.id,
          streamerName: streamer.name || '',
        });
        return { token: sessionToken };
      });
  }
  createDonationTrasaction() {
    return this.publicProcedure
      .input(CreateDonationTransactionDtoZod)
      .mutation(async ({ input }) => {
        const payment = await this.donationService.createDonationPayment({
          paymentMethod: input.payment_method,
          donarPhone: input.phone,
          paymentSessionToken: input.payment_session_token,
        });
        return payment;
      });
  }
}

import { DonationService } from './donation.service';
import { Injectable } from '@nestjs/common';
import {
  CreateDonationTransactionDtoZod,
  CreatePaymentSessionDtoZod,
  DingerPrebuiltCheckoutInputZod,
  GetDonationTransactionStatusDtoZod,
} from './dto/donation.dto';
import { TrpcService } from '../lib/trpc/trpc.service';
import { PaymentService } from '../payment/payment.service';
import { DingerService } from '../lib/dinger/dinger.service';
import { nanoid } from 'nanoid';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { ItemsZod } from '../lib/dinger/dinger.dto';

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
  dingerPrebuiltCheckout() {
    return this.publicProcedure
      .input(DingerPrebuiltCheckoutInputZod)
      .mutation(async ({ input }) => {
        const transaction_id = nanoid();
        const dinger_info = await this.donationService.getUserDingerInfo(
          input.streamer_id
        );
        if (!dinger_info)
          throw new TRPCError({
            code: 'NOT_FOUND',
            message:
              'Payment setup required: Streamer has not set up payment yet. Please Contact us to configure payment',
          });
        const items = [
          {
            name: `Tip for ${dinger_info.user.name}`,
            amount: input.amount,
            quantity: 1,
          },
        ] satisfies z.infer<typeof ItemsZod>;
        const prebuilt_link = this.dinger.generateLinkForPrebuiltForm(
          {
            clientId: dinger_info.client_id,
            customerName: input.donar_name,
            totalAmount: input.amount,
            items,
            merchantKey: dinger_info.merchant_key,
            merchantOrderId: transaction_id,
            merchantName: dinger_info.merchant_name,
            publicKey: dinger_info.public_key,
            projectName: dinger_info.project_name,
          },
          dinger_info.prebuilt_secret_key
        );
        await this.donationService.createPaymentSession({
          paymentProvider: 'Dinger',
          paymentMethod: '',
          streamerId: input.streamer_id,
          donarName: input.donar_name,
          donarMessage: input.message,
          amount: input.amount,
        });
        return { checkout_link: prebuilt_link };
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

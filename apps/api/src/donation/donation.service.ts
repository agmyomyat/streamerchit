import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { nanoid } from 'nanoid';
import { ENV_VARS } from '../env.schema';
import { DingerService } from '../lib/dinger/dinger.service';
import { PrismaService } from '../lib/prisma/prisma.service';
import { PaymentService } from '../payment/payment.service';
import { Prisma } from '@prisma/client';
import { TRPCError } from '@trpc/server';
interface CreateDonationTransactionParams {
  paymentSessionToken: string;
  donarPhone?: string;
  paymentMethod: string;
}
interface GetStreamerNameParams {
  page_handle: string;
}
interface GetPaymentProviderParams {
  name: string;
  method: string;
}
interface GetDonationHistoryQuery {
  query: {
    take?: number;
    skip?: number;
  };
}
@Injectable()
export class DonationService {
  constructor(
    private dinger: DingerService,
    private config: ConfigService<ENV_VARS>,
    private prisma: PrismaService,
    private paymentService: PaymentService
  ) {}

  async getDonationSettings(userId: string) {
    const settings = await this.prisma.donationSetting.findFirstOrThrow({
      where: { user_id: userId },
    });
    const { id, user_id, ...rest } = settings;
    return rest;
  }
  getUserDingerInfo(user_id: string) {
    return this.prisma.dingerInfo.findUnique({
      where: { user_id },
      include: { user: true },
    });
  }
  async getDonationHistory(
    user_id: string,
    { query: { take = 15, skip = 0 } }: GetDonationHistoryQuery
  ) {
    return this.prisma.donation.findMany({
      where: { user_id },
      orderBy: { created_at: 'desc' },
      take: take,
      skip: skip,
      include: { payment_transaction: true },
    });
  }
  async updateDonationSettings(
    user_id: string,
    data: Prisma.DonationSettingUpdateInput
  ) {
    await this.prisma.donationSetting.update({
      where: { user_id },
      data,
    });
    return { update: true };
  }
  async getStreamer(params: GetStreamerNameParams) {
    const donationPage = await this.prisma.donationPage.findFirstOrThrow({
      where: { url_handle: params.page_handle },
      include: { user: true },
    });
    return donationPage.user;
  }
  async getPaymentProvider(params: GetPaymentProviderParams) {
    const provider = this.prisma.paymentProvider.findFirstOrThrow({
      where: {
        AND: {
          name: params.name,
          method: params.method,
        },
      },
    });
    return provider;
  }
  async createDonationPayment(params: CreateDonationTransactionParams) {
    const paymentSessionData = this.paymentService.verifyPaymentSessionToken(
      params.paymentSessionToken
    );
    const getPaymentTransaction =
      await this.prisma.paymentTransaction.findFirstOrThrow({
        where: { id: paymentSessionData.payment_transaction_id },
      });
    if (getPaymentTransaction.completed_at) {
      throw new TRPCError({
        code: 'CONFLICT',
        message: 'Payment already made with this payment session',
      });
    }
    const paymentTransaction = await this.prisma.paymentTransaction.update({
      where: { id: paymentSessionData.payment_transaction_id },
      data: { method_name: params.paymentMethod },
      include: { user: true },
    });
    const paymentProvider = await this.getPaymentProvider({
      method: params.paymentMethod,
      name: paymentTransaction.payment_provider,
    });
    const item_name_key = paymentTransaction.user.name + '_tip';
    const payload = this.dinger.encryptPayload({
      dinger: {
        paymentToken: paymentSessionData.payment_token,
        public_key: this.config.getOrThrow('DINGER_API_PUBLIC_KEY'),
      },
      items: [
        {
          amount: paymentTransaction.total_amount,
          name: item_name_key,
          quantity: 1,
        },
      ],
      payment: {
        description: paymentTransaction.memo,
        customerAddress: '',
        customerName: paymentTransaction.doner_name,
        customerPhone: params.donarPhone || '',
        methodName: paymentTransaction.method_name,
        providerName: paymentTransaction.payment_provider,
        totalAmount: paymentTransaction.total_amount,
        orderId: paymentTransaction.id,
      },
    });
    const payment = await this.dinger.pay({
      formPayload: payload,
      paymentToken: paymentSessionData.payment_token,
    });
    const redirectUrl = this.dinger.generateRedirectURL(
      payment,
      paymentProvider.redirect_url
    );
    return { ...payment.response, redirect_url: redirectUrl };
  }
  getPaymentTransaction(id: string) {
    return this.prisma.paymentTransaction.findFirst({ where: { id } });
  }
  generateIdWithStreamerId(id: string) {
    return id + '__' + nanoid(15);
  }
}

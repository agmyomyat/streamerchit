import { Injectable } from '@nestjs/common';
import { PrismaService } from '../lib/prisma/prisma.service';
import { CalculateFeeParams } from './type/calculate-fee.type';
import { FIX_FEE_MUST_BE_NUMBER } from './payment.constants';
import { ValidateArguments } from '../decorators/zod-validation-decorators';
import { DingerPayRO } from '../lib/dinger/dinger.ro';
import { ConfigService } from '@nestjs/config';
import { DingerService } from '../lib/dinger/dinger.service';
import { JwtService } from '@nestjs/jwt';
import { PaymentSessionData } from './dto/payment.dto';
import { nanoid } from 'nanoid';
interface CreatePaymentTransactionParams {
  amount: number;
  streamerName: string;
  streamerId: string;
  donarMessage: string;
  donarName: string;
  paymentMethod: string;
  paymentProvider: string;
}
@Injectable()
export class PaymentService {
  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
    private dinger: DingerService,
    private jwt: JwtService
  ) {}
  @ValidateArguments()
  calculateFee(params: CalculateFeeParams) {
    const parsedFloat_fix_amount_fee = params.fix_fee
      ? parseInt(params.fix_fee)
      : 0;
    if (isNaN(parsedFloat_fix_amount_fee)) {
      throw new Error(FIX_FEE_MUST_BE_NUMBER);
    }
    const fee =
      (params.totalAmount * parseFloat(params.percentage_fee)) / 100 +
      parsedFloat_fix_amount_fee;
    const total = params.totalAmount - fee;
    return total;
  }
  verifyPaymentSessionToken(jwtToken: string): PaymentSessionData {
    return this.jwt.verify(jwtToken);
  }
  async createPaymentSession(params: CreatePaymentTransactionParams) {
    const donationId = nanoid(16);
    const paymentToken = await this.dinger.getPaymentToken({
      apiKey: this.config.getOrThrow('DINGER_API_KEY'),
      merchantName: this.config.getOrThrow('DINGER_MERCHANT_NAME'),
      projectName: this.config.getOrThrow('DINGER_PROJECT_NAME'),
    });
    const paymentTransaction = await this.prisma.paymentTransaction.create({
      data: {
        id: donationId,
        doner_name: params.donarName,
        memo: params.donarMessage,
        total_amount: params.amount,
        payment_provider: params.paymentProvider,
        method_name: params.paymentMethod,
        transaction_id: '',
        user: { connect: { id: params.streamerId } },
      },
    });
    const sessionToken = this.jwt.sign(
      {
        payment_token: paymentToken.response.paymentToken,
        payment_transaction_id: paymentTransaction.id,
        payment_provider_name: paymentTransaction.payment_provider,
      } satisfies PaymentSessionData,
      { expiresIn: '600s' }
    );
    return sessionToken;
  }
}

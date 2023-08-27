import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  Param,
  Post,
  Redirect,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import {
  CallbackValidationGuard,
  DescryptedCallbackRequestBody,
} from './guards/payment-validation.guard';
import { PaymentService } from './payment.service';
import { PAYMENT_FEE_CUT_FOR_STREAMER } from './payment.constants';
import { computerizeAmount } from './payment-utils/computerize-amount';
import { PaymentExceptionFilter } from './payment-exception.filter';
import { AlertboxService } from '../alert-box/alert-box.service';
import { PrismaService } from '../lib/prisma/prisma.service';
import { decryption } from './payment-utils/aes-ecb';
import { DingerCallbackRequestBodyDto } from './dto/payment.dto';
import { StreamlabsService } from '../lib/streamlabs/streamlabs.service';
import { nanoid } from 'nanoid';

@Controller('payment')
export class PaymentController {
  constructor(
    private prisma: PrismaService,
    private paymentService: PaymentService,
    private alertBox: AlertboxService,
    private slService: StreamlabsService
  ) {}
  @HttpCode(200)
  @UseFilters(PaymentExceptionFilter)
  @Post('callback/streamer/:streamer_id')
  async streamerPaymentCallback(
    @Param('streamer_id') streamer_id: string,
    @Body() body: DingerCallbackRequestBodyDto
  ) {
    const streamer = await this.prisma.user.findUniqueOrThrow({
      where: { id: streamer_id },
      include: {
        dinger_info: true,
        // at this point  streamlabs account should be connected
        accounts: { where: { provider: 'streamlabs' } },
      },
    });
    if (!streamer.dinger_info?.callback_key) {
      throw new HttpException('Streamer dinger credential not found', 404);
    }
    const decrypted: DescryptedCallbackRequestBody = JSON.parse(
      decryption(streamer.dinger_info?.callback_key, body.paymentResult)
    );
    const res = await this.prisma.paymentTransaction.update({
      where: { id: decrypted.merchantOrderId },
      data: {
        completed_at: new Date(),
        status: decrypted.transactionStatus,
        transaction_id: decrypted.transactionId,
        donation: {
          create: { user: { connect: { id: streamer_id } } },
        },
      },
    });
    this.alertBox.donationAlertEmit(res.user_id, {
      amount: res.total_amount,
      message: res.memo,
      name: res.doner_name,
    });
    await this.slService.createDonation(
      {
        name: res.doner_name,
        amount: res.total_amount,
        currency: 'USD',
        identifier: nanoid(),
        message: res.memo,
      },
      streamer.accounts[0].access_token!
    );
    return {
      message: 'success',
    };
  }
  @UseGuards(CallbackValidationGuard)
  @HttpCode(200)
  @UseFilters(PaymentExceptionFilter)
  @Post('callback/dinger')
  async paymentCallback(@Body() body: DescryptedCallbackRequestBody) {
    try {
      await this.prisma.$transaction(
        async (tx) => {
          const paymentTransac = await tx.paymentTransaction.findUniqueOrThrow({
            where: { id: body.merchantOrderId },
          });
          const paymentProvider = await tx.paymentProvider.findFirstOrThrow({
            where: {
              AND: {
                name: paymentTransac.payment_provider,
                method: paymentTransac.method_name,
              },
            },
          });
          const percentcut =
            PAYMENT_FEE_CUT_FOR_STREAMER +
            parseFloat(paymentProvider.fee_percentage);
          const active_total = this.paymentService.calculateFee({
            totalAmount: parseInt(body.totalAmount),
            percentage_fee: percentcut.toString(),
            fix_fee: '0',
          });
          // should i computerize the amount? will be back later
          const computerize_total = parseInt(body.totalAmount);
          const computerize_active_total = parseInt(active_total.toString());
          if (body.transactionStatus !== 'SUCCESS') {
            await tx.paymentTransaction.update({
              where: { id: body.merchantOrderId },
              data: { status: body.transactionStatus },
            });
            return true;
          }
          const p1 = tx.paymentTransaction.update({
            where: { id: body.merchantOrderId },
            data: {
              completed_at: new Date(),
              status: body.transactionStatus,
              transaction_id: body.transactionId,
              donation: {
                create: { user: { connect: { id: paymentTransac.user_id } } },
              },
            },
          });
          const p2 = tx.balance.update({
            where: { user_id: paymentTransac.user_id },
            data: {
              active_total: { increment: computerize_active_total },
              real_total: { increment: computerize_total },
            },
          });
          await Promise.all([p1, p2]);
          this.alertBox.donationAlertEmit(paymentTransac.user_id, {
            amount: parseInt(body.totalAmount),
            message: paymentTransac.memo,
            name: paymentTransac.doner_name,
          });
          return true;
        },
        { maxWait: 10000, timeout: 20000 }
      );
      return { success: true };
    } catch (e: any) {
      throw new HttpException(e, 500);
    }
  }
  @Get('callback/redirect/dinger/success')
  @Redirect('https://streamerchit.com/donation/success')
  dingerRedirectSuccess() {}
  @Get('callback/redirect/dinger/fail')
  @Redirect('https://streamerchit.com/donation/fail')
  dingerRedirectFail() {}
}

import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  Post,
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

@Controller('payment')
export class PaymentController {
  constructor(
    private prisma: PrismaService,
    private paymentService: PaymentService,
    private alertBox: AlertboxService,
  ) {}
  @UseGuards(CallbackValidationGuard)
  @HttpCode(200)
  @UseFilters(PaymentExceptionFilter)
  @Post('callback/dinger')
  async paymentCallback(@Body() body: DescryptedCallbackRequestBody) {
    try {
      await this.prisma.$transaction(async (tx) => {
        const paymentTransac = await tx.paymentTransaction.findUniqueOrThrow({
          where: { id: body.merchantOrderId },
        });
        const active_total = this.paymentService.calculateFee({
          totalAmount: body.totalAmount,
          percentage_fee: PAYMENT_FEE_CUT_FOR_STREAMER,
          fix_fee: '0',
        });
        // should i computerize the amount? will be back later
        const computerize_total = body.totalAmount;
        const computerize_active_total = active_total;
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
          amount: body.totalAmount,
          message: paymentTransac.memo,
          name: paymentTransac.doner_name,
        });
        return true;
      });
      return { success: true };
    } catch (e: any) {
      throw new HttpException(e, 500);
    }
  }
}

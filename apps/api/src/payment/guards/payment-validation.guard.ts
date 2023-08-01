import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
// Dinger callback body Schema
export interface DescryptedCallbackRequestBody {
  totalAmount: string;
  createdAt: string;
  transactionStatus: string;
  methodName: string;
  merchantOrderId: string;
  transactionId: string;
  customerName: string;
  providerName: string;
}
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { decryption } from '../payment-utils/aes-ecb';
import { DingerCallbackRequestBodyDto } from '../dto/payment.dto';
import { ENV_VARS } from '../../env.schema';

@Injectable()
export class CallbackValidationGuard implements CanActivate {
  constructor(private config: ConfigService<ENV_VARS>) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const body: DingerCallbackRequestBodyDto = request.body;
    const callbackKey = this.config.getOrThrow('DINGER_CALLBACK_KEY');
    const decrypted = decryption(callbackKey, body.paymentResult);
    request.body = JSON.parse(decrypted);
    return true;
  }
}

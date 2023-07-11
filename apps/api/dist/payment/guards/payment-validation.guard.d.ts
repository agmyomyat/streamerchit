import { CanActivate, ExecutionContext } from '@nestjs/common';
export interface DescryptedCallbackRequestBody {
    totalAmount: number;
    createdAt: string;
    transactionStatus: string;
    methodName: string;
    merchantOrderId: string;
    transactionId: string;
    customerName: string;
    providerName: string;
}
import { ConfigService } from '@nestjs/config';
import { ENV_VARS } from '../../env.schema';
export declare class CallbackValidationGuard implements CanActivate {
    private config;
    constructor(config: ConfigService<ENV_VARS>);
    canActivate(context: ExecutionContext): Promise<boolean>;
}

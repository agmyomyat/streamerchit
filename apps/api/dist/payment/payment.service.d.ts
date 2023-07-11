import { PrismaService } from '../lib/prisma/prisma.service';
import { CalculateFeeParams } from './type/calculate-fee.type';
import { ConfigService } from '@nestjs/config';
import { DingerService } from '../lib/dinger/dinger.service';
import { JwtService } from '@nestjs/jwt';
import { PaymentSessionData } from './dto/payment.dto';
interface CreatePaymentTransactionParams {
    amount: number;
    streamerName: string;
    streamerId: string;
    donarMessage: string;
    donarName: string;
    paymentMethod: string;
    paymentProvider: string;
}
export declare class PaymentService {
    private prisma;
    private config;
    private dinger;
    private jwt;
    constructor(prisma: PrismaService, config: ConfigService, dinger: DingerService, jwt: JwtService);
    calculateFee(params: CalculateFeeParams): number;
    verifyPaymentSessionToken(jwtToken: string): PaymentSessionData;
    createPaymentSession(params: CreatePaymentTransactionParams): Promise<string>;
}
export {};

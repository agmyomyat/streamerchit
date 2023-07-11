import { ConfigService } from '@nestjs/config';
import { ENV_VARS } from '../env.schema';
import { DingerService } from '../lib/dinger/dinger.service';
import { PrismaService } from '../lib/prisma/prisma.service';
import { PaymentService } from '../payment/payment.service';
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
export declare class DonationService {
    private dinger;
    private config;
    private prisma;
    private paymentService;
    constructor(dinger: DingerService, config: ConfigService<ENV_VARS>, prisma: PrismaService, paymentService: PaymentService);
    getStreamer(params: GetStreamerNameParams): Promise<import("@prisma/client/runtime").GetResult<{
        id: string;
        name: string | null;
        email: string | null;
        emailVerified: Date | null;
        image: string | null;
    }, unknown> & {}>;
    getPaymentProvider(params: GetPaymentProviderParams): Promise<import("@prisma/client/runtime").GetResult<{
        id: string;
        name: string;
        method: string;
        fee_percentage: string;
        fix_amount: string | null;
        redirect_url: string | null;
    }, unknown> & {}>;
    createDonationPayment(params: CreateDonationTransactionParams): Promise<{
        redirect_url: string;
        amount: number;
        merchOrderId: string;
        transactionNum: string;
        sign: string;
        signType: string;
        formToken?: string | null | undefined;
        qrCode?: string | null | undefined;
    }>;
    getPaymentTransaction(id: string): import("@prisma/client").Prisma.Prisma__PaymentTransactionClient<(import("@prisma/client/runtime").GetResult<{
        id: string;
        created_at: Date;
        completed_at: Date | null;
        payment_provider: string;
        method_name: string;
        transaction_id: string;
        status: string | null;
        doner_name: string;
        memo: string;
        total_amount: number;
        user_id: string;
    }, unknown> & {}) | null, null, import("@prisma/client/runtime").DefaultArgs>;
    generateIdWithStreamerId(id: string): string;
}
export {};

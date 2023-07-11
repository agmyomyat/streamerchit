import { DescryptedCallbackRequestBody } from './guards/payment-validation.guard';
import { PaymentService } from './payment.service';
import { AlertboxService } from '../alert-box/alert-box.service';
import { PrismaService } from '../lib/prisma/prisma.service';
export declare class PaymentController {
    private prisma;
    private paymentService;
    private alertBox;
    constructor(prisma: PrismaService, paymentService: PaymentService, alertBox: AlertboxService);
    paymentCallback(body: DescryptedCallbackRequestBody): Promise<{
        success: boolean;
    }>;
}

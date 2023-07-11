import { z } from 'zod';
export declare const DingerCallbackRequestBodyZod: z.ZodObject<{
    paymentResult: z.ZodString;
}, "strip", z.ZodTypeAny, {
    paymentResult: string;
}, {
    paymentResult: string;
}>;
declare const DingerCallbackRequestBodyDto_base: import("nestjs-zod").ZodDto<{
    paymentResult: string;
}, z.ZodObjectDef<{
    paymentResult: z.ZodString;
}, "strip", z.ZodTypeAny>, {
    paymentResult: string;
}>;
export declare class DingerCallbackRequestBodyDto extends DingerCallbackRequestBodyDto_base {
}
export declare class PaymentSessionData {
    payment_token: string;
    payment_transaction_id: string;
    payment_provider_name: string;
    constructor(payment_token: string, payment_transaction_id: string, payment_provider_name: string);
}
export {};

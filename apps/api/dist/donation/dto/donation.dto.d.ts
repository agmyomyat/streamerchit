import { z } from 'zod';
export declare const CreateDonationTransactionDtoZod: z.ZodObject<{
    phone: z.ZodOptional<z.ZodString>;
    payment_session_token: z.ZodString;
    payment_method: z.ZodString;
}, "strip", z.ZodTypeAny, {
    payment_session_token: string;
    payment_method: string;
    phone?: string | undefined;
}, {
    payment_session_token: string;
    payment_method: string;
    phone?: string | undefined;
}>;
export declare const GetDonationTransactionStatusDtoZod: z.ZodObject<{
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
}, {
    id: string;
}>;
export declare const CreatePaymentSessionDtoZod: z.ZodObject<{
    name: z.ZodString;
    amount: z.ZodNumber;
    message: z.ZodString;
    payment_name: z.ZodString;
    donation_page_handle: z.ZodString;
}, "strip", z.ZodTypeAny, {
    message: string;
    name: string;
    amount: number;
    payment_name: string;
    donation_page_handle: string;
}, {
    message: string;
    name: string;
    amount: number;
    payment_name: string;
    donation_page_handle: string;
}>;

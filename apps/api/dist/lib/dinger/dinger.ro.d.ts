import { z } from 'zod';
export declare const DingerPayROZod: z.ZodObject<{
    code: z.ZodString;
    message: z.ZodString;
    time: z.ZodString;
    response: z.ZodObject<{
        amount: z.ZodNumber;
        merchOrderId: z.ZodString;
        transactionNum: z.ZodString;
        formToken: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        qrCode: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        sign: z.ZodString;
        signType: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        amount: number;
        merchOrderId: string;
        transactionNum: string;
        sign: string;
        signType: string;
        formToken?: string | null | undefined;
        qrCode?: string | null | undefined;
    }, {
        amount: number;
        merchOrderId: string;
        transactionNum: string;
        sign: string;
        signType: string;
        formToken?: string | null | undefined;
        qrCode?: string | null | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    code: string;
    message: string;
    time: string;
    response: {
        amount: number;
        merchOrderId: string;
        transactionNum: string;
        sign: string;
        signType: string;
        formToken?: string | null | undefined;
        qrCode?: string | null | undefined;
    };
}, {
    code: string;
    message: string;
    time: string;
    response: {
        amount: number;
        merchOrderId: string;
        transactionNum: string;
        sign: string;
        signType: string;
        formToken?: string | null | undefined;
        qrCode?: string | null | undefined;
    };
}>;
declare const DingerPayRO_base: import("nestjs-zod").ZodDto<{
    code: string;
    message: string;
    time: string;
    response: {
        amount: number;
        merchOrderId: string;
        transactionNum: string;
        sign: string;
        signType: string;
        formToken?: string | null | undefined;
        qrCode?: string | null | undefined;
    };
}, z.ZodObjectDef<{
    code: z.ZodString;
    message: z.ZodString;
    time: z.ZodString;
    response: z.ZodObject<{
        amount: z.ZodNumber;
        merchOrderId: z.ZodString;
        transactionNum: z.ZodString;
        formToken: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        qrCode: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        sign: z.ZodString;
        signType: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        amount: number;
        merchOrderId: string;
        transactionNum: string;
        sign: string;
        signType: string;
        formToken?: string | null | undefined;
        qrCode?: string | null | undefined;
    }, {
        amount: number;
        merchOrderId: string;
        transactionNum: string;
        sign: string;
        signType: string;
        formToken?: string | null | undefined;
        qrCode?: string | null | undefined;
    }>;
}, "strip", z.ZodTypeAny>, {
    code: string;
    message: string;
    time: string;
    response: {
        amount: number;
        merchOrderId: string;
        transactionNum: string;
        sign: string;
        signType: string;
        formToken?: string | null | undefined;
        qrCode?: string | null | undefined;
    };
}>;
export declare class DingerPayRO extends DingerPayRO_base {
}
export {};

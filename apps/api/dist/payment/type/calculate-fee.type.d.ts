import { z } from 'zod';
export declare const CalculateFeeParamsZod: z.ZodObject<{
    totalAmount: z.ZodNumber;
    percentage_fee: z.ZodString;
    fix_fee: z.ZodNullable<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    totalAmount: number;
    percentage_fee: string;
    fix_fee: string | null;
}, {
    totalAmount: number;
    percentage_fee: string;
    fix_fee: string | null;
}>;
declare const CalculateFeeParams_base: import("nestjs-zod").ZodDto<{
    totalAmount: number;
    percentage_fee: string;
    fix_fee: string | null;
}, z.ZodObjectDef<{
    totalAmount: z.ZodNumber;
    percentage_fee: z.ZodString;
    fix_fee: z.ZodNullable<z.ZodString>;
}, "strip", z.ZodTypeAny>, {
    totalAmount: number;
    percentage_fee: string;
    fix_fee: string | null;
}>;
export declare class CalculateFeeParams extends CalculateFeeParams_base {
}
export {};

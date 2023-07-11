import { TRPCError } from '@trpc/server';
export declare class TrpcErrorReportDto {
    error: TRPCError;
    input: unknown;
    path: string;
    constructor(error: TRPCError, input: unknown, path: string);
}

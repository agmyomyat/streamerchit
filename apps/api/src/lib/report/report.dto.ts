import { TRPCError } from '@trpc/server';

export class TrpcErrorReportDto {
  constructor(
    public error: TRPCError,
    public input: unknown,
    public path: string,
  ) {}
}

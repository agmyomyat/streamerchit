import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';
export const DingerPayROZod = z.object({
  code: z.string(),
  message: z.string(),
  time: z.string(),
  response: z.object({
    amount: z.number(),
    merchOrderId: z.string(),
    transactionNum: z.string(),
    formToken: z.string().optional().nullable(),
    qrCode: z.string().optional().nullable(),
    sign: z.string(),
    signType: z.string(),
  }),
});
export class DingerPayRO extends createZodDto(DingerPayROZod) {}

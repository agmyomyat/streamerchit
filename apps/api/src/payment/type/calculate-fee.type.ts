import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const CalculateFeeParamsZod = z.object({
  totalAmount: z.number(),
  percentage_fee: z.string(),
  fix_fee: z.string().nullable(),
});

export class CalculateFeeParams extends createZodDto(CalculateFeeParamsZod) {}

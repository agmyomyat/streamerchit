import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const DingerCallbackRequestBodyZod = z.object({
  paymentResult: z.string(),
});
export class DingerCallbackRequestBodyDto extends createZodDto(
  DingerCallbackRequestBodyZod
) {}
export class PaymentSessionData {
  constructor(
    public payment_token: string,
    public payment_transaction_id: string,
    public payment_provider_name: string
  ) {}
}

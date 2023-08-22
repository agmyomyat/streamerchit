import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const GetPaymentTokenDtoZod = z.object({
  projectName: z.string(),
  apiKey: z.string(),
  merchantName: z.string(),
});
export class GetPaymentTokenDto extends createZodDto(GetPaymentTokenDtoZod) {}
export const ItemsZod = z.array(
  z.object({
    name: z.string(),
    quantity: z.number(),
    amount: z.number(),
  }),
);
export const EncryptPayloadParamsZod = z.object({
  payment: z.object({
    providerName: z.string(),
    methodName: z.string(),
    orderId: z.string(),
    customerPhone: z.string(),
    customerName: z.string(),
    description: z.string(),
    customerAddress: z.string(),
    totalAmount: z.number(),
  }),
  items: ItemsZod,
  dinger: z.object({
    paymentToken: z.string(),
    public_key: z.string(),
  }),
});
export class EncryptPayloadParams extends createZodDto(
  EncryptPayloadParamsZod,
) {}
export const EncryptPayloadForPrebuiltFormZod = z.object({
  clientId: z.string(),
  publicKey: z.string(),
  items: ItemsZod,
  customerName: z.string(),
  totalAmount: z.number().int(),
  merchantOrderId: z.string(),
  merchantKey: z.string(),
  projectName: z.string(),
  merchantName: z.string(),
});
export class EncryptPayloadForPrebuiltForm extends createZodDto(
  EncryptPayloadForPrebuiltFormZod
) {}
export const DingerPayDtoZod = z.object({
  formPayload: z.string(),
  paymentToken: z.string(),
});
export class DingerPayDto extends createZodDto(DingerPayDtoZod) {}

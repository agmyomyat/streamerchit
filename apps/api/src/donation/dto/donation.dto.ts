import { z } from 'zod';
export const CreateDonationTransactionDtoZod = z.object({
  phone: z.string().length(11).optional(),
  payment_session_token: z.string(),
  payment_method: z.string(),
});

export const GetDonationTransactionStatusDtoZod = z.object({
  id: z.string(),
});
export const CreatePaymentSessionDtoZod = z.object({
  name: z.string(),
  amount: z.number().int().min(500),
  message: z.string().max(255),
  payment_name: z.string(),
  donation_page_handle: z.string(),
});
export const DingerPrebuiltCheckoutInputZod = z.object({
  streamer_id: z.string(),
  donar_name: z.string(),
  message: z.string(),
  amount: z.number().int().min(500, { message: 'minimum amount is 500 kyats' }),
});
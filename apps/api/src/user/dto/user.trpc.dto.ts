import { z } from 'zod';

export const GetStreamerInfoInputZod = z.object({
  page_handle: z.string(),
});
export const UpdateDonationSettingsInputZod = z.object({
  image_href: z.string(),
  duration: z.number().int(),
  font_weight: z.number().int(),
  font_size: z.string(),
  font_color: z.string(),
  message_font_size: z.string(),
  message_font_color: z.string(),
  message_font_weight: z.number().int(),
  sound_href: z.string(),
  alertbox_listener_token: z.string().optional(),
});
export const GetDonationHistoryInputZod = z.object({
  query: z.object({
    take: z.number().int().optional(),
    skip: z.number().int().optional(),
  }),
});
export const UpdateTipPageSettingsInputZod = z.object({
  display_name: z.string(),
  url_handle: z.string(),
  avatar_url: z.string(),
  memo: z.string().nullable(),
});
import { z } from 'zod';

export const GetStreamerInfoInputZod = z.object({
  page_handle: z.string(),
});

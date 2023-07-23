import { z } from 'zod';

export function extractFileKeyAndExtFromUrl(url: string) {
  const { success } = z.string().url().safeParse(url);
  if (!success) return null;
  const reversedParts = url.split('/').reverse();
  const filenameWithExtension = reversedParts[0];
  return filenameWithExtension;
}

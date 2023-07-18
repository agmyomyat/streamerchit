import { z } from 'zod';

export function isDateOlderThan(date: Date, in_ms: number) {
  const { success } = z.date().safeParse(date);
  if (!success) return false;
  const currentDate = new Date();
  const timeDifference = currentDate.getTime() - date.getTime();

  return timeDifference > in_ms;
}

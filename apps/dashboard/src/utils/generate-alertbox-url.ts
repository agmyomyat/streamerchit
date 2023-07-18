export function generateAlertBoxUrl(
  url?: string | null,
  token?: string | null
) {
  if (!url || !token) return '';
  return `${url}?token=${token}`;
}

export function generateTipPageUrl(tipPageHandle?: string | null) {
  const front_url = process.env.NEXT_PUBLIC_FRONTEND_URL;
  if (!front_url || !tipPageHandle) return null;
  return `${front_url}/${tipPageHandle}/tip`;
}

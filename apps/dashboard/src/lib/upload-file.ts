import { getSCAccessToken } from '@/utils/access-token';

export async function uploadFile(files: File[]) {
  const accessToken = getSCAccessToken();
  if (!accessToken) throw new Error('accesstoken not found');
  const formData = new FormData();
  for (const f of files) {
    formData.append('file', f);
  }
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/upload`, {
    method: 'POST',
    headers: { authorization: accessToken },
    body: formData,
  });
  const uploadedFile = await res.json();
  return uploadedFile as { key: string; url: string };
}

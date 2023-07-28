export async function uploadS3PresignedFile(url: string, files: File[]) {
  if (!url) throw new Error('url is required');
  if (!files || !files.length) throw new Error('files is required');
  const res = await fetch(url, {
    method: 'PUT',
    body: new Blob(files)[0],
  });
  return res;
}

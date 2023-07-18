import type { Metadata } from 'next';
import { TipePageProvider } from './providers/tip-page-provider';
import { client } from '@/lib/trpc';
export const revalidate = 0;
export const metadata: Metadata = {
  title: 'streamer achit',
  description: 'streamer achit',
};
function getStreamerInfo(page_handle: string) {
  return client.user.info.query({ page_handle });
}
export default async function StreamerLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { handle: string };
}) {
  const streamer = await getStreamerInfo(params.handle);
  return (
    <TipePageProvider image={streamer.image || ''} name={streamer.name || ''}>
      {children}
    </TipePageProvider>
  );
}

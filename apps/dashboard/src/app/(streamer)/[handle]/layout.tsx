import { TipePageProvider } from './providers/tip-page-provider';
import { client } from '@/lib/trpc';
export const revalidate = 0;
import type { Metadata, ResolvingMetadata } from 'next';

type Props = {
  params: { handle: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const streamerData = await client.user.info.query({
    page_handle: params.handle,
  });

  return {
    title: streamerData.name,
    icons: streamerData.image,
  };
}

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
    <TipePageProvider
      image={streamer.image || ''}
      name={streamer.name || ''}
      streamerId={streamer.streamer_id || ''}
    >
      <div className="mt-28">{children}</div>
    </TipePageProvider>
  );
}

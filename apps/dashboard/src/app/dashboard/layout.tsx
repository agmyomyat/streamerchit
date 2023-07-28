import type { Metadata } from 'next';
import { Sidebar } from './components/side-bar';
import { cn } from '@/utils';
export const revalidate = 0;
export const metadata: Metadata = {
  title: 'StreamerChit',
  description: 'Donation alerts for streamer',
};
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
  params: { handle: string };
}) {
  return (
    <>
      <div className="flex mx-20 gap-7">
        <div>
          <Sidebar className={cn('w-[250px]')} />
        </div>
        {children}
      </div>
    </>
  );
}

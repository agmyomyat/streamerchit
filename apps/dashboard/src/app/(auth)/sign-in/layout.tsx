import type { Metadata } from 'next';
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
  return <div className=" mt-48 ">{children}</div>;
}

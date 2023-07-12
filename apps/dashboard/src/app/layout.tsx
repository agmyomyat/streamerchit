import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { TrpcProvider } from '../lib/provider/trpc-provider';
import { Toaster } from '@/components/ui/toaster';
import { Providers } from '@/lib/provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'streamer achit',
  description: 'streamer achit',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}

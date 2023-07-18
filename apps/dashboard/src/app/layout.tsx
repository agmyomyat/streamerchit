import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import { Providers } from '@/lib/provider';
import { NavBar } from '@/components/nav';

const inter = Inter({ subsets: ['latin'] });

import { Pacifico } from 'next/font/google';
import { cn } from '@/utils';
const pacifico = Pacifico({ subsets: ['latin'], weight: '400' });
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
        <Providers>
          <div className={cn(pacifico.className, 'fixed top-0 w-full z-10')}>
            <NavBar />
          </div>
          <div className="mt-24">{children}</div>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}

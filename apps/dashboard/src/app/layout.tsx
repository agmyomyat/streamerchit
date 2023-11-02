import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import { Providers } from '@/lib/provider';
import { NavBar } from '@/components/nav';

const inter = Inter({ subsets: ['latin'] });

import { Pacifico } from 'next/font/google';
import { cn } from '@/utils';
import { PaymentRegisterationWarningBar } from '@/components/top-message-bar/payment-registeration-warning';
const pacifico = Pacifico({ subsets: ['latin'], weight: '400' });
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'StreamerChit',
  description: 'Donation Alert Platform in Myanmar',
};
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <Providers>
          <div className={'fixed top-0 w-full z-10'}>
            <PaymentRegisterationWarningBar />
            <div>
              <NavBar />
            </div>
          </div>
          <div className="pt-[64px]">{children}</div>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}

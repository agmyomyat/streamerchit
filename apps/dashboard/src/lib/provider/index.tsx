'use client';
import { SessionProvider } from 'next-auth/react';
import { TrpcProvider } from './trpc-provider';
import { GlobalLoading } from '@/components/global-loading/global-loading';
import { GlobalLoader } from '@/global-stores/global-loading';
import { useSelector } from '@legendapp/state/react';
import { SC_SessionProvider } from './session-checker';

export function Providers({ children }) {
  const isLoading = useSelector(() => GlobalLoader.get());
  return (
    <TrpcProvider>
      <SessionProvider>
        <SC_SessionProvider>{children}</SC_SessionProvider>
        <GlobalLoading isLoading={isLoading} />
      </SessionProvider>
    </TrpcProvider>
  );
}

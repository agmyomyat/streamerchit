'use client';
import { SessionProvider } from 'next-auth/react';
import { TrpcProvider } from './trpc-provider';

export function Providers({ children }) {
  return (
    <TrpcProvider>
      <SessionProvider>{children}</SessionProvider>
    </TrpcProvider>
  );
}

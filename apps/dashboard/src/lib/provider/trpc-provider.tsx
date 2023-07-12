'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { useState } from 'react';
import { trpcReact } from '../trpc/trpc-react';
import { getSCAccessToken, storeSCAccessToken } from '@/utils/access-token';
import { isExpired } from 'react-jwt';
import { getSession } from 'next-auth/react';

export function TrpcProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpcReact.createClient({
      links: [
        httpBatchLink({
          url: 'http://localhost:3333/trpc',
          // You can pass any HTTP headers you wish here
          headers: async () => {
            const token = getSCAccessToken();
            console.log(token);
            if (!token) return {};
            if (isExpired(token)) {
              const data = await getSession();
              if (!data?.user.access_token) return {};
              storeSCAccessToken(data.user.access_token);
              return {
                Authorization: `${data.user.access_token}`,
              };
            }
            return {
              Authorization: token,
            };
          },
        }),
      ],
    })
  );
  return (
    <trpcReact.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpcReact.Provider>
  );
}

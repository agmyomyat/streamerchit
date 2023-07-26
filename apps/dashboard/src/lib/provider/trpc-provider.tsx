'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { useState } from 'react';
import { trpcReact } from '../trpc/trpc-react';
import { getSCAccessToken, storeSCAccessToken } from '@/utils/access-token';
import { isExpired } from 'react-jwt';
import { getSession } from 'next-auth/react';

export function TrpcProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 3,
            cacheTime: 1000 * 10,
            refetchOnWindowFocus: false,
          },
        },
      })
  );
  const [trpcClient] = useState(() =>
    trpcReact.createClient({
      links: [
        httpBatchLink({
          url: `${process.env.NEXT_PUBLIC_BACKEND_URL!}/trpc`,
          // You can pass any HTTP headers you wish here
          headers: async () => {
            const token = getSCAccessToken();
            if (!token) return {};
            if (isExpired(token)) {
              const data = await getSession();
              if (!data?.user.access_token) {
                storeSCAccessToken('');
                return {};
              }
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

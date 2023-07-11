import { type AppRouter } from '@streamer-achit/api';
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
export const client = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3333/trpc',
      // You can pass any HTTP headers you wish here
    }),
  ],
});

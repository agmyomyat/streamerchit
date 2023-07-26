import { type AppRouter } from '@streamer-achit/api';
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
export const client = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL!}/trpc`,
      // You can pass any HTTP headers you wish here
    }),
  ],
});

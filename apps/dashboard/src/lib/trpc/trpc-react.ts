import { type AppRouter } from '@streamer-achit/api';
import { createTRPCReact } from '@trpc/react-query';
export const trpcReact = createTRPCReact<AppRouter>();

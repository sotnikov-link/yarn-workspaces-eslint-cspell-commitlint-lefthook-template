import type { Router } from '@some-name/trpc-service';
import { createTRPCReact } from '@trpc/react-query';

export const trpcService = createTRPCReact<Router>();

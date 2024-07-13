import { initTRPC } from '@trpc/server';

// eslint-disable-next-line id-length
const t = initTRPC.create();

export const router = t.router;
export const publicProcedure = t.procedure;

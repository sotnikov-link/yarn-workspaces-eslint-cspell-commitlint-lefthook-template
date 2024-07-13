import { z } from 'zod';
import { database } from './database';
import { publicProcedure, router as tRouter } from './trpc';

export type Router = typeof router;

export const router = tRouter({
  userList: publicProcedure.query(async () => {
    const users = await database.user.findMany();

    return users;
  }),
  userById: publicProcedure.input(z.string()).query(async (options) => {
    const { input } = options;
    const user = await database.user.findById(input);

    return user;
  }),
  userCreate: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async (options) => {
      const { input } = options;
      const user = await database.user.create(input);

      return user;
    }),
});

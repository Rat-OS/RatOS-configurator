// src/server/router/context.ts
import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';

export const createContext = (opts?: trpcNext.CreateNextContextOptions) => {
	const req = opts?.req;
	const res = opts?.res;
	const boards: any = null;
	const board: any = null;
	return {
		req,
		res,
		boards,
		board,
	};
};

type Context = trpc.inferAsyncReturnType<typeof createContext>;

export const createRouter = <Meta extends {} = any>() => trpc.router<Context, Meta>();

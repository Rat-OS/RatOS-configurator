import { getLogger } from '../../../helpers/logger';
import { appRouter } from '../../../server/routers/index';
import * as trpcNext from '@trpc/server/adapters/next';

// export type definition of API
export type AppRouter = typeof appRouter;

// export API handler
export default trpcNext.createNextApiHandler({
	router: appRouter,
	createContext: () => ({
		boards: [],
	}),
	onError: (ctx) => {
		getLogger().error(ctx.error);
	},
});

import * as trpcNext from '@trpc/server/adapters/next';
import { getLogger } from '../../../helpers/logger';
import { createContext } from '../../../server/router/context';
import { appRouter } from '../../../server/router/index';

// export type definition of API
export type AppRouter = typeof appRouter;

// export API handler
export default trpcNext.createNextApiHandler({
	router: appRouter,
	createContext: createContext,
	onError: (ctx) => {
		getLogger().error(ctx.error);
	},
});

import { initTRPC } from '@trpc/server';
import { ToolheadGenerator } from '@/server/helpers/config-generation/toolhead';
import { Board } from '@/zods/boards';

interface Context {
	boards: Board[];
	board?: Board;
	toolhead?: ToolheadGenerator<any>;
}

interface Meta {
	boardRequired?: boolean;
	includeHost?: boolean;
}

// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.context<Context>().meta<Meta>().create();
// Base router and procedure helpers
export const router = t.router;
export const publicProcedure = t.procedure;
export const middleware = t.middleware;

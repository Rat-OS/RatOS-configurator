'use client';
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import { createTRPCNext } from '@trpc/next';
import type { AppRouter } from '@/server/routers/index';
export type {
	PrinterRouterLike,
	DropdownQuery,
	DropdownQueryKeys,
	DropdownQueryInput,
	DropdownQueryOutput,
} from '@/server/routers/printer';

export function getBaseUrl() {
	if (typeof window !== 'undefined')
		// browser should use relative path
		return '/configure';
	if (process.env.RENDER_INTERNAL_HOSTNAME)
		// reference for render.com
		return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}/configure`;
	// assume localhost
	return `http://127.0.0.1:${process.env.PORT ?? 3000}/configure`;
}
export const trpc = createTRPCNext<AppRouter>({
	config() {
		return {
			links: [
				httpBatchLink({
					/**
					 * @link https://trpc.io/docs/ssr
					 **/
					url: `${getBaseUrl()}/api/trpc`,
					maxURLLength: 2083, // a suitable size
				}),
			],
		};
	},
	overrides: {
		useMutation: {
			/**
			 * This function is called whenever a `.useMutation` succeeds
			 **/
			async onSuccess(opts) {
				/**
				 * @note that order here matters:
				 * The order here allows route changes in `onSuccess` without
				 * having a flash of content change whilst redirecting.
				 **/
				// Calls the `onSuccess` defined in the `useQuery()`-options:
				await opts.originalFn();
				// Invalidate all queries in the react-query cache:
				await opts.queryClient.invalidateQueries();
			},
		},
	},
	/**
	 * @link https://trpc.io/docs/ssr
	 **/
	ssr: false,
});
export const proxyClient = createTRPCProxyClient<AppRouter>({
	links: [
		httpBatchLink({
			/**
			 * @link https://trpc.io/docs/ssr
			 **/
			url: `${getBaseUrl()}/api/trpc`,
			maxURLLength: 2083, // a suitable size
		}),
	],
});

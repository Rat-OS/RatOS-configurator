import { createReactQueryHooks } from '@trpc/react';
import type { AppRouter } from '../pages/api/trpc/[trpc]';

export const trpc = createReactQueryHooks<AppRouter>();
export const getTRPCClientOpts = () => {
	if (typeof window !== 'undefined') {
		// during client requests
		return {
			url: '/configure/api/trpc',
		};
	}
	/**
	 * SSR
	 * @link https://trpc.io/docs/ssr
	 */
	const url =
		process.env.NODE_ENV === 'development'
			? `http://localhost:3000/configure/api/trpc`
			: 'http://localhost/configure/api/trpc';

	return {
		url,
		headers: {
			'x-ssr': '1',
		},
		/**
		 * @link https://react-query-v3.tanstack.com/reference/QueryClient
		 */
	};
};
export const trpcClient = trpc.createClient(getTRPCClientOpts());

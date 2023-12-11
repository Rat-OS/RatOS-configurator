'use client';
import { TRPCClientErrorLike } from '@trpc/client';
import { UseTRPCQueryResult } from '@trpc/react-query/src/shared/hooks/types';
import { AppRouter } from '../../server/routers';
import { ErrorMessage } from '../error-message';
import { Spinner } from '../spinner';
import { useAutoAnimate } from '@formkit/auto-animate/react';

export const QueryStatus = (query: UseTRPCQueryResult<any, TRPCClientErrorLike<AppRouter>>) => {
	const [parent] = useAutoAnimate();
	let content = null;
	if (query.isError) {
		content = (
			<div className="mb-4">
				<ErrorMessage>{query.error?.message}</ErrorMessage>
			</div>
		);
	}
	if (query.isFetching) {
		content = (
			<div className="mb-4 flex items-center justify-center bg-zinc-800">
				<Spinner />
			</div>
		);
	}
	return <div ref={parent}>{content}</div>;
};

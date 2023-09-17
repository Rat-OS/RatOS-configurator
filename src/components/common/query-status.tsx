'use client';
import { TRPCClientErrorLike } from '@trpc/client';
import { UseQueryResult } from 'react-query';
import { AppRouter } from '../../server/router';
import { ErrorMessage } from '../error-message';
import { Spinner } from '../spinner';
import { useAutoAnimate } from '@formkit/auto-animate/react';

export const QueryStatus = (query: UseQueryResult<any, TRPCClientErrorLike<AppRouter>>) => {
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

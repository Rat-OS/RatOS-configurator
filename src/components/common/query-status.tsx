'use client';
import { TRPCClientErrorLike } from '@trpc/client';
import { UseQueryResult } from 'react-query';
import { AppRouter } from '../../server/router';
import { ErrorMessage } from '../error-message';
import { Spinner } from '../spinner';

export const QueryStatus = (query: UseQueryResult<any, TRPCClientErrorLike<AppRouter>>) => {
	if (query.isError) {
		return (
			<div className="mb-4">
				<ErrorMessage>{query.error?.message}</ErrorMessage>
			</div>
		);
	}
	if (query.isFetching) {
		return (
			<div className="absolute right-5 top-9 mb-4 flex items-center">
				<Spinner />
			</div>
		);
	}
	return null;
};

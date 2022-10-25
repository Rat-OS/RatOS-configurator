import { TRPCClientErrorLike } from '@trpc/client';
import { UseQueryResult } from 'react-query';
import { AppRouter } from '../../server/router';
import { ErrorMessage } from '../error-message';
import { Spinner } from '../spinner';

export const QueryStatus = (query: UseQueryResult<any, TRPCClientErrorLike<AppRouter>>) => {
	if (query.isError) {
		return (
			<div className="mb-4 h-48">
				<ErrorMessage>{query.error?.message}</ErrorMessage>
			</div>
		);
	}
	if (query.isFetching) {
		return (
			<div className="flex items-center mb-4 absolute top-9 right-5">
				<Spinner />
			</div>
		);
	}
	return null;
};

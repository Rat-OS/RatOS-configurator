import { TRPCClientErrorLike } from '@trpc/client';
import { UseMutationResult } from 'react-query';
import { AppRouter } from '../../server/router';
import { ErrorMessage } from '../error-message';
import { Spinner } from '../spinner';

export const MutationStatus = (mutation: UseMutationResult<any, TRPCClientErrorLike<AppRouter>, any, any>) => {
	if (mutation.isError) {
		return (
			<div className="mb-4 h-48">
				<ErrorMessage>{mutation.error?.message}</ErrorMessage>
			</div>
		);
	}
	if (mutation.isLoading) {
		return (
			<div className="flex items-center mb-4 absolute top-9 right-5">
				<Spinner />
			</div>
		);
	}
	return null;
};

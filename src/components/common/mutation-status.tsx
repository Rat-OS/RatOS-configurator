'use client';
import { TRPCClientErrorLike } from '@trpc/client';
import { UseMutationResult } from '@tanstack/react-query';
import { AppRouter } from '@/server/routers';
import { ErrorMessage } from '@/components/common/error-message';
import { Spinner } from '@/components/common/spinner';

export const MutationStatus = (mutation: UseMutationResult<any, TRPCClientErrorLike<AppRouter>, any, any>) => {
	if (mutation.isError) {
		return (
			<div className="mb-4 h-48">
				<ErrorMessage>{mutation.error?.message}</ErrorMessage>
			</div>
		);
	}
	if (mutation.isLoading && !mutation.isIdle && !mutation.isPaused) {
		return (
			<div className="absolute right-5 top-9 mb-4 flex items-center">
				<Spinner />
			</div>
		);
	}
	return null;
};

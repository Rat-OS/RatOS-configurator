'use client';
import { TRPCClientErrorLike } from '@trpc/client';
import { UseTRPCQueryResult } from '@trpc/react-query/src/shared/hooks/types';
import { AppRouter } from '@/server/routers';
import { ErrorMessage } from '@/components/common/error-message';
import { Spinner } from '@/components/common/spinner';
import { motion } from 'framer-motion';
import { AnimatedContainer } from '@/components/common/animated-container';
import { UseQueryResult } from '@tanstack/react-query';

export const QueryStatus = (query: UseQueryResult<any, any>) => {
	let content = null;
	if (query.isError) {
		content = (
			<div className="mb-4">
				<ErrorMessage>{query.error?.message}</ErrorMessage>
			</div>
		);
	}
	if (query.isLoading) {
		content = (
			<div className="mb-4 flex items-center justify-center">
				<Spinner />
			</div>
		);
	}
	return <AnimatedContainer>{content}</AnimatedContainer>;
};

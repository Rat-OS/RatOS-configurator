import { ErrorMessage } from '../error-message';
import { Spinner } from '../spinner';
import React from 'react';

export const ShowWhenReady: React.FC<React.PropsWithChildren<{ queryErrors: string[]; isReady: boolean }>> = (
	props,
) => {
	if (props.queryErrors.length > 0) {
		return (
			<div className="mb-4 space-y-2">
				{props.queryErrors.map((error, i) => {
					return <ErrorMessage key={i}>{error}</ErrorMessage>;
				})}
			</div>
		);
	}
	if (!props.isReady && props.queryErrors.length === 0) {
		return (
			<div className="flex h-12 items-center justify-center">
				<Spinner />
			</div>
		);
	}
	return props.children;
};

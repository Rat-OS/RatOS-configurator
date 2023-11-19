import { ErrorMessage } from '../error-message';
import { Spinner } from '../spinner';
import React from 'react';

export const ShowWhenReady: React.FC<
	React.PropsWithChildren<{ queryErrors: string[]; isReady: boolean; showErrors?: boolean }>
> = (props) => {
	if (props.queryErrors.length > 0 && props.showErrors) {
		return (
			<ErrorMessage className="mb-4">
				{props.queryErrors.map((e) => (
					<div className="mt-2" key={e}>
						{e}
					</div>
				))}
			</ErrorMessage>
		);
	}
	if (!props.isReady && props.queryErrors.length === 0) {
		return (
			<div className="flex h-12 items-center justify-center">
				<Spinner />
			</div>
		);
	}
	return props.children as React.ReactElement;
};

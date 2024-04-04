import { ErrorMessage } from '@/components/common/error-message';
import { Spinner } from '@/components/common/spinner';
import React from 'react';
import { AnimatedContainer } from '@/components/common/animated-container';

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
			<div className="flex min-h-12 flex-1 items-center justify-center">
				<Spinner />
			</div>
		);
	}
	return <AnimatedContainer>{props.children as React.ReactElement}</AnimatedContainer>;
};

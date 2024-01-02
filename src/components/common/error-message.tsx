import { XCircleIcon } from '@heroicons/react/24/solid';
import React from 'react';
import { twMerge } from 'tailwind-merge';
import { Banner } from './banner';

export type ErrorMessageProps = React.PropsWithChildren<{
	title?: string;
	className?: string;
}>;

export const ErrorMessage: React.FC<ErrorMessageProps> = (props) => {
	return (
		<Banner
			color="red"
			Icon={XCircleIcon}
			title={props.title ? 'Error: ' + props.title : 'Error'}
			className={twMerge(props.className, 'whitespace-pre-wrap')}
		>
			{props.children}
		</Banner>
	);
};

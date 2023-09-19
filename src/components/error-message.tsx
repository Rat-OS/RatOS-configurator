import { XCircleIcon } from '@heroicons/react/24/solid';
import React from 'react';
import { twJoin } from 'tailwind-merge';
import { Banner } from './common/banner';

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
			className={props.className}
		>
			{props.children}
		</Banner>
	);
};

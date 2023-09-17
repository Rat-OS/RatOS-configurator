import { XCircleIcon } from '@heroicons/react/24/solid';
import React from 'react';
import { twJoin } from 'tailwind-merge';
import { Banner } from './common/banner';

export type ErrorMessageProps = React.PropsWithChildren<{
	title?: string;
}>;

export const ErrorMessage: React.FC<ErrorMessageProps> = (props) => {
	return (
		<Banner color="red" Icon={XCircleIcon} title={props.title ? 'Error: ' + props.title : 'Error'}>
			{props.children}
		</Banner>
	);
};

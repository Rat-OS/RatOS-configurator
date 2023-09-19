import { ExclamationCircleIcon } from '@heroicons/react/24/solid';
import React from 'react';
import { Banner } from './common/banner';

interface WarningMessageProps extends React.PropsWithChildren {
	title?: string;
	className?: string;
}

export const WarningMessage: React.FC<WarningMessageProps> = (props) => {
	return (
		<Banner
			color="yellow"
			Icon={ExclamationCircleIcon}
			title={props.title ? 'Warning: ' + props.title : 'Warning'}
			className={props.className}
		>
			{props.children}
		</Banner>
	);
};

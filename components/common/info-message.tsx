import { InformationCircleIcon } from '@heroicons/react/24/solid';
import React from 'react';
import { Banner } from '@/components/common/banner';

export type InfoMessageProps = React.PropsWithChildren<{
	title?: string;
	className?: string;
}>;

export const InfoMessage: React.FC<InfoMessageProps> = (props) => {
	return (
		<Banner
			color="blue"
			Icon={InformationCircleIcon}
			title={props.title ? props.title : 'Info'}
			className={props.className}
		>
			{props.children}
		</Banner>
	);
};

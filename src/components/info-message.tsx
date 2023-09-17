import { InformationCircleIcon } from '@heroicons/react/24/solid';
import React from 'react';
import { Banner } from './common/banner';

export type InfoMessageProps = React.PropsWithChildren<{
	title?: string;
}>;

export const InfoMessage: React.FC<InfoMessageProps> = (props) => {
	return (
		<Banner color="blue" Icon={InformationCircleIcon} title={props.title ? 'Info: ' + props.title : 'Info'}>
			{props.children}
		</Banner>
	);
};

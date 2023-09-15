'use client';

import React from 'react';
import { classNames } from '../helpers/classNames';
import { MoonrakerStatus, useMoonraker } from '../hooks/useMoonraker';

interface Props {
	className?: string;
}

const moonrakerStatusToText = (moonrakerState: MoonrakerStatus | null) => {
	switch (moonrakerState) {
		case 'not-running':
			return 'Moonraker State: Not Running';
		case 'connected':
			return 'Moonraker State: Connected';
		case 'connecting':
			return 'Moonraker State: Connecting';
		default:
			return 'Moonraker State: Unknown';
	}
};

export const MoonrakerStateBadge: React.FC<Props> = (props) => {
	const { status } = useMoonraker();
	return (
		<span
			className={classNames(
				status === 'not-running' ? 'bg-red-100 text-red-700 dark:bg-red-700 dark:text-red-100' : '',
				status === 'connected' ? 'bg-brand-100 text-brand-700 dark:bg-brand-700 dark:text-brand-100' : '',
				status === 'connecting' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-700 dark:text-yellow-100' : '',
				props.className != null ? props.className : '',
				'inline-flex cursor-default items-center rounded-full px-3 py-0.5 text-xs font-semibold',
			)}
			title={moonrakerStatusToText(status)}
		>
			<svg
				className={classNames(
					status === 'not-running' ? 'text-red-400' : '',
					status === 'connected' ? 'text-brand-400' : '',
					status === 'connecting' ? 'text-yellow-400' : '',
					'-ml-1 mr-1.5 h-2 w-2',
				)}
				fill="currentColor"
				viewBox="0 0 8 8"
			>
				<circle cx={4} cy={4} r={3} />
			</svg>
			Moonraker
		</span>
	);
};

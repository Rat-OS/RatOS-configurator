'use client';

import React from 'react';
import { twJoin } from 'tailwind-merge';
import { MoonrakerStatus, useMoonraker } from '../moonraker/hooks';
import { Badge, BadgeProps, badgeTextColorStyle } from './common/badge';

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
	let color: BadgeProps['color'] = 'orange';
	switch (status) {
		case 'not-running':
			color = 'red';
			break;
		case 'connected':
			color = 'brand';
			break;
		case 'connecting':
			color = 'yellow';
			break;
		default:
			color = 'orange';
			break;
	}
	return (
		<Badge color={color} title={moonrakerStatusToText(status)}>
			<svg className={twJoin(badgeTextColorStyle({ color }), 'mr-1.5 h-2 w-2')} fill="currentColor" viewBox="0 0 8 8">
				<circle cx={4} cy={4} r={3} />
			</svg>
			Moonraker
		</Badge>
	);
};

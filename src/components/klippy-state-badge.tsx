'use client';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { twJoin } from 'tailwind-merge';
import { KlippyReadyStates, useKlippyStateHandler } from '../hooks/useKlippyStateHandler';
import { Badge, BadgeProps, badgeTextColorStyle } from './common/badge';

interface Props {
	className?: string;
}

const klipperStateToText = (klippyState: KlippyReadyStates) => {
	switch (klippyState) {
		case 'error':
			return 'Klipper State: Error';
		case 'ready':
			return 'Klipper State: Ready';
		case 'shutdown':
			return 'Klipper State: Shutdown';
		case 'startup':
			return 'Klipper State: Startup';
		case 'unknown':
			return 'Klipper State: Unknown';
		default:
			return 'Klipper State: Unknown';
	}
};

export const KlippyStateBadge: React.FC<Props> = (props) => {
	const klippyState = useKlippyStateHandler();
	let color: BadgeProps['color'] = 'orange';
	switch (klippyState) {
		case 'error':
			color = 'red';
			break;
		case 'ready':
			color = 'brand';
			break;
		case 'shutdown':
			color = 'orange';
			break;
		case 'startup':
			color = 'yellow';
			break;
		case 'unknown':
			color = 'orange';
			break;
		default:
			color = 'orange';
			break;
	}

	return (
		<Badge color={color} title={klipperStateToText(klippyState)}>
			<svg className={twJoin(badgeTextColorStyle({ color }), 'h-2 w-2')} fill="currentColor" viewBox="0 0 8 8">
				<circle cx={4} cy={4} r={3} />
			</svg>
			Klipper
		</Badge>
	);
};

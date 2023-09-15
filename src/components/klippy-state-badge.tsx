'use client';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { classNames } from '../helpers/classNames';
import { KlippyReadyStates, KlippyStatusState, useKlippyStateHandler } from '../hooks/useKlippyStateHandler';

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
	useKlippyStateHandler();
	const klippyState = useRecoilValue(KlippyStatusState);
	return (
		<span
			className={classNames(
				klippyState === 'error' ? 'bg-red-100 text-red-700 dark:bg-red-700 dark:text-red-100' : '',
				klippyState === 'ready' ? 'bg-brand-100 text-brand-700 dark:bg-brand-700 dark:text-brand-100' : '',
				klippyState === 'shutdown' || klippyState === 'unknown'
					? 'bg-orange-100 text-orange-700 dark:bg-orange-700 dark:text-orange-100'
					: '',
				klippyState === 'startup' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-700 dark:text-yellow-100' : '',
				props.className != null ? props.className : '',
				'inline-flex cursor-default items-center rounded-full px-3 py-0.5 text-xs font-semibold',
			)}
			title={klipperStateToText(klippyState)}
		>
			<svg
				className={classNames(
					klippyState === 'error' ? 'text-red-400' : '',
					klippyState === 'ready' ? 'text-brand-400' : '',
					klippyState === 'shutdown' || klippyState === 'unknown' ? 'text-orange-400' : '',
					klippyState === 'startup' ? 'text-yellow-400' : '',
					'-ml-1 mr-1.5 h-2 w-2',
				)}
				fill="currentColor"
				viewBox="0 0 8 8"
			>
				<circle cx={4} cy={4} r={3} />
			</svg>
			Klipper
		</span>
	);
};

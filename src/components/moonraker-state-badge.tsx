import React from 'react';
import { useRecoilValue } from 'recoil';
import { classNames } from '../helpers/classNames';
import { MoonrakerStatusState } from '../hooks/useMoonraker';

interface Props {
	className?: string;
}

export const MoonrakerStateBadge: React.FC<Props> = (props) => {
	const moonrakerState = useRecoilValue(MoonrakerStatusState);
	return (
		<span
			className={classNames(
				moonrakerState === 'not-running' ? 'text-red-700 bg-red-100 dark:text-red-100 dark:bg-red-700' : '',
				moonrakerState === 'connected' ? 'text-brand-700 bg-brand-100 dark:text-brand-100 dark:bg-brand-700' : '',
				moonrakerState === 'connecting' ? 'text-yellow-700 bg-yellow-100 dark:text-yellow-100 dark:bg-yellow-700' : '',
				props.className != null ? props.className : '',
				'inline-flex items-center px-3 py-0.5 rounded-full text-xs font-semibold',
			)}
		>
			<svg
				className={classNames(
					moonrakerState === 'not-running' ? 'text-red-400' : '',
					moonrakerState === 'connected' ? 'text-brand-400' : '',
					moonrakerState === 'connecting' ? 'text-yellow-400' : '',
					'-ml-1 mr-1.5 h-2 w-2',
				)}
				fill='currentColor'
				viewBox='0 0 8 8'
			>
				<circle cx={4} cy={4} r={3} />
			</svg>
			Moonraker
		</span>
	);
};

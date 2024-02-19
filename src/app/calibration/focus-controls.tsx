import React from 'react';
import { twJoin, twMerge } from 'tailwind-merge';
import {
	ChevronDoubleDownIcon,
	ChevronDoubleUpIcon,
	ChevronDownIcon,
	ChevronUpIcon,
} from '@heroicons/react/24/outline';
import { useGcodeCommand } from '../_hooks/toolhead';

export const initialCameraSettings = {
	pixelPrMm: 160,
	outerNozzleDiameter: 1,
	flipVertical: false,
	flipHorizontal: false,
};

export type CameraSettings = typeof initialCameraSettings;

type CameraSettingsProps = {
	className?: string;
	isVisible?: boolean;
	toggle: (visible: boolean) => void;
};

export const FocusControls: React.FC<CameraSettingsProps> = (props) => {
	const G = useGcodeCommand();
	return (
		<div
			className={twMerge(
				'scroll absolute transform-gpu overflow-y-auto rounded-md border-y border-r border-zinc-800 bg-zinc-100 shadow-lg transition-all dark:bg-zinc-900/70',
				props.isVisible ? ' -translate-y-full opacity-100' : 'pointer-events-none  -translate-y-2/3  opacity-0',
				props.className,
			)}
			onWheel={(e) => {
				e.stopPropagation();
			}}
		>
			<ol className="flex flex-col divide-y divide-zinc-200 dark:divide-zinc-800">
				<li className={twJoin('flex')}>
					<div className={twJoin('flex flex-1 items-center justify-center text-center')}>
						<button
							onClick={() => G`G91\nG0 Z1`}
							type="button"
							className={twMerge(
								'flex items-center justify-center space-x-2 whitespace-nowrap px-5 py-3 text-sm font-medium text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-100',
							)}
						>
							<ChevronDoubleUpIcon className="inline h-5 w-5 flex-shrink-0" aria-hidden="true" />
							<span className="inline">+1.0</span>
						</button>
					</div>
				</li>
				<li className={twJoin('flex')}>
					<div className={twJoin('flex flex-1 items-center justify-center text-center')}>
						<button
							onClick={() => G`G91\nG0 Z0.5`}
							type="button"
							className={twMerge(
								'flex items-center justify-center space-x-2 whitespace-nowrap px-5 py-3 text-sm font-medium text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-100',
							)}
						>
							<ChevronUpIcon className="inline h-5 w-5 flex-shrink-0" aria-hidden="true" />
							<span className="inline">+0.5</span>
						</button>
					</div>
				</li>
				<li className={twJoin('flex')}>
					<div className={twJoin('flex flex-1 items-center justify-center text-center')}>
						<button
							onClick={() => G`G91\nG0 Z0.1`}
							type="button"
							className={twMerge(
								'flex items-center justify-center space-x-2 whitespace-nowrap px-5 py-3 text-sm font-medium text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-100',
							)}
						>
							<ChevronUpIcon className="inline h-5 w-5 flex-shrink-0" aria-hidden="true" />
							<span className="inline">+0.1</span>
						</button>
					</div>
				</li>
				<li className={twJoin('flex')}>
					<div className={twJoin('flex flex-1 items-center justify-center text-center')}>
						<button
							onClick={() => G`G91\nG0 Z-0.1`}
							type="button"
							className={twMerge(
								'flex items-center justify-center space-x-2 whitespace-nowrap px-5 py-3 text-sm font-medium text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-100',
							)}
						>
							<ChevronDownIcon className="inline h-5 w-5 flex-shrink-0" aria-hidden="true" />
							<span className="inline">-0.1</span>
						</button>
					</div>
				</li>
				<li className={twJoin('flex')}>
					<div className={twJoin('flex flex-1 items-center justify-center text-center')}>
						<button
							onClick={() => G`G91\nG0 Z-0.5`}
							type="button"
							className={twMerge(
								'flex items-center justify-center space-x-2 whitespace-nowrap px-5 py-3 text-sm font-medium text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-100',
							)}
						>
							<ChevronDownIcon className="inline h-5 w-5 flex-shrink-0" aria-hidden="true" />
							<span className="inline">-0.5</span>
						</button>
					</div>
				</li>
				<li className={twJoin('flex')}>
					<div className={twJoin('flex flex-1 items-center justify-center text-center')}>
						<button
							onClick={() => G`G91\nG0 Z-1.0`}
							type="button"
							className={twMerge(
								'flex items-center justify-center space-x-2 whitespace-nowrap px-5 py-3 text-sm font-medium text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-100',
							)}
						>
							<ChevronDoubleDownIcon className="inline h-5 w-5 flex-shrink-0" aria-hidden="true" />
							<span className="inline">-1.0</span>
						</button>
					</div>
				</li>
			</ol>
		</div>
	);
};

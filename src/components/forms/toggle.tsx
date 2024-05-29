import { Switch } from '@headlessui/react';
import React from 'react';
import { twJoin, twMerge } from 'tailwind-merge';

interface ToggleProps {
	label: string;
	onLabel?: string;
	description?: string;
	value: boolean;
	onChange: (value: boolean) => void;
}

export const Toggle: React.FC<ToggleProps> = (props) => {
	return (
		<Switch.Group as="div" className="flex items-center justify-between gap-x-2">
			<span className="flex flex-grow flex-col">
				<Switch.Label
					as="span"
					className={twMerge(
						'text-sm font-medium leading-6 text-zinc-700 dark:text-zinc-300',
						props.onLabel && props.value && 'opacity-70',
						props.onLabel && !props.value && 'text-brand-700 dark:text-brand-500',
					)}
					passive
				>
					{props.label}
				</Switch.Label>
				{props.description && (
					<Switch.Description as="span" className="text-sm text-zinc-500 dark:text-zinc-400">
						{props.description}
					</Switch.Description>
				)}
			</span>
			<Switch
				checked={props.value}
				onChange={props.onChange}
				className={twJoin(
					props.value && props.onLabel == null ? 'bg-brand-600' : 'bg-zinc-200 dark:bg-zinc-950/50',
					'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-brand-400 focus:ring-offset-2 focus:ring-offset-zinc-900',
				)}
			>
				<span
					aria-hidden="true"
					className={twJoin(
						props.value ? 'translate-x-5' : 'translate-x-0',
						'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md shadow-black/20 ring-0 transition duration-200 ease-in-out dark:border-t dark:border-zinc-600 dark:bg-zinc-700 dark:shadow-black/100 ',
					)}
				/>
			</Switch>
			{props.onLabel && (
				<span className="flex flex-grow flex-col">
					<Switch.Label
						as="span"
						className={twMerge(
							'text-sm font-medium leading-6 text-zinc-700 dark:text-zinc-300',
							props.onLabel && !props.value && 'opacity-70',
							props.onLabel && props.value && 'text-brand-700 dark:text-brand-500',
						)}
						passive
					>
						{props.onLabel}
					</Switch.Label>
				</span>
			)}
		</Switch.Group>
	);
};

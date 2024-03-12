'use client';
import { PlayIcon, ForwardIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { Button } from './common/button';
import { Spinner } from './common/spinner';

export interface StepNavButton {
	label?: string;
	onClick?: () => void;
	disabled?: boolean;
	isLoading?: boolean;
	title?: string;
}

interface StepNavButtonsProps {
	right: StepNavButton;
	left: StepNavButton;
	skip?: Omit<StepNavButton, 'isLoading'>;
}

export const StepNavButtons: React.FC<StepNavButtonsProps> = (props) => {
	const leftIcon = props.left.isLoading ? (
		<Spinner noMargin={true} className="mr-3 dark:text-black" />
	) : (
		<PlayIcon className="mr-3 h-5 w-5 rotate-180" aria-hidden="true" />
	);
	const left = props.left.onClick ? (
		<div className="flex flex-1 justify-start">
			<Button
				intent="indeterminate"
				disabled={props.left.disabled}
				onClick={!props.left.isLoading ? props.left.onClick : undefined}
				title={props.left.title}
				className={props.left.isLoading ? 'cursor-wait' : 'cursor-pointer'}
			>
				{leftIcon}
				{props.left.label ?? 'Back'}
			</Button>
		</div>
	) : null;

	const rightIcon = props.right.isLoading ? (
		<Spinner noMargin={true} className="ml-3 dark:text-black" />
	) : (
		<PlayIcon className="ml-3 h-5 w-5" aria-hidden="true" />
	);

	const right = props.right.onClick ? (
		<div className="flex flex-1 justify-end space-x-4">
			{props.skip && (
				<Button
					intent="indeterminate"
					onClick={props.skip.onClick}
					disabled={props.skip.disabled}
					title={props.skip.title}
				>
					{props.skip.label ?? 'Skip'}
					<ForwardIcon className="ml-3 h-5 w-5" aria-hidden="true" />
				</Button>
			)}
			<Button
				intent="primary"
				disabled={props.right.disabled}
				onClick={!props.right.isLoading ? props.right.onClick : undefined}
				title={props.right.title}
				className={props.right.isLoading ? 'cursor-wait' : undefined}
			>
				{props.right.label ?? 'Next'}
				{rightIcon}
			</Button>
		</div>
	) : null;

	return (
		<div className="px-8 pb-5">
			<nav
				className="flex items-center justify-between border-t border-zinc-200 py-3 dark:border-zinc-700"
				aria-label="Pagination"
			>
				{left}
				{right}
			</nav>
		</div>
	);
};

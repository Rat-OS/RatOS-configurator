'use client';
import { PlayIcon, ForwardIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { Button } from './button';
import { Spinner } from './spinner';

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
		<Spinner />
	) : (
		<PlayIcon className="mr-3 h-5 w-5 rotate-180" aria-hidden="true" />
	);
	const left = props.left.onClick ? (
		<div className="flex flex-1 justify-start">
			<Button color="gray" disabled={props.left.disabled} onClick={props.left.onClick} title={props.left.title}>
				{leftIcon}
				{props.left.label ?? 'Back'}
			</Button>
		</div>
	) : null;

	const rightIcon = props.right.isLoading ? <Spinner /> : <PlayIcon className="ml-3 h-5 w-5" aria-hidden="true" />;

	const right = props.right.onClick ? (
		<div className="flex flex-1 justify-end space-x-4">
			{props.skip && (
				<Button color="gray" onClick={props.skip.onClick} disabled={props.skip.disabled} title={props.skip.title}>
					{props.skip.label ?? 'Skip'}
					<ForwardIcon className="ml-3 h-5 w-5" aria-hidden="true" />
				</Button>
			)}
			<Button color="brand" disabled={props.right.disabled} onClick={props.right.onClick} title={props.right.title}>
				{props.right.label ?? 'Next'}
				{rightIcon}
			</Button>
		</div>
	) : null;

	return (
		<div className="px-8 pb-5">
			<nav
				className="flex items-center justify-between border-t border-zinc-200 
		bg-white py-3 dark:border-zinc-700 dark:bg-zinc-800"
				aria-label="Pagination"
			>
				{left}
				{right}
			</nav>
		</div>
	);
};

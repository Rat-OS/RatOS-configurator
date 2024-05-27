'use client';
import { PlayIcon, ForwardIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { Button } from '@/components/common/button';
import { Spinner } from '@/components/common/spinner';
import { ChevronLeft, ChevronRight, ChevronsRight } from 'lucide-react';
import { twJoin } from 'tailwind-merge';

export interface StepNavButton {
	label?: string;
	onClick?: () => void;
	disabled?: boolean;
	isLoading?: boolean;
	title?: string;
}

interface StepNavButtonsProps {
	inTitle?: boolean;
	right: StepNavButton;
	left?: StepNavButton;
	skip?: Omit<StepNavButton, 'isLoading'>;
}

export const StepNavButtons: React.FC<StepNavButtonsProps> = (props) => {
	const leftIcon = props.left?.isLoading ? (
		<Spinner noMargin={true} className="dark:text-black" />
	) : (
		<ChevronLeft className="-ml-2 h-5 w-5" aria-hidden="true" />
	);
	const left = props.left?.onClick ? (
		<div className="flex flex-1 justify-start">
			<Button
				variant="indeterminate"
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
		<Spinner noMargin={true} className="dark:text-black" />
	) : (
		<ChevronRight className="-mr-2 h-5 w-5" aria-hidden="true" />
	);

	const right = props.right.onClick ? (
		<div className="flex flex-1 justify-end gap-4">
			{props.skip && (
				<Button
					variant="indeterminate"
					onClick={props.skip.onClick}
					disabled={props.skip.disabled}
					title={props.skip.title}
				>
					{props.skip.label ?? 'Skip'}
					<ChevronsRight className="-mr-1.5 h-5 w-5" aria-hidden="true" />
				</Button>
			)}
			<Button
				variant="primary"
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
		<div className={twJoin(props.inTitle ? '' : 'px-8 pb-5')}>
			<nav
				className={twJoin(
					'flex items-center justify-between border-zinc-200 py-3 dark:border-zinc-700',
					props.inTitle ? '' : ' border-t',
				)}
				aria-label="Pagination"
			>
				{left}
				{right}
			</nav>
		</div>
	);
};

import { ArrowNarrowLeftIcon, ArrowNarrowRightIcon } from '@heroicons/react/solid';
import React from 'react';
import { classNames } from '../helpers/classNames';
import { Button } from './button';
import { Spinner } from './spinner';

export interface StepNavButton {
	label?: string;
	onClick?: () => void;
	disabled?: boolean;
	isLoading?: boolean;
}

interface StepNavButtonsProps {
	right: StepNavButton;
	left: StepNavButton;
}

export const StepNavButtons: React.FC<StepNavButtonsProps> = (props) => {
	const leftIcon = props.left.isLoading ? (
		<Spinner />
	) : (
		<ArrowNarrowLeftIcon className='mr-3 h-5 w-5 text-black' aria-hidden='true' />
	);
	const left = props.left.onClick ? (
		<div className='flex-1 flex justify-start'>
			<Button color='gray' disabled={props.left.disabled} onClick={props.left.onClick}>
				{leftIcon}
				{props.left.label ?? 'Previous'}
			</Button>
		</div>
	) : null;

	const rightIcon = props.right.isLoading ? (
		<Spinner />
	) : (
		<ArrowNarrowRightIcon className='ml-3 h-5 w-5 text-black-400' aria-hidden='true' />
	);

	const right = props.right.onClick ? (
		<div className='flex-1 flex justify-end'>
			<Button color='brand' disabled={props.right.disabled} onClick={props.right.onClick}>
				{props.right.label ?? 'Next'}
				{rightIcon}
			</Button>
		</div>
	) : null;

	return (
		<div className='px-8 pb-5'>
			<nav
				className='bg-white py-3 flex items-center 
		justify-between border-t border-gray-200'
				aria-label='Pagination'
			>
				{left}
				{right}
			</nav>
		</div>
	);
};

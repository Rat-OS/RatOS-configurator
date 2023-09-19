'use client';
import Link from 'next/link';
import { twJoin, twMerge } from 'tailwind-merge';
import React from 'react';
import { VariantProps, cva } from 'class-variance-authority';

const buttonStyle = cva(
	'inline-flex items-center px-4 py-2 border text-sm font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2',
	{
		variants: {
			color: {
				danger:
					'text-white bg-red-500 hover:bg-red-600 border-transparent focus:ring-offset-2 focus:ring-red-600 dark:focus:ring-offset-zinc-900',
				warning:
					'text-yellow-900 bg-yellow-500 hover:bg-yellow-600 border-transparent focus:ring-offset-2 focus:ring-yellow-600 dark:focus:ring-offset-zinc-900',
				brand:
					'text-brand-900 bg-brand-500 hover:bg-brand-600 border-transparent focus:ring-offset-2 focus:ring-brand-600 dark:focus:ring-offset-zinc-900',
				gray: 'border-zinc-300 bg-zinc-100 hover:bg-zinc-200 text-black dark:text-zinc-300 dark:bg-zinc-900 dark:border-zinc-700 dark:hover:bg-zinc-800 dark:hover:border-zinc-600 focus:ring-offset-2 focus:ring-brand-600 dark:focus:ring-offset-zinc-900',
				plain:
					'border-transparent bg-transparent text-zinc-700 dark:text-zinc-300 hover:underline hover:text-zinc-800 dark:hover:text-zinc-200 focus:ring-offset-2 focus:ring-zinc-900 dark:focus:ring-offset-zinc-100',
			},
			disabled: {
				true: 'opacity-60 cursor-not-allowed',
			},
		},
		compoundVariants: [
			{
				color: 'brand',
				disabled: true,
				class: 'hover:bg-brand-500',
			},
			{
				color: 'danger',
				disabled: true,
				class: 'hover:bg-red-500',
			},
			{
				color: 'warning',
				disabled: true,
				class: 'hover:bg-yellow-500',
			},
			{
				color: 'gray',
				disabled: true,
				class: 'hover:bg-zinc-100 dark:hover:bg-zinc-900',
			},
		],
		defaultVariants: {
			color: 'brand',
			disabled: false,
		},
	},
);

interface ButtonProps extends React.PropsWithChildren<VariantProps<typeof buttonStyle>> {
	onClick?: () => void;
	className?: string;
	href?: string;
	title?: string;
}

export const Button: React.FC<ButtonProps> = (props) => {
	if (props.href) {
		return (
			<Link
				href={props.href}
				className={twMerge(buttonStyle({ color: props.color, disabled: props.disabled }), props.className)}
				onClick={props.onClick}
				title={props.title}
			>
				{props.children}
			</Link>
		);
	}
	return (
		<button
			className={twMerge(buttonStyle({ color: props.color, disabled: props.disabled }), props.className)}
			onClick={props.disabled ? undefined : props.onClick}
			title={props.title}
		>
			{props.children}
		</button>
	);
};

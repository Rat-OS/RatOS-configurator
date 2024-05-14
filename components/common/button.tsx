'use client';
import Link, { LinkProps } from 'next/link';
import { twJoin, twMerge } from 'tailwind-merge';
import React, { Fragment, forwardRef } from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Route } from 'next';

export const buttonVariants = cva(
	'inline-flex items-center justify-center border font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 capitalize relative active:translate-y-px active:scale-[99%] active:outline-none transition-all',
	{
		variants: {
			variant: {
				danger: twJoin(
					'text-red-50 bg-red-500/70 hover:bg-red-600 border-transparent focus:ring-offset-2 focus:ring-brand-400 dark:focus:ring-offset-zinc-900',

					'shadow-[0px_0px_0px_1px_rgba(9,9,11,0.07),0px_2px_2px_0px_rgba(9,9,11,0.05)] dark:shadow-[0px_0px_0px_1px_rgba(255,255,255,0.05)]',
					'dark:before:-inset-px dark:before:rounded-lg',
					'dark:before:pointer-events-none dark:before:absolute dark:before:shadow-[0px_2px_8px_0px_hsl(var(--red-900)),_0px_1px_0px_0px_hsl(var(--red-400)_/_50%)_inset]',
				),
				warning: twJoin(
					'text-yellow-50 bg-yellow-400/70 hover:bg-yellow-600 border-transparent focus:ring-offset-2 focus:ring-brand-400 dark:focus:ring-offset-zinc-900',
					'shadow-[0px_0px_0px_1px_rgba(9,9,11,0.07),0px_2px_2px_0px_rgba(9,9,11,0.05)] dark:shadow-[0px_0px_0px_1px_rgba(255,255,255,0.05)]',
					'dark:before:-inset-px dark:before:rounded-lg',
					'dark:before:pointer-events-none dark:before:absolute dark:before:shadow-[0px_2px_8px_0px_hsl(var(--yellow-900)),_0px_1px_0px_0px_hsl(var(--yellow-400)_/_50%)_inset]',
				),
				info: twJoin(
					'text-blue-50 bg-sky-400/70 hover:bg-sky-600 border-transparent focus:ring-offset-2 focus:ring-brand-400 dark:focus:ring-offset-zinc-900',
					'shadow-[0px_0px_0px_1px_rgba(9,9,11,0.07),0px_2px_2px_0px_rgba(9,9,11,0.05)] dark:shadow-[0px_0px_0px_1px_rgba(255,255,255,0.05)]',
					'dark:before:-inset-px dark:before:rounded-lg',
					'dark:before:pointer-events-none dark:before:absolute dark:before:shadow-[0px_2px_8px_0px_hsl(var(--sky-900)),_0px_1px_0px_0px_hsl(var(--sky-400)_/_50%)_inset]',
				),
				primary: twJoin(
					'text-white bg-brand-400/50 hover:bg-brand-700 border-transparent focus:ring-offset-2 focus:ring-brand-400 dark:focus:ring-offset-zinc-900',
					'shadow-[0px_0px_0px_1px_rgba(9,9,11,0.07),0px_2px_2px_0px_rgba(9,9,11,0.05)] dark:shadow-[0px_0px_0px_1px_rgba(255,255,255,0.05)]',
					'dark:before:-inset-px dark:before:rounded-lg',
					'dark:before:pointer-events-none dark:before:absolute dark:before:shadow-[0px_2px_8px_0px_hsl(var(--brand-900)),_0px_1px_0px_0px_hsl(var(--brand-400)_/_50%)_inset]',
				),
				success:
					'text-green-100 bg-green-500 hover:bg-green-600 border-transparent focus:ring-offset-2 focus:ring-brand-400 dark:focus:ring-offset-zinc-900',
				indeterminate: twJoin(
					'border-transparent bg-zinc-100 hover:bg-zinc-200 text-black dark:text-zinc-300 dark:bg-zinc-800 dark:transparent dark:hover:bg-zinc-700 dark:hover:text-zinc-100 dark:hover:transparent focus:ring-offset-2 focus:ring-brand-400 dark:focus:ring-offset-zinc-900',
					'shadow-[0px_0px_0px_1px_rgba(9,9,11,0.07),0px_2px_2px_0px_rgba(9,9,11,0.05)] dark:shadow-[0px_0px_0px_1px_rgba(255,255,255,0.05)]',
					'dark:before:-inset-px dark:before:rounded-lg',
					'dark:before:pointer-events-none dark:before:absolute dark:before:shadow-[0px_2px_8px_0px_hsl(var(--zinc-900)),_0px_1px_0px_0px_hsl(var(--zinc-400)_/_20%)_inset]',
				),
				outline:
					'border-zinc-700 shadow-none bg-transparent text-zinc-700 dark:text-zinc-300 hover:bg-zinc-500/30 hover:border-zinc-500/50 hover:text-zinc-800 dark:hover:text-zinc-200 focus:ring-offset-2 focus:ring-brand-400 dark:focus:ring-offset-zinc-900',
				plain:
					'border-transparent shadow-none bg-transparent text-zinc-700 dark:text-zinc-300 hover:underline hover:text-zinc-800 dark:hover:text-zinc-200 focus:ring-offset-2 focus:ring-brand-400 dark:focus:ring-offset-zinc-900',
			},
			disabled: {
				true: 'opacity-60 cursor-not-allowed',
			},
			size: {
				sm: 'px-2 py-1 text-xs gap-2',
				lg: 'px-6 py-3 text-lg gap-4',
				default: 'px-3 py-2 text-sm gap-2',
				icon: 'h-9 w-9',
				'icon-sm': 'h-6 w-6',
				'icon-xs': 'h-4 w-4',
			},
		},
		compoundVariants: [
			{
				variant: 'primary',
				disabled: true,
				class: 'hover:bg-brand-400/50',
			},
			{
				variant: 'danger',
				disabled: true,
				class: 'hover:bg-red-500/70',
			},
			{
				variant: 'warning',
				disabled: true,
				class: 'hover:bg-yellow-500',
			},
			{
				variant: 'indeterminate',
				disabled: true,
				class: 'hover:bg-zinc-100 dark:hover:bg-zinc-800',
			},
			{
				variant: 'info',
				disabled: true,
				class: 'hover:bg-sky-400/70',
			},
		],
		defaultVariants: {
			variant: 'primary',
			size: 'default',
			disabled: false,
		},
	},
);

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;
export type Intents = NonNullable<Required<ButtonVariantProps>['variant']>;

export interface ButtonProps<T extends string>
	extends React.PropsWithChildren<ButtonVariantProps & React.ButtonHTMLAttributes<HTMLButtonElement>> {
	onClick?: () => void;
	className?: string;
	target?: string;
	asChild?: boolean;
	href?: Route<T> | URL;
	title?: string;
	rel?: string;
	dropdownItems?: {
		onClick: () => void;
		title: string;
	}[];
}

export const Button = forwardRef(function Button<T extends string>(
	props: ButtonProps<T>,
	ref: React.ForwardedRef<HTMLButtonElement & HTMLAnchorElement>,
) {
	const {
		variant,
		disabled,
		size,
		href,
		target,
		onClick,
		title,
		rel,
		dropdownItems,
		className,
		children,
		...forwardProps
	} = props;
	const buttonClasses = twMerge(buttonVariants({ variant: variant, disabled: disabled, size: size }), className);
	if (href) {
		return (
			<Link<T>
				href={href}
				ref={ref}
				className={buttonClasses}
				target={target}
				onClick={onClick}
				title={title}
				rel={rel}
			>
				{children}
			</Link>
		);
	}
	if (dropdownItems && dropdownItems.length && onClick == null) {
		return (
			<Menu as="span" className="relative inline-block text-left">
				<Menu.Button className={buttonClasses} title={title} disabled={!!disabled}>
					{children}
					<ChevronDownIcon className="-mr-2 h-5 w-5" aria-hidden="true" />
				</Menu.Button>

				<Transition
					as={Fragment}
					enter="transition ease-out duration-100"
					enterFrom="transform opacity-0 scale-95"
					enterTo="transform opacity-100 scale-100"
					leave="transition ease-in duration-75"
					leaveFrom="transform opacity-100 scale-100"
					leaveTo="transform opacity-0 scale-95"
				>
					<Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-zinc-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:divide-zinc-800 dark:bg-zinc-900 dark:shadow-black dark:ring-zinc-800">
						{dropdownItems.map((item) => (
							<div className="py-1" key={item.title}>
								<Menu.Item>
									{({ active }) => (
										<span
											onClick={item.onClick}
											className={twJoin(
												active
													? 'bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100'
													: 'text-zinc-700 dark:text-zinc-300',
												'block cursor-pointer break-words px-4 py-2 text-sm',
											)}
										>
											{item.title}
										</span>
									)}
								</Menu.Item>
							</div>
						))}
					</Menu.Items>
				</Transition>
			</Menu>
		);
	}
	return (
		<button
			ref={ref}
			className={buttonClasses}
			onClick={disabled ? undefined : onClick}
			title={title}
			{...forwardProps}
		>
			{children}
		</button>
	);
});

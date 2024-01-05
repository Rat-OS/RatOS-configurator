'use client';
import Link from 'next/link';
import { twJoin, twMerge } from 'tailwind-merge';
import React, { Fragment } from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

const buttonStyle = cva(
	'inline-flex space-x-2 items-center px-4 py-2 border text-sm font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 capitalize',
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
	dropdownItems?: {
		onClick: () => void;
		title: string;
	}[];
}

export const Button: React.FC<ButtonProps> = (props) => {
	const buttonClasses = twMerge(buttonStyle({ color: props.color, disabled: props.disabled }), props.className);
	if (props.href) {
		return (
			<Link href={props.href} className={buttonClasses} onClick={props.onClick} title={props.title}>
				{props.children}
			</Link>
		);
	}
	if (props.dropdownItems && props.onClick == null) {
		return (
			<Menu as="span" className="relative inline-block text-left">
				<Menu.Button className={buttonClasses} title={props.title} disabled={!!props.disabled}>
					{props.children}
					<ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
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
						{props.dropdownItems.map((item) => (
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
		<button className={buttonClasses} onClick={props.disabled ? undefined : props.onClick} title={props.title}>
			{props.children}
		</button>
	);
};

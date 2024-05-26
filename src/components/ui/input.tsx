import * as React from 'react';

import { cn, setDisplayName } from '@/helpers/utils';
import { VariantProps, cva } from 'class-variance-authority';
import { twJoin } from 'tailwind-merge';

const InputVariants = cva(
	twJoin(
		'flex w-full rounded-md border bg-transparent px-3 py-1.5 text-sm shadow-sm transition-colors',
		'file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground',
		'border-zinc-300 text-zinc-900 placeholder-zinc-300 ring-brand-600 dark:border-zinc-100/20 dark:text-zinc-100 dark:placeholder-zinc-100/30 dark:focus:ring-brand-400 ',
		'focus:ring-offset-zinc-900 block w-full rounded-md border text-left shadow-sm ring-inset ring-offset-zinc-900 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2',
		'active:translate-y-px active:scale-[99%] active:outline-none active:ring-2 active:ring-offset-2',
		'disabled:cursor-not-allowed disabled:opacity-50',
	),
	{
		variants: {
			variant: {
				plain: 'shadow-none bg-transparent text-zinc-700 dark:text-zinc-300 dark:bg-transparent',
				default: 'dark:bg-zinc-800 bg-white',
				error:
					'border-red-300 text-red-900 placeholder-red-300 ring-red-500 dark:ring-red-500 dark:text-red-400 dark:placeholder-red-700',
			},
		},
		defaultVariants: {
			variant: 'plain',
		},
	},
);

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof InputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
	return <input type={type} className={cn(InputVariants(props), className)} ref={ref} {...props} />;
});
setDisplayName(Input, 'Input');

export { Input };

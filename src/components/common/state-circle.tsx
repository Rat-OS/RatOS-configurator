import { cva, VariantProps } from 'class-variance-authority';
import React from 'react';
import { twMerge } from 'tailwind-merge';
import type { Intents } from '@/components/common/button';

type IntentNoOutline = Exclude<Intents, 'outline'>;

type StateIntents = { [key in IntentNoOutline]: string };

export const StateCircleVariants = cva('flex-none rounded-full p-1 relative flex', {
	variants: {
		state: {
			success: 'dark:text-green-400 text-green-500 bg-green-400/20',
			info: 'dark:text-sky-400 text-sky-500 bg-sky-400/20',
			warning: 'dark:text-yellow-400 text-yellow-500 bg-yellow-400/20',
			danger: 'dark:text-rose-400 text-rose-500 bg-rose-400/20',
			indeterminate: 'dark:text-zinc-400 text-zinc-500 bg-zinc-500/20',
			plain: 'dark:text-zinc-400 text-zinc-500 bg-zinc-500/20',
			primary: 'dark:text-brand-400 text-brand-500 bg-brand-500/20',
		} satisfies StateIntents,
	},
});

export type StateCircleProps = VariantProps<typeof StateCircleVariants> & {
	ping?: boolean;
	title?: string;
	pingClassName?: string;
};

export const StateCircle: React.FC<StateCircleProps> = (props) => {
	return (
		<div className={StateCircleVariants(props)}>
			<div
				title={props.title}
				className={twMerge(
					'absolute inset-0 transition-all duration-700',
					props.ping ? 'opacity-100' : 'opacity-0',
					props.pingClassName ?? 'z-2',
				)}
			>
				<div
					className={twMerge('absolute inset-0 inline-flex animate-ping rounded-full bg-current opacity-0 ease-out')}
				/>
			</div>
			<div className="h-2 w-2 rounded-full bg-current" />
		</div>
	);
};

'use client';

import * as React from 'react';
import * as SwitchPrimitives from '@radix-ui/react-switch';

import { cn } from '@/helpers/utils';

const Switch = React.forwardRef<
	React.ElementRef<typeof SwitchPrimitives.Root>,
	React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
	<SwitchPrimitives.Root
		className={cn(
			'peer relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-all data-[state=checked]:bg-brand-400/80 data-[state=unchecked]:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50',
			'dark:before:pointer-events-none dark:before:absolute dark:before:-inset-[2px] dark:before:rounded-full dark:before:transition-all',
			'dark:before:shadow-[0px_-1px_0px_0px_hsl(var(--zinc-400)_/_15%)_inset,_inset_0px_1px_2px_0px_rgba(0,0,0,0.55)]',
			'data-[state=checked]:dark:before:shadow-[inset_0px_-1px_0px_0px_hsl(var(--brand-200)_/_50%),_inset_0px_1px_2px_0px_rgba(0,0,0,0.55)]',
			className,
		)}
		{...props}
		ref={ref}
	>
		<SwitchPrimitives.Thumb
			className={cn(
				'pointer-events-none block h-4 w-4 rounded-full bg-zinc-800 shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0',
				'shadow-[0px_0px_0px_1px_rgba(9,9,11,0.07),0px_2px_2px_0px_rgba(9,9,11,0.05)] dark:shadow-[0px_0px_0px_1px_rgba(255,255,255,0.03)]',
				'dark:before:inset-px dark:before:rounded-full',
				'dark:before:pointer-events-none dark:before:absolute dark:before:shadow-[0px_2px_8px_0px_hsl(var(--zinc-900)),_0px_1px_0px_0px_hsl(var(--zinc-400)_/_20%)_inset]',
			)}
		/>
	</SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };

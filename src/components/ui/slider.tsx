'use client';

import * as React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';

import { cn, setDisplayName } from '@/helpers/utils';

const Slider = React.forwardRef<
	React.ElementRef<typeof SliderPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
	<SliderPrimitive.Root
		ref={ref}
		className={cn('relative flex w-full touch-none select-none items-center', className)}
		{...props}
	>
		<SliderPrimitive.Track
			className={cn(
				'relative h-1.5 w-full grow rounded-full bg-zinc-400/10',
				'dark:before:pointer-events-none dark:before:absolute dark:before:-inset-[1px] dark:before:rounded-full dark:before:transition-all',
				'dark:before:shadow-[0px_-1px_0px_0px_hsl(var(--zinc-400)_/_15%)_inset,_inset_0px_1px_2px_0px_rgba(0,0,0,0.55)]',
			)}
		>
			<SliderPrimitive.Range
				className={cn(
					'absolute h-full rounded-full bg-brand-400/80',
					'dark:before:pointer-events-none dark:before:absolute dark:before:-inset-[1px] dark:before:rounded-full dark:before:transition-all',
					'dark:before:shadow-[inset_0px_-1px_0px_0px_hsl(var(--brand-200)_/_20%),_inset_0px_1px_2px_0px_rgba(0,0,0,0.55)]',
				)}
			/>
		</SliderPrimitive.Track>
		<SliderPrimitive.Thumb
			className={cn(
				'block h-4 w-4 rounded-full border border-zinc-700 bg-zinc-700 shadow transition-colors',
				'focus-visible:outline-none focus-visible:ring-0 disabled:pointer-events-none disabled:opacity-50',
				'shadow-[0px_0px_0px_1px_rgba(9,9,11,0.07),0px_2px_2px_0px_rgba(9,9,11,0.05)] dark:shadow-[0px_0px_0px_1px_rgba(255,255,255,0.03)]',
				'dark:before:inset-px dark:before:rounded-full',
				'dark:before:pointer-events-none dark:before:absolute dark:before:shadow-[0px_2px_8px_0px_hsl(var(--zinc-900)),_0px_1px_0px_0px_hsl(var(--zinc-400)_/_20%)_inset]',
			)}
		/>
	</SliderPrimitive.Root>
));
setDisplayName(Slider, SliderPrimitive.Root.displayName);

export { Slider };

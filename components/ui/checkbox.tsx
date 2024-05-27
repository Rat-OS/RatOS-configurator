'use client';

import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';

import { cn, setDisplayName } from '@/helpers/utils';

const Checkbox = React.forwardRef<
	React.ElementRef<typeof CheckboxPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
	<CheckboxPrimitive.Root
		ref={ref}
		className={cn(
			'peer flex size-4 shrink-0 items-center justify-center rounded-sm border border-secondary shadow data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
			className,
		)}
		{...props}
	>
		<CheckboxPrimitive.Indicator className={cn('flex size-4 flex-1 items-center justify-center text-current')}>
			<CheckIcon className="size-4" />
		</CheckboxPrimitive.Indicator>
	</CheckboxPrimitive.Root>
));
setDisplayName(Checkbox, CheckboxPrimitive.Root.displayName);

export { Checkbox };

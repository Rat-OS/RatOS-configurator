import { cn, setDisplayName } from '@/helpers/utils';
import React from 'react';

export const Strong = React.forwardRef<HTMLElement, JSX.IntrinsicElements['strong']>(({ className, ...props }, ref) => (
	<strong ref={ref} className={cn('font-semibold', className)} {...props} />
));
setDisplayName(Strong, 'Strong');

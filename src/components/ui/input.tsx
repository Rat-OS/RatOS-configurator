import * as React from 'react';

import { cn, setDisplayName } from '@/helpers/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
	return (
		<input
			type={type}
			className={cn(
				'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors',
				'file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground',
				'focus:border-brand-400/70 focus:outline-none focus:ring-1 focus:ring-transparent disabled:cursor-not-allowed disabled:opacity-50',
				className,
			)}
			ref={ref}
			{...props}
		/>
	);
});
setDisplayName(Input, 'Input');

export { Input };

import * as React from 'react';

import { cn, setDisplayName } from '@/helpers/utils';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => {
	return (
		<textarea
			className={cn(
				'flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground',
				'focus:border-brand-400/70 focus:outline-none focus:ring-1 focus:ring-transparent disabled:cursor-not-allowed disabled:opacity-50',
				className,
			)}
			ref={ref}
			{...props}
		/>
	);
});
setDisplayName(Textarea, 'Textarea');

export { Textarea };

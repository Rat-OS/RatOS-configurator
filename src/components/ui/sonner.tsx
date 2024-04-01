'use client';

import { Toaster as Sonner } from 'sonner';

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
	return (
		<Sonner
			theme="dark"
			className="toaster group"
			toastOptions={{
				classNames: {
					toast: 'group toast group-[.toaster]:border-border group-[.toaster]:shadow-lg',
					description: 'group-[.toast]:text-muted-foreground',
					actionButton: 'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
					cancelButton: 'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
					// error: 'group-[.toaster]:bg-red-400/10 group-[.toaster]:text-red-400',
					// success:
					// 	'group-[.toaster]:bg-brand-400/10 group-[.toaster]:text-brand-400 group-[.toaster]:border-brand-400/30',
					// warning: 'group-[.toaster]:bg-yellow-400/10 group-[.toaster]:text-yellow-400',
					// info: 'group-[.toaster]:bg-sky-400/10 group-[.toaster]:text-sky-400',
					// icon: 'items-start',
				},
			}}
			{...props}
		/>
	);
};

export { Toaster };

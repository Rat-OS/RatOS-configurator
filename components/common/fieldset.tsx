import { cva } from 'class-variance-authority';
import React from 'react';

const fieldsetVariants = cva([
	'relative rounded-lg p-4 bg-white dark:bg-zinc-900/60',
	'shadow-[0px_0px_0px_1px_rgba(9,9,11,0.07),0px_2px_2px_0px_rgba(9,9,11,0.05)] dark:shadow-[0px_0px_0px_1px_rgba(255,255,255,0.05)]',
	'dark:before:-inset-px dark:before:rounded-xl dark:before:-mt-2.5',
	'dark:before:pointer-events-none dark:before:absolute dark:before:shadow-[0px_2px_8px_0px_rgba(0,_0,_0,_0.20),_0px_1px_0px_0px_rgba(255,_255,_255,_0.09)_inset]',
]);

type FieldsetProps = React.FieldsetHTMLAttributes<HTMLFieldSetElement> &
	React.PropsWithChildren<{
		className?: string;
	}>;

export const Fieldset: React.FC<FieldsetProps> = (props) => {
	return (
		<fieldset {...props} className={fieldsetVariants({ className: props.className })}>
			{props.children}
		</fieldset>
	);
};

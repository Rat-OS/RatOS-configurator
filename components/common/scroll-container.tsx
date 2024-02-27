import { twMerge } from 'tailwind-merge';

export const scrollClasses =
	'scroll-smooth scrollbar-thin scrollbar-track-transparent scrollbar-thumb-zinc-400 scrollbar-thumb-rounded-md dark:scrollbar-thumb-zinc-600';
export const ScrollContainer = (props: JSX.IntrinsicElements['div']) => {
	return <div {...props} className={twMerge(scrollClasses, props.className)} />;
};

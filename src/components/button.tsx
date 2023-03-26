import Link from 'next/link';
import { classNames } from '../helpers/classNames';

interface ButtonProps {
	disabled?: boolean;
	onClick?: () => void;
	className?: string;
	color: 'brand' | 'gray';
	href?: string;
}

export const Button: React.FC<ButtonProps> = (props) => {
	const buttonClassName = classNames(
		props.className ? props.className : '',
		props.color === 'gray'
			? 'border-zinc-300 bg-zinc-100 hover:bg-zinc-200 text-black dark:text-zinc-300 dark:bg-zinc-900 dark:border-zinc-700 dark:hover:bg-zinc-800 dark:hover:border-zinc-600 focus:ring-offset-2 focus:ring-brand-600 dark:focus:ring-offset-slate-900'
			: '',
		props.color === 'brand'
			? 'text-brand-900 bg-brand-500 hover:bg-brand-600 border-transparent focus:ring-offset-2 focus:ring-brand-600 dark:focus:ring-offset-slate-900'
			: '',
		props.disabled ? 'opacity-60 cursor-not-allowed' : '',
		props.disabled && props.color === 'brand' ? 'hover:bg-brand-500' : '',
		props.disabled && props.color === 'gray' ? 'hover:bg-zinc-100 dark:hover:bg-zinc-900' : '',
		'inline-flex items-center px-4 py-2 border text-sm font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2',
	);

	if (props.href) {
		return (
			<Link href={props.href} className={buttonClassName} onClick={props.onClick}>
				{props.children}
			</Link>
		);
	}
	return (
		<button className={buttonClassName} onClick={props.disabled ? undefined : props.onClick}>
			{props.children}
		</button>
	);
};

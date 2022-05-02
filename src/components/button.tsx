import { classNames } from '../helpers/classNames';

interface ButtonProps {
	disabled?: boolean;
	onClick: () => void;
	color: 'brand' | 'gray';
}

export const Button: React.FC<ButtonProps> = (props) => {
	const buttonClassName = classNames(
		props.color === 'gray' ? 'border-zinc-300 bg-gray-100 hover:bg-gray-200 text-black' : '',
		props.color === 'brand' ? 'text-black bg-brand-500 hover:bg-brand-600 border-transparent' : '',
		props.disabled ? 'opacity-60 cursor-not-allowed' : '',
		'inline-flex items-center px-4 py-2 border text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-600',
	);

	return (
		<button className={buttonClassName} onClick={props.disabled ? undefined : props.onClick}>
			{props.children}
		</button>
	);
};

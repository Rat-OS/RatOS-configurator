import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { ExclamationCircleIcon } from '@heroicons/react/24/solid';
import React, { ChangeEvent, useCallback, useRef, useState } from 'react';
import { classNames } from '../../helpers/classNames';

interface TextInputProps {
	type: 'text' | 'password';
	error?: string;
	placeholder?: string;
	defaultValue?: string;
	label: string;
	help?: string;
	onChange?: (val: string) => void;
}

let uid = 0;

export const TextInput: React.FC<TextInputProps> = (props) => {
	const fieldId = useRef(uid++);
	const { onChange: _onChange } = props;
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);

	let iconClass = classNames('h-5 w-5', props.error ? 'text-red-500' : 'text-red-500');

	const icon = props.error ? (
		<div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
			<ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
		</div>
	) : null;

	const inputClass = classNames(
		props.error
			? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500'
			: 'border-gray-300 text-gray-900 placeholder-gray-300 focus:ring-brand-600 focus:border-brand-600',
		'block w-full pr-10 focus:outline-none sm:text-sm rounded-md shadow-sm',
	);

	const error = props.error ? (
		<p className="mt-2 text-sm text-red-600" id={fieldId.current + '-error'}>
			{props.error}
		</p>
	) : null;

	const help = props.help ? (
		<p className="mt-2 text-sm text-gray-500" id="email-description">
			{props.help}
		</p>
	) : null;

	const onChange = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			_onChange?.(e.currentTarget.value);
		},
		[_onChange],
	);

	const togglePasswordVisibility = useCallback(() => {
		setIsPasswordVisible((b) => !b);
	}, []);

	const iconRight = icon != null ? 'right-6' : 'right-0';
	const visibility =
		props.type === 'password' ? (
			<div
				onClick={togglePasswordVisibility}
				className={`absolute inset-y-0 ${iconRight} pr-3 flex items-center cursor-pointer`}
			>
				{isPasswordVisible ? (
					<EyeSlashIcon className="h-5 w-5 text-gray-400" />
				) : (
					<EyeIcon className="h-5 w-5 text-gray-400" />
				)}
			</div>
		) : null;

	return (
		<div>
			<label htmlFor="email" className="block text-sm font-medium text-gray-700">
				{props.label}
			</label>
			<div className="mt-1 relative rounded-md shadow-sm">
				<input
					type={isPasswordVisible ? 'text' : props.type}
					className={inputClass}
					placeholder={props.placeholder}
					defaultValue={props.defaultValue}
					onChange={onChange}
					aria-invalid={!!props.error}
					aria-describedby={props.error ? fieldId.current + '-error' : undefined}
				/>
				{icon}
				{visibility}
			</div>
			{error ?? help}
		</div>
	);
};

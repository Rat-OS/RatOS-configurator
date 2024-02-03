import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { ExclamationCircleIcon } from '@heroicons/react/24/solid';
import React, { ChangeEvent, useCallback, useRef, useState } from 'react';
import { twJoin } from 'tailwind-merge';

interface TextInputProps<T extends string | number>
	extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
	error?: string;
	label: string;
	help?: string;
	value?: T;
	onChange?: (val: T) => void;
}

let uid = 0;

export const TextInput = <T extends string | number>(props: TextInputProps<T>) => {
	const fieldId = useRef(uid++);
	const { onChange: _onChange } = props;
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);

	let iconClass = twJoin('h-5 w-5', props.error ? 'text-red-500' : 'text-red-500');

	const icon = props.error ? (
		<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
			<ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
		</div>
	) : null;

	const inputClass = twJoin(
		props.error
			? 'ring-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 dark:ring-red-500 dark:text-red-400 dark:placeholder-red-700'
			: 'ring-zinc-300 text-zinc-900 placeholder-zinc-300 focus:ring-brand-600 dark:ring-zinc-700 dark:text-zinc-100 dark:placeholder-zinc-700 dark:focus:ring-brand-400 ',
		'block w-full rounded-md bg-white py-1.5 pl-3 pr-3 text-leftshadow-sm ring-1 ring-inset focus:outline-none dark:bg-zinc-800 sm:text-sm sm:leading-6 border-0',
	);

	const error = props.error ? (
		<p className="mt-2 text-sm text-red-600 dark:text-red-400" id={fieldId.current + '-error'}>
			{props.error}
		</p>
	) : null;

	const help = props.help ? (
		<p className="mt-2 text-sm text-zinc-500" id="email-description">
			{props.help}
		</p>
	) : null;

	const onChange = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			_onChange?.(props.type === 'number' ? (parseFloat(e.currentTarget.value) as T) : (e.currentTarget.value as T));
		},
		[_onChange, props.type],
	);

	const togglePasswordVisibility = useCallback(() => {
		setIsPasswordVisible((b) => !b);
	}, []);

	const iconRight = icon != null ? 'right-6' : 'right-0';
	const visibility =
		props.type === 'password' ? (
			<div
				onClick={togglePasswordVisibility}
				className={`absolute inset-y-0 ${iconRight} flex cursor-pointer items-center pr-3`}
			>
				{isPasswordVisible ? (
					<EyeSlashIcon className="h-5 w-5 text-zinc-400" />
				) : (
					<EyeIcon className="h-5 w-5 text-zinc-400" />
				)}
			</div>
		) : null;

	return (
		<div>
			<label className="block text-sm font-semibold leading-6 text-zinc-700 dark:text-zinc-300">{props.label}</label>
			<div className="relative mt-1 rounded-md shadow-sm">
				<input
					{...props}
					type={isPasswordVisible ? 'text' : props.type}
					className={inputClass}
					placeholder={props.placeholder}
					defaultValue={props.defaultValue}
					value={props.value}
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

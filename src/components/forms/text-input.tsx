import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { ExclamationCircleIcon } from '@heroicons/react/24/solid';
import { Label } from '@radix-ui/react-label';
import objectHash from 'object-hash';
import React, { ChangeEvent, useCallback, useRef, useState } from 'react';
import { twJoin } from 'tailwind-merge';
import { Input } from '@/components/ui/input';

interface TextInputProps<T extends string | number>
	extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
	error?: string;
	label: string;
	description?: string;
	help?: string;
	value?: T;
	onChange?: (val: T) => void;
}

export const TextInput = <T extends string | number>(props: TextInputProps<T>) => {
	const fieldId = useRef(objectHash(props));
	const { onChange: _onChange } = props;
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);

	let iconClass = twJoin('h-5 w-5', props.error ? 'text-red-500' : 'text-red-500');

	const icon = props.error ? (
		<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
			<ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
		</div>
	) : null;

	const inputClass = twJoin(
		props.error &&
			'border-red-300 text-red-900 placeholder-red-300 ring-red-500 dark:ring-red-500 dark:text-red-400 dark:placeholder-red-700',
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
			<Label className="block text-sm font-semibold leading-6 text-zinc-700 dark:text-zinc-300">{props.label}</Label>
			{props.description && <p className="text-sm text-zinc-500 dark:text-zinc-400">{props.description}</p>}
			<div className="relative rounded-md shadow-sm">
				<Input
					{...props}
					type={isPasswordVisible ? 'text' : props.type}
					className={inputClass}
					placeholder={props.placeholder}
					defaultValue={props.defaultValue}
					value={props.value}
					onChange={onChange}
					variant={props.error ? 'error' : 'default'}
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

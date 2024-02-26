import { useState, useCallback } from 'react';
import { useDebounce } from '../../app/_hooks/debounce';

type SliderProps = {
	min: number;
	step?: number | 'any';
	max: number;
	isBoolean?: boolean;
	onChange?: (val: number) => void;
	initialValue?: number;
};
export const Slider: React.FC<SliderProps> = ({ onChange, min, max, initialValue, step, isBoolean }) => {
	const [value, setValue] = useState(initialValue ?? min);
	const _onChange = useDebounce(
		useCallback(
			(val: number) => {
				onChange?.(val);
			},
			[onChange],
		),
		100,
	);
	const onInput = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const val = step ? parseFloat(e.target.value) : parseInt(e.target.value, 10);
			setValue(val);
			_onChange(val);
		},
		[_onChange, step],
	);
	return (
		<div className="relative mb-6">
			<input
				type="range"
				value={value}
				onChange={onInput}
				min={min}
				max={max}
				step={step ?? 1}
				className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-zinc-200 dark:bg-zinc-700"
			/>
			<span className="absolute -bottom-6 start-0 text-sm text-zinc-500 dark:text-zinc-400">
				{isBoolean ? 'Off' : `Min (${min})`}
			</span>
			{!isBoolean && (
				<span className="absolute -bottom-6 start-1/3 -translate-x-1/2 text-sm text-zinc-500 dark:text-zinc-400 rtl:translate-x-1/2">
					{(max / 3).toFixed(2)}
				</span>
			)}
			{!isBoolean && (
				<span className="absolute -bottom-6 start-2/3 -translate-x-1/2 text-sm text-zinc-500 dark:text-zinc-400 rtl:translate-x-1/2">
					{((max / 3) * 2).toFixed(2)}
				</span>
			)}
			<span className="absolute -bottom-6 end-0 text-sm text-zinc-500 dark:text-zinc-400">
				{isBoolean ? 'On' : `Max (${max})`}
			</span>
		</div>
	);
};

import { twMerge } from 'tailwind-merge';

export const Spinner: React.FC<{ className?: string; noMargin?: boolean; strokeWidth?: number }> = (props) => {
	return (
		<svg
			className={twMerge(
				'h-5 w-5 animate-spin text-black/50 dark:text-white/50',
				!props.noMargin ? '-ml-1 mr-3' : '',
				props.className,
			)}
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
		>
			<circle
				className="opacity-20"
				cx="12"
				cy="12"
				r="10"
				stroke="currentColor"
				strokeWidth={props.strokeWidth ?? 4}
			></circle>
			<circle
				className="opacity-100"
				cx="12"
				cy="12"
				r="10"
				strokeDasharray={(Math.PI * 10) / 3}
				strokeLinecap="round"
				stroke="currentColor"
				strokeWidth={props.strokeWidth ?? 4}
			></circle>
		</svg>
	);
};

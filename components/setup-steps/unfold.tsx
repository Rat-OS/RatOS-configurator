import { CaretDownIcon, CaretUpIcon } from '@radix-ui/react-icons';
import { ArrowDownFromLine, ArrowUpFromLine, PlusCircle, UnfoldVertical } from 'lucide-react';
import { createElement, useCallback } from 'react';
import { Decoration, DecorationProps } from 'react-diff-view';
import { twJoin } from 'tailwind-merge';

const ICON_TYPE_MAPPING = {
	up: (props: { className?: string }) => {
		return (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				className={twJoin('lucide lucide-arrow-up-from-line', props.className)}
			>
				<path d="m18 9-6-6-6 6" />
				<path d="M12 3v14" />
				<path d="M5 21h14" strokeDasharray="2,4" />
			</svg>
		);
	},
	down: (props: { className?: string }) => {
		return (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				className={twJoin('lucide lucide-arrow-up-from-line rotate-180', props.className)}
			>
				<path d="m18 9-6-6-6 6" />
				<path d="M12 3v14" />
				<path d="M5 21h14" strokeDasharray="2,4" />
			</svg>
		);
	},
	none: UnfoldVertical,
};

interface Props extends Omit<DecorationProps, 'children'> {
	start: number;
	end: number;
	collapsedLines: number | null;
	floatUp?: boolean;
	direction: 'up' | 'down' | 'none';
	onExpand: (start: number, end: number) => void;
}

export default function Unfold({ start, end, direction, onExpand, collapsedLines, floatUp, ...props }: Props) {
	const expand = useCallback(() => onExpand(start, end), [onExpand, start, end]);

	const IconType = ICON_TYPE_MAPPING[direction];
	const lines = end - start;

	return (
		<Decoration {...props}>
			<div
				className="flex cursor-pointer items-center justify-center gap-1 bg-sky-400/20 p-3 font-sans text-base font-medium text-slate-400 hover:bg-sky-400/50 hover:text-foreground"
				onClick={expand}
				title={`Expand${direction === 'none' ? '' : ' ' + direction}`}
			>
				<IconType className="size-4" />
			</div>
			<div className="flex h-full w-full items-center justify-center bg-sky-400/5 p-3 text-[1rem] font-normal leading-4 text-slate-600">
				{collapsedLines == null ? (
					<span className="inline-block h-4" />
				) : (
					<span className={floatUp ? 'relative -top-1 -translate-y-full' : undefined}>
						{'<--'} {collapsedLines} collapsed line{collapsedLines === 1 ? '' : 's'} {'-->'}
					</span>
				)}
			</div>
		</Decoration>
	);
}

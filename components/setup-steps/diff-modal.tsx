'use client';
/* This example requires Tailwind CSS v2.0+ */
import React, { Fragment, ReactElement, useCallback, useMemo, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import {
	parseDiff,
	Diff,
	DiffType,
	ViewType,
	HunkData,
	TokenizeOptions,
	tokenize,
	useTokenizeWorker,
	markEdits,
	Decoration,
	withSourceExpansion,
	Hunk,
	useSourceExpansion,
	useMinCollapsedLines,
	GutterOptions,
	computeOldLineNumber,
	computeNewLineNumber,
} from 'react-diff-view';
import type { FileState } from '@/server/routers/printer';
import 'react-diff-view/style/index.css';
import { XMarkIcon } from '@heroicons/react/20/solid';
import { Button, ButtonProps } from '@/components/common/button';
import { twJoin, twMerge } from 'tailwind-merge';
import { Modal } from '@/components/common/modal';
import { Minus, Plus, X } from 'lucide-react';
import UnfoldCollapsed from '@/components/setup-steps/unfold-collapsed';
import { InfoMessage } from '@/components/common/info-message';

interface DiffModalProps {
	fileName: string;
	diff: string;
	state: FileState;
	source?: string | null;
	changedOnDisk?: boolean;
	isOpen: boolean;
	buttons?: ReactElement<ButtonProps<string>>[];
	setIsOpen: (open: boolean) => void;
}

const Tokenizer = new Worker(new URL('@/app/_worker/tokenizer', import.meta.url));

const TwoColumns = (props: { className?: string }) => {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			strokeWidth="1.5"
			stroke="currentColor"
			xmlns="http://www.w3.org/2000/svg"
			className={twMerge('h-6 w-6', props.className)}
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M 12 4.5 L 12 19.5 M 4.125 19.5 L 19.875 19.5 C 20.496 19.5 21 18.996 21 18.375 L 21 5.625 C 21 5.004 20.496 4.5 19.875 4.5 L 4.125 4.5 C 3.504 4.5 3 5.004 3 5.625 L 3 18.375 C 3 18.996 3.504 19.5 4.125 19.5 Z"
			/>
		</svg>
	);
};
const SingleColumn = (props: { className?: string }) => {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			strokeWidth="1.5"
			stroke="currentColor"
			xmlns="http://www.w3.org/2000/svg"
			className={twMerge('h-6 w-6', props.className)}
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M 4.125 19.5 L 19.875 19.5 C 20.496 19.5 21 18.996 21 18.375 L 21 5.625 C 21 5.004 20.496 4.5 19.875 4.5 L 4.125 4.5 C 3.504 4.5 3 5.004 3 5.625 L 3 18.375 C 3 18.996 3.504 19.5 4.125 19.5 Z"
			/>
		</svg>
	);
};

const proccessTokens = (hunks: HunkData[]) => {
	if (!hunks) {
		return undefined;
	}

	const options: TokenizeOptions = {
		highlight: false,
		enhancers: [markEdits(hunks, { type: 'block' })],
	};

	try {
		return tokenize(hunks, options);
	} catch (ex) {
		return undefined;
	}
};

function useEnhancers(hunks: HunkData[], oldSource: string | null) {
	const [hunksWithSourceExpanded, expandRange] = useSourceExpansion(hunks, oldSource);
	const hunksWithMinLinesCollapsed = useMinCollapsedLines(0, hunksWithSourceExpanded, oldSource);
	const options = {
		oldSource,
		language: 'properties',
		hunks: hunksWithMinLinesCollapsed,
	};
	const { tokens } = useTokenizeWorker(Tokenizer, options);
	return {
		expandRange,
		tokens,
		hunks: hunksWithMinLinesCollapsed,
	};
}

export const DiffModal: React.FC<DiffModalProps> = (props) => {
	const { isOpen, setIsOpen } = props;
	const [viewType, setViewType] = useState<ViewType>('unified');

	const close = useCallback(() => {
		setIsOpen(false);
	}, [setIsOpen]);

	const file = useMemo(() => {
		return parseDiff(props.diff)[0];
	}, [props.diff]);
	const linesCount = props.source ? props.source.split('\n').length : 0;

	const { tokens, expandRange, hunks } = useEnhancers(file.hunks, props.source ?? '');

	const renderGutter = useCallback(({ change, side }: GutterOptions) => {
		const lineNumber = side === 'old' ? computeOldLineNumber(change) : computeNewLineNumber(change);
		const changeIcon =
			change.type === 'delete' && side === 'old' ? (
				<Minus className="h-4 w-4" />
			) : change.type === 'insert' && side === 'new' ? (
				<Plus className="h-4 w-4" />
			) : (
				''
			);
		return (
			<div className="flex flex-1 items-center gap-1 text-left">
				<span className="flex-1">{lineNumber === -1 ? null : lineNumber}</span>
				{changeIcon}
			</div>
		);
	}, []);

	const renderHunk = (children: ReactElement[], hunk: HunkData, i: number, hunks: HunkData[]) => {
		const previousElement = children[children.length - 1];
		const decorationElement = props.source ? (
			<UnfoldCollapsed
				key={`decoration-${hunk.content}`}
				previousHunk={previousElement && previousElement.props.hunk}
				currentHunk={hunk}
				linesCount={linesCount}
				onExpand={expandRange}
			/>
		) : (
			<></>
		);
		children.push(decorationElement);

		const hunkElement = <Hunk key={`hunk-${hunk.content}`} hunk={hunk} />;
		children.push(hunkElement);

		if (i === hunks.length - 1 && props.source) {
			const unfoldTailElement = (
				<UnfoldCollapsed key="decoration-tail" previousHunk={hunk} linesCount={linesCount} onExpand={expandRange} />
			);
			children.push(unfoldTailElement);
		}

		return children;
	};

	const diffType: DiffType = props.state === 'changed' ? 'modify' : props.state === 'created' ? 'add' : 'delete';
	return (
		isOpen && (
			<Modal
				title={`Changes to ${props.fileName}`}
				onClosed={close}
				noClose={true}
				wide="screen"
				buttons={props.buttons}
				body={`RatOS wants to make the following changes to ${props.fileName}. Do you want to accept these changes?`}
				dismissText="Close"
				titleActions={
					<div className="relative flex flex-nowrap items-center gap-2 text-muted-foreground">
						<button
							className={twJoin(
								viewType === 'unified'
									? 'cursor-default text-sky-600 dark:text-sky-400'
									: 'hover:text-zinc-800 dark:hover:text-zinc-100',
							)}
							onClick={() => setViewType('unified')}
							title="Unified View"
						>
							<SingleColumn className="h-6 w-6" />
						</button>
						<button
							className={twJoin(
								viewType === 'split'
									? 'cursor-default text-sky-600 dark:text-sky-400'
									: 'hover:text-zinc-800 dark:hover:text-zinc-100',
							)}
							onClick={() => setViewType('split')}
							title="Split View"
						>
							<TwoColumns className="h-6 w-6" />
						</button>
						<div className="!ml-2 !mr-1 h-6 border-l border-l-zinc-200 dark:border-l-zinc-800"></div>
						<button className="hover:text-zinc-800 dark:hover:text-zinc-100" onClick={close}>
							<X className="h-6 w-6" />
						</button>
					</div>
				}
				content={
					<>
						<div className="git-diff flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-400 scrollbar-thumb-rounded-md dark:scrollbar-thumb-zinc-600">
							{props.fileName === 'printer.cfg' && props.changedOnDisk && (
								<InfoMessage title="You might not need these changes" className="mb-4">
									RatOS currently does not have the ability to port your customizations to generated code, and
									printer.cfg is usually only regenerated when printer limit defaults have changed or you swap hardware
									type. If you haven't changed hardware types, you can most likely ignore these changes.
								</InfoMessage>
							)}
							<Diff hunks={hunks} viewType={viewType} diffType={diffType} tokens={tokens} renderGutter={renderGutter}>
								{(hunks) => hunks.reduce(renderHunk, [])}
							</Diff>
						</div>
					</>
				}
			></Modal>
		)
	);
};

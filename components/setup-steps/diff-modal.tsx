'use client';
/* This example requires Tailwind CSS v2.0+ */
import React, { Fragment, useCallback, useMemo, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { parseDiff, Diff, DiffType, ViewType, HunkData, TokenizeOptions, tokenize, markEdits } from 'react-diff-view';
import type { FileState } from '@/server/routers/printer';
import 'react-diff-view/style/index.css';
import { XMarkIcon } from '@heroicons/react/20/solid';
import { Button } from '@/components/common/button';
import { twJoin, twMerge } from 'tailwind-merge';

interface ModalProps {
	title: string;
	diff: string;
	state: FileState;
	isOpen: boolean;
	buttons?: React.ReactNode;
	overwrite?: () => void;
	ignore?: () => void;
	setIsOpen: (open: boolean) => void;
}

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

export const DiffModal: React.FC<ModalProps> = (props) => {
	const { isOpen, setIsOpen } = props;
	const [viewType, setViewType] = useState<ViewType>('unified');

	const close = useCallback(() => {
		setIsOpen(false);
	}, [setIsOpen]);

	const files = useMemo(() => {
		return parseDiff(props.diff);
	}, [props.diff]);
	const diffType: DiffType = props.state === 'changed' ? 'modify' : props.state === 'created' ? 'add' : 'delete';

	return (
		<Transition.Root show={isOpen} as={Fragment} appear={true}>
			<Dialog
				as="div"
				className="git-diff fixed inset-0 z-50 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-400 scrollbar-thumb-rounded-md dark:scrollbar-thumb-zinc-600"
				onClose={close}
			>
				<div className="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<Dialog.Overlay className="fixed inset-0 bg-zinc-500 bg-opacity-75 transition-opacity dark:bg-zinc-950 dark:bg-opacity-75" />
					</Transition.Child>

					{/* This element is to trick the browser into centering the modal contents. */}
					<span className="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">
						&#8203;
					</span>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						enterTo="opacity-100 translate-y-0 sm:scale-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100 translate-y-0 sm:scale-100"
						leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
					>
						<div className="relative inline-flex max-h-[80vh] max-w-screen-2xl transform flex-col overflow-hidden rounded-lg bg-white py-4 text-left align-bottom shadow-xl transition-all dark:bg-zinc-800 sm:my-8 sm:w-full sm:py-6 sm:align-middle">
							<Dialog.Title
								as="h3"
								className="flex items-center justify-between border-b border-zinc-200 px-4 pb-4 text-lg font-semibold leading-6 text-zinc-900 dark:border-zinc-700 dark:text-zinc-100 sm:px-6"
							>
								<div>{props.title}</div>
								<div className="relative flex flex-nowrap items-center space-x-2 text-zinc-500 dark:text-zinc-400">
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
									<div className="!ml-4 !mr-1 h-6 border-l border-l-zinc-200 dark:border-l-zinc-800"></div>
									<button className="hover:text-zinc-800 dark:hover:text-zinc-100" onClick={close}>
										<XMarkIcon className="h-6 w-6" />
									</button>
								</div>
							</Dialog.Title>
							<div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-400 scrollbar-thumb-rounded-md dark:scrollbar-thumb-zinc-600">
								{files.map(({ hunks }, i) => (
									<Diff key={i} hunks={hunks} viewType={viewType} diffType={diffType} tokens={proccessTokens(hunks)} />
								))}
							</div>
							<div className="flex-end flex flex-row items-center justify-end space-x-2 border-t border-zinc-200 px-4 pt-4 dark:border-zinc-700 sm:px-6 sm:pt-6">
								{props.buttons ?? null}
								<Button variant="plain" onClick={close}>
									Close
								</Button>
							</div>
						</div>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition.Root>
	);
};

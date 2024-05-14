'use client';
/* This example requires Tailwind CSS v2.0+ */
import React, { Fragment, useCallback, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/24/outline';

interface ModalProps {
	title: string;
	body: string;
	success?: boolean;
	buttonLabel: string;
	onClick?: () => void;
	onClose?: () => void;
}

export const Modal: React.FC<ModalProps> = (props) => {
	const { onClick, onClose } = props;
	const [open, setOpen] = useState(true);
	const onButtonClick = useCallback(() => {
		onClick?.();
		setOpen(false);
	}, [onClick]);

	const onDialogClose = useCallback(() => {
		onClose?.();
		setOpen(false);
	}, [onClose]);

	const success = props.success ? (
		<div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full  bg-green-100 dark:bg-green-700">
			<CheckIcon className="h-6 w-6 text-green-600 dark:text-green-100" aria-hidden="true" />
		</div>
	) : null;

	return (
		<Transition.Root show={open} as={Fragment} appear={true}>
			<Dialog
				as="div"
				className="fixed inset-0 z-50 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-400 scrollbar-thumb-rounded-md dark:scrollbar-thumb-zinc-600"
				onClose={onDialogClose}
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
						<Dialog.Overlay className="fixed inset-0 bg-zinc-500 bg-opacity-75 transition-opacity dark:bg-zinc-800 dark:bg-opacity-75" />
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
						<div className="relative inline-block transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left align-bottom shadow-xl transition-all dark:bg-zinc-900 sm:my-8 sm:w-full sm:max-w-sm sm:p-6 sm:align-middle">
							<div>
								{success}
								<div className="mt-3 text-center sm:mt-5">
									<Dialog.Title as="h3" className="text-lg font-medium leading-6 text-zinc-900 dark:text-zinc-100">
										{props.title}
									</Dialog.Title>
									<div className="mt-2">
										<p className="text-sm text-zinc-500 dark:text-zinc-400">{props.body}</p>
									</div>
								</div>
							</div>
							<div className="mt-5 sm:mt-6">
								<button
									type="button"
									className="inline-flex w-full justify-center rounded-md border border-transparent bg-brand-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 sm:text-sm"
									onClick={onButtonClick}
								>
									{props.buttonLabel}
								</button>
							</div>
						</div>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition.Root>
	);
};

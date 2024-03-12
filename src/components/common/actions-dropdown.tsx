'use client';
import { Fragment, useCallback, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { trpc } from '../../helpers/trpc';
import { MutationModal } from './mutation-modal';
import { useRecoilCallback } from 'recoil';
import { PrinterToolheadState } from '../../recoil/toolhead';
import { twJoin, twMerge } from 'tailwind-merge';

export const ActionsDropdown = ({ className }: { className?: string }) => {
	const [isSymlinkModalOpen, setIsSymlinkModalOpen] = useState(false);
	const [isFlashModalOpen, setIsFlashModalOpen] = useState(false);
	const [flashModalContent, setFlashModalContent] = useState({
		title: '',
		children: null as React.ReactNode,
		dismissText: 'OK',
	});
	const [symlinkModalContent, setSymlinkModalContent] = useState({
		title: '',
		children: null as React.ReactNode,
		dismissText: 'OK',
	});

	const symlinkExtensions = trpc['klippy-extensions'].symlink.useMutation();
	const flashFirmware = trpc.mcu.flashAllConnected.useMutation();

	const symlinkModal = isSymlinkModalOpen ? (
		<MutationModal
			{...symlinkModalContent}
			setOpen={setIsSymlinkModalOpen}
			open={isSymlinkModalOpen}
			isFailed={symlinkExtensions.isError}
			isLoading={symlinkExtensions.isLoading}
		/>
	) : null;
	const flashModal = isFlashModalOpen ? (
		<MutationModal
			{...flashModalContent}
			setOpen={setIsFlashModalOpen}
			open={isFlashModalOpen}
			isFailed={flashFirmware.isError}
			isLoading={flashFirmware.isLoading}
		/>
	) : null;

	const onClickFlash = useCallback(() => {
		setFlashModalContent({
			title: 'Flash Firmware',
			children: <p>Please wait while RatOS is flashing your connected boards...</p>,
			dismissText: 'Please wait...',
		});
		setIsFlashModalOpen(true);
		flashFirmware.mutateAsync().then(
			(value) => {
				setFlashModalContent({
					title: 'Flashing Complete',
					children: <p dangerouslySetInnerHTML={{ __html: value.report.replace(/\n/g, '<br />') }} />,
					dismissText: 'OK',
				});
			},
			(value) => {
				setFlashModalContent({
					title: 'Flashing Failed',
					children:
						typeof value === 'string' || value instanceof String ? (
							<p dangerouslySetInnerHTML={{ __html: value.replace(/\n/g, '<br />') }} />
						) : (
							<p>Something wen't wrong while flashing the connected boards, please try again.</p>
						),
					dismissText: 'OK',
				});
			},
		);
	}, [flashFirmware]);

	const onClickSymlink = useCallback(() => {
		setSymlinkModalContent({
			title: 'Symlink Extensions',
			children: <p>Please wait while RatOS is symlinking klippy extensions...</p>,
			dismissText: 'Please wait...',
		});
		setIsSymlinkModalOpen(true);
		symlinkExtensions.mutateAsync({}).then(
			(value) => {
				setSymlinkModalContent({
					title: 'Symlink Complete',
					children: <p dangerouslySetInnerHTML={{ __html: value.report.replace(/\n/g, '<br />') }} />,
					dismissText: 'OK',
				});
			},
			(value) => {
				setSymlinkModalContent({
					title: 'Symlink Failed',
					children:
						typeof value === 'string' || value instanceof String ? (
							<p dangerouslySetInnerHTML={{ __html: value.replace(/\n/g, '<br />') }} />
						) : (
							<p>Something wen't wrong while symlinking the extensions, please try again.</p>
						),
					dismissText: 'OK',
				});
			},
		);
	}, [symlinkExtensions]);

	const onClickTest = useRecoilCallback(({ set }) => () => {
		set(PrinterToolheadState(0), null);
	});

	return (
		<>
			<Menu as="div" className={twMerge('relative inline-block text-left', className)}>
				<div>
					<Menu.Button
						className={twJoin(
							'inline-flex w-full items-center justify-between rounded-md',
							'px-4 py-2 text-sm font-medium',
							'relative  bg-white dark:bg-zinc-900/60',
							'shadow-[0px_0px_0px_1px_rgba(9,9,11,0.07),0px_2px_2px_0px_rgba(9,9,11,0.05)] dark:shadow-[0px_0px_0px_1px_rgba(255,255,255,0.05)]',
							'dark:before:-inset-px dark:before:rounded-xl',
							'dark:before:pointer-events-none dark:before:absolute dark:before:shadow-[0px_2px_8px_0px_rgba(0,_0,_0,_0.20),_0px_1px_0px_0px_rgba(255,_255,_255,_0.07)_inset]',
							'shadow-sm hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:ring-offset-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:border-zinc-600 dark:hover:bg-zinc-800 dark:focus:ring-offset-zinc-600',
						)}
					>
						<span>Actions</span>
						<ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
					</Menu.Button>
				</div>

				<Transition
					as={Fragment}
					enter="transition ease-out duration-100"
					enterFrom="transform opacity-0 scale-95"
					enterTo="transform opacity-100 scale-100"
					leave="transition ease-in duration-75"
					leaveFrom="transform opacity-100 scale-100"
					leaveTo="transform opacity-0 scale-95"
				>
					<Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-zinc-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:divide-zinc-800 dark:bg-zinc-900 dark:ring-zinc-800">
						<div className="py-1">
							<Menu.Item>
								{({ active }) => (
									<span
										onClick={onClickSymlink}
										className={twJoin(
											active
												? 'bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100'
												: 'text-zinc-700 dark:text-zinc-300',
											'block cursor-pointer px-4 py-2 text-sm',
										)}
									>
										Symlink klippy extensions
									</span>
								)}
							</Menu.Item>
						</div>
						<div className="py-1">
							<Menu.Item>
								{({ active }) => (
									<span
										onClick={onClickFlash}
										className={twJoin(
											active
												? 'bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100'
												: 'text-zinc-700 dark:text-zinc-300',
											'block cursor-pointer px-4 py-2 text-sm',
										)}
									>
										Flash all connected MCU's
									</span>
								)}
							</Menu.Item>
						</div>
						{/* <div className="py-1">
							<Menu.Item>
								{({ active }) => (
									<span
										onClick={onClickTest}
										className={twJoin(
											active
												? 'bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100'
												: 'text-zinc-700 dark:text-zinc-300',
											'block cursor-pointer px-4 py-2 text-sm',
										)}
									>
										Test toolhead state
									</span>
								)}
							</Menu.Item>
						</div> */}
					</Menu.Items>
				</Transition>
			</Menu>
			{symlinkModal}
			{flashModal}
		</>
	);
};

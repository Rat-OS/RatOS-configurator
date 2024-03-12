'use client';

import { useState, Fragment } from 'react';
import {
	Bars3Icon,
	XMarkIcon,
	// MoonIcon,
	// SunIcon,
	// ArrowLeftOnRectangleIcon,
	// LinkIcon,
} from '@heroicons/react/24/outline';
import { Dialog, Transition } from '@headlessui/react';
import { twJoin, twMerge } from 'tailwind-merge';
import logoWhite from '../public/logo-white.svg';
import Image from 'next/image';
import { trpc } from '../utils/trpc';
import { RecoilRoot } from 'recoil';
import { SyncWithMoonraker } from '../components/sync-with-moonraker';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { HeroPattern } from '../components/common/patterns';
import { SidebarNav } from './sidebar-nav';
import { motion } from 'framer-motion';

const getCurrentTheme = () => {
	if (typeof window !== 'undefined') {
		if (window.localStorage.theme === 'light') {
			return 'light' as const;
		}
	}
	return 'dark' as const;
};
// Create a client
const queryClient = new QueryClient();

function Template({ children }: { children: React.ReactNode }) {
	// const [theme, setTheme] = useState<'dark' | 'light' | null>(null);
	const [sidebarOpen, setSidebarOpen] = useState(false);

	// const onThemeChange = () => {
	// 	if (getCurrentTheme() === 'dark') {
	// 		document.documentElement.classList.add('dark', 'scrollbar-thumb-zinc-600');
	// 	} else {
	// 		document.documentElement.classList.remove('dark', 'scrollbar-thumb-zinc-400');
	// 	}
	// };

	// useEffect(() => {
	// 	setTheme(getCurrentTheme());
	// }, []);

	// useEffect(() => {
	// 	onThemeChange();
	// }, [theme]);

	// const setDarkMode = () => {
	// 	window.localStorage.theme = 'dark';
	// 	setTheme('dark');
	// };

	// const setLightMode = () => {
	// 	window.localStorage.theme = 'light';
	// 	setTheme('light');
	// };

	// const setOSDefault = () => {
	// 	window.localStorage.removeItem('theme');
	// };

	return (
		<QueryClientProvider client={queryClient}>
			<RecoilRoot>
				<SyncWithMoonraker>
					<div className="relative flex min-h-full">
						<div className="ml-0 min-h-full flex-1 pt-14 transition-all lg:ml-72">
							<HeroPattern />
							{children}
						</div>
						<Transition.Root show={sidebarOpen} as={Fragment}>
							<Dialog as="div" className="relative z-40 lg:hidden" onClose={setSidebarOpen}>
								<Transition.Child
									as={Fragment}
									enter="transition-opacity ease-linear duration-300"
									enterFrom="opacity-0"
									enterTo="opacity-100"
									leave="transition-opacity ease-linear duration-300"
									leaveFrom="opacity-100"
									leaveTo="opacity-0"
								>
									<div className="fixed inset-0 bg-zinc-900/80" />
								</Transition.Child>

								<div className="fixed inset-0 flex">
									<Transition.Child
										as={Fragment}
										enter="transition ease-in-out duration-300 transform"
										enterFrom="-translate-x-full"
										enterTo="translate-x-0"
										leave="transition ease-in-out duration-300 transform"
										leaveFrom="translate-x-0"
										leaveTo="-translate-x-full"
									>
										<Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
											<Transition.Child
												as={Fragment}
												enter="ease-in-out duration-300"
												enterFrom="opacity-0"
												enterTo="opacity-100"
												leave="ease-in-out duration-300"
												leaveFrom="opacity-100"
												leaveTo="opacity-0"
											>
												<div className="absolute left-full top-0 flex w-16 justify-center pt-5">
													<button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
														<span className="sr-only">Close sidebar</span>
														<XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
													</button>
												</div>
											</Transition.Child>
											{/* mobile Sidebar */}
											<div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-zinc-900 bg-zinc-900 px-6 pb-4 dark:border-white/10">
												<div className="flex h-16 shrink-0 items-center">
													<Image width={160} height={40} className="h-8 w-auto" src={logoWhite} alt="Workflow" />
												</div>
												<SidebarNav />
											</div>
										</Dialog.Panel>
									</Transition.Child>
								</div>
							</Dialog>
						</Transition.Root>

						{/* Static sidebar for desktop */}
						<div className="pointer-events-none fixed inset-y-0 z-40 flex w-72 flex-col opacity-0 transition-all lg:pointer-events-auto lg:opacity-100">
							{/* Sidebar */}
							<div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-zinc-900/10 bg-zinc-900/80 px-6 pb-4 dark:border-white/10 dark:bg-zinc-900/50">
								<div className="relative -top-1 flex h-16 shrink-0 items-center transition-all lg:top-0">
									<Image width={160} height={40} className="h-8 w-auto" src={logoWhite} alt="Workflow" />
								</div>

								<SidebarNav />
							</div>
						</div>
						<motion.div
							className={twJoin(
								'fixed inset-0 z-50 flex h-14 items-center justify-between gap-12 transition lg:left-72 lg:z-30',
								'border-b border-zinc-900/10 backdrop-blur-sm dark:border-white/10 dark:backdrop-blur lg:left-72',
								!sidebarOpen && 'backdrop-blur-sm dark:backdrop-blur lg:left-72',
								sidebarOpen ? 'bg-zinc-900' : 'bg-zinc-900/80 dark:bg-zinc-900/50',
							)}
						>
							<div className="mx-auto max-w-7xl flex-1">
								<div className="flex h-16 items-center px-4 lg:justify-between">
									<div className="flex flex-1 items-center justify-between space-x-4 lg:hidden">
										{/* Mobile menu button */}
										<div className="flex h-16 shrink-0 items-center">
											<Image width={160} height={40} className="h-8 w-auto" src={logoWhite} alt="Workflow" />
										</div>
										<button
											onClick={() => setSidebarOpen(true)}
											className="inline-flex items-center justify-center rounded-md p-2 text-zinc-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:ring-offset-zinc-800"
										>
											<span className="sr-only">Open main menu</span>
											{sidebarOpen ? (
												<XMarkIcon className="block h-6 w-6" aria-hidden="true" />
											) : (
												<Bars3Icon className="block h-6 w-6" aria-hidden="true" />
											)}
										</button>
									</div>
									<div className="hidden lg:flex"></div>
									<div className="hidden items-center justify-between space-x-2 lg:flex">
										<a
											href="https://os.ratrig.com/docs/introduction"
											target="_blank"
											rel="noreferrer"
											className="inline-flex items-center justify-center rounded-md border border-transparent bg-transparent px-4 py-2 text-sm font-medium text-zinc-300 shadow-sm hover:bg-zinc-700 hover:text-white focus:outline-none"
										>
											Documentation
										</a>
										<a
											href="https://github.com/sponsors/miklschmidt"
											target="_blank"
											rel="noreferrer"
											className="inline-flex items-center justify-center rounded-md border border-transparent bg-zinc-300 px-4 py-2 text-sm font-medium text-black shadow-sm hover:bg-zinc-400 focus:outline-none"
										>
											Donate
										</a>
										{/* {theme === 'light' ? (
											<MoonIcon
												className="h-9 w-9 cursor-pointer rounded-md px-2 py-2 text-zinc-300 hover:bg-zinc-700 hover:text-brand-500"
												onClick={setDarkMode}
											/>
										) : (
											<SunIcon
												className="h-9 w-9 cursor-pointer rounded-md px-2 py-2 text-zinc-300 hover:bg-zinc-700 hover:text-brand-500"
												onClick={setLightMode}
											/>
										)} */}
									</div>
								</div>
							</div>
						</motion.div>
					</div>
				</SyncWithMoonraker>
			</RecoilRoot>
		</QueryClientProvider>
	);
}

export default trpc.withTRPC(Template);

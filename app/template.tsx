'use client';

import { useState, useEffect, Fragment } from 'react';
import {
	Bars3Icon,
	XMarkIcon,
	MoonIcon,
	SunIcon,
	ArrowLeftOnRectangleIcon,
	ArrowDownTrayIcon,
	ArrowTopRightOnSquareIcon,
} from '@heroicons/react/20/solid';
import { Dialog, Disclosure, Transition } from '@headlessui/react';
import { useNavigation } from './_hooks/navigation';
import { twJoin, twMerge } from 'tailwind-merge';
import logoWhite from '../public/logo-white.svg';
import Image from 'next/image';
import Link from 'next/link';
import { trpc } from '../utils/trpc';
import { RecoilRoot } from 'recoil';
import { SyncWithMoonraker } from '../components/sync-with-moonraker';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

const mainsail = '/';
const externalNav = [
	{ name: 'Debug Zip', href: '/configure/api/debug-zip', icon: ArrowDownTrayIcon },
	{ name: 'Documentation', href: 'https://os.ratrig.com/docs/introduction', icon: ArrowTopRightOnSquareIcon },
	{ name: 'Blog', href: 'https://os.ratrig.com/blog', icon: ArrowTopRightOnSquareIcon },
	{ name: 'Donate', href: 'https://github.com/sponsors/miklschmidt', icon: ArrowTopRightOnSquareIcon },
];

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
	const [theme, setTheme] = useState<'dark' | 'light' | null>(null);
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const navigation = useNavigation();

	const onThemeChange = () => {
		if (getCurrentTheme() === 'dark') {
			document.documentElement.classList.add('dark', 'scrollbar-thumb-zinc-600');
		} else {
			document.documentElement.classList.remove('dark', 'scrollbar-thumb-zinc-400');
		}
	};

	useEffect(() => {
		setTheme(getCurrentTheme());
	}, []);

	useEffect(() => {
		onThemeChange();
	}, [theme]);

	const setDarkMode = () => {
		window.localStorage.theme = 'dark';
		setTheme('dark');
	};

	const setLightMode = () => {
		window.localStorage.theme = 'light';
		setTheme('light');
	};

	const setOSDefault = () => {
		window.localStorage.removeItem('theme');
	};

	return (
		<QueryClientProvider client={queryClient}>
			<RecoilRoot>
				<SyncWithMoonraker>
					<div className="min-h-full">
						<Transition.Root show={sidebarOpen} as={Fragment}>
							<Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
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
											{/* Sidebar component, swap this element with another sidebar if you like */}
											<div className="flex grow flex-col gap-y-5 overflow-y-auto bg-zinc-900 px-6 pb-4 ring-1 ring-white/10">
												<div className="flex h-16 shrink-0 items-center">
													<Image width={160} height={40} className="h-8 w-auto" src={logoWhite} alt="Workflow" />
												</div>
												<nav className="flex flex-1 flex-col">
													<ul role="list" className="flex flex-1 flex-col gap-y-7">
														<li>
															<ul role="list" className="-mx-2 space-y-1">
																{navigation.map((item) => (
																	<li key={item.name}>
																		<Link
																			href={item.href}
																			className={twMerge(
																				item.current
																					? 'bg-zinc-800 text-white'
																					: 'text-zinc-400 hover:bg-zinc-800 hover:text-white',
																				'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
																			)}
																		>
																			<item.icon
																				className={twJoin('h-6 w-6 shrink-0', item.iconClass)}
																				aria-hidden="true"
																			/>
																			{item.name}
																		</Link>
																	</li>
																))}
															</ul>
														</li>
														<li className="mt-auto">
															<a
																href={mainsail}
																className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-zinc-400 hover:bg-zinc-800 hover:text-white"
															>
																<ArrowLeftOnRectangleIcon className="h-6 w-6 shrink-0" aria-hidden="true" />
																Mainsail
															</a>
														</li>
													</ul>
												</nav>
											</div>
										</Dialog.Panel>
									</Transition.Child>
								</div>
							</Dialog>
						</Transition.Root>

						{/* Static sidebar for desktop */}
						<div className="lg:z-1 hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col">
							{/* Sidebar component, swap this element with another sidebar if you like */}
							<div className="flex grow flex-col gap-y-5 overflow-y-auto bg-zinc-900 px-6 pb-4">
								<div className="flex h-16 shrink-0 items-center">
									<Image width={160} height={40} className="h-8 w-auto" src={logoWhite} alt="Workflow" />
								</div>
								<nav className="flex flex-1 flex-col">
									<ul role="list" className="flex flex-1 flex-col gap-y-7">
										<li>
											<ul role="list" className="-mx-2 space-y-1">
												{navigation.map((item) => (
													<li key={item.name}>
														<Link
															href={item.href}
															className={twMerge(
																item.current
																	? 'bg-zinc-800 text-white'
																	: 'text-zinc-400 hover:bg-zinc-800 hover:text-white',
																'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
															)}
														>
															<item.icon className={twJoin('h-6 w-6 shrink-0', item.iconClass)} aria-hidden="true" />
															{item.name}
														</Link>
													</li>
												))}
											</ul>
										</li>
										<li>
											<div className="text-xs font-semibold leading-6 text-zinc-400">Other</div>
											<ul role="list" className="-mx-2 mt-2 space-y-1">
												{externalNav.map((extNav) => (
													<li key={extNav.name}>
														<a
															href={extNav.href}
															target="_blank"
															className={twJoin(
																'text-zinc-400 hover:bg-zinc-800 hover:text-white',
																'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
															)}
														>
															<span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-zinc-700 bg-zinc-800 text-[0.625rem] font-medium text-zinc-400 group-hover:text-white">
																<extNav.icon className="h-4 w-4" aria-hidden="true" />
															</span>
															<span className="truncate">{extNav.name}</span>
														</a>
													</li>
												))}
											</ul>
										</li>
										<li className="mt-auto">
											<a
												href={mainsail}
												className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-zinc-400 hover:bg-zinc-800 hover:text-white"
											>
												<ArrowLeftOnRectangleIcon className="h-6 w-6 shrink-0" aria-hidden="true" />
												Mainsail
											</a>
										</li>
									</ul>
								</nav>
							</div>
						</div>
						<Disclosure as="nav" className="bg-zinc-900 lg:ml-72">
							{({ open }) => (
								<>
									<div className="mx-auto max-w-7xl sm:px-6">
										<div className="">
											<div className="flex h-16 items-center justify-between px-4 sm:px-0">
												<div className="-mr-2 flex lg:hidden">
													{/* Mobile menu button */}
													<Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-zinc-800 p-2 text-zinc-400 hover:bg-zinc-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-zinc-800">
														<span className="sr-only">Open main menu</span>
														{open ? (
															<XMarkIcon className="block h-6 w-6" aria-hidden="true" />
														) : (
															<Bars3Icon className="block h-6 w-6" aria-hidden="true" />
														)}
													</Disclosure.Button>
												</div>
												<div className="hidden lg:flex"></div>
												<div className="hidden items-center justify-between space-x-2 sm:flex">
													<a
														href="https://github.com/sponsors/miklschmidt"
														target="_blank"
														rel="noreferrer"
														className="inline-flex items-center justify-center rounded-md border border-transparent bg-zinc-300 px-4 py-2 text-sm font-medium text-black shadow-sm hover:bg-zinc-400 focus:outline-none"
													>
														Donate
													</a>
													<a
														href="https://os.ratrig.com/docs/introduction"
														target="_blank"
														rel="noreferrer"
														className="inline-flex items-center justify-center rounded-md border border-transparent bg-transparent px-4 py-2 text-sm font-medium text-zinc-300 shadow-sm hover:bg-zinc-700 hover:text-white focus:outline-none"
													>
														Documentation
													</a>
													{theme === 'light' ? (
														<MoonIcon
															className="h-9 w-9 cursor-pointer rounded-md px-2 py-2 text-zinc-300 hover:bg-zinc-700 hover:text-brand-500"
															onClick={setDarkMode}
														/>
													) : (
														<SunIcon
															className="h-9 w-9 cursor-pointer rounded-md px-2 py-2 text-zinc-300 hover:bg-zinc-700 hover:text-brand-500"
															onClick={setLightMode}
														/>
													)}
												</div>
											</div>
										</div>
									</div>
									<Disclosure.Panel className="lg:hidden">
										<div className="space-y-1 pb-3 pt-2">
											{navigation.map((item) => (
												<Disclosure.Button
													key={item.name}
													as="a"
													href={item.href}
													className={twMerge(
														item.current
															? 'bg-brand-50 border-brand-500 text-brand-500'
															: 'border-transparent text-zinc-300 hover:border-zinc-600 hover:bg-zinc-700 hover:text-zinc-100',
														'block border-l-4 py-2 pl-3 pr-4 text-base font-medium',
													)}
													aria-current={item.current ? 'page' : undefined}
												>
													{item.name}
												</Disclosure.Button>
											))}

											<Disclosure.Button
												as="a"
												href={'https://github.com/sponsors/miklschmidt'}
												className={
													'block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-zinc-300 hover:border-zinc-600 hover:bg-zinc-700 hover:text-zinc-100'
												}
											>
												Donate
											</Disclosure.Button>

											<Disclosure.Button
												as="a"
												href="https://os.ratrig.com/docs/introduction"
												className={
													'block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-zinc-300 hover:border-zinc-600 hover:bg-zinc-700 hover:text-zinc-100'
												}
											>
												Documentation
											</Disclosure.Button>
										</div>
									</Disclosure.Panel>
								</>
							)}
						</Disclosure>
						<div className="lg:ml-72">{children}</div>
					</div>
				</SyncWithMoonraker>
			</RecoilRoot>
		</QueryClientProvider>
	);
}

export default trpc.withTRPC(Template);

'use client';

import { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { twJoin, twMerge } from 'tailwind-merge';
import logoWhite from '@/public/logo-white.svg';
import Image from 'next/image';
import { trpc } from '@/utils/trpc';
import { RecoilRoot } from 'recoil';
import { SyncWithMoonraker } from '@/components/sync-with-moonraker';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { HeroPattern } from '@/components/common/patterns';
import { SidebarNav } from '@/app/sidebar-nav';
import { motion } from 'framer-motion';
import { Button } from '@/components/common/button';
import { MenuBarProvider, TopMenu, useMenuBarProvider } from '@/app/topmenu';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/sonner';
import { scrollClasses } from '@/components/common/scroll-container';

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
	const menu = useMenuBarProvider();

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
					<TooltipProvider>
						<MenuBarProvider {...menu.providerProps}>
							<div className="relative flex min-h-full">
								<div className="ml-0 min-h-full flex-1 pt-14 transition-all lg:ml-72">
									<HeroPattern />
									{/* page content */}
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
											<div className="fixed inset-0 bg-background/80" />
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
													{/* mobile Sidebar */}
													<div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-zinc-900 bg-background px-6 pb-4 dark:border-white/10">
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
									<div
										className={twJoin(
											'flex grow flex-col gap-y-5 overflow-y-auto border-r border-zinc-900/10 bg-background/80 px-6 pb-4 dark:border-white/10 dark:bg-background',
											scrollClasses,
										)}
									>
										<div className="relative -top-1 flex h-16 shrink-0 items-center transition-all lg:top-0">
											<Image width={160} height={40} className="h-8 w-auto" src={logoWhite} alt="Workflow" />
										</div>

										<SidebarNav />
									</div>
								</div>
								{/* Top menu */}
								<TopMenu setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} {...menu.topMenuProps} />
							</div>
							<Toaster />
						</MenuBarProvider>
					</TooltipProvider>
				</SyncWithMoonraker>
			</RecoilRoot>
		</QueryClientProvider>
	);
}

export default trpc.withTRPC(Template);

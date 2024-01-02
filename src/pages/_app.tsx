import '../styles/globals.css';
import type { AppProps } from 'next/app';

import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon, MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import getConfig from 'next/config';
import { Inter } from 'next/font/google';
import { useEffect, useState } from 'react';
import { trpc } from '../utils/trpc';

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(' ');
}

const inter = Inter({ subsets: ['latin'] });

const navigation = [{ name: 'Setup Wizard', href: '/configure', current: true }];
interface Props {
	klipperHostname: string;
}

const getCurrentTheme = () => {
	if (typeof window !== 'undefined') {
		if (
			window.localStorage.theme === 'dark' ||
			(!('theme' in window.localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
		) {
			return 'dark' as const;
		} else {
			return 'light' as const;
		}
	}
	return 'light' as const;
};

function App(props: AppProps<Props>) {
	const { Component, pageProps } = props;
	const [theme, setTheme] = useState<'dark' | 'light' | null>(null);

	const onThemeChange = () => {
		if (getCurrentTheme() === 'dark') {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
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
		<>
			<style jsx global>
				{`
					:root {
						--inter-font: ${inter.style.fontFamily};
					}
				`}
			</style>
			<div className="min-h-full">
				<Disclosure as="nav" className="bg-zinc-800">
					{({ open }) => (
						<>
							<div className="mx-auto max-w-7xl sm:px-6">
								<div className="">
									<div className="flex h-16 items-center justify-between px-4 sm:px-0">
										<div className="flex items-center">
											<div className="flex-shrink-0">
												<Image
													width={160}
													height={40}
													src={getConfig().publicRuntimeConfig.basePath + '/logo-white.svg'}
													alt="Workflow"
												/>
											</div>
											<div className="hidden md:block">
												<div className="ml-4 flex items-baseline space-x-4">
													{navigation.map((item) => (
														<a
															key={item.name}
															href={item.href}
															className={classNames(
																item.current
																	? 'bg-brand-500 text-black'
																	: 'text-zinc-300 hover:bg-zinc-700 hover:text-white',
																'rounded-md px-3 py-2 text-sm font-medium',
															)}
															aria-current={item.current ? 'page' : undefined}
														>
															{item.name}
														</a>
													))}
												</div>
											</div>
										</div>
										<div className="hidden items-center justify-between space-x-2 md:flex">
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
										<div className="-mr-2 flex md:hidden">
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
									</div>
								</div>
							</div>
							<Disclosure.Panel className="md:hidden">
								<div className="space-y-1 pb-3 pt-2">
									{navigation.map((item) => (
										<Disclosure.Button
											key={item.name}
											as="a"
											href={item.href}
											className={classNames(
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

				<main className="py-10">
					<div className="mx-auto max-w-7xl pb-12">
						<Component {...pageProps} />
					</div>
				</main>
			</div>
		</>
	);
}

export default trpc.withTRPC(App);

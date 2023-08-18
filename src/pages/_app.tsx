import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import { Moonraker } from '../components/moonraker';

import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon, MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import getConfig from 'next/config';
import { withTRPC } from '@trpc/next';
import { AppRouter } from './api/trpc/[trpc]';
import { Inter } from 'next/font/google';
import { useEffect, useState } from 'react';

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

function MyApp(props: AppProps<Props>) {
	const { Component, pageProps } = props;
	const moonraker = process.browser ? <Moonraker hostname={process.env.NEXT_PUBLIC_KLIPPER_HOSTNAME} /> : null;
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

	console.log(theme);

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
		<RecoilRoot>
			<style jsx global>
				{`
					:root {
						--inter-font: ${inter.style.fontFamily};
					}
				`}
			</style>
			{moonraker}
			<div className="min-h-full">
				<Disclosure as="nav" className="bg-zinc-800">
					{({ open }) => (
						<>
							<div className="max-w-7xl mx-auto sm:px-6">
								<div className="">
									<div className="flex items-center justify-between h-16 px-4 sm:px-0">
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
																'px-3 py-2 rounded-md text-sm font-medium',
															)}
															aria-current={item.current ? 'page' : undefined}
														>
															{item.name}
														</a>
													))}
												</div>
											</div>
										</div>
										<div className="hidden md:flex justify-between items-center space-x-2">
											<a
												href="https://github.com/sponsors/miklschmidt"
												target="_blank"
												rel="noreferrer"
												className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-black bg-zinc-300 hover:bg-zinc-400 focus:outline-none"
											>
												Donate
											</a>
											<a
												href="https://os.ratrig.com/docs/introduction"
												target="_blank"
												rel="noreferrer"
												className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-zinc-300 bg-transparent hover:bg-zinc-700 hover:text-white focus:outline-none"
											>
												Documentation
											</a>
											{theme === 'light' ? (
												<MoonIcon
													className="h-9 w-9 text-zinc-300 cursor-pointer hover:text-brand-500 rounded-md hover:bg-zinc-700 px-2 py-2"
													onClick={setDarkMode}
												/>
											) : (
												<SunIcon
													className="h-9 w-9 text-zinc-300 cursor-pointer hover:text-brand-500 rounded-md hover:bg-zinc-700 px-2 py-2"
													onClick={setLightMode}
												/>
											)}
										</div>
										<div className="-mr-2 flex md:hidden">
											{/* Mobile menu button */}
											<Disclosure.Button className="bg-zinc-800 inline-flex items-center justify-center p-2 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-800 focus:ring-white">
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
								<div className="space-y-1 pt-2 pb-3">
									{navigation.map((item) => (
										<Disclosure.Button
											key={item.name}
											as="a"
											href={item.href}
											className={classNames(
												item.current
													? 'bg-brand-50 border-brand-500 text-brand-500'
													: 'border-transparent text-zinc-300 hover:bg-zinc-700 hover:border-zinc-600 hover:text-zinc-100',
												'block pl-3 pr-4 py-2 border-l-4 text-base font-medium',
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
											'border-transparent text-zinc-300 hover:bg-zinc-700 hover:border-zinc-600 hover:text-zinc-100 block pl-3 pr-4 py-2 border-l-4 text-base font-medium'
										}
									>
										Donate
									</Disclosure.Button>

									<Disclosure.Button
										as="a"
										href="https://os.ratrig.com/docs/introduction"
										className={
											'border-transparent text-zinc-300 hover:bg-zinc-700 hover:border-zinc-600 hover:text-zinc-100 block pl-3 pr-4 py-2 border-l-4 text-base font-medium'
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
					<div className="max-w-7xl mx-auto pb-12">
						<Component {...pageProps} />
					</div>
				</main>
			</div>
		</RecoilRoot>
	);
}

export default withTRPC<AppRouter>({
	config({ ctx }) {
		if (typeof window !== 'undefined') {
			// during client requests
			return {
				url: '/configure/api/trpc',
			};
		}
		/**
		 * SSR
		 * @link https://trpc.io/docs/ssr
		 */
		const url =
			process.env.NODE_ENV === 'development'
				? `http://localhost:3000/configure/api/trpc`
				: 'http://localhost/configure/api/trpc';

		return {
			url,
			headers: {
				'x-ssr': '1',
			},
			/**
			 * @link https://react-query-v3.tanstack.com/reference/QueryClient
			 */
		};
	},
	/**
	 * @link https://trpc.io/docs/ssr
	 */
	ssr: false,
})(MyApp);

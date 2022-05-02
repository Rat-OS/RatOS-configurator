import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import { Moonraker } from '../components/moonraker';

import { Disclosure } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import Image from 'next/image';
import getConfig from 'next/config';

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(' ');
}

const navigation = [
	{ name: 'Dashboard', href: '#', current: false },
	{ name: 'Setup', href: '#', current: true },
];
interface Props {
	klipperHostname: string;
}

function MyApp(props: AppProps<Props>) {
	const { Component, pageProps } = props;
	const moonraker = process.browser ? <Moonraker hostname={process.env.NEXT_PUBLIC_KLIPPER_HOSTNAME} /> : null;

	return (
		<RecoilRoot>
			{moonraker}
			<div className='min-h-full'>
				<div className='bg-zinc-300'>
					<Disclosure as='nav' className='bg-zinc-800'>
						{({ open }) => (
							<>
								<div className='max-w-7xl mx-auto sm:px-6'>
									<div className='border-b border-zinc-700'>
										<div className='flex items-center justify-between h-16 px-4 sm:px-0'>
											<div className='flex items-center'>
												<div className='flex-shrink-0'>
													<Image
														width={160}
														height={40}
														src={getConfig().publicRuntimeConfig.basePath + '/logo-white.svg'}
														alt='Workflow'
													/>
												</div>
												<div className='hidden md:block'>
													<div className='ml-4 flex items-baseline space-x-4'>
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
											<div className='hidden md:flex justify-between items-center'>
												<a
													href='https://github.com/sponsors/miklschmidt'
													target='_blank'
													rel='noreferrer'
													className='inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-black bg-zinc-300 hover:bg-zinc-400 focus:outline-none'
												>
													Donate
												</a>
												<a
													href='https://os.ratrig.com/docs/introduction'
													target='_blank'
													rel='noreferrer'
													className='inline-flex items-center justify-center ml-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-zinc-300 bg-transparent hover:bg-zinc-700 hover:text-white focus:outline-none'
												>
													Documentation
												</a>
											</div>
											<div className='-mr-2 flex md:hidden'>
												{/* Mobile menu button */}
												<Disclosure.Button className='bg-zinc-800 inline-flex items-center justify-center p-2 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-800 focus:ring-white'>
													<span className='sr-only'>Open main menu</span>
													{open ? (
														<XIcon className='block h-6 w-6' aria-hidden='true' />
													) : (
														<MenuIcon className='block h-6 w-6' aria-hidden='true' />
													)}
												</Disclosure.Button>
											</div>
										</div>
									</div>
								</div>
							</>
						)}
					</Disclosure>
				</div>

				<main className='py-10'>
					<div className='max-w-7xl mx-auto pb-12'>
						<Component {...pageProps} />
					</div>
				</main>
			</div>
		</RecoilRoot>
	);
}

export default MyApp;

import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { twMerge, twJoin } from 'tailwind-merge';
import { NavigationItem, useNavigation } from '@/app/_hooks/navigation';
import { ArrowTopRightOnSquareIcon, ArrowDownTrayIcon } from '@heroicons/react/20/solid';
import { Modal } from '@/components/common/modal';
import { AnimatedContainer } from '@/components/common/animated-container';
import { trpc } from '@/utils/trpc';
import { FileClock, FileCode } from 'lucide-react';
import { Suspense } from 'react';
import { Spinner } from '@/components/common/spinner';
import { DialogTitle } from '@/components/ui/dialog';

const mainsail = '/';
const externalNav = [
	{ name: 'Donate', href: 'https://github.com/sponsors/miklschmidt', icon: ArrowTopRightOnSquareIcon },
	{ name: 'Documentation', href: 'https://os.ratrig.com/docs/introduction', icon: ArrowTopRightOnSquareIcon },
	{ name: 'Blog', href: 'https://os.ratrig.com/blog', icon: ArrowTopRightOnSquareIcon },
];

export const SidebarNav = () => {
	const navigation = useNavigation();
	return (
		<nav className="flex flex-1 flex-col">
			<ul role="list" className="flex flex-1 flex-col gap-y-7">
				<li>
					<ul role="list" className="-mx-2 space-y-1">
						{navigation.map((item) => (
							<li key={item.name}>
								<Link
									href={item.href}
									className={twMerge(
										item.current ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:bg-zinc-800 hover:text-white',
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
					<div className="text-xs font-semibold leading-6 text-zinc-400">External Links</div>
					<ul role="list" className="-mx-2 mt-2 space-y-1">
						<Modal
							onClick={() => (window.location.href = '/configure/api/debug-zip')}
							title="This archive may contain sensitive information"
							wide={true}
							body="Please inspect the contents of the zip before posting it publically. Make sure you use Moonraker Secrets if configuring moonraker for third party services."
							content={
								<AnimatedContainer>
									<h3 className="mb-1 font-medium tracking-tight">The following files will be zipped</h3>
									<ul className="grid gap-1 pb-2 text-muted-foreground">
										<Suspense fallback={<Spinner />}>
											{trpc.debugFileList.useSuspenseQuery()[0].map((file) => {
												return (
													<li key={file.path + file.name} className="flex items-center gap-2 text-sm">
														{file.name.endsWith('.log') && (
															<FileClock className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
														)}
														{file.name.endsWith('.cfg') && (
															<FileCode className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
														)}
														<span>{file.orgPath + '/' + file.name}</span>
													</li>
												);
											})}
										</Suspense>
									</ul>
								</AnimatedContainer>
							}
							buttonLabel="I understand"
						>
							<li>
								<span
									className={twJoin(
										'cursor-pointer text-zinc-400 hover:bg-zinc-800 hover:text-white',
										'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
									)}
								>
									<span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-zinc-700 bg-zinc-800 text-[0.625rem] font-medium text-zinc-400 group-hover:text-white">
										<ArrowDownTrayIcon className="h-4 w-4" aria-hidden="true" />
									</span>
									<span className="truncate">Debug Zip</span>
								</span>
							</li>
						</Modal>
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
	);
};

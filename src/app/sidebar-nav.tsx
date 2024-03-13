import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { twMerge, twJoin } from 'tailwind-merge';
import { NavigationItem, useNavigation } from '@/app/_hooks/navigation';
import { ArrowTopRightOnSquareIcon, ArrowDownTrayIcon } from '@heroicons/react/20/solid';

const mainsail = '/';
const externalNav = [
	{ name: 'Debug Zip', href: '/configure/api/debug-zip', icon: ArrowDownTrayIcon },
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

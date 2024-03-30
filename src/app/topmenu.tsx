import { Button } from '@/components/common/button';
import { XMarkIcon, Bars3Icon, BookOpenIcon } from '@heroicons/react/24/outline';
import { HeartIcon } from '@radix-ui/react-icons';
import { motion } from 'framer-motion';
import React, { PropsWithChildren, createContext, useCallback, useContext, useEffect, useState } from 'react';
import { twJoin } from 'tailwind-merge';
import Image from 'next/image';
import logoWhite from '@/public/logo-white.svg';
import { Signal, useNewSignal, useSignal } from '@/app/_helpers/signal';
import * as Menu from '@/components/ui/menubar';

type MenuId = Nominal<string, 'MenuId'>;
type MenuEntryRenderer = (menu: typeof Menu) => React.ReactNode;
type RegisterMenu = (id: MenuId, renderFn: MenuEntryRenderer) => void;
type UnregisterMenu = (id: MenuId) => void;
type MenusChangedSignal = Signal<void>;
type MenuOptions = {
	id: MenuId;
	render: MenuEntryRenderer;
};
type MenusMap = Map<MenuId, MenuOptions>;
type MenuBarContextValue = { registerMenu: RegisterMenu; unregisterMenu: UnregisterMenu; changed: MenusChangedSignal };
type TopMenuProps = {
	sidebarOpen: boolean;
	setSidebarOpen: (open: boolean) => void;
	menus: React.MutableRefObject<MenusMap>;
	menusChanged: MenusChangedSignal;
};

const MenuBarContext = createContext<MenuBarContextValue>({
	registerMenu: () => {
		throw new Error('No menu registered in context');
	},
	unregisterMenu: () => {
		throw new Error('No menu registered in context');
	},
	changed: () => {
		return () => {};
	},
});

export const useMenuBarProvider = () => {
	const menus = React.useRef<MenusMap>(new Map());
	const menusChanged = useNewSignal() satisfies MenusChangedSignal;
	const registerMenu = useCallback(
		(id: MenuId, renderFn: MenuEntryRenderer) => {
			if (menus.current.has(id) && renderFn === menus.current.get(id)?.render) {
				return;
			}
			console.log('registering', id);
			menus.current = new Map(menus.current).set(id, { render: renderFn, id: id });
			menusChanged();
		},
		[menusChanged],
	);

	const unregisterMenu = useCallback(
		(id: MenuId) => {
			console.log('unregistering', id);
			menus.current.delete(id);
			menusChanged();
		},
		[menusChanged],
	);

	return {
		topMenuProps: { menus, menusChanged },
		providerProps: { registerMenu, unregisterMenu, changed: menusChanged } satisfies MenuBarContextValue,
	};
};

export const MenuBarProvider: React.FC<React.PropsWithChildren<MenuBarContextValue>> = (props) => {
	return <MenuBarContext.Provider value={props}>{props.children}</MenuBarContext.Provider>;
};

export const useTopMenu = (id: string, renderReactCallback: MenuEntryRenderer) => {
	const { registerMenu, unregisterMenu } = useContext(MenuBarContext);
	useEffect(() => {
		registerMenu(id as MenuId, renderReactCallback);
		return () => unregisterMenu(id as MenuId);
	}, [id, registerMenu, renderReactCallback, unregisterMenu]);
};

export const TopMenu: React.FC<TopMenuProps> = ({ sidebarOpen, setSidebarOpen, menus, menusChanged }) => {
	const [menu, setMenu] = useState(Array.from(menus.current.values()));
	useSignal(
		menusChanged,
		useCallback(() => {
			console.log('Menus changed', menus.current.values());
			setMenu(Array.from(menus.current.values()));
		}, [menus]),
	);
	return (
		<motion.div
			className={twJoin(
				'fixed inset-0 z-50 flex h-14 items-center justify-between gap-12 transition lg:left-72 lg:z-30',
				'border-b border-zinc-900/10 backdrop-blur-sm dark:border-white/10 dark:backdrop-blur lg:left-72',
				!sidebarOpen && 'backdrop-blur-sm dark:backdrop-blur lg:left-72',
				sidebarOpen ? 'bg-background' : 'bg-background/80 dark:bg-background/50',
			)}
		>
			<div className="mx-auto flex-1">
				<div className="flex h-16 items-center px-4 lg:justify-between">
					<div className="flex flex-1 items-center justify-between space-x-4 lg:hidden">
						<div className="flex h-16 shrink-0 items-center">
							<Image width={160} height={40} className="h-8 w-auto" src={logoWhite} alt="Workflow" />
						</div>
						{/* Mobile menu button */}
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
					{menu.length > 0 && (
						<Menu.Menubar>
							{menu.map(({ id, render }) => (
								<React.Fragment key={id}>{render(Menu)}</React.Fragment>
							))}
						</Menu.Menubar>
					)}
					<div className="hidden lg:flex" />
					<div className="hidden items-center justify-between space-x-2 lg:flex">
						<Button
							href="https://os.ratrig.com/docs/introduction"
							variant="indeterminate"
							target="_blank"
							rel="noreferrer"
						>
							<BookOpenIcon className="h-4 w-4" />
							<span>Docs</span>
						</Button>
						<Button
							href="https://github.com/sponsors/miklschmidt"
							variant="indeterminate"
							target="_blank"
							rel="noreferrer"
						>
							<HeartIcon className="h-4 w-4" />
							<span>Donate</span>
						</Button>
					</div>
				</div>
			</div>
		</motion.div>
	);
};

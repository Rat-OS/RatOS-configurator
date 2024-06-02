'use client';
import { XMarkIcon, Bars3Icon, BookOpenIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { twJoin } from 'tailwind-merge';
import Image from 'next/image';
import logoWhite from '@/public/logo-white.svg';
import { Signal, useNewSignal, useSignal } from '@/app/_helpers/signal';
import * as Menu from '@/components/ui/menubar';
import Link from 'next/link';
import { CircleHelp, ExternalLink } from 'lucide-react';
import { useHelpActions } from '@/components/common/help-actions';
import { NoSSR } from '@/components/common/no-ssr';

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
	setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
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
			menus.current = new Map(menus.current).set(id, { render: renderFn, id: id });
			menusChanged();
		},
		[menusChanged],
	);

	const unregisterMenu = useCallback(
		(id: MenuId) => {
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

export const useTopMenu = (id: string, renderReactCallback: ReactCallback<MenuEntryRenderer>) => {
	const { registerMenu, unregisterMenu } = useContext(MenuBarContext);
	useEffect(() => {
		registerMenu(id as MenuId, renderReactCallback);
		return () => unregisterMenu(id as MenuId);
	}, [id, registerMenu, renderReactCallback, unregisterMenu]);
};

export const TopMenu: React.FC<TopMenuProps> = ({ sidebarOpen, setSidebarOpen, menus, menusChanged }) => {
	const [, setMenu] = useState(Array.from(menus.current.values()));
	useSignal(
		menusChanged,
		useCallback(() => {
			setMenu(Array.from(menus.current.values()));
		}, [menus]),
	);
	const helpActions = useHelpActions();
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
					</div>
					<Menu.Menubar className="lg:flex-1">
						{menus.current.size > 0 &&
							Array.from(menus.current.values()).map(({ id, render }) => (
								<React.Fragment key={id}>{render(Menu)}</React.Fragment>
							))}
						<Menu.MenubarSeparator className="flex-1 bg-transparent" />
						<Menu.MenubarMenu>
							<Menu.MenubarTrigger className="flex-nowrap whitespace-nowrap text-nowrap">
								<Menu.MenubarIcon Icon={CircleHelp} /> <span className="hidden lg:inline">Help</span>
							</Menu.MenubarTrigger>
							<Menu.MenubarContent onCloseAutoFocus={(e) => e.preventDefault()}>
								{helpActions.menuItems}
								<Menu.MenubarSeparator />
								<Menu.MenubarItem asChild={true} className="gap-2">
									<Link href="https://os.ratrig.com/docs/introduction" target="_blank" rel="noreferrer">
										<Menu.MenubarContentIcon Icon={ExternalLink} /> Docs
									</Link>
								</Menu.MenubarItem>
								<Menu.MenubarItem asChild={true} className="gap-2">
									<Link href="https://github.com/sponsors/miklschmidt" target="_blank" rel="noreferrer">
										<Menu.MenubarContentIcon Icon={ExternalLink} /> Donate
									</Link>
								</Menu.MenubarItem>
							</Menu.MenubarContent>
						</Menu.MenubarMenu>

						<Menu.MenubarMenu>
							<Menu.MenubarTrigger
								onClick={() => setSidebarOpen((old) => !old)}
								className="flex-nowrap whitespace-nowrap text-nowrap lg:hidden"
							>
								<span className="sr-only">Open main menu</span>
								{sidebarOpen ? (
									<XMarkIcon className={twJoin('block', '-m-0.5 h-5 w-5')} aria-hidden="true" />
								) : (
									<Bars3Icon className={twJoin('block', '-m-0.5 h-5 w-5')} aria-hidden="true" />
								)}
							</Menu.MenubarTrigger>
						</Menu.MenubarMenu>
					</Menu.Menubar>
				</div>
				{helpActions.modals}
			</div>
		</motion.div>
	);
};

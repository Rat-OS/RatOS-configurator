'use client';
import { SparklesIcon, TvIcon, VideoCameraIcon } from '@heroicons/react/24/outline';
import { usePathname, useRouter } from 'next/navigation';
import React, { useCallback } from 'react';
import type { Route } from 'next';

export const useLocalPathname = () => {
	const pathname = (usePathname() ?? '/').replace('/configure', '') as Route;
	return pathname;
};

export const useIsRouteActive = () => {
	const pathname = useLocalPathname();
	return useCallback(
		(href: string) => {
			return pathname === href;
		},
		[pathname],
	);
};

type NavigationItem = {
	name: string;
	href: Route;
	current: boolean;
	icon: React.FC<React.ComponentProps<'svg'>>;
	iconClass?: string;
};

const routes: NavigationItem[] = [
	{ name: 'Setup Wizard', href: '/wizard', current: false, icon: SparklesIcon },
	{ name: 'Dashboard', href: '/', current: false, icon: TvIcon },
	{ name: 'Visual Calibration', href: '/calibration', current: false, icon: VideoCameraIcon },
	// { name: 'Analysis', href: '/', current: false, icon: PresentationChartLineIcon },
	// { name: 'Boards', href: '/', current: false, icon: CpuChipIcon },
	// { name: 'Motion', href: '/', current: false, icon: ArrowsPointingOutIcon, iconClass: 'rotate-45' },
	// { name: 'Toolheads', href: '/', current: false, icon: ArrowDownOnSquareIcon },
];

export const useNavigation = () => {
	const isRouteActive = useIsRouteActive();
	return routes.map((n) => {
		n.current = isRouteActive(n.href);
		return n;
	});
};

interface RedirecterProps extends React.PropsWithChildren {
	hasLastPrinterSettings: boolean;
}

export const Redirecter: React.FC<RedirecterProps> = (props) => {
	const router = useRouter();
	const isRouteActive = useIsRouteActive();
	if (!props.hasLastPrinterSettings && !isRouteActive('/wizard')) {
		router.replace('/wizard');
	} else {
		return props.children;
	}
};

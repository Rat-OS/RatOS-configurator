'use client';
import {
	SparklesIcon,
	TvIcon,
	PresentationChartLineIcon,
	CpuChipIcon,
	ArrowsPointingOutIcon,
	ArrowDownOnSquareIcon,
	VideoCameraIcon,
} from '@heroicons/react/24/outline';
import { usePathname, useRouter } from 'next/navigation';
import React, { useCallback } from 'react';

export const useLocalPathname = () => {
	const pathname = (usePathname() ?? '/').replace('/configure', '');
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
export const useNavigation = () => {
	const isRouteActive = useIsRouteActive();
	return [
		{ name: 'Setup Wizard', href: '/wizard', current: false, icon: SparklesIcon },
		{ name: 'Dashboard', href: '/', current: false, icon: TvIcon },
		{ name: 'Visual Calibration', href: '/calibration', current: false, icon: VideoCameraIcon },
		{ name: 'Analysis', href: '/analysis', current: false, icon: PresentationChartLineIcon },
		{ name: 'Boards', href: '/boards', current: false, icon: CpuChipIcon },
		{ name: 'Motion', href: '/motion', current: false, icon: ArrowsPointingOutIcon, iconClass: 'rotate-45' },
		{ name: 'Toolheads', href: '/toolheads', current: false, icon: ArrowDownOnSquareIcon },
	].map((n) => {
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

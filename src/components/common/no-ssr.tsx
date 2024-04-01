'use client';
import { useIsClient } from '@/hooks/isClient';
import dynamic from 'next/dynamic';
import React, { lazy } from 'react';
import { FullLoadScreen } from '@/components/common/full-load-screen';
export const NoSSR = (props: React.PropsWithChildren) => {
	const isClient = useIsClient();
	return isClient ? <DynamicImport>{props.children}</DynamicImport> : <FullLoadScreen />;
};
const DynamicImport = lazy(() =>
	Promise.resolve({ default: (props: React.PropsWithChildren) => <>{props.children}</> }),
);

'use client';
import { useIsClient } from '@/hooks/isClient';
import dynamic from 'next/dynamic';
import React from 'react';
import { Spinner } from '@/components/common/spinner';
import { FullLoadScreen } from '@/components/common/full-load-screen';
export const NoSSR = (props: React.PropsWithChildren) => {
	const isClient = useIsClient();
	return isClient ? <DynamicImport>{props.children}</DynamicImport> : <FullLoadScreen />;
};
const DynamicImport = dynamic(() => Promise.resolve((props: React.PropsWithChildren) => <>{props.children}</>), {
	ssr: false,
});

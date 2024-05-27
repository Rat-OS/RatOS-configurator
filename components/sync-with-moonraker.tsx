'use client';

import React, { useCallback, useEffect } from 'react';
import { useMoonraker } from '@/moonraker/hooks';
import { ReadItem, RecoilSync } from 'recoil-sync';
import { AtomEffect, DefaultValue } from 'recoil';
import { getLogger } from '@/app/_helpers/logger';

const moonrakerSyncEventEmitter = new EventTarget();

export const DispatchSaveAtomEvent = (itemKey: string, value: unknown) => {
	moonrakerSyncEventEmitter.dispatchEvent(
		new CustomEvent('saveAtom', {
			detail: {
				itemKey,
				value,
			},
		}) satisfies SaveAtomEvent,
	);
};

export const moonrakerWriteEffect = <T extends any = unknown>(): AtomEffect<T> => {
	return (params) => {
		params.onSet((newValue) => {
			// getLogger().debug(
			// 	{
			// 		key: params.node.key,
			// 		value: newValue,
			// 	},
			// 	`RatOS Atom Sync Effect: new value was saved to moonraker "${params.trigger}"`,
			// );
			DispatchSaveAtomEvent(params.node.key, newValue == null ? 'null' : newValue); // Moonraker doesn't save null values..
		});
	};
};

type SaveAtomEvent = CustomEvent<{ itemKey: string; value: unknown }>;

export const SyncWithMoonraker: React.FC<React.PropsWithChildren> = ({ children }) => {
	const moonraker = useMoonraker();
	const read: ReadItem = useCallback(
		async (itemKey) => {
			const value = await moonraker.getItem('RatOS', itemKey as '__recoil');
			return value != null && value != 'null' ? value : new DefaultValue();
		},
		[moonraker],
	);

	const saveAtom = useCallback(
		async (event: Event) => {
			const { itemKey, value } = (event as SaveAtomEvent).detail;
			await moonraker.saveItem('RatOS', itemKey as '__recoil', value);
		},
		[moonraker],
	);

	useEffect(() => {
		moonrakerSyncEventEmitter.addEventListener('saveAtom', saveAtom);
		return () => {
			moonrakerSyncEventEmitter.removeEventListener('saveAtom', saveAtom);
		};
	}, [saveAtom]);
	return <RecoilSync read={read}>{children}</RecoilSync>;
};

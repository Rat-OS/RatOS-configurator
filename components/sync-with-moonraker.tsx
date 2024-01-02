'use client';

import React, { useCallback, useEffect } from 'react';
import { useMoonraker } from '../hooks/useMoonraker';
import { ReadItem, RecoilSync, WriteItems } from 'recoil-sync';
import { AtomEffect, DefaultValue } from 'recoil';

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
			console.debug(
				`RatOS Atom Sync Effect: new value was saved to moonraker "${params.trigger}"`,
				params.node.key,
				newValue,
			);
			DispatchSaveAtomEvent(params.node.key, newValue);
		});
	};
};

type SaveAtomEvent = CustomEvent<{ itemKey: string; value: unknown }>;

export const SyncWithMoonraker: React.FC<React.PropsWithChildren> = ({ children }) => {
	const moonraker = useMoonraker();
	const read: ReadItem = useCallback(
		async (itemKey) => {
			const value = await moonraker.getItem(itemKey);
			return value != null ? value : new DefaultValue();
		},
		[moonraker],
	);
	const write: WriteItems = useCallback(async ({ diff }) => {
		console.debug(
			'Currently sidestepping recoil sync writes because of major bug: https://github.com/facebookexperimental/Recoil/issues/2059',
		);
		return;
		// for (const [key, value] of diff) {
		// await moonraker.saveItem(key, value);
		// }
	}, []);

	const saveAtom = useCallback(
		async (event: Event) => {
			const { itemKey, value } = (event as SaveAtomEvent).detail;
			await moonraker.saveItem(itemKey, value);
		},
		[moonraker],
	);

	useEffect(() => {
		moonrakerSyncEventEmitter.addEventListener('saveAtom', saveAtom);
		return () => {
			moonrakerSyncEventEmitter.removeEventListener('saveAtom', saveAtom);
		};
	}, [saveAtom]);
	return (
		<RecoilSync read={read} write={write}>
			{children}
		</RecoilSync>
	);
};

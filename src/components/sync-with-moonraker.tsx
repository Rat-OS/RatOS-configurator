'use client';

import React, { useCallback } from 'react';
import { useMoonraker } from '../hooks/useMoonraker';
import { ReadItem, RecoilSync, WriteItems } from 'recoil-sync';
import { DefaultValue } from 'recoil';

export const SyncWithMoonraker: React.FC<React.PropsWithChildren> = ({ children }) => {
	const moonraker = useMoonraker();
	const read: ReadItem = useCallback(
		async (itemKey) => {
			const value = await moonraker.getItem(itemKey);
			return value != null ? value : new DefaultValue();
		},
		[moonraker],
	);
	const write: WriteItems = useCallback(
		async ({ diff }) => {
			for (const [key, value] of diff) {
				console.log(`Writing ${key}`, value);
				await moonraker.saveItem(key, value);
			}
		},
		[moonraker],
	);
	return (
		<RecoilSync read={read} write={write}>
			{children}
		</RecoilSync>
	);
};

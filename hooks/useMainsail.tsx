import { useCallback } from 'react';
import { useMoonraker, useNamespacedItemMutation, useNamespacedItemQuery } from '../moonraker/hooks';
import { UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';
import { MoonrakerDBItemResponse, MoonrakerDBValue, MoonrakerNamespaceKeys } from '../moonraker/types';

export const useMainsailQuery = <
	K extends MoonrakerNamespaceKeys<'mainsail'>,
	V extends MoonrakerDBValue<'mainsail', K>,
>(
	key: K,
	options?: Omit<UseQueryOptions<V, unknown, V, 'mainsail'[]>, 'queryKey' | 'queryFn'>,
) => useNamespacedItemQuery('mainsail', key, options);

export const useMainsailMutation = <
	K extends MoonrakerNamespaceKeys<'mainsail'>,
	V extends MoonrakerDBValue<'mainsail', K>,
>(
	key: K,
	options?: Omit<UseMutationOptions<MoonrakerDBItemResponse<V>, unknown, V>, 'mutationKey' | 'mutationFn'>,
) => useNamespacedItemMutation('mainsail', key, options);

export function useMainsail() {
	const moonraker = useMoonraker();
	const getMainsailItem = useCallback(
		async <K extends MoonrakerNamespaceKeys<'mainsail'>, V extends MoonrakerDBValue<'mainsail', K>>(
			key: MoonrakerNamespaceKeys<'mainsail'>,
		): Promise<V> => {
			return (await moonraker.getItem('mainsail', key)) as V;
		},
		[moonraker],
	);
	const saveMainsailItem = useCallback(
		async <K extends MoonrakerNamespaceKeys<'mainsail'>, V extends MoonrakerDBValue<'mainsail', K>>(
			key: K,
			value: V,
		): Promise<MoonrakerDBItemResponse<V>> => {
			return await moonraker.saveItem('mainsail', key, value as V);
		},
		[moonraker],
	);

	return {
		getItem: getMainsailItem,
		saveItem: saveMainsailItem,
	};
}

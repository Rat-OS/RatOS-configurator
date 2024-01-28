import { useCallback } from 'react';
import {
	type MoonrakerDBItemResponse,
	type MoonrakerDBValue,
	type MoonrakerNamespaceKeys,
	useMoonraker,
	useNamespacedMutation,
	useNamespacedQuery,
} from '../moonraker/hooks';
import { UseMutationOptions, UseQueryOptions } from 'react-query';

export const useMainsailQuery = <
	K extends MoonrakerNamespaceKeys<'mainsail'>,
	V extends MoonrakerDBValue<'mainsail', K>,
>(
	key: K,
	options?: Omit<UseQueryOptions<V, unknown, V>, 'queryKey' | 'queryFn'>,
) => useNamespacedQuery('mainsail', key, options);

export const useMainsailMutation = <
	K extends MoonrakerNamespaceKeys<'mainsail'>,
	V extends MoonrakerDBValue<'mainsail', K>,
>(
	key: K,
	value: V,
	options?: Omit<
		UseMutationOptions<MoonrakerDBItemResponse<V>, unknown, MoonrakerDBItemResponse<V>>,
		'mutationKey' | 'mutationFn'
	>,
) => useNamespacedMutation('mainsail', key, value, options);

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

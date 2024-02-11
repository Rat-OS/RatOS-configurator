'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { UseMutationOptions, UseQueryOptions, useMutation, useQuery } from '@tanstack/react-query';
import useWebSocket from 'react-use-websocket';
import { migrateToLatest } from './migrations';
import type {
	InFlightRequestCallbacks,
	InFlightRequestTimeouts,
	MoonrakerResponse,
	MoonrakerStatus,
	MoonrakerSaveItemFn,
	MoonrakerNamespaces,
	MoonrakerDBItemResponse,
	MoonrakerGetItemFn,
	MoonrakerNamespaceKeys,
	MoonrakerDBValue,
	MoonrakerQueryFn,
	MoonrakerQueryKeys,
	MoonrakerQueryParams,
	MoonrakerQueryResult,
	MoonrakerMutationKeys,
	MoonrakerMutationParams,
	MoonrakerMutationResult,
	MoonrakerMutationFn,
	PrinterObjectKeys,
	PrinterObjectsMoonrakerQueryParams,
	PrinterObjectResult,
} from './types';
import { getHost } from '../helpers/util';

let REQ_ID = 0;

const getWsURL = () => {
	const host = getHost();
	if (host == null || host.trim() == '') {
		return null;
	}
	return `ws://${host}/websocket`;
};

export const useMoonraker = () => {
	const inFlightRequests = useRef<InFlightRequestCallbacks>({});
	const inFlightRequestTimeouts = useRef<InFlightRequestTimeouts>({});
	const onReadyCallbacks = useRef<{ resolve: () => void; reject: () => void }[]>([]);
	const [wsUrl, setWsUrl] = useState(getWsURL());
	useEffect(() => {
		setWsUrl(getWsURL());
	}, []);
	const { lastJsonMessage, sendJsonMessage, readyState } = useWebSocket<MoonrakerResponse>(wsUrl, {
		filter: (message) => {
			if (moonrakerStatus !== 'connected') {
				return true;
			}
			try {
				const parsed = JSON.parse(message.data) as MoonrakerResponse;
				if (inFlightRequests.current[parsed.id] != null) {
					return true;
				}
				return false;
			} catch (e) {
				console.warn('Failed to parse message', e, message.data);
			}
			return true;
		},
		shouldReconnect: (closeEvent) => {
			return true;
		},
		reconnectAttempts: Infinity,
		reconnectInterval: 3000,
		share: true,
	});
	const readyStateRef = useRef(readyState);
	readyStateRef.current = readyState;
	const [moonrakerStatus, setMoonrakerStatus] = useState<null | MoonrakerStatus>(
		readyState === 1 ? 'connected' : 'connecting',
	);

	const whenReady = useCallback((resolve: () => void, reject: () => void) => {
		if (readyStateRef.current === 1) {
			resolve();
		} else {
			onReadyCallbacks.current.push({ resolve, reject });
		}
	}, []);

	const isReady = useCallback(
		() =>
			new Promise<void>((resolve, reject) => {
				whenReady(resolve, reject);
			}),
		[whenReady],
	);

	const moonrakerQuery: MoonrakerQueryFn & MoonrakerMutationFn = useCallback(
		async <Response = any,>(method: string, params: any = {}) => {
			await isReady();
			return new Promise<Response>((resolve, reject) => {
				const id = ++REQ_ID;
				inFlightRequests.current[id] = (err, result) => {
					if (err) {
						return reject(err);
					}
					if (result?.error) {
						return reject(result.error);
					}
					resolve(result);
				};
				inFlightRequestTimeouts.current[id] = window.setTimeout(() => {
					inFlightRequests.current[id]?.(new Error('Request timed out'), null);
					delete inFlightRequests.current[id];
					delete inFlightRequestTimeouts.current[id];
				}, 10 * 1000); // 10 second timeout.
				sendJsonMessage({
					jsonrpc: '2.0',
					method,
					params,
					id: id,
				});
			});
		},
		[isReady, sendJsonMessage],
	);

	const saveItem = useCallback<MoonrakerSaveItemFn>(
		async <Data,>(namespace: MoonrakerNamespaces, key: unknown, value: unknown) => {
			await isReady();
			return (await moonrakerQuery('server.database.post_item', {
				namespace: namespace,
				key,
				value: value,
			})) as Data;
		},
		[moonrakerQuery, isReady],
	);

	const getItem = useCallback<MoonrakerGetItemFn>(
		async <Data,>(namespace: MoonrakerNamespaces, key: unknown): Promise<Data | null> => {
			await isReady();
			try {
				const result = await moonrakerQuery('server.database.get_item', {
					namespace: namespace,
					key,
				});
				return result.value as Data;
			} catch (e) {
				console.log(e);
				return null;
			}
		},
		[moonrakerQuery, isReady],
	);

	useEffect(() => {
		if (readyState === 1) {
			(async () => {
				await migrateToLatest();
				onReadyCallbacks.current.forEach((cb) => cb.resolve());
				onReadyCallbacks.current = [];
				setMoonrakerStatus('connected');
			})();
		} else {
			setMoonrakerStatus('connecting');
		}
	}, [readyState]);

	useEffect(() => {
		if (lastJsonMessage?.id && inFlightRequests.current[lastJsonMessage.id]) {
			window.clearTimeout(inFlightRequestTimeouts.current[lastJsonMessage.id]);
			inFlightRequests.current[lastJsonMessage.id](null, lastJsonMessage.result);
			delete inFlightRequestTimeouts.current[lastJsonMessage.id];
			delete inFlightRequests.current[lastJsonMessage.id];
		}
	}, [lastJsonMessage]);

	useEffect(() => {
		return () => {
			for (const reqId in inFlightRequestTimeouts.current) {
				// eslint-disable-next-line react-hooks/exhaustive-deps
				delete inFlightRequestTimeouts.current[reqId];
				// eslint-disable-next-line react-hooks/exhaustive-deps
				delete inFlightRequests.current[reqId];
			}
			onReadyCallbacks.current.forEach((cb) => cb.reject());
			onReadyCallbacks.current = [];
		};
	}, []);

	return {
		query: moonrakerQuery,
		saveItem,
		getItem,
		status: moonrakerStatus,
		lastMessage: lastJsonMessage,
		isReady: readyState === 1,
	};
};

export const useNamespacedItemQuery = <
	N extends MoonrakerNamespaces,
	K extends MoonrakerNamespaceKeys<N>,
	V extends MoonrakerDBValue<N, K>,
>(
	namespace: N,
	key: K,
	options?: Omit<UseQueryOptions<V, unknown, V, N[]>, 'queryKey' | 'queryFn'>,
) => {
	const { getItem } = useMoonraker();
	return useQuery({
		...options,
		queryKey: [namespace, key],
		queryFn: async () => {
			return getItem(namespace, key) as Promise<V>;
		},
	});
};

export const useMoonrakerQuery = <
	K extends MoonrakerQueryKeys = MoonrakerQueryKeys,
	P extends MoonrakerQueryParams<K> = MoonrakerQueryParams<K>,
	O extends Omit<
		UseQueryOptions<MoonrakerQueryResult<K>, unknown, MoonrakerQueryResult<K>, K[]>,
		'queryKey' | 'queryFn'
	> = Omit<UseQueryOptions<MoonrakerQueryResult<K>, unknown, MoonrakerQueryResult<K>, K[]>, 'queryKey' | 'queryFn'>,
>(
	...args: P extends void ? [K, O?] : [K, P, O?]
) => {
	const { query } = useMoonraker();
	const options = args.length === 3 ? (args[2] as O) : (args[1] as O);
	const params = args.length === 3 ? args[1] : undefined;
	const key = args[0];
	const passed = (args.length === 3 ? [key, params] : [key]) as P extends void ? [K] : [K, P];
	return useQuery({
		...(options ?? {}),
		queryKey: [args[0]],
		queryFn: async () => {
			return query(...passed) as Promise<MoonrakerQueryResult<K>>;
		},
	});
};

export const useMoonrakerMutation = <
	K extends MoonrakerMutationKeys = MoonrakerMutationKeys,
	P extends MoonrakerMutationParams<K> = MoonrakerMutationParams<K>,
	O extends Omit<
		UseMutationOptions<MoonrakerMutationResult<K>, unknown, MoonrakerMutationResult<K>, K[]>,
		'queryKey' | 'queryFn'
	> = Omit<
		UseMutationOptions<MoonrakerMutationResult<K>, unknown, MoonrakerMutationResult<K>, K[]>,
		'queryKey' | 'queryFn'
	>,
>(
	...args: P extends void ? [K, O?] : [K, P, O?]
) => {
	const { query } = useMoonraker();
	const options = args.length === 3 ? args[2] : args[1];
	const params = args.length === 3 ? args[1] : undefined;
	const key = args[0];
	const passed = (args.length === 3 ? [key, params] : [key]) as P extends void ? [K] : [K, P];
	return useMutation({
		...options,
		mutationKey: [args[0]],
		mutationFn: async () => {
			return query(...passed) as Promise<MoonrakerMutationResult<K>>;
		},
	});
};

export const usePrinterObjectQuery = <TArgs extends [PrinterObjectKeys, ...PrinterObjectKeys[]]>(...args: TArgs) => {
	const { query } = useMoonraker();
	return useQuery({
		queryKey: args,
		queryFn: async () => {
			const objects = Object.fromEntries(args.map((key) => [key, null])) as PrinterObjectsMoonrakerQueryParams;
			return (await query('printer.objects.query', { objects })).status as Promise<{
				[K in TArgs[number]]: PrinterObjectResult<K>;
			}>;
		},
	});
};

export const useNamespacedItemMutation = <
	N extends MoonrakerNamespaces,
	K extends MoonrakerNamespaceKeys<N>,
	V extends MoonrakerDBValue<N, K>,
>(
	namespace: N,
	key: K,
	options?: Omit<UseMutationOptions<MoonrakerDBItemResponse<V>, unknown, V>, 'mutationKey' | 'mutationFn'>,
) => {
	const { saveItem } = useMoonraker();
	return useMutation<MoonrakerDBItemResponse<V>, unknown, V>({
		...options,
		mutationKey: [namespace, key],
		mutationFn: (value: V) => saveItem(namespace, key, value) as Promise<MoonrakerDBItemResponse<V>>,
	});
};

export const useMoonrakerState = <
	N extends MoonrakerNamespaces,
	K extends MoonrakerNamespaceKeys<N>,
	V extends MoonrakerDBValue<N, K>,
>(
	namespace: N,
	key: K,
	initialValue: V,
) => {
	const query = useNamespacedItemQuery(namespace, key, { initialData: initialValue });
	const mutation = useNamespacedItemMutation<N, K, V>(namespace, key);
	const mutate = useCallback(
		async (value: V | ((prev: V) => void)) => {
			const newValue = typeof value === 'function' ? (value as (prev: V) => V)(query.data ?? initialValue) : value;
			mutation.mutate(newValue, {
				onSuccess: () => {
					// Todo, implement optimistic updates
					query.refetch();
				},
			});
		},
		[initialValue, mutation, query],
	);
	return [query.data ?? initialValue, mutate, query, mutation] as const;
};

'use client';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
import { merge } from 'ts-deepmerge';

let REQ_ID = 0;

const getWsURL = () => {
	const host = getHost();
	if (host == null || host.trim() == '') {
		return null;
	}
	return `ws://${host}/websocket`;
};

const subscriptions: { [key: number]: Partial<PrinterObjectsMoonrakerQueryParams> } = {};

export const useMoonraker = () => {
	const inFlightRequests = useRef<InFlightRequestCallbacks>({});
	const inFlightRequestTimeouts = useRef<InFlightRequestTimeouts>({});
	const localSubscriptions = useRef<number[]>([]);
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
				if (parsed.method === 'notify_status_update' && parsed.params != null) {
					const res = parsed.params[0] as { [key in PrinterObjectKeys]: PrinterObjectResult<PrinterObjectKeys> };
					if (res != null) {
						for (const sub of localSubscriptions.current) {
							const objects = subscriptions[sub];
							if (objects != null) {
								for (const key in objects) {
									if (res[key as PrinterObjectKeys] != null) {
										return true;
									}
								}
							}
						}
					}
					return false;
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
				let timeout = 10 * 1000;
				if (method === 'printer.gcode.script') {
					// Allow 60 seconds for gcode macros.
					timeout = 60 * 1000;
				}
				inFlightRequestTimeouts.current[id] = window.setTimeout(() => {
					inFlightRequests.current[id]?.(new Error('Request timed out'), null);
					delete inFlightRequests.current[id];
					delete inFlightRequestTimeouts.current[id];
				}, timeout); // 10 second timeout.
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

	const subscribeToObject = useCallback(
		async <TArgs extends [PrinterObjectKeys, ...PrinterObjectKeys[]]>(...args: TArgs) => {
			const objects = Object.fromEntries(args.map((key) => [key, null])) as PrinterObjectsMoonrakerQueryParams;
			const allSubscribedObjects = Object.assign(
				{},
				objects,
				...Object.values(subscriptions).filter((v) => v != null),
			) as PrinterObjectsMoonrakerQueryParams;
			const res = (
				await moonrakerQuery('printer.objects.subscribe' as 'printer.objects.query', { objects: allSubscribedObjects })
			).status as {
				[K in TArgs[number]]: PrinterObjectResult<K>;
			};

			const reqId = REQ_ID;
			subscriptions[reqId] = objects;
			localSubscriptions.current.push(reqId);
			return {
				res,
				unsuscribe: async () => {
					localSubscriptions.current = localSubscriptions.current.filter((v) => v !== reqId);
					if (subscriptions[reqId] == null) {
						delete subscriptions[reqId];
						const allSubscribedObjects = Object.assign(
							{},
							...Object.values(subscriptions).filter((v) => v != null),
						) as PrinterObjectsMoonrakerQueryParams;
						await moonrakerQuery('printer.objects.subscribe' as 'printer.objects.query', {
							objects: allSubscribedObjects,
						});
					}
				},
			};
		},
		[moonrakerQuery],
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
				return (result?.value ?? null) as Data;
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
			if (localSubscriptions.current.length > 0) {
				localSubscriptions.current.forEach((sub) => {
					delete subscriptions[sub];
				});
				localSubscriptions.current = [];
				const allSubscribedObjects = Object.assign(
					{},
					...Object.values(subscriptions).filter((v) => v != null),
				) as PrinterObjectsMoonrakerQueryParams;
				moonrakerQuery('printer.objects.subscribe' as 'printer.objects.query', {
					objects: Object.keys(allSubscribedObjects).length > 0 ? allSubscribedObjects : null,
				}).catch((e) => {
					// ignore
				});
			}
			onReadyCallbacks.current.forEach((cb) => cb.reject());
			onReadyCallbacks.current = [];
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return {
		query: moonrakerQuery,
		saveItem,
		getItem,
		subscribeToObject,
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
	O extends Omit<UseMutationOptions<MoonrakerMutationResult<K>, unknown, P, K[]>, 'mutationKey' | 'mutationFn'> = Omit<
		UseMutationOptions<MoonrakerMutationResult<K>, unknown, P, K[]>,
		'mutationKey' | 'mutationFn'
	>,
>(
	...args: [K, O?]
) => {
	const { query } = useMoonraker();
	const options = args[1];
	const key = args[0];
	return useMutation({
		...options,
		mutationKey: [args[0]],
		mutationFn: async (params: P) => {
			const passed = (params ? [key, params] : [key]) as P extends void ? [K] : [K, P];
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
			return (await query('printer.objects.query', { objects })).status as {
				[K in TArgs[number]]: PrinterObjectResult<K>;
			};
		},
	});
};

export const usePrinterObjectSubscription = <TArgs extends [PrinterObjectKeys, ...PrinterObjectKeys[]]>(
	...args: TArgs
) => {
	const [state, setState] = useState<
		| {
				[K in TArgs[number]]: PrinterObjectResult<K>;
		  }
		| null
	>(null);
	const { subscribeToObject, lastMessage } = useMoonraker();

	const keys = useMemo(
		() => Object.fromEntries(args.map((key) => [key, null])) as PrinterObjectsMoonrakerQueryParams,
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[JSON.stringify(args.sort())],
	);

	useEffect(() => {
		const subscription = subscribeToObject(...(Object.keys(keys) as TArgs));
		subscription
			.then((sub) => {
				setState(sub.res);
			})
			.catch((e) => {
				if (e instanceof Error) {
					console.error(e);
				}
			});
		return () => {
			subscription
				.then((sub) => sub.unsuscribe())
				.catch((e) => {
					if (e instanceof Error) {
						console.error(e);
					}
				});
		};
	}, [keys, subscribeToObject]);

	useEffect(() => {
		if (lastMessage?.method === 'notify_status_update' && lastMessage.params != null) {
			const res = lastMessage.params[0] as { [key in PrinterObjectKeys]: PrinterObjectResult<PrinterObjectKeys> };
			const changed = {} as typeof res;
			for (const key in keys) {
				if (res[key as keyof typeof res] != null) {
					changed[key as keyof typeof res] = res[key as keyof typeof res];
				}
			}
			if (Object.keys(changed).length > 0) {
				setState((prev) => {
					return merge(prev ?? {}, changed);
				});
			}
		}
	}, [keys, lastMessage]);

	return state;
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
	Val extends NonNullable<V> | null,
>(
	namespace: N,
	key: K,
	initialValue: Val = null as Val,
) => {
	const query = useNamespacedItemQuery(namespace, key, { initialData: initialValue });
	const mutation = useNamespacedItemMutation<N, K, V>(namespace, key);
	const mutate = useCallback(
		async (value: V | ((prev: V | null) => void)) => {
			const newValue =
				typeof value === 'function' ? (value as (prev: V | null) => V)(query.data ?? initialValue) : value;
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

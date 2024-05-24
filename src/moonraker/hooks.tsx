'use client';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { UseMutationOptions, UseQueryOptions, useMutation, useQuery } from '@tanstack/react-query';
import useWebSocket from 'react-use-websocket';
import { migrateToLatest } from '@/moonraker/migrations';
import type {
	InFlightRequestCallbacks,
	InFlightRequestTimeouts,
	JSONRPCResponse,
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
	JSONRPCResponseSuccess,
} from '@/moonraker/types';
import { getHost } from '@/helpers/util';
import { merge } from 'ts-deepmerge';
import deepEqual from 'deep-equal';
import { getLogger } from '@/app/_helpers/logger';

let REQ_ID = 0;

const getWsURL = () => {
	const host = getHost();
	if (host == null || host.trim() == '') {
		return null;
	}
	return `ws://${host}/websocket`;
};

const subscriptions: { [key: number]: Partial<PrinterObjectsMoonrakerQueryParams> } = {};

type MoonrakerStatusUpdate = { [key in PrinterObjectKeys]: PrinterObjectResult<PrinterObjectKeys> };

interface MoonrakerHookOptions {
	onStatusUpdate?: (status: MoonrakerStatusUpdate) => void;
	passThroughUpdateMethods?: string[];
}

export const useMoonraker = (options?: MoonrakerHookOptions) => {
	const inFlightRequests = useRef<InFlightRequestCallbacks>({});
	const inFlightRequestTimeouts = useRef<InFlightRequestTimeouts>({});
	const localSubscriptions = useRef<number[]>([]);
	const onReadyCallbacks = useRef<{ resolve: () => void; reject: () => void }[]>([]);
	const [wsUrl, setWsUrl] = useState(getWsURL());
	useEffect(() => {
		setWsUrl(getWsURL());
	}, []);

	const containsSubscriptionUpdate = useCallback(
		(jsonMessage: JSONRPCResponse): jsonMessage is JSONRPCResponseSuccess => {
			if ('error' in jsonMessage) {
				return false;
			}
			if (jsonMessage.method === 'notify_status_update' && jsonMessage.params != null) {
				const res = jsonMessage.params[0] as MoonrakerStatusUpdate;
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
		},
		[],
	);

	const { lastJsonMessage, sendJsonMessage, readyState } = useWebSocket<JSONRPCResponse>(wsUrl, {
		filter: (message) => {
			if (moonrakerStatus !== 'connected') {
				return true;
			}
			try {
				const parsed = JSON.parse(message.data) as JSONRPCResponse;
				if (inFlightRequests.current[parsed.id] != null) {
					return true;
				}
				if (
					options?.passThroughUpdateMethods?.length &&
					'method' in parsed &&
					options.passThroughUpdateMethods.includes(parsed.method)
				) {
					return true;
				}
				return false;
			} catch (e) {
				getLogger().warn({ e, messageData: message.data }, 'Filter: Failed to parse message');
			}
			return false;
		},
		onMessage: (message) => {
			if (options?.onStatusUpdate) {
				try {
					const parsed = JSON.parse(message.data) as JSONRPCResponse;
					if (containsSubscriptionUpdate(parsed)) {
						const res = parsed.params[0] as MoonrakerStatusUpdate;
						options.onStatusUpdate?.(res);
					}
				} catch (e) {
					getLogger().warn({ e, messageData: message.data }, 'OnMessage: Failed to parse message');
				}
			}
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
			const id = ++REQ_ID;
			await isReady();
			return new Promise<Response>((resolve, reject) => {
				inFlightRequests.current[id] = (err, result) => {
					if (err) {
						return reject(err);
					}
					if (result && typeof result === 'object' && 'error' in result && result.error) {
						return reject(result.error);
					}
					if (result == null) {
						return reject(new Error('No result. Unknown response format.'));
					}
					resolve(result as Response);
				};
				let timeout = 10 * 1000;
				if (method === 'printer.gcode.script') {
					// Allow 10 minutes for gcode macros.
					timeout = 10 * 60 * 1000;
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
			const q = moonrakerQuery('printer.objects.subscribe' as 'printer.objects.query', {
				objects: allSubscribedObjects,
			});
			// Capture request id we just generated;
			const reqId = REQ_ID;
			subscriptions[reqId] = objects;
			localSubscriptions.current.push(reqId);

			const res = (await q).status as {
				[K in TArgs[number]]: PrinterObjectResult<K>;
			};
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
				getLogger().warn(e);
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
			if ('error' in lastJsonMessage) {
				inFlightRequests.current[lastJsonMessage.id](new Error(lastJsonMessage.error.message), null);
			} else {
				inFlightRequests.current[lastJsonMessage.id](null, lastJsonMessage.result);
			}
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

export const usePrinterObjectSubscription = <
	TArgs extends [PrinterObjectKeys, ...PrinterObjectKeys[]],
	R extends object = { [K in TArgs[number]]: PrinterObjectResult<K> },
>(
	select: null | ((res: { [K in TArgs[number]]: PrinterObjectResult<K> }) => R),
	...args: TArgs
) => {
	const [state, setState] = useState<R | null>(null);
	const stateRef = useRef(state);
	stateRef.current = state;
	const selectRef = useRef(select);
	selectRef.current = select;

	const _select = useCallback((res: { [K in TArgs[number]]: PrinterObjectResult<K> }) => {
		if (selectRef.current == null) {
			return res as R;
		}
		return selectRef.current?.(res);
	}, []);

	const keys = useMemo(
		() => Object.fromEntries(args.map((key) => [key, null])) as PrinterObjectsMoonrakerQueryParams,
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[JSON.stringify(args.sort())],
	);

	const { subscribeToObject } = useMoonraker({
		onStatusUpdate: useCallback(
			(res: MoonrakerStatusUpdate) => {
				const changed = {} as typeof res;
				for (const key in keys) {
					if (res[key as keyof typeof res] != null) {
						changed[key as keyof typeof res] = res[key as keyof typeof res];
					}
				}
				const changeSelection = _select(changed);
				if (changeSelection == null || typeof changeSelection !== 'object') {
					throw new Error('Invalid selection function, must return object, got ' + typeof changeSelection);
				}
				if (Object.keys(changed).length > 0 && deepEqual(changeSelection, stateRef.current) === false) {
					setState((prev) => {
						return merge(prev ?? {}, changeSelection) as R;
					});
				}
			},
			[_select, keys],
		),
	});

	useEffect(() => {
		const subscription = subscribeToObject(...(Object.keys(keys) as TArgs));
		subscription
			.then((sub) => {
				setState(_select(sub.res));
			})
			.catch((e) => {
				if (e instanceof Error) {
					getLogger().error(e);
				}
			});
		return () => {
			subscription
				.then((sub) => sub.unsuscribe())
				.catch((e) => {
					if (e instanceof Error) {
						getLogger().error(e);
					}
				});
		};
	}, [_select, keys, subscribeToObject]);

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
		async (value: V | ((prev: NonNullable<V> | Val) => NonNullable<V> | Val)) => {
			const newValue =
				typeof value === 'function' ? (value as (prev: NonNullable<V> | Val) => V)(query.data ?? initialValue) : value;
			await mutation.mutateAsync(newValue, {
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

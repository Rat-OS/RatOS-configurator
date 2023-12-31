'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import useWebSocket from 'react-use-websocket';

export type MoonrakerStatus = 'connected' | 'connecting' | 'not-running';

interface MoonrakerResponse {
	method: string;
	params: any[];
	result?: any;
	id: number;
}

let REQ_ID = 0;

interface InFlightRequestCallbacks {
	[id: number]: (err: Error | null, result: any) => any;
}
interface InFlightRequestTimeouts {
	[id: number]: number;
}

export type MoonrakerDBItemResponse<Data = unknown> = {
	key: string;
	namespace: string;
	value: Data;
};

const getWsURL = (hostname?: string) => {
	const host =
		hostname != null && hostname.trim() != ''
			? hostname
			: process.env.NEXT_PUBLIC_KLIPPER_HOSTNAME != null && process.env.NEXT_PUBLIC_KLIPPER_HOSTNAME.trim() != ''
			? process.env.NEXT_PUBLIC_KLIPPER_HOSTNAME
			: typeof window !== 'undefined'
			? window.location.hostname
			: '';
	if (host == null || host.trim() == '') {
		return null;
	}
	return `ws://${host}/websocket`;
};

export const useMoonraker = (hostname?: string) => {
	const inFlightRequests = useRef<InFlightRequestCallbacks>({});
	const inFlightRequestTimeouts = useRef<InFlightRequestTimeouts>({});
	const onReadyCallbacks = useRef<(() => void)[]>([]);
	const [wsUrl, setWsUrl] = useState(getWsURL(hostname));
	useEffect(() => {
		setWsUrl(getWsURL(hostname));
	}, [hostname]);
	const { lastJsonMessage, sendJsonMessage, readyState } = useWebSocket<MoonrakerResponse>(wsUrl, {
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
	const [moonrakerMessage, setMoonrakerMessage] = useState<null | MoonrakerResponse>(lastJsonMessage);

	const whenReady = useCallback((callback: () => void) => {
		if (readyStateRef.current === 1) {
			callback();
		} else {
			onReadyCallbacks.current.push(callback);
		}
	}, []);

	const isReady = useCallback(
		() =>
			new Promise<void>((resolve, reject) => {
				whenReady(() => {
					resolve();
				});
			}),
		[whenReady],
	);

	const moonrakerQuery = useCallback(
		async <Response = any,>(method: string, params: any = {}) => {
			await isReady();
			return new Promise<Response>((resolve, reject) => {
				sendJsonMessage({
					jsonrpc: '2.0',
					method,
					params,
					id: ++REQ_ID,
				});
				inFlightRequests.current[REQ_ID] = (err, result) => {
					if (err) {
						return reject(err);
					}
					if (result?.error) {
						return reject(result.error);
					}
					resolve(result);
				};
				inFlightRequestTimeouts.current[REQ_ID] = window.setTimeout(() => {
					inFlightRequests.current[REQ_ID]?.(new Error('Request timed out'), null);
					delete inFlightRequests.current[REQ_ID];
					delete inFlightRequestTimeouts.current[REQ_ID];
				}, 10 * 1000); // 10 second timeout.
			});
		},
		[isReady, sendJsonMessage],
	);

	const saveItem = useCallback(
		async <Data = unknown,>(key: string, value: Data) => {
			await isReady();
			return await moonrakerQuery<MoonrakerDBItemResponse<Data>>('server.database.post_item', {
				namespace: 'RatOS',
				key,
				value: JSON.stringify(value),
			});
		},
		[moonrakerQuery, isReady],
	);

	const getItem = useCallback(
		async <Data = unknown,>(key: string): Promise<Data | null> => {
			await isReady();
			try {
				const result = await moonrakerQuery<MoonrakerDBItemResponse<Data>>('server.database.get_item', {
					namespace: 'RatOS',
					key,
				});
				if (result.value === '{}') {
					return null;
				}
				return typeof result.value == 'string' ? (JSON.parse(result.value) as Data) : result.value;
			} catch (e) {
				return null;
			}
		},
		[moonrakerQuery, isReady],
	);

	useEffect(() => {
		if (readyState === 1) {
			onReadyCallbacks.current.forEach((cb) => cb());
			onReadyCallbacks.current = [];
			setMoonrakerStatus('connected');
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
		} else {
			setMoonrakerMessage(lastJsonMessage);
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
			onReadyCallbacks.current = [];
		};
	}, []);

	return {
		query: moonrakerQuery,
		saveItem,
		getItem,
		status: moonrakerStatus,
		lastMessage: moonrakerMessage,
		isReady: readyState === 1,
	};
};

export const useMoonrakerRequestHandling = () => {};

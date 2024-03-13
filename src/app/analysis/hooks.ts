import useWebSocket from 'react-use-websocket';
import { getHost } from '@/helpers/util';
import { InFlightRequestCallbacks, InFlightRequestTimeouts, MoonrakerResponse } from '@/moonraker/types';
import { useCallback, useEffect, useRef, useState } from 'react';
import { getLogger } from '@/app/_helpers/logger';
import { ToolheadHelper } from '@/helpers/toolhead';
import { useKlippyStateHandler } from '@/hooks/useKlippyStateHandler';

const getWsURL = () => {
	const host = getHost();
	if (host == null || host.trim() == '') {
		return null;
	}
	if (typeof window == 'undefined') {
		return null;
	}
	return `ws://${host}:7125/klippysocket`;
};

let REQ_ID = 0;

type ADXL345ResponseHeader = 'time' | 'x_acceleration' | 'y_acceleration' | 'z_acceleration';
type KlipperADXL345SubscriptionResponse = {
	header: [ADXL345ResponseHeader, ADXL345ResponseHeader, ADXL345ResponseHeader, ADXL345ResponseHeader];
};
type KlipperADXL345SubscriptionData = { data: [number, number, number, number][]; overflows?: number };

type ToolheadHelperClass = InstanceType<typeof ToolheadHelper<any>>;

interface RealtimeADXLOptions {
	onDataUpdate?: (status: KlipperADXL345SubscriptionData) => void;
	enabled?: boolean;
	sensor: ReturnType<ToolheadHelperClass['getYAccelerometerName'] & ToolheadHelperClass['getYAccelerometerName']>;
}

export const useRealtimeADXL = (options: RealtimeADXLOptions) => {
	const [wsUrl, setWsUrl] = useState(getWsURL());
	const inFlightRequests = useRef<InFlightRequestCallbacks>({});
	const inFlightRequestTimeouts = useRef<InFlightRequestTimeouts>({});
	const [isSubscribed, setIsSubscribed] = useState(false);
	const isSubscribedRef = useRef(isSubscribed);
	isSubscribedRef.current = isSubscribed;
	const kippyState = useKlippyStateHandler();
	useEffect(() => {
		setWsUrl(getWsURL());
	}, []);
	const { lastJsonMessage, sendJsonMessage, readyState } = useWebSocket<MoonrakerResponse>(
		options.enabled === false ? null : wsUrl,
		{
			shouldReconnect: (closeEvent) => {
				return true;
			},
			onMessage: (message) => {
				if (options?.onDataUpdate && isSubscribed) {
					try {
						const parsed = JSON.parse(message.data) as MoonrakerResponse;
						if (parsed.params != null && 'data' in parsed.params) {
							const res = parsed.params as KlipperADXL345SubscriptionData;
							options.onDataUpdate?.(res);
						}
					} catch (e) {
						console.warn('OnMessage: Failed to parse message', e, message.data);
					}
				}
			},
			reconnectAttempts: Infinity,
			reconnectInterval: 3000,
			share: false,
		},
	);

	const subscribe = useCallback(async <R = unknown>() => {
		const id = ++REQ_ID;
		return new Promise<R>((resolve, reject) => {
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
			inFlightRequestTimeouts.current[id] = window.setTimeout(() => {
				inFlightRequests.current[id]?.(new Error('Request timed out'), null);
				delete inFlightRequests.current[id];
				delete inFlightRequestTimeouts.current[id];
			}, timeout); // 10 second timeout.
			sendJsonMessage({
				jsonrpc: '2.0',
				method: 'adxl345/dump_adxl345',
				params: {
					sensor: options.sensor,
					response_template: {},
				},
				id: id,
			});
		});
	}, [options.sensor, sendJsonMessage]);

	useEffect(() => {
		if (readyState === 1 && kippyState === 'ready' && !isSubscribedRef.current) {
			subscribe()
				.then((res) => {
					const result = res as KlipperADXL345SubscriptionResponse;
					getLogger().info('Subscribed to ADXL345', result);
					setIsSubscribed(true);
				})
				.catch((err) => {
					getLogger().error(err);
					setIsSubscribed(false);
				});
		} else if (isSubscribedRef.current) {
			setIsSubscribed(false);
		}
	}, [kippyState, readyState, subscribe]);

	useEffect(() => {
		if (lastJsonMessage?.id && inFlightRequests.current[lastJsonMessage.id]) {
			window.clearTimeout(inFlightRequestTimeouts.current[lastJsonMessage.id]);
			inFlightRequests.current[lastJsonMessage.id](null, lastJsonMessage.result);
			delete inFlightRequestTimeouts.current[lastJsonMessage.id];
			delete inFlightRequests.current[lastJsonMessage.id];
		}
	}, [lastJsonMessage]);

	return {
		isSubscribed,
	};
};

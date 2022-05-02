import { useCallback, useEffect, useRef } from 'react';
import useWebSocket from 'react-use-websocket';
import { useSetRecoilState, useRecoilState, atom } from 'recoil';

export const MoonrakerReadyState = atom({
	key: 'MoonrakerReadyState',
	default: 0,
});

type MoonrakerStatuus = 'connected' | 'connecting' | 'not-running';

export const MoonrakerStatusState = atom<MoonrakerStatuus>({
	key: 'MoonrakerStatus',
	default: 'connecting',
});

export const MoonrakerQueryState = atom<null | ((method: string, params?: any) => Promise<any>)>({
	key: 'MoonrakerQuery',
	default: null,
});

interface MoonrakerResponse {
	method: string;
	params: any[];
}

export const MoonrakerMessageState = atom<null | MoonrakerResponse>({
	key: 'MoonrakerMessage',
	default: null,
});

let REQ_ID = 0;

interface InFlightRequestCallbacks {
	[id: number]: (err: Error | null, result: any) => any;
}
interface InFlightRequestTimeouts {
	[id: number]: number;
}

export interface MoonrakerDBGetItemResponse<Data = unknown> {
	key: string;
	namespace: string;
	value: Data;
}

const inFlightRequests: InFlightRequestCallbacks = {};
const inFlightRequestTimeouts: InFlightRequestTimeouts = {};
export const useMoonraker = (hostname?: string) => {
	const { lastJsonMessage, sendJsonMessage, readyState } = useWebSocket(
		`ws://${(hostname?.trim() ?? '') != '' ? hostname : window.location.hostname}:7125/websocket`,
		{
			shouldReconnect: (closeEvent) => {
				return true;
			},
			reconnectAttempts: Infinity,
			reconnectInterval: 3000,
		},
	);

	const setMoonrakerReadyState = useSetRecoilState(MoonrakerReadyState);
	const setMoonrakerStatus = useSetRecoilState(MoonrakerStatusState);
	const setMoonrakerMessage = useSetRecoilState(MoonrakerMessageState);
	const [moonrakerQuery, setMoonrakerQuery] = useRecoilState(MoonrakerQueryState);

	const call = useCallback(
		(method: string, params: any, cb: (err: Error | null, result: any) => any) => {
			if (readyState === 1) {
				sendJsonMessage({
					jsonrpc: '2.0',
					method,
					params,
					id: ++REQ_ID,
				});
				inFlightRequests[REQ_ID] = cb;
				inFlightRequestTimeouts[REQ_ID] = window.setTimeout(() => {
					inFlightRequests[REQ_ID](new Error('Request timed out'), null);
					delete inFlightRequests[REQ_ID];
					delete inFlightRequestTimeouts[REQ_ID];
				}, 10 * 1000); // 10 second timeout.
			} else {
				throw new Error('Socket connection not ready');
			}
		},
		[readyState, sendJsonMessage],
	);

	useEffect(() => {
		if (readyState === 1) {
			setMoonrakerQuery(() => (method: string, params: any = {}) => {
				return new Promise((resolve, reject) => {
					call(method, params, (err, result) => {
						if (err) {
							return reject(err);
						}
						resolve(result);
					});
				});
			});
		} else {
			setMoonrakerQuery(null);
		}
	}, [call, readyState, setMoonrakerQuery]);

	useEffect(() => {
		setMoonrakerReadyState(readyState);
		if (readyState === 1) {
			setMoonrakerStatus('connected');
		} else {
			setMoonrakerStatus('connecting');
		}
	}, [readyState, setMoonrakerStatus, setMoonrakerReadyState]);

	useEffect(() => {
		if (lastJsonMessage?.id && inFlightRequests[lastJsonMessage.id]) {
			window.clearTimeout(inFlightRequestTimeouts[lastJsonMessage.id]);
			inFlightRequests[lastJsonMessage.id](null, lastJsonMessage.result);
			delete inFlightRequestTimeouts[lastJsonMessage.id];
			delete inFlightRequests[lastJsonMessage.id];
		} else {
			setMoonrakerMessage(lastJsonMessage);
		}
	}, [lastJsonMessage, setMoonrakerMessage]);

	useEffect(() => {
		return () => {
			for (const reqId in inFlightRequestTimeouts) {
				delete inFlightRequestTimeouts[reqId];
				delete inFlightRequests[reqId];
			}
		};
	}, []);

	return moonrakerQuery;
};

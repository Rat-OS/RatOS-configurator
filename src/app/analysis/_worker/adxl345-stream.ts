import { getLogger } from '@/app/_helpers/logger';
import { JSONRPCRequest, JSONRPCResponse, JSONRPCResponseSuccess } from '@/moonraker/types';
import {
	KlipperAccelSubscriptionData,
	KlipperAccelSubscriptionResponse,
	klipperADXL345SubscriptionDataSchema,
	klipperADXL345SubscriptionResponseSchema,
} from '@/zods/analysis';
import { KlipperAccelSensorName } from '@/zods/hardware';
import BigNumber from 'bignumber.js';
import { filter, map, share } from 'rxjs';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';

let id = 0;

type KlipperADXLRequest = JSONRPCRequest<
	'adxl345/dump_adxl345',
	{ sensor: KlipperAccelSensorName; response_template: {} }
>;

export interface RealtimeADXLOptions {
	onDataUpdate?: (status: KlipperAccelSubscriptionData) => void;
	onSubscriptionFailure?: ReactCallback<(err: Error) => void>;
	onSubscriptionSuccess?: ReactCallback<(header: KlipperAccelSubscriptionResponse['header']) => void>;
	sensor: KlipperAccelSensorName;
}

const isSuccessResponse = (res: unknown): res is JSONRPCResponseSuccess => {
	return res != null && typeof res === 'object' && !('error' in res);
};

const isKlipperAccelSubscriptionResponse = (msg: unknown): msg is KlipperAccelSubscriptionResponse => {
	return klipperADXL345SubscriptionResponseSchema.safeParse(msg).success;
};

const isKlipperAccelSubscriptionData = (msg: unknown): msg is { params: KlipperAccelSubscriptionData } => {
	return (
		isSuccessResponse(msg) &&
		msg.params != null &&
		'data' in msg.params &&
		msg.params != null &&
		Array.isArray(msg.params.data) &&
		Array.isArray(msg.params.data[0]) &&
		msg.params.data[0].length === 4
	);
};

/// JSON.parse('{"test": 1000000000.1010101010101010101010101}', (key, value, context) => {console.log(key, value, context); return value})
// context.source = '1000000000.1010101010101010101010101'

export const createADXL345Stream = (url: string, sensor: KlipperAccelSensorName) => {
	'use client';
	const subject = webSocket({
		url,
		deserializer: (e) => {
			try {
				return JSON.parse(e.data, (key, val, context?: { source?: string }) => {
					// context is a relatively new feature
					if (key === '0' && typeof val === 'number' && context?.source != null) {
						return BigNumber(val);
					}
					return val;
				});
			} catch (e) {
				getLogger().error(e, 'Error parsing JSON from klipper socket');
				return null;
			}
		},
	});

	let header: null | KlipperAccelSubscriptionResponse['header'] = null;

	const dataStream$ = subject
		.multiplex(
			() =>
				({
					jsonrpc: '2.0',
					method: 'adxl345/dump_adxl345',
					params: {
						sensor: sensor,
						response_template: {},
					},
					id: ++id,
				}) satisfies KlipperADXLRequest,
			() => {
				return null;
			},
			(msg) => {
				if ('result' in msg && isKlipperAccelSubscriptionResponse(msg.result)) {
					console.log('subscribed to klippy socket!', msg);
					header = msg.result.header;
					return false;
				}
				if (isKlipperAccelSubscriptionData(msg)) {
					return true;
				}
				if (!isSuccessResponse(msg)) {
					getLogger().error(msg, 'Error in response from adxl345 subscription on klipper socket');
				}
				return false;
			},
		)
		.pipe(
			share(),
			filter((msg): msg is { params: KlipperAccelSubscriptionData } => isKlipperAccelSubscriptionData(msg)),
			map((msg) => {
				return msg.params;
			}),
			share(),
		);

	// Keep a subscription open. The caller will be responsible for closing the stream.
	// This prevents us from rapidly connecting / disconnecting from the socket depending on downstream behavior.
	dataStream$.subscribe();

	return {
		dataStream$,
		close: subject.complete.bind(subject),
	};
};

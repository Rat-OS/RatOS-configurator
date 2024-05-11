'use client';
import useWebSocket from 'react-use-websocket';
import { getHost } from '@/helpers/util';
import {
	InFlightRequestCallbacks,
	InFlightRequestTimeouts,
	JSONRPCResponse,
	JSONRPCResponseSuccess,
} from '@/moonraker/types';
import { MutableRefObject, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { getLogger } from '@/app/_helpers/logger';
import { useKlippyStateHandler } from '@/hooks/useKlippyStateHandler';
import {
	AxisBase2D,
	EDataSeriesType,
	EWatermarkPosition,
	ISciChart2DDefinition,
	NumberRange,
	SciChartSurface,
	TSciChart,
	Thickness,
	XyDataSeries,
	build2DChart,
	easing,
} from 'scichart';
import {
	Rank,
	Scalar,
	Tensor,
	Tensor1D,
	Tensor2D,
	addN,
	concat,
	concat2d,
	div,
	gather,
	reshape,
	setBackend,
	slice,
	split,
	sub,
	tensor1d,
	tensor2d,
	tidy,
	buffer as tfBuffer,
} from '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-backend-wasm';
import { powerSpectralDensity, sumPSDs, welch } from '@/app/analysis/periodogram';
import { ADXL_STREAM_BUFFER_SIZE } from '@/app/analysis/charts';
import { TChartComponentProps } from 'scichart-react/types';
import { ChartTheme } from '@/app/analysis/chart-theme';
import {
	AccumulatedPSD,
	KlipperAccelSubscriptionData,
	KlipperAccelSubscriptionResponse,
	PSD,
	klipperADXL345SubscriptionDataSchema,
	klipperADXL345SubscriptionResponseSchema,
} from '@/zods/analysis';
import { twJoin } from 'tailwind-merge';
import { FullLoadScreen } from '@/components/common/full-load-screen';
import { toast } from 'sonner';
import { AccelerometerType, KlipperAccelSensorName, klipperAccelSensorSchema } from '@/zods/hardware';
import { z } from 'zod';
import { useRecoilValue } from 'recoil';
import { ControlboardState } from '@/recoil/printer';
import { useToolheads } from '@/hooks/useToolheadConfiguration';
import { TensorLike2D } from '@tensorflow/tfjs-core/dist/types';

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

export interface RealtimeADXLOptions {
	onDataUpdate?: (status: KlipperAccelSubscriptionData) => void;
	onSubscriptionFailure?: ReactCallback<(err: Error) => void>;
	onSubscriptionSuccess?: ReactCallback<(header: KlipperAccelSubscriptionResponse['header']) => void>;
	enabled?: boolean;
	sensor: KlipperAccelSensorName;
}

const isSuccessResponse = (res: JSONRPCResponse): res is JSONRPCResponseSuccess => {
	return !('error' in res);
};

export const useAccelerometerWithType = (accelerometerName: KlipperAccelSensorName) => {
	const controlBoard = useRecoilValue(ControlboardState);
	const toolheads = useToolheads();
	let accelType: z.infer<typeof AccelerometerType> = 'adxl345';

	if (accelerometerName === 'controlboard') {
		if (controlBoard?.ADXL345SPI != null) {
			accelType = 'adxl345';
		}
		if (controlBoard?.LIS2DW != null) {
			accelType = 'lis2dw';
		}
	}
	if (accelerometerName === 'toolboard_t0' || accelerometerName === 'toolboard_t1') {
		const toolboard = toolheads.find((t) => t.getToolboardName() === accelerometerName)?.getToolboard();
		if (toolboard == null) {
			throw new Error(`No toolboard found for T0`);
		}
		if (toolboard.ADXL345SPI != null) {
			accelType = 'adxl345';
		}
		if (toolboard.LIS2DW != null) {
			accelType = 'lis2dw';
		}
	}
	if (accelerometerName === 'beacon') {
		accelType = 'beacon';
	}
	return useMemo(
		() =>
			klipperAccelSensorSchema.parse({
				name: accelerometerName,
				type: accelType,
			}),
		[accelerometerName, accelType],
	);
};

export const useRealtimeSensor = <
	ResponseType extends JSONRPCResponse,
	SuccessResponseType extends JSONRPCResponseSuccess,
>(
	options: RealtimeADXLOptions,
) => {
	const [wsUrl, setWsUrl] = useState(getWsURL());
	const inFlightRequests = useRef<InFlightRequestCallbacks<SuccessResponseType['result']>>({});
	const inFlightRequestTimeouts = useRef<InFlightRequestTimeouts>({});
	const [isSubscribed, setIsSubscribed] = useState(false);
	const { onSubscriptionFailure, onDataUpdate, sensor, enabled, onSubscriptionSuccess } = options;
	const parsedSensor = useAccelerometerWithType(sensor);
	const isSubscribedRef = useRef(isSubscribed);
	isSubscribedRef.current = isSubscribed;
	const kippyState = useKlippyStateHandler();
	useEffect(() => {
		setWsUrl(getWsURL());
	}, []);
	const { lastJsonMessage, sendJsonMessage, readyState } = useWebSocket<ResponseType>(
		enabled === false ? null : wsUrl,
		{
			shouldReconnect: (closeEvent) => {
				return true;
			},
			onMessage: (message) => {
				if (onDataUpdate && isSubscribedRef.current) {
					try {
						const parsed = JSON.parse(message.data) as ResponseType;
						if (isSuccessResponse(parsed) && parsed.params != null && 'data' in parsed.params) {
							const res = klipperADXL345SubscriptionDataSchema.parse(parsed.params);
							onDataUpdate?.(res);
						} else if (!isSuccessResponse(parsed)) {
							getLogger().error('Error in response from klipper socket', parsed);
						}
					} catch (e) {
						// eslint-disable-next-line no-console
						console.warn('OnMessage: Failed to parse message', e, message.data);
					}
				}
			},
			reconnectAttempts: Infinity,
			reconnectInterval: 3000,
			share: false,
		},
	);

	const subscribe = useCallback(async () => {
		const id = ++REQ_ID;
		return new Promise<SuccessResponseType['result']>(async (resolve, reject) => {
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
				method:
					parsedSensor.type === 'lis2dw'
						? 'lis2dw/dump_lis2dw'
						: parsedSensor.type === 'beacon'
							? 'beacon/dump_accel'
							: 'adxl345/dump_adxl345',
				params: {
					sensor: parsedSensor.name,
					response_template: {},
				},
				id: id,
			});
		});
	}, [sendJsonMessage, parsedSensor]);

	useEffect(() => {
		if (readyState === 1 && kippyState === 'ready' && !isSubscribedRef.current) {
			subscribe()
				.then((res) => {
					const result = klipperADXL345SubscriptionResponseSchema.parse(res);
					getLogger().info(result, 'Subscribed to ADXL345');
					setIsSubscribed(true);
					onSubscriptionSuccess?.(result.header);
				})
				.catch((err) => {
					getLogger().error(err);
					setIsSubscribed(false);
					if (onSubscriptionFailure) {
						onSubscriptionFailure(err);
					} else {
						toast.error('Failed to start accelerometer stream', { description: err.message });
					}
				});
		} else if (isSubscribedRef.current) {
			setIsSubscribed(false);
		}
	}, [kippyState, readyState, subscribe, onSubscriptionFailure, onSubscriptionSuccess]);

	useEffect(() => {
		if (lastJsonMessage?.id && inFlightRequests.current[lastJsonMessage.id]) {
			window.clearTimeout(inFlightRequestTimeouts.current[lastJsonMessage.id]);
			if (isSuccessResponse(lastJsonMessage)) {
				inFlightRequests.current[lastJsonMessage.id](null, lastJsonMessage.result);
			} else {
				inFlightRequests.current[lastJsonMessage.id](new Error(lastJsonMessage.error.message), null);
			}
			delete inFlightRequestTimeouts.current[lastJsonMessage.id];
			delete inFlightRequests.current[lastJsonMessage.id];
		}
	}, [lastJsonMessage]);

	useEffect(() => {
		// cleanup
		return () => {
			isSubscribedRef.current = false;
			for (const reqId in inFlightRequestTimeouts.current) {
				// eslint-disable-next-line react-hooks/exhaustive-deps
				delete inFlightRequestTimeouts.current[reqId];
				// eslint-disable-next-line react-hooks/exhaustive-deps
				delete inFlightRequests.current[reqId];
			}
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return {
		isSubscribed,
	};
};

const theme = new ChartTheme();
export const useChart = <T,>(
	definition: ISciChart2DDefinition | null,
	initializer?: ReactCallback<(surface: SciChartSurface) => T>,
	indent = true,
) => {
	const surface = useRef<SciChartSurface | null>(null);
	const [isInitialized, setIsInitialized] = useState(false);
	const data = useRef<T | null>(null);
	return useMemo(
		() => ({
			forwardProps: {
				initChart: async (rootElement: string | HTMLDivElement) => {
					let chart: null | { wasmContext: TSciChart; sciChartSurface: SciChartSurface } = null;
					if (definition != null) {
						const orgPadding = definition.surface?.padding;
						const def = {
							...definition,
							surface: {
								...definition.surface,
								padding: new Thickness(
									orgPadding?.top ?? 0,
									orgPadding?.right ?? 0,
									orgPadding?.bottom ?? 0,
									(orgPadding?.left ?? 0) + (indent ? 300 : 0),
								),
							},
						};
						chart = await build2DChart(rootElement, def);
					} else {
						chart = await SciChartSurface.create(rootElement, {
							theme: theme,
							padding: new Thickness(0, 0, 0, indent ? 300 : 0),
						});
					}
					chart.sciChartSurface.watermarkPosition = EWatermarkPosition.BottomLeft;
					chart.sciChartSurface.watermarkRelativeToCanvas = true;
					surface.current = chart.sciChartSurface;
					if (initializer) {
						data.current = initializer(chart.sciChartSurface);
					}

					return { sciChartSurface: chart.sciChartSurface };
				},
				onInit: () => setIsInitialized(true),
				style: {
					marginLeft: indent ? -300 : 0,
				},

				fallback: <FullLoadScreen className={twJoin(indent && 'ml-[150px]', 'bg-zinc-900')} />,
			} satisfies TChartComponentProps,
			surface,
			isInitialized,
			data,
		}),
		[indent, isInitialized, definition, initializer],
	);
};

const defaultAxisMap: KlipperAccelSubscriptionResponse['header'] = [
	`time`,
	`x_acceleration`,
	`y_acceleration`,
	`z_acceleration`,
];

type BufferOptions = {
	strictSampleSize: boolean;
	mode: 'fifo';
	fifoCapacity?: number;
};

const optDefaults: BufferOptions = {
	mode: 'fifo',
	strictSampleSize: false as const,
};

export const useTensorBuffer = <T extends Tensor = Tensor1D, O extends Partial<BufferOptions> = typeof optDefaults>(
	initial: T = tensor1d([], 'float32') as T,
	opts?: Partial<O>,
) => {
	type TakeResult = O['strictSampleSize'] extends true ? T | null : T;
	const { fifoCapacity, mode, strictSampleSize } = { ...optDefaults, ...opts };
	const [dropped, setDropped] = useState(0);
	const buffer = useRef<T>(initial);
	const set = useCallback((val: T) => {
		buffer.current.dispose();
		buffer.current = val;
	}, []);
	const take = useCallback(
		(count: number): TakeResult => {
			const max = Math.min(count, buffer.current.shape[0]);
			if (strictSampleSize === true && max !== count) {
				return null as TakeResult;
			}
			const [out, keep] = split<T>(buffer.current, [max, buffer.current.shape[0] - max], 0);
			set(keep);
			return out;
		},
		[strictSampleSize, set],
	);
	const put = useCallback(
		(val: T) => {
			set(concat([buffer.current, val]));
			if (fifoCapacity != null && buffer.current.shape[0] > fifoCapacity) {
				getLogger().error(`Fifo capacity exceeded, dropping ${buffer.current.shape[0] - fifoCapacity} frames`);
				const drop = buffer.current.shape[0] - fifoCapacity;
				take(drop)?.dispose();
				setDropped((prev) => prev + drop);
			}
			val.dispose();
		},
		[fifoCapacity, set, take],
	);
	const reset = useCallback(() => {
		set(initial);
	}, [initial, set]);
	const dispose = useCallback(() => {
		buffer.current.dispose();
	}, []);
	useEffect(() => {
		return () => {
			dispose();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	if (mode !== 'fifo') {
		throw new Error('Only fifo mode is currently supported');
	}
	return useMemo(
		() => ({
			buffer,
			take,
			put,
			reset,
			dispose,
			dropped,
		}),
		[buffer, take, put, reset, dispose, dropped],
	);
};

const expectedSampleRates = [100, 200, 400, 800, 1600, 3200, 6400, 12800, 25600, 51200];
export const useADXLFifoTensor = (
	dataHeader: KlipperAccelSubscriptionResponse['header'] = defaultAxisMap,
	fifoCapacity: number = 8192,
) => {
	const buffer = useTensorBuffer(tensor2d([], [0, dataHeader.length], 'float32'), {
		fifoCapacity,
		strictSampleSize: true,
	});
	const sampleRate = useRef<number>(0);
	const timeOffset = useRef<number>(0);
	const axisMap = useMemo(() => {
		return [
			dataHeader.findIndex((v) => v.startsWith(`time`)),
			dataHeader.findIndex((v) => v.startsWith(`x`)),
			dataHeader.findIndex((v) => v.startsWith(`y`)),
			dataHeader.findIndex((v) => v.startsWith(`z`)),
		];
	}, [dataHeader]);
	const onData = useCallback(
		(status: KlipperAccelSubscriptionData) => {
			if (timeOffset.current === 0) {
				timeOffset.current = status.data[0][axisMap[0]];
			}
			const incoming = gather<Tensor2D>(
				status.data.map((d) => {
					d[0] = d[0] - timeOffset.current;
					return d;
				}), // 32-bit floating point precision sucks so much..
				axisMap,
				1,
			);
			buffer.put(incoming);
			sampleRate.current = status.data.length / (status.data[status.data.length - 1][0] - status.data[0][0]);
		},
		[axisMap, buffer],
	);
	const closestRealSampleRate = expectedSampleRates.reduce((prev, cur) => {
		if (Math.abs(cur - sampleRate.current) < Math.abs(prev - sampleRate.current)) {
			return cur;
		}
		return prev;
	}, expectedSampleRates[0]);
	return useMemo(
		() => ({
			onData: onData,
			take: buffer.take,
			buffer: buffer.buffer,
			dropped: buffer.dropped,
			sampleRate: sampleRate,
			closestRealSampleRate,
		}),
		[closestRealSampleRate, onData, buffer],
	);
};

export const isXySeries = (series: any): series is XyDataSeries => {
	return series.type === EDataSeriesType.Xy;
};

export const useBufferedADXLSignal = (
	fifoTensor: ReturnType<typeof useADXLFifoTensor>,
	/**
	 * NOTE: Make absolutely sure to dispose of the tensors passed to this function
	 */
	updateFn: null | ((time: Tensor1D, x: Tensor1D, y: Tensor1D, z: Tensor1D) => void),
) => {
	const lastUpdate = useRef<number>(new Date().getTime());
	const update = useRef(updateFn);
	update.current = updateFn;
	const tick = useCallback(async () => {
		const sinceLast = new Date().getTime() - lastUpdate.current;
		const samples = Math.min(Math.ceil(fifoTensor.sampleRate.current * (sinceLast / 1000)), ADXL_STREAM_BUFFER_SIZE);
		// const samples = Math.ceil(fifoTensor.sampleRate.current / 50);
		if (fifoTensor.buffer.current == null || fifoTensor.buffer.current.shape[0] < 5) {
			return;
		}
		let toTake = samples;
		// prevent overflow
		if (fifoTensor.buffer.current.shape[0] > ADXL_STREAM_BUFFER_SIZE * 12) {
			toTake += ADXL_STREAM_BUFFER_SIZE;
		}
		const data = fifoTensor.take(toTake);
		lastUpdate.current = new Date().getTime();
		if (data == null) {
			return;
		}
		const [time, x, y, z] = split<Tensor2D>(data, 4, 1);
		update.current?.(
			reshape(time, [time.shape[0]]),
			reshape(x, [x.shape[0]]),
			reshape(y, [y.shape[0]]),
			reshape(z, [z.shape[0]]),
		);
		time.dispose();
		data.dispose();
		x.dispose();
		y.dispose();
		z.dispose();
	}, [fifoTensor]);
	return tick;
};

export const useBufferedPSD = (sampleRate: number, updateFn: null | ((x: PSD, y: PSD, z: PSD, total: PSD) => void)) => {
	const xref = useRef<Tensor1D>(tensor1d([], 'float32'));
	const yref = useRef<Tensor1D>(tensor1d([], 'float32'));
	const zref = useRef<Tensor1D>(tensor1d([], 'float32'));
	const tref = useRef<Tensor1D>(tensor1d([], 'float32'));
	const update = useRef(updateFn);
	update.current = updateFn;

	const onData = useCallback(
		async (time: Tensor1D, x: Tensor1D, y: Tensor1D, z: Tensor1D, isDetrended?: boolean) => {
			const rate = sampleRate;
			const newX = concat([x, xref.current]);
			const newY = concat([y, yref.current]);
			const newZ = concat([z, zref.current]);
			const newT = concat([time, tref.current]);
			x.dispose();
			y.dispose();
			z.dispose();
			time.dispose();
			xref.current.dispose();
			yref.current.dispose();
			zref.current.dispose();
			xref.current = newX;
			yref.current = newY;
			zref.current = newZ;
			tref.current = newT;
			if (xref.current.shape[0] >= rate) {
				const [xData, xKeep] = split<Tensor1D>(xref.current, [rate, xref.current.shape[0] - rate], 0);
				const [yData, yKeep] = split<Tensor1D>(yref.current, [rate, yref.current.shape[0] - rate], 0);
				const [zData, zKeep] = split<Tensor1D>(zref.current, [rate, zref.current.shape[0] - rate], 0);
				const [tData, tKeep] = split<Tensor1D>(tref.current, [rate, tref.current.shape[0] - rate], 0);
				const realSampleRate = await div<Scalar>(
					tData.shape[0],
					sub<Scalar>(gather<Tensor1D>(tData, 0, 0, 0), gather<Tensor1D>(tData, tData.shape[0] - 1, 0, 0)),
				).array();
				const first = await gather<Tensor1D>(tData, 0, 0, 0).array();
				const last = await gather<Tensor1D>(tData, tData.shape[0] - 1, 0, 0).array();
				// console.log(first, last, realSampleRate, tData.shape[0] / (first - last));
				xref.current.dispose();
				yref.current.dispose();
				zref.current.dispose();
				tref.current.dispose();
				xref.current = xKeep;
				yref.current = yKeep;
				zref.current = zKeep;
				tref.current = tKeep;
				const [xpsd, ypsd, zpsd] = await Promise.all([
					powerSpectralDensity(xData, 3140, { isDetrended: isDetrended }),
					powerSpectralDensity(yData, 3140, { isDetrended: isDetrended }),
					powerSpectralDensity(zData, 3140, { isDetrended: isDetrended }),
				]);
				const totalpsd = sumPSDs([xpsd, ypsd, zpsd]);
				xData.dispose();
				yData.dispose();
				zData.dispose();
				tData.dispose();
				update.current?.(xpsd, ypsd, zpsd, totalpsd);
			}
		},
		[sampleRate],
	);
	return onData;
};

export const useAccumulatedPSD = (updateFn?: (result: AccumulatedPSD) => void) => {
	const [isAccumulating, setIsAccumulating] = useState(false);
	const psds = useRef<{ x: PSD[]; y: PSD[]; z: PSD[]; total: PSD[] }>({ x: [], y: [], z: [], total: [] });
	const update = useRef(updateFn);
	update.current = updateFn;

	const start = useCallback(async () => {
		psds.current = { x: [], y: [], z: [], total: [] };
		setIsAccumulating(true);
	}, []);

	const stop = useCallback(async () => {
		const old = psds.current;
		const [x, y, z, total] = await Promise.all([welch(old.x), welch(old.y), welch(old.z), welch(old.total)]);
		psds.current = { x: [], y: [], z: [], total: [] };
		setIsAccumulating(false);
		return { x, y, z, total, source: old };
	}, []);

	const onData = useCallback(
		async (newX: PSD, newY: PSD, newZ: PSD, newTotal: PSD) => {
			if (!isAccumulating) {
				const result = {
					x: newX,
					y: newY,
					z: newZ,
					total: newTotal,
					source: {
						x: [newX],
						y: [newY],
						z: [newZ],
						total: [newTotal],
					},
				};
				update.current?.(result);
				return result;
			}
			psds.current.x.push(newX);
			psds.current.y.push(newY);
			psds.current.z.push(newZ);
			psds.current.total.push(newTotal);
			const [x, y, z, total] = await Promise.all([
				welch(psds.current.x),
				welch(psds.current.y),
				welch(psds.current.z),
				welch(psds.current.total),
			]);
			const result = { x, y, z, total, source: psds.current };
			update.current?.(result);
			return result;
		},
		[isAccumulating],
	);

	return useMemo(
		() => ({
			startAccumulation: start,
			stopAccumulation: stop,
			onData: onData,
			isAccumulating,
		}),
		[isAccumulating, onData, start, stop],
	);
};
const DEFAULT_FPS = 24;
export function useTicker(tickOrTargetFps?: () => Promise<void>, tick?: undefined): void;
export function useTicker(tickOrTargetFps?: number, tick?: () => Promise<void>): void;
export function useTicker(tickOrTargetFps?: number | (() => Promise<void>), tick?: () => Promise<void>) {
	if (typeof tickOrTargetFps === 'function') {
		tick = tickOrTargetFps;
	}
	const fnRef = useRef(tick);
	fnRef.current = tick;
	const interval = Math.floor(
		1000 / (typeof tickOrTargetFps === 'function' ? DEFAULT_FPS : tickOrTargetFps ?? DEFAULT_FPS),
	);
	const isEnabled = tick != null;
	useEffect(() => {
		if (isEnabled === false) {
			return;
		}
		let id = 0;
		const update = async () => {
			if (fnRef.current == null) {
				return;
			}
			await fnRef.current();
			id = window.setTimeout(update, interval);
		};
		id = window.setTimeout(update, interval);
		return () => {
			window.clearTimeout(id);
		};
	}, [interval, isEnabled]);
}

const maximumRangeUnion = (axis: AxisBase2D | (AxisBase2D | null)[]) => {
	if (Array.isArray(axis)) {
		return axis.reduce((prev, cur) => {
			if (cur == null) {
				return prev;
			}
			const max = cur.getMaximumRange();
			return prev.union(max);
		}, new NumberRange());
	}
	return axis.getMaximumRange();
};
const visibleRangeUnion = (axis: AxisBase2D | (AxisBase2D | null)[]) => {
	if (Array.isArray(axis)) {
		return axis.reduce((prev, cur) => {
			if (cur == null) {
				return prev;
			}
			const max = cur.visibleRange;
			return prev.union(max);
		}, new NumberRange());
	}
	return axis.visibleRange;
};
const growByUnion = (axis: AxisBase2D | (AxisBase2D | null)[]) => {
	if (Array.isArray(axis)) {
		return axis.reduce((prev, cur) => {
			if (cur == null) {
				return prev;
			}
			const max = cur.growBy ?? new NumberRange();
			return prev.union(max);
		}, new NumberRange());
	}
	return axis.growBy;
};

export function useDynamicAxisRange(
	axis: AxisBase2D | (AxisBase2D | null)[] | null,
	minimum: NumberRange = new NumberRange(0, 0),
) {
	const maxRef = useRef<NumberRange | null>(axis ? maximumRangeUnion(axis) : null);
	const lastUpdate = useRef<number>(new Date().getTime());
	const lastChange = useRef<number>(new Date().getTime());

	const update = useCallback(
		(dataRange: NumberRange = minimum) => {
			if (axis == null) {
				return;
			}
			const axes = Array.isArray(axis) ? axis : [axis];
			if (maxRef.current == null) {
				maxRef.current = visibleRangeUnion(axis);
			}
			const sinceLastUpdate = new Date().getTime() - lastUpdate.current;
			const sinceLastChange = new Date().getTime() - lastChange.current;
			lastUpdate.current = new Date().getTime();
			let max = maximumRangeUnion(axis);
			if (dataRange) {
				max = max.union(dataRange);
			}
			const growBy = growByUnion(axis);
			if (growBy) {
				max.growBy(growBy);
			}
			let newMax: null | number = null;
			let newMin: null | number = null;
			if (max.max > maxRef.current.max) {
				newMax = max.max;
			}
			if (max.min < maxRef.current.min) {
				newMin = max.min;
			}
			if (newMax != null || newMin != null) {
				axes.forEach((a) => {
					if (maxRef.current == null || a == null) {
						return;
					}
					const newRange = new NumberRange(
						Math.min(newMin ?? maxRef.current.min, minimum.min),
						Math.max(newMax ?? maxRef.current.max, minimum.max),
					);
					a.animateVisibleRange(newRange, sinceLastUpdate, easing.inOutCirc);
				});
				lastChange.current = new Date().getTime();
				return;
			}
			if (sinceLastChange > sinceLastUpdate * 3) {
				if (max.max < maxRef.current.max) {
					newMax = maxRef.current.max - (maxRef.current.max - max.max);
				}
				if (max.min > maxRef.current.min) {
					newMin = maxRef.current.min + (max.min - maxRef.current.min);
				}
				if (newMax != null || newMin != null) {
					axes.forEach((a) => {
						if (maxRef.current == null || a == null) {
							return;
						}
						const newRange = new NumberRange(
							Math.min(newMin ?? maxRef.current.min, minimum.min),
							Math.max(newMax ?? maxRef.current.max, minimum.max),
						);
						a.animateVisibleRange(newRange, sinceLastUpdate / 2, easing.inOutCirc);
					});
					lastChange.current = new Date().getTime();
					return;
				}
			}
		},
		[axis, minimum],
	);

	return update;
}

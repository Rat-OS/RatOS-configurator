'use client';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
	AxisBase2D,
	EWatermarkPosition,
	ISciChart2DDefinition,
	NumberRange,
	SciChartSurface,
	TSciChart,
	Thickness,
	build2DChart,
	easing,
} from 'scichart';
import { TChartComponentProps } from 'scichart-react/types';
import { ChartTheme } from '@/app/analysis/chart-theme';
import { twJoin } from 'tailwind-merge';
import { FullLoadScreen } from '@/components/common/full-load-screen';
import {
	AccelerometerType,
	KlipperAccelSensorName,
	KlipperAccelSensorSchema,
	klipperAccelSensorSchema,
} from '@/zods/hardware';
import { z } from 'zod';
import { useRecoilValue } from 'recoil';
import { ControlboardState } from '@/recoil/printer';
import { useToolheads } from '@/hooks/useToolheadConfiguration';
import {
	WorkerInput,
	WorkerOutput,
	WorkCommand,
	WorkResult,
	WorkerSignalOutput,
	WorkerPSDOutput,
	WorkerAccumulationResultOuput,
	WorkerAccumulationStarted,
} from '@/app/analysis/_worker';
import { fromWorker } from 'observable-webworker';
import { Subject, animationFrames, buffer, bufferTime, filter, firstValueFrom, map, share, timeout } from 'rxjs';
import { getHost } from '@/helpers/util';
import { PSDResult } from '@/app/analysis/_worker/psd';
import { TypedArrayPSD } from '@/app/analysis/periodogram';
import { PSD } from '@/zods/analysis';

function transformPSD(psd: TypedArrayPSD): PSD {
	const transformed = {
		frequencies: Array.from(psd.frequencies),
		estimates: Array.from(psd.estimates),
		powerRange: psd.powerRange,
	};
	return transformed;
}

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

const input$ = new Subject<WorkerInput>();
const worker = fromWorker<WorkerInput, WorkerOutput>(
	() => new Worker(new URL('@/app/analysis/_worker/index', import.meta.url)),
	input$,
).pipe(share());
export const useWorker = (
	enabled: boolean,
	sensor: KlipperAccelSensorName,
	onResult: ReactCallback<(signal: [Float64Array, Float64Array, Float64Array, Float64Array]) => void>,
	onPSDResult: ReactCallback<(psd: Omit<PSDResult, 'source'>) => void>,
	onError: ReactCallback<(err: Error) => void>,
) => {
	const parsedSensor = useAccelerometerWithType(sensor);
	const [wsUrl, setWsUrl] = useState(getWsURL());
	const isRunningRef = useRef(false);
	const isAccumulatingRef = useRef(false);
	const onResultRef = useRef(onResult);
	onResultRef.current = onResult;
	const onPSDResultRef = useRef(onPSDResult);
	onPSDResultRef.current = onPSDResult;

	const startAccumulation = useCallback(async () => {
		if (isAccumulatingRef.current) {
			throw new Error('Already accumulating');
		}
		const psdRes = firstValueFrom(
			worker.pipe(
				filter((output) => output.type === WorkResult.PSD),
				timeout(5000),
			),
		);
		const res = firstValueFrom(
			worker.pipe(
				filter((output): output is WorkerAccumulationStarted => output.type === WorkResult.ACCUMULATING),
				map(() => true),
				timeout(5000),
			),
		);
		await psdRes;
		input$.next({ type: WorkCommand.START_ACCUMULATION });
		await res;
	}, []);
	const stopAccumulation = useCallback(async () => {
		if (!isAccumulatingRef.current) {
			throw new Error('Not accumulating, cannot stop');
		}
		const res = firstValueFrom(
			worker.pipe(
				filter((output): output is WorkerAccumulationResultOuput => output.type === WorkResult.ACCUMULATED),
				map((output) => {
					return {
						x: transformPSD(output.payload.x),
						y: transformPSD(output.payload.y),
						z: transformPSD(output.payload.z),
						total: transformPSD(output.payload.total),
					};
				}),
				timeout(1000 * 60), // 1 minute timeout
			),
		);
		input$.next({ type: WorkCommand.STOP_ACCUMULATION });
		return await res;
	}, []);
	const streamStarted = useCallback(async () => {
		await new Promise((resolve) => setTimeout(resolve, 10));
		if (isRunningRef.current) {
			return;
		}
		const res = firstValueFrom(
			worker.pipe(
				filter((output): output is WorkerAccumulationResultOuput => output.type === WorkResult.STARTED),
				timeout(5000),
			),
		);
		await res;
	}, []);
	const streamStopped = useCallback(async () => {
		await new Promise((resolve) => setTimeout(resolve, 10));
		if (!isRunningRef.current) {
			return;
		}
		const res = firstValueFrom(
			worker.pipe(
				filter((output): output is WorkerAccumulationResultOuput => output.type === WorkResult.STOPPED),
				timeout(5000),
			),
		);
		await res;
	}, []);
	useEffect(() => {
		setWsUrl(getWsURL());
	}, []);
	useEffect(() => {
		if (enabled && wsUrl != null) {
			const sub = worker.subscribe({
				next: (output) => {
					switch (output.type) {
						case WorkResult.STARTED:
							isRunningRef.current = true;
							break;
						case WorkResult.STOPPED:
							isRunningRef.current = false;
							break;
						case WorkResult.ACCUMULATING:
							isAccumulatingRef.current = true;
							break;
						case WorkResult.ACCUMULATED:
							isAccumulatingRef.current = false;
							break;
						case WorkResult.SAMPLE_RATE:
							break;
						case WorkResult.SPEC_SAMPLE_RATE:
							break;
					}
				},
				error: onError,
			});
			const signalSub = worker
				.pipe(
					filter((output): output is WorkerSignalOutput => output.type === WorkResult.SIGNAL),
					map((output) => new Float64Array(output.payload)),
					buffer(animationFrames()),
					filter((signals) => signals.length > 0),
					map((signals) => {
						const time = new Float64Array(signals.length);
						const x = new Float64Array(signals.length);
						const y = new Float64Array(signals.length);
						const z = new Float64Array(signals.length);
						signals.forEach((signal, i) => {
							time[i] = signal[0];
							x[i] = signal[1];
							y[i] = signal[2];
							z[i] = signal[3];
						});
						return [time, x, y, z] as [Float64Array, Float64Array, Float64Array, Float64Array];
					}),
				)
				.subscribe({
					next: (signal: [Float64Array, Float64Array, Float64Array, Float64Array]) => {
						onResultRef.current(signal);
					},
					error: onError,
				});
			const psdSub = worker
				.pipe(
					filter((output): output is WorkerPSDOutput => output.type === WorkResult.PSD),
					map((output) => output.payload),
				)
				.subscribe({
					next: (psd: Omit<PSDResult, 'source'>) => {
						onPSDResultRef.current(psd);
					},
					error: onError,
				});
			input$.next({ type: WorkCommand.START, payload: { url: wsUrl, sensor: parsedSensor } });
			return () => {
				firstValueFrom(
					worker.pipe(
						filter((output): output is WorkerAccumulationResultOuput => output.type === WorkResult.STOPPED),
						timeout(5000),
					),
				).finally(() => {
					isRunningRef.current = false;
					sub.unsubscribe();
					signalSub.unsubscribe();
					psdSub.unsubscribe();
				});
				input$.next({ type: WorkCommand.STOP });
			};
		}
	}, [enabled, onError, parsedSensor, sensor, wsUrl]);
	return {
		streamStarted,
		streamStopped,
		startAccumulation,
		stopAccumulation,
	};
};

export const useAccelerometerWithType = (accelerometerName: KlipperAccelSensorName): KlipperAccelSensorSchema => {
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

const theme = new ChartTheme();
export const useChart = <T,>(
	definition: ISciChart2DDefinition | null,
	initializer?: ReactCallback<(surface: SciChartSurface) => T>,
	indent = true,
) => {
	const surface = useRef<SciChartSurface | null>(null);
	const [isInitialized, setIsInitialized] = useState(false);
	const initializers = useRef<ReactCallback<(surface: SciChartSurface) => void>[]>([]);
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
						chart = await SciChartSurface.createSingle(rootElement, {
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
				onInit: () => {
					setIsInitialized(true);
					if (surface.current == null) {
						throw new Error('onInit called without surface initialized');
					}
					initializers.current.forEach((init) => init(surface.current!));
				},
				style: {
					marginLeft: indent ? -300 : 0,
				},

				fallback: <FullLoadScreen className={twJoin(indent && 'ml-[150px]', 'bg-zinc-900')} />,
			} satisfies TChartComponentProps,
			surface,
			isInitialized,
			onInitialize: (callback: ReactCallback<(surface: SciChartSurface) => void>) => {
				initializers.current.push(callback);
				if (isInitialized && surface.current != null) {
					callback(surface.current);
				}
			},
			data,
		}),
		[indent, isInitialized, definition, initializer],
	);
};

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
	animationDuration?: number,
) {
	const maxRef = useRef<NumberRange | null>(axis ? maximumRangeUnion(axis) : null);
	const lastUpdate = useRef<number>(performance.now());
	const lastChange = useRef<number>(performance.now());

	const update = useCallback(
		(dataRange: NumberRange = minimum) => {
			if (axis == null) {
				return;
			}
			const axes = Array.isArray(axis) ? axis : [axis];
			if (maxRef.current == null) {
				maxRef.current = visibleRangeUnion(axis);
			}
			const sinceLastUpdate = performance.now() - lastUpdate.current;
			const sinceLastChange = performance.now() - lastChange.current;
			lastUpdate.current = performance.now();
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
			if ((newMax != null || newMin != null) && sinceLastChange > sinceLastUpdate) {
				const bestMin = Math.min(newMin ?? maxRef.current.min, minimum.min);
				const bestMax = Math.max(newMax ?? maxRef.current.max, minimum.max);
				if (bestMin !== maxRef.current.min || bestMax !== maxRef.current.max) {
					maxRef.current = new NumberRange(bestMin, bestMax);
					axes.forEach((a) => {
						if (maxRef.current == null || a == null) {
							return;
						}
						const newRange = new NumberRange(bestMin, bestMax);
						a.animateVisibleRange(newRange, animationDuration ?? sinceLastUpdate, easing.inOutQuad);
					});
					lastChange.current = performance.now();
				}
			}
			if (sinceLastChange > 3000) {
				if (max.max < maxRef.current.max) {
					newMax = maxRef.current.max - (maxRef.current.max - max.max);
				}
				if (max.min > maxRef.current.min) {
					newMin = maxRef.current.min + (max.min - maxRef.current.min);
				}
				const lowestMin = Math.min(newMin ?? maxRef.current.min, minimum.min);
				const lowestMax = Math.max(newMax ?? maxRef.current.max, minimum.max);
				if (lowestMax != maxRef.current.max || lowestMin != maxRef.current.min) {
					axes.forEach((a) => {
						if (maxRef.current == null || a == null) {
							return;
						}
						const newRange = new NumberRange(lowestMin, lowestMax);
						a.animateVisibleRange(newRange, sinceLastChange / 2, easing.inOutQuad);
					});
					maxRef.current = new NumberRange(lowestMin, lowestMax);
					lastChange.current = performance.now();
					return;
				}
			}
		},
		[animationDuration, axis, minimum],
	);

	return update;
}

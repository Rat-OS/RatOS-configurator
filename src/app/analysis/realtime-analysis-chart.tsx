'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { useToolheads } from '@/hooks/useToolheadConfiguration';
import { Card } from '@/components/common/card';
import {
	PSDChartMinimumYVisibleRange,
	PSD_CHART_AXIS_AMPLITUDE_ID,
	useADXLSignalChart,
	usePSDChart,
	ADXL_STREAM_BUFFER_SIZE,
} from '@/app/analysis/charts';
import { twJoin } from 'tailwind-merge';
import { SciChartReact } from 'scichart-react';
import {
	useADXLFifoTensor,
	useAccelerometerWithType,
	useAccumulatedPSD,
	useBufferedADXLSignal,
	useBufferedPSD,
	useDynamicAxisRange,
	useRealtimeSensor,
	useTicker,
} from '@/app/analysis/hooks';
import { LineAnimation, MountainAnimation, NumberRange, SciChartSurface, XyDataSeries, easing } from 'scichart';
import { detrendSignal } from '@/app/analysis/periodogram';
import { FullLoadScreen } from '@/components/common/full-load-screen';
import { KlipperAccelSubscriptionResponse, MacroRecordingSettings } from '@/zods/analysis';
import { useRecoilValue } from 'recoil';
import { ControlboardState } from '@/recoil/printer';
import { toast } from 'sonner';
import { getLogger } from '@/app/_helpers/logger';
import { AccelerometerType, KlipperAccelSensorName } from '@/zods/hardware';
import { z } from 'zod';
import { useQuery } from '@tanstack/react-query';
import { setWasmPaths } from '@tensorflow/tfjs-backend-wasm';
import '@tensorflow/tfjs-backend-cpu';
import { setBackend } from '@tensorflow/tfjs-core';
import {
	WorkerInput,
	WorkerOutput,
	WorkCommand,
	WorkResult,
	WorkerSignalOutput,
	WorkerPSDOutput,
} from '@/app/analysis/_worker';
import { fromWorker } from 'observable-webworker';
import {
	Subject,
	animationFrames,
	buffer,
	bufferTime,
	distinctUntilChanged,
	filter,
	map,
	multicast,
	share,
} from 'rxjs';
import { getHost } from '@/helpers/util';
import { PSDResult } from '@/app/analysis/_worker/psd';

SciChartSurface.configure({
	wasmUrl: '/configure/scichart2d.wasm',
	dataUrl: '/configure/scichart2d.data',
});

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

const detrendFloatSignal = (signal: Float64Array) => {
	const mean = signal.reduce((acc, val) => acc + val, 0) / signal.length;
	for (let i = 0; i < signal.length; i++) {
		signal[i] -= mean;
	}
	return signal;
};

const input$ = new Subject<WorkerInput>();
const worker = fromWorker<WorkerInput, WorkerOutput>(
	() => new Worker(new URL('@/app/analysis/_worker/index', import.meta.url)),
	input$,
).pipe(share());
const signal$ = worker.pipe(
	filter((output): output is WorkerSignalOutput => output.type === WorkResult.SIGNAL),
	map((output) => new Float64Array(output.payload)),
	buffer(animationFrames()), // 24 updates per second
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
	share(),
);
const psd$ = worker.pipe(
	filter((output): output is WorkerPSDOutput => output.type === WorkResult.PSD),
	map((output) => output.payload),
	share(),
);
const useWorker = (
	enabled: boolean,
	sensor: KlipperAccelSensorName,
	onResult: ReactCallback<(signal: [Float64Array, Float64Array, Float64Array, Float64Array]) => void>,
	onPSDResult: ReactCallback<(psd: Omit<PSDResult, 'source'>) => void>,
) => {
	const parsedSensor = useAccelerometerWithType(sensor);
	const [wsUrl, setWsUrl] = useState(getWsURL());
	const [sampleRate, setSampleRate] = useState(0);
	const [specSampleRate, setSpecSampleRate] = useState(0);
	const onResultRef = useRef(onResult);
	onResultRef.current = onResult;
	const onPSDResultRef = useRef(onPSDResult);
	onPSDResultRef.current = onPSDResult;
	useEffect(() => {
		setWsUrl(getWsURL());
	}, []);
	useEffect(() => {
		const subscriber = (signal: [Float64Array, Float64Array, Float64Array, Float64Array]) => {
			onResultRef.current(signal);
		};
		const signalSub = signal$.subscribe(subscriber);
		const psdSubscriber = (psd: Omit<PSDResult, 'source'>) => {
			onPSDResultRef.current(psd);
		};
		const psdSub = psd$.subscribe(psdSubscriber);
		return () => {
			signalSub.unsubscribe();
			psdSub.unsubscribe();
		};
	}, []);
	useEffect(() => {
		if (enabled && wsUrl != null) {
			const sub = worker.subscribe((output) => {
				if (output.type === WorkResult.SAMPLE_RATE) {
					setSampleRate(output.payload);
				} else if (output.type === WorkResult.SPEC_SAMPLE_RATE) {
					setSpecSampleRate(output.payload);
				}
			});
			input$.next({ type: WorkCommand.START, payload: { url: wsUrl, sensor: sensor } });
			return () => {
				input$.next({ type: WorkCommand.STOP });
				sub.unsubscribe();
			};
		}
	}, [enabled, sensor, wsUrl]);
	return {
		sampleRate,
		specSampleRate,
	};
};

export const useRealtimeAnalysisChart = (
	accelerometer?: MacroRecordingSettings['accelerometer'],
	accelerometerType: z.infer<typeof AccelerometerType> = 'adxl345',
) => {
	useQuery(['wasmBackend'], {
		queryFn: async () => {
			setWasmPaths({
				'tfjs-backend-wasm.wasm': '/configure/tfjs-backend-wasm.wasm',
				'tfjs-backend-wasm-simd.wasm': '/configure/tfjs-backend-wasm-simd.wasm',
				'tfjs-backend-wasm-threaded-simd.wasm': '/configure/tfjs-backend-wasm-threaded-simd.wasm',
			});
			await setBackend('webgl');
			return 'wasm';
		},
		suspense: true,
	});
	const [isChartEnabled, _setIsChartEnabled] = useState(false);
	const setIsChartEnabled = useCallback((val: boolean) => {
		_setIsChartEnabled((curVal) => {
			if (curVal === false && val === true) {
				// Reset time since last PSD calculation
				timeSinceLastPsd.current = new Date().getTime();
			}
			return val;
		});
	}, []);
	const [dataHeader, setDataHeader] = useState<KlipperAccelSubscriptionResponse['header'] | undefined>(undefined);
	const toolheads = useToolheads();
	const controlBoard = useRecoilValue(ControlboardState);
	const adxl = accelerometer ?? toolheads[0].getYAccelerometerName();
	const adxlHardwareName =
		(adxl === 'controlboard'
			? controlBoard?.name
			: adxl === 'toolboard_t0'
				? toolheads[0]?.getToolboard()?.name
				: adxl === 'toolboard_t1'
					? toolheads[1]?.getToolboard()?.name
					: adxl === 'rpi'
						? 'Raspberry Pi'
						: 'N/A') ?? 'N/A';
	const psdChart = usePSDChart();
	const xSignalChart = useADXLSignalChart('x');
	const ySignalChart = useADXLSignalChart('y');
	const zSignalChart = useADXLSignalChart('z');

	const xSignalYAxis = xSignalChart.data.current?.yAxis ?? null;
	const ySignalYAxis = ySignalChart.data.current?.yAxis ?? null;
	const zSignalYAxis = zSignalChart.data.current?.yAxis ?? null;
	const signalAxes = useMemo(
		() => [xSignalYAxis, ySignalYAxis, zSignalYAxis],
		[xSignalYAxis, ySignalYAxis, zSignalYAxis],
	);
	const updateSignalChartRange = useDynamicAxisRange(signalAxes, new NumberRange(-5000, 5000), 1000);

	const psdYAxis = psdChart.surface.current?.yAxes.getById(PSD_CHART_AXIS_AMPLITUDE_ID) ?? null;
	const updatePsdChartRange = useDynamicAxisRange(psdYAxis, PSDChartMinimumYVisibleRange);

	const timeSinceLastPsd = useRef<number>(new Date().getTime());

	useEffect(() => {
		if (isChartEnabled) {
			// Reset time since last PSD calculation
			timeSinceLastPsd.current = new Date().getTime();
		}
	}, [isChartEnabled]);

	const updatePSD = useCallback(
		(res: Omit<PSDResult, 'source'>) => {
			const surface = psdChart.surface.current;
			if (surface == null) {
				return;
			}
			const elapsed = new Date().getTime() - timeSinceLastPsd.current;
			timeSinceLastPsd.current = new Date().getTime();
			const animationDS = psdChart.data.current?.animationSeries;
			if (animationDS == null) {
				throw new Error('No animation data series');
			}
			// Log lengths if estimates and frequencies aren't the same length
			if (res.x.frequencies.length !== res.x.estimates.length) {
				getLogger().warn(
					`X estimates and frequencies are not the same length (${res.x.estimates.length} vs ${res.x.frequencies.length})`,
				);
			}
			if (res.y.frequencies.length !== res.y.estimates.length) {
				getLogger().warn(
					`Y estimates and frequencies are not the same length (${res.y.estimates.length} vs ${res.y.frequencies.length})`,
				);
			}
			if (res.z.frequencies.length !== res.z.estimates.length) {
				getLogger().warn(
					`Z estimates and frequencies are not the same length (${res.z.estimates.length} vs ${res.z.frequencies.length})`,
				);
			}
			if (res.total.frequencies.length !== res.total.estimates.length) {
				getLogger().warn(
					`Total estimates and frequencies are not the same length  (${res.total.estimates.length} vs ${res.total.frequencies.length})`,
				);
			}
			if (res.x.frequencies.length !== surface.renderableSeries.getById('x').dataSeries.count()) {
				surface.renderableSeries.getById('x').dataSeries.clear();
				surface.renderableSeries.getById('y').dataSeries.clear();
				surface.renderableSeries.getById('z').dataSeries.clear();
				surface.renderableSeries.getById('total').dataSeries.clear();
				(surface.renderableSeries.getById('x').dataSeries as XyDataSeries).appendRange(
					res.x.frequencies,
					res.x.estimates,
				);
				(surface.renderableSeries.getById('y').dataSeries as XyDataSeries).appendRange(
					res.y.frequencies,
					res.y.estimates,
				);
				(surface.renderableSeries.getById('z').dataSeries as XyDataSeries).appendRange(
					res.z.frequencies,
					res.z.estimates,
				);
				(surface.renderableSeries.getById('total').dataSeries as XyDataSeries).appendRange(
					res.total.frequencies,
					res.total.estimates,
				);
				updatePsdChartRange(new NumberRange(res.total.powerRange.min, res.total.powerRange.max));
				return;
			}
			animationDS.x.clear();
			animationDS.y.clear();
			animationDS.z.clear();
			animationDS.total.clear();
			animationDS.x.appendRange(res.x.frequencies, res.x.estimates);
			animationDS.y.appendRange(res.y.frequencies, res.y.estimates);
			animationDS.z.appendRange(res.z.frequencies, res.z.estimates);
			animationDS.total.appendRange(res.total.frequencies, res.total.estimates);
			surface.renderableSeries
				.getById('x')
				.runAnimation(new LineAnimation({ duration: elapsed, ease: easing.inOutCirc, dataSeries: animationDS.x }));
			surface.renderableSeries
				.getById('y')
				.runAnimation(new LineAnimation({ duration: elapsed, ease: easing.inOutCirc, dataSeries: animationDS.y }));
			surface.renderableSeries
				.getById('z')
				.runAnimation(new LineAnimation({ duration: elapsed, ease: easing.inOutCirc, dataSeries: animationDS.z }));
			surface.renderableSeries
				.getById('total')
				.runAnimation(
					new MountainAnimation({ duration: elapsed, ease: easing.inOutCirc, dataSeries: animationDS.total }),
				);
			updatePsdChartRange(new NumberRange(res.total.powerRange.min, res.total.powerRange.max));
		},
		[psdChart.data, psdChart.surface, updatePsdChartRange],
	);
	const updateSignals = useCallback(
		async ([time, x, y, z]: [Float64Array, Float64Array, Float64Array, Float64Array]) => {
			// Center the signals by subtracting the mean
			const dX = detrendFloatSignal(x);
			const dY = detrendFloatSignal(y);
			const dZ = detrendFloatSignal(z);
			xSignalChart.data.current?.signalData.appendRange(time, dX);
			ySignalChart.data.current?.signalData.appendRange(time, dY);
			zSignalChart.data.current?.signalData.appendRange(time, dZ);
			xSignalChart.data.current?.historyData.appendRange(time, dX);
			ySignalChart.data.current?.historyData.appendRange(time, dY);
			zSignalChart.data.current?.historyData.appendRange(time, dZ);
			updateSignalChartRange();
			// updatePsd(time, dX, dY, dZ, true);
		},
		[updateSignalChartRange, xSignalChart.data, ySignalChart.data, zSignalChart.data],
	);
	// useTicker(fifo.sampleRate.current / ADXL_STREAM_BUFFER_SIZE, isChartEnabled ? updateSignals : undefined);

	useWorker(isChartEnabled, adxl, updateSignals, updatePSD);
	// const updatePsd = useBufferedPSD(worker.specSampleRate, psds.onData);

	// useRealtimeSensor({
	// 	sensor: adxl,
	// 	enabled: isChartEnabled,
	// 	onDataUpdate: fifo.onData,
	// 	onSubscriptionSuccess: useCallback((header: KlipperAccelSubscriptionResponse['header']) => {
	// 		setDataHeader(header);
	// 	}, []),
	// 	onSubscriptionFailure: useCallback(
	// 		(err: Error) => {
	// 			setIsChartEnabled(false);
	// 			toast.error('Failed to subscribe to ADXL345', { description: err.message });
	// 		},
	// 		[setIsChartEnabled],
	// 	),
	// });
	return useMemo(
		() => ({
			isChartEnabled,
			setIsChartEnabled,
			psds: updatePSD,
			currentAccelerometer: adxl,
			currentAccelerometerHardwareName: adxlHardwareName,
			chartProps: {
				xSignalChart,
				ySignalChart,
				zSignalChart,
				psdChart,
			},
		}),
		[
			isChartEnabled,
			setIsChartEnabled,
			updatePSD,
			adxl,
			adxlHardwareName,
			xSignalChart,
			ySignalChart,
			zSignalChart,
			psdChart,
		],
	);
};

type RealtimeAnalysisChartProps = ReturnType<typeof useRealtimeAnalysisChart>['chartProps'];

export const RealtimeAnalysisChart: React.FC<RealtimeAnalysisChartProps> = React.memo(
	({ xSignalChart, ySignalChart, zSignalChart, psdChart }) => {
		return (
			<div className="flex max-h-full min-h-full flex-col space-y-4 @container">
				{/* <Toolbar buttons={toolbarButtons} /> */}
				<div className="grid grid-cols-1 gap-4 @screen-lg:grid-cols-3">
					<Card className="flex max-h-32 min-h-32 overflow-hidden @screen-lg:max-h-72 @screen-lg:min-h-72">
						<h3 className="text-md absolute left-0 right-0 top-0 flex items-center space-x-2 p-4 font-semibold">
							<div className={twJoin('flex-none rounded-full bg-yellow-400/10 p-1 text-yellow-400')}>
								<div className="h-2 w-2 rounded-full bg-current" />
							</div>
							<span className="text-zinc-100">X Signal</span>
						</h3>
						<SciChartReact
							{...xSignalChart.forwardProps}
							className="flex-1 rounded-lg"
							fallback={<FullLoadScreen className="ml-[150px] bg-zinc-900" />}
						/>
					</Card>
					<Card className="flex max-h-32 min-h-32 overflow-hidden @screen-lg:max-h-72 @screen-lg:min-h-72">
						<h3 className="text-md absolute left-0 right-0 top-0 flex items-center space-x-2 p-4 font-semibold">
							<div className={twJoin('flex-none rounded-full bg-sky-400/10 p-1 text-sky-400')}>
								<div className="h-2 w-2 rounded-full bg-current" />
							</div>
							<span className="text-zinc-100">Y Signal</span>
						</h3>
						<SciChartReact
							{...ySignalChart.forwardProps}
							className="flex-1 rounded-lg"
							fallback={<FullLoadScreen className="ml-[150px] bg-zinc-900" />}
						/>
					</Card>
					<Card className="flex max-h-32 min-h-32 overflow-hidden @screen-lg:max-h-72 @screen-lg:min-h-72">
						<h3 className="text-md absolute left-0 right-0 top-0 flex items-center space-x-2 p-4 font-semibold">
							<div className={twJoin('flex-none rounded-full bg-rose-400/10 p-1 text-rose-400')}>
								<div className="h-2 w-2 rounded-full bg-current" />
							</div>
							<span className="text-zinc-100">Z Signal</span>
						</h3>
						<SciChartReact
							{...zSignalChart.forwardProps}
							className="flex-1 rounded-lg"
							fallback={<FullLoadScreen className="ml-[150px] bg-zinc-900" />}
						/>
					</Card>
				</div>
				<Card className="flex flex-1 overflow-hidden">
					<SciChartReact
						{...psdChart.forwardProps}
						className="flex-1"
						fallback={<FullLoadScreen className="ml-[150px] bg-zinc-900" />}
					/>
				</Card>
			</div>
		);
	},
);

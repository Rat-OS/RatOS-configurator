'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';

import { useToolheads } from '@/hooks/useToolheadConfiguration';
import { Card } from '@/components/common/card';
import {
	PSDChartMinimumYVisibleRange,
	PSD_CHART_AXIS_AMPLITUDE_ID,
	useADXLSignalChart,
	usePSDChart,
} from '@/app/analysis/charts';
import { twJoin } from 'tailwind-merge';
import { SciChartReact } from 'scichart-react';
import {
	useADXLFifoTensor,
	useAccumulatedPSD,
	useBufferedADXLSignal,
	useBufferedPSD,
	useDynamicAxisRange,
	useRealtimeADXL,
	useTicker,
} from '@/app/analysis/hooks';
import { MountainAnimation, NumberRange, SciChartSurface, easing } from 'scichart';
import { detrendSignal } from '@/app/analysis/periodogram';
import { FullLoadScreen } from '@/components/common/full-load-screen';

SciChartSurface.configure({
	wasmUrl: '/configure/scichart2d.wasm',
	dataUrl: '/configure/scichart2d.data',
});

export const useRealtimeAnalysisChart = () => {
	const [isChartEnabled, setIsChartEnabled] = useState(false);
	const toolheads = useToolheads();
	const psdChart = usePSDChart();
	const xSignalChart = useADXLSignalChart('x');
	const ySignalChart = useADXLSignalChart('y');
	const zSignalChart = useADXLSignalChart('z');

	const xSignalYAxis = xSignalChart.data.current?.yAxis ?? null;
	const ySignalYAxis = ySignalChart.data.current?.yAxis ?? null;
	const zSignalYAxis = zSignalChart.data.current?.yAxis ?? null;
	const updateSignalChartRange = useDynamicAxisRange([xSignalYAxis, ySignalYAxis, zSignalYAxis]);

	const psdYAxis = psdChart.surface.current?.yAxes.getById(PSD_CHART_AXIS_AMPLITUDE_ID) ?? null;
	const updatePsdChartRange = useDynamicAxisRange(psdYAxis, PSDChartMinimumYVisibleRange);

	const fifo = useADXLFifoTensor();
	const timeSinceLastPsd = useRef<number>(new Date().getTime());

	useEffect(() => {
		if (isChartEnabled) {
			// Reset time since last PSD calculation
			timeSinceLastPsd.current = new Date().getTime();
		}
	}, [isChartEnabled]);

	const psds = useAccumulatedPSD((res) => {
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
			.runAnimation(new MountainAnimation({ duration: elapsed, ease: easing.inOutCirc, dataSeries: animationDS.x }));
		surface.renderableSeries
			.getById('y')
			.runAnimation(new MountainAnimation({ duration: elapsed, ease: easing.inOutCirc, dataSeries: animationDS.y }));
		surface.renderableSeries
			.getById('z')
			.runAnimation(new MountainAnimation({ duration: elapsed, ease: easing.inOutCirc, dataSeries: animationDS.z }));
		surface.renderableSeries
			.getById('total')
			.runAnimation(
				new MountainAnimation({ duration: elapsed, ease: easing.inOutCirc, dataSeries: animationDS.total }),
			);
		updatePsdChartRange(new NumberRange(res.total.powerRange.min, res.total.powerRange.max));
	});
	const updatePsd = useBufferedPSD(fifo.sampleRate, psds.onData);
	const updateSignals = useBufferedADXLSignal(fifo, async (time, x, y, z) => {
		// Center the signals by subtracting the mean
		const dX = detrendSignal(x);
		const dY = detrendSignal(y);
		const dZ = detrendSignal(z);
		x.dispose();
		y.dispose();
		z.dispose();
		Promise.all([time.array(), dX.array(), dY.array(), dZ.array()]).then(([timeData, xData, yData, zData]) => {
			xSignalChart.data.current?.signalData.appendRange(timeData, xData);
			ySignalChart.data.current?.signalData.appendRange(timeData, yData);
			zSignalChart.data.current?.signalData.appendRange(timeData, zData);
			xSignalChart.data.current?.historyData.appendRange(timeData, xData);
			ySignalChart.data.current?.historyData.appendRange(timeData, yData);
			zSignalChart.data.current?.historyData.appendRange(timeData, zData);
		});
		updateSignalChartRange();
		updatePsd(time, dX, dY, dZ, true);
	});
	useTicker(updateSignals);

	useRealtimeADXL({
		sensor: toolheads[0].getYAccelerometerName(),
		enabled: isChartEnabled,
		onDataUpdate: fifo.onData,
	});
	return useMemo(
		() => ({
			isChartEnabled,
			setIsChartEnabled,
			psds,
			chartProps: {
				xSignalChart,
				ySignalChart,
				zSignalChart,
				psdChart,
			},
		}),
		[isChartEnabled, psds, xSignalChart, ySignalChart, zSignalChart, psdChart],
	);
};

type RealtimeAnalysisChartProps = ReturnType<typeof useRealtimeAnalysisChart>['chartProps'];

export const RealtimeAnalysisChart: React.FC<RealtimeAnalysisChartProps> = ({
	xSignalChart,
	ySignalChart,
	zSignalChart,
	psdChart,
}) => {
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
};

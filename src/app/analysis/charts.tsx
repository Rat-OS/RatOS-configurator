'use client';
import { tensor1d, concat, slice1d } from '@tensorflow/tfjs-core';
import {
	XyDataSeries,
	SciChartSurface,
	Thickness,
	EWatermarkPosition,
	NumericAxis,
	EAutoRange,
	NumberRange,
	EAxisAlignment,
	FastLineRenderableSeries,
	TextAnnotation,
	ECoordinateMode,
	EHorizontalAnchorPoint,
	EVerticalAnchorPoint,
	ENumericFormat,
	easing,
	FastMountainRenderableSeries,
	PaletteFactory,
	GradientParams,
	MountainAnimation,
	Point,
} from 'scichart';
import { ToolheadHelper } from '../../helpers/toolhead';
import { ChartTheme } from './chart-theme';
import { PSD, powerSpectralDensity, welch } from './periodogram';

import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../../tailwind.config';
import { useRef, useEffect, useCallback, useState } from 'react';
import { useRealtimeADXL } from './hooks';
import { useCallbackRef } from 'use-callback-ref';
const fullConfig = resolveConfig(tailwindConfig);

const ADXL_STREAM_BUFFER_SIZE = 128;
SciChartSurface.UseCommunityLicense();

export const useAnalysisCharts = (toolhead: ToolheadHelper<boolean>, enabled: boolean = true) => {
	const [chartsReady, setChartsReady] = useState(false);
	const [startAccumulation, setStartAccumulation] = useState<null | (() => Promise<void>)>(null);
	const [stopAccumulation, setStopAccumulation] = useState<null | (() => Promise<PSD>)>(null);
	const checkCharts = () => {
		if (
			accelChartElRefX.current != null &&
			accelChartElRefY.current != null &&
			accelChartElRefZ.current != null &&
			PSDChartElRef.current != null
		) {
			setChartsReady(true);
		} else {
			setChartsReady(false);
		}
	};
	const accelChartElRefX = useCallbackRef<HTMLDivElement>(null, checkCharts);
	const accelChartElRefY = useCallbackRef<HTMLDivElement>(null, checkCharts);
	const accelChartElRefZ = useCallbackRef<HTMLDivElement>(null, checkCharts);
	const PSDChartElRef = useCallbackRef<HTMLDivElement>(null, checkCharts);
	const dataBuffer = useRef<[number, number, number, number][]>([]);
	const accelChartRef = useRef<{
		charts: { x: SciChartSurface | null; y: SciChartSurface | null; z: SciChartSurface | null };
		accelDS: { x: XyDataSeries | null; y: XyDataSeries | null; z: XyDataSeries | null };
		historyDS: { x: XyDataSeries | null; y: XyDataSeries | null; z: XyDataSeries | null };
	}>();
	const fftChart = useRef<SciChartSurface | null>(null);
	const dispose = useRef<() => void>(() => {});
	const labels = useRealtimeADXL({
		enabled: chartsReady && enabled,
		onDataUpdate(status) {
			if (accelChartRef.current == null) {
				if (dataBuffer.current.length > 0) {
					dataBuffer.current = [];
				}
				return;
			}
			dataBuffer.current.push(...status.data);
		},
		sensor: toolhead.getYAccelerometerName(),
	});

	useEffect(() => {
		if (
			!chartsReady ||
			accelChartElRefX.current == null ||
			accelChartElRefY.current == null ||
			accelChartElRefZ.current == null ||
			PSDChartElRef.current == null
		) {
			return;
		}
		dataBuffer.current = [];
		const chartInitializationPromise = initializeCharts(
			{
				x: accelChartElRefX.current,
				y: accelChartElRefY.current,
				z: accelChartElRefZ.current,
				psd: PSDChartElRef.current,
			},
			toolhead,
			dataBuffer.current,
		).then((res) => {
			accelChartRef.current = res.accelCharts;
			fftChart.current = res.fftChart;
			dispose.current = res.dispose;
			setStartAccumulation(() => res.startAccumulation);
			setStopAccumulation(() => res.stopAccumulation);
		});

		// Delete sciChartSurface on unmount component to prevent memory leak
		return () => {
			// check if chart is already initialized
			if (accelChartRef.current != null) {
				accelChartRef.current.charts.x?.delete();
				accelChartRef.current.charts.y?.delete();
				accelChartRef.current.charts.z?.delete();
				fftChart.current?.delete();
				dispose.current();
				return;
			}
			// else postpone deletion
			chartInitializationPromise.then(() => {
				accelChartRef.current?.charts.x?.delete();
				accelChartRef.current?.charts.y?.delete();
				accelChartRef.current?.charts.z?.delete();
				fftChart.current?.delete();
				dispose.current();
			});
		};
	}, [PSDChartElRef, accelChartElRefX, accelChartElRefY, accelChartElRefZ, chartsReady, toolhead]);

	return {
		xRef: accelChartElRefX,
		yRef: accelChartElRefY,
		zRef: accelChartElRefZ,
		psdRef: PSDChartElRef,
		startAccumulation,
		stopAccumulation,
	};
};

export const initializeCharts = async (
	chartEls: { x: HTMLDivElement; y: HTMLDivElement; z: HTMLDivElement; psd: HTMLDivElement },
	toolhead: ToolheadHelper<any>,
	dataBuffer: [number, number, number, number][],
) => {
	const historyCount = 200;

	let accelDS: {
		x: null | XyDataSeries;
		y: null | XyDataSeries;
		z: null | XyDataSeries;
	} = {
		x: null,
		y: null,
		z: null,
	};
	let historyDS: {
		x: null | XyDataSeries;
		y: null | XyDataSeries;
		z: null | XyDataSeries;
	} = {
		x: null,
		y: null,
		z: null,
	};
	let fftDS: XyDataSeries;

	const theme = new ChartTheme();
	// Realtime Accelerometer Chart
	const initAccelChart = async () => {
		// Create a chart for the audio
		const surfaces: { x: SciChartSurface | null; y: SciChartSurface | null; z: SciChartSurface | null } = {
			x: null,
			y: null,
			z: null,
		};
		for await (const axis of ['x', 'y', 'z'] as const) {
			const { sciChartSurface: surface, wasmContext } = await SciChartSurface.create(chartEls[axis], {
				id: `accel-${axis}`,
				theme: theme,
				padding: Thickness.fromString('0, 0, 0, 300'),
			});
			surface.watermarkRelativeToCanvas = true;
			surface.watermarkPosition = EWatermarkPosition.BottomLeft;
			const color =
				axis === 'x'
					? fullConfig.theme.colors.brand[500]
					: axis === 'y'
						? fullConfig.theme.colors.sky[500]
						: fullConfig.theme.colors.pink[500];
			// Create an XAxis for the live audio
			const xAxis = new NumericAxis(wasmContext, {
				id: 'accelXaxis-' + axis,
				autoRange: EAutoRange.Always,
				drawLabels: false,
				drawMinorTickLines: false,
				drawMajorTickLines: false,
				drawMajorBands: false,
				drawMinorGridLines: false,
				drawMajorGridLines: false,
			});
			surface.xAxes.add(xAxis);

			// Create an XAxis for the history of the audio on the same chart
			const xhistAxis = new NumericAxis(wasmContext, {
				id: 'history' + axis,
				autoRange: EAutoRange.Always,
				drawLabels: false,
				drawMinorGridLines: false,
				drawMajorTickLines: false,
			});
			surface.xAxes.add(xhistAxis);

			// Create a YAxis for the audio data
			const yAxis = new NumericAxis(wasmContext, {
				autoRange: EAutoRange.Never,
				visibleRange: new NumberRange(-15000, 15000), // [short.MIN. short.MAX]
				drawLabels: false,
				id: 'accel' + axis,
				drawMinorTickLines: false,
				drawMajorTickLines: false,
				drawMajorBands: false,
				drawMinorGridLines: false,
				drawMajorGridLines: false,
				axisAlignment: EAxisAlignment.Left,
			});
			surface.yAxes.add(yAxis);

			// Initializing a series with fifoCapacity enables scrolling behaviour and auto discarding old data
			const accelData = new XyDataSeries(wasmContext, {
				fifoCapacity: ADXL_STREAM_BUFFER_SIZE,
				containsNaN: false,
				isSorted: true,
				dataSeriesName: axis.toLocaleUpperCase(),
				dataIsSortedInX: true,
				xValues: Array(ADXL_STREAM_BUFFER_SIZE)
					.fill(0)
					.map((_, i) => i),
				yValues: Array(ADXL_STREAM_BUFFER_SIZE).fill(0),
			});
			accelDS[axis] = accelData;

			// Add a line series for the live audio data
			// using XAxisId=audio for the live audio trace scaling
			const rsX = new FastLineRenderableSeries(wasmContext, {
				xAxisId: 'accelXaxis-' + axis,
				yAxisId: 'accel' + axis,
				stroke: color,
				strokeThickness: 2,
				dataSeries: accelData,
			});

			surface.renderableSeries.add(rsX);

			// Initializing a series with fifoCapacity enables scrolling behaviour and auto discarding old data.
			const historyData = new XyDataSeries(wasmContext, {
				fifoCapacity: ADXL_STREAM_BUFFER_SIZE * historyCount,
				containsNaN: false,
				isSorted: true,
				dataSeriesName: axis.toLocaleUpperCase() + ' History',
				dataIsSortedInX: true,
				xValues: Array(ADXL_STREAM_BUFFER_SIZE * historyCount)
					.fill(0)
					.map((_, i) => i),
				yValues: Array(ADXL_STREAM_BUFFER_SIZE * historyCount).fill(0),
			});
			historyDS[axis] = historyData;

			// Add a line series for the historical audio data
			// using the XAxisId=history for separate scaling for this trace
			const histrsX = new FastLineRenderableSeries(wasmContext, {
				stroke: color + '22',
				strokeThickness: 1,
				opacity: 0.6,
				yAxisId: 'accel' + axis,
				xAxisId: 'history' + axis,
				dataSeries: historyData,
			});
			surface.renderableSeries.add(histrsX);

			const helpText = new TextAnnotation({
				x1: 15,
				y1: 15,
				xAxisId: 'history' + axis,
				yAxisId: 'accel' + axis,
				xCoordinateMode: ECoordinateMode.Pixel,
				yCoordinateMode: ECoordinateMode.Pixel,
				horizontalAnchorPoint: EHorizontalAnchorPoint.Left,
				verticalAnchorPoint: EVerticalAnchorPoint.Top,
				textColor: '#FFFFFF88',
				fontFamily: 'Inter',
				fontWeight: '600',
				fontSize: 13,
				text: toolhead.getToolCommand() + ' ADXL345 ' + axis.toUpperCase(),
			});
			surface.annotations.add(helpText);
			surfaces[axis] = surface;
		}

		return {
			charts: surfaces,
			accelDS,
			historyDS,
		};
	};

	// FFT CHART
	const initFftChart = async () => {
		const { sciChartSurface, wasmContext } = await SciChartSurface.create(chartEls.psd, {
			theme,
		});
		const xAxis = new NumericAxis(wasmContext, {
			visibleRange: new NumberRange(0, 200),
			axisTitleStyle: { fontSize: 10 },
			drawMinorGridLines: false,
			drawMinorTickLines: false,
			drawMajorTickLines: false,
		});
		sciChartSurface.xAxes.add(xAxis);

		let oldMax = 1500;
		const yAxis = new NumericAxis(wasmContext, {
			axisAlignment: EAxisAlignment.Left,
			growBy: new NumberRange(0, 0.1),
			visibleRange: new NumberRange(0, oldMax),
			labelFormat: ENumericFormat.Exponential,
			autoRangeAnimation: {
				duration: 140,
				animateInitialRanging: false,
				animateSubsequentRanging: true,
				easing: easing.inOutCubic,
			},
			drawMinorGridLines: false,
			drawMinorTickLines: false,
			drawMajorTickLines: false,
			axisTitleStyle: { fontSize: 10 },
		});
		sciChartSurface.yAxes.add(yAxis);
		fftDS = new XyDataSeries(wasmContext, {
			containsNaN: false,
			isSorted: true,
			xValues: Array(130)
				.fill(0)
				.map((_, i) => Math.floor((i / 130) * 200)),
			yValues: Array(130)
				.fill(0)
				.map((_, i) => 0),
		});

		// Make a column chart with a gradient palette on the stroke only
		const rs = new FastMountainRenderableSeries(wasmContext, {
			dataSeries: fftDS,
			// pointMarker: new EllipsePointMarker(wasmContext, {
			// 	width: 9,
			// 	height: 9,
			// 	fill: fullConfig.theme.colors.brand[500] + '88',
			// }),
			strokeThickness: 3,
			paletteProvider: PaletteFactory.createGradient(
				wasmContext,
				new GradientParams(new Point(0, 0), new Point(1, 1), [
					{ offset: 0, color: fullConfig.theme.colors.sky[400] },
					{ offset: 0.8, color: fullConfig.theme.colors.pink[500] },
				]),
				{
					enableStroke: true,
					enableFill: true,
					fillOpacity: 0.17,
					pointMarkerOpacity: 0.5,
				},
			),
		});
		sciChartSurface.renderableSeries.add(rs);

		// create a temp series for passing animation values
		const animationSeries = new XyDataSeries(wasmContext, { fifoCapacity: 130 });
		// register this so it is deleted along with the main surface
		sciChartSurface.addDeletable(animationSeries);
		let lastMaxChange = Date.now();
		const setData = (data: PSD, timeSince: number) => {
			// Set the values on the temp series
			const elapsed = Date.now() - timeSince;
			const timeSinceMaxChange = Date.now() - lastMaxChange;
			animationSeries.clear();
			animationSeries.appendRange(data.frequencies, data.estimates);
			const newMax = Math.max(...data.estimates) * 1.1; // grow by 0.1;
			if (newMax > oldMax) {
				oldMax = newMax;
				oldMax = Math.max(oldMax, 1500);
				yAxis.animateVisibleRange(new NumberRange(0, oldMax), elapsed, easing.inOutCirc);
				lastMaxChange = Date.now();
			} else if (timeSinceMaxChange > elapsed * 5) {
				// Reduce max if no new max has been found in a while
				oldMax = oldMax - (oldMax - newMax);
				oldMax = Math.max(oldMax, 1500);
				lastMaxChange = Date.now();
				yAxis.animateVisibleRange(new NumberRange(0, oldMax), elapsed / 2, easing.inOutCirc);
			}
			rs.runAnimation(
				new MountainAnimation({
					duration: elapsed,
					ease: easing.inOutCirc,
					// Do not create a new DataSeries here or it will leak and eventually crash.
					dataSeries: animationSeries,
				}),
			);
		};

		return { chart: sciChartSurface, setData };
	};

	const accelCharts = await initAccelChart();
	const { chart: fftChart, setData: setFftChartData } = await initFftChart();

	const sampleRate = 3200;
	let isRunningFFT = false;
	let yDataTotal = tensor1d([]);
	let timerId: number;
	let timeSinceFFT = Date.now();
	let timeSinceLastUpdate = Date.now();
	const psds: PSD[] = [];
	let accumulate = false;
	const updateChart = () => {
		if (chartEls.x == null || chartEls.y == null || chartEls.z == null) {
			return;
		}
		timerId = window.setTimeout(updateChart, 16);
		const fps = Math.round(1000 / (Date.now() - timeSinceLastUpdate));
		timeSinceLastUpdate = Date.now();
		if (dataBuffer.length < ADXL_STREAM_BUFFER_SIZE / 2) {
			return;
		}
		let newData = dataBuffer.splice(0, ADXL_STREAM_BUFFER_SIZE / 2);
		if (dataBuffer.length > ADXL_STREAM_BUFFER_SIZE * 12) {
			newData = newData.concat(dataBuffer.splice(0, ADXL_STREAM_BUFFER_SIZE));
		}
		if (dataBuffer.length > ADXL_STREAM_BUFFER_SIZE * 24) {
			console.warn('Data buffer is overflowing, clearing.');
			dataBuffer.splice(0, dataBuffer.length);
		}
		const xData: number[] = [];
		const yDataX: number[] = [];
		const yDataY: number[] = [];
		const yDataZ: number[] = [];
		const yDataAgg: number[] = [];
		newData.forEach((d) => {
			xData.push(d[0]);
			yDataX.push(d[1]);
			yDataY.push(d[2]);
			yDataZ.push(d[3]);
			yDataAgg.push(d[1] + d[2] + d[3]);
		});
		yDataTotal = concat([yDataTotal, tensor1d(yDataAgg)]);

		// Update accel Chart. When fifoCapacity is set, data automatically scrolls
		accelCharts.accelDS.x?.appendRange(xData, yDataX);
		accelCharts.accelDS.y?.appendRange(xData, yDataY);
		accelCharts.accelDS.z?.appendRange(xData, yDataZ);

		// Update History. When fifoCapacity is set, data automatically scrolls
		accelCharts.historyDS.x?.appendRange(xData, yDataX);
		accelCharts.historyDS.y?.appendRange(xData, yDataY);
		accelCharts.historyDS.z?.appendRange(xData, yDataZ);
		const rate = Math.round(xData.length / (xData[xData.length - 1] - xData[0]));
		if (yDataTotal.size > sampleRate && !isRunningFFT) {
			isRunningFFT = true;
			powerSpectralDensity(slice1d(yDataTotal, yDataTotal.size - rate, rate), rate).then((psd) => {
				// Update FFT Chart. Clear() and appendRange() is a fast replace for data (if same size)
				if (accumulate) {
					psds.push(psd);
					welch(psds).then((fftData) => {
						setFftChartData(fftData, timeSinceFFT);
						yDataTotal.dispose();
						yDataTotal = tensor1d([]);
						isRunningFFT = false;
						timeSinceFFT = Date.now();
					});
				} else {
					setFftChartData(psd, timeSinceFFT);
					yDataTotal.dispose();
					yDataTotal = tensor1d([]);
					isRunningFFT = false;
					timeSinceFFT = Date.now();
				}
			});
		}
	};
	updateChart();

	const dispose = () => {
		clearTimeout(timerId);
		accelCharts.charts.x?.delete();
		accelCharts.charts.y?.delete();
		accelCharts.charts.z?.delete();
		fftChart.delete();
		yDataTotal.dispose();
	};

	const startAccumulation = async () => {
		if (accumulate === true) {
			throw new Error("Can't start accumulation, it's already running");
		}
		accumulate = true;
	};

	const stopAccumulation = async () => {
		if (accumulate !== true) {
			throw new Error("Can't stop accumulation, it's not running");
		}
		accumulate = false;
		const result = await welch(psds);
		psds.splice(0, psds.length);
		return result;
	};

	return { accelCharts, fftChart, dispose, startAccumulation, stopAccumulation };
};

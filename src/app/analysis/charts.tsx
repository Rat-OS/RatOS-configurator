'use client';
import {
	XyDataSeries,
	SciChartSurface,
	Thickness,
	NumericAxis,
	EAutoRange,
	NumberRange,
	EAxisAlignment,
	FastLineRenderableSeries,
	ENumericFormat,
	easing,
	FastMountainRenderableSeries,
	PaletteFactory,
	GradientParams,
	Point,
	ISciChart2DDefinition,
	EAxisType,
	ESeriesType,
	WaveAnimation,
	CategoryAxis,
	GlowEffect,
} from 'scichart';
import { useChart } from '@/app/analysis/hooks';
import { ChartTheme } from '@/app/analysis/chart-theme';

import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '@/tailwind.config';
const fullConfig = resolveConfig(tailwindConfig);

export const ADXL_STREAM_BUFFER_SIZE = 128;
const historyCount = 200;

SciChartSurface.UseCommunityLicense();
const theme = new ChartTheme();

export const SIGNAL_CHART_AXIS_SIGNAL_ID = 'signal';
export const SIGNAL_CHART_AXIS_HISTORY_ID = 'history';
export const SIGNAL_CHART_SERIES_SIGNAL_ID = 'signal-series';
export const SIGNAL_CHART_SERIES_HISTORY_ID = 'history-series';
export const SIGNAL_CHART_AXIS_AMPLITUDE_ID = 'amplitude';
const PSDLength = 131;

type ADXLAxes = 'x' | 'y' | 'z';

export const getAxisColor = (axis: ADXLAxes) => {
	switch (axis) {
		case 'x':
			return fullConfig.theme.colors.yellow;
		case 'y':
			return fullConfig.theme.colors.sky;
		case 'z':
			return fullConfig.theme.colors.rose;
	}
};

export const SignalChartMinimumRange = new NumberRange(-10000, 10000);

export const useADXLSignalChart = (axis: ADXLAxes) => {
	return useChart(null, (surface) => {
		const color = getAxisColor(axis);
		// Category axis as the actual time doesn't matter (samples are evenly spaced).
		const xAxis = new CategoryAxis(surface.webAssemblyContext2D, {
			id: SIGNAL_CHART_AXIS_SIGNAL_ID + axis,
			autoRange: EAutoRange.Always,
			maxAutoTicks: ADXL_STREAM_BUFFER_SIZE,
			isInnerAxis: true,
			drawLabels: false,
			drawMinorTickLines: false,
			drawMajorTickLines: false,
			drawMajorBands: false,
			drawMinorGridLines: false,
			drawMajorGridLines: false,
		});
		surface.xAxes.add(xAxis);

		// Category axis as the actual time doesn't matter (samples are evenly spaced).
		const xHistoryAxis = new CategoryAxis(surface.webAssemblyContext2D, {
			id: SIGNAL_CHART_AXIS_HISTORY_ID + axis,
			autoRange: EAutoRange.Always,
			drawLabels: false,
			drawMinorGridLines: false,
			drawMajorTickLines: false,
		});
		surface.xAxes.add(xHistoryAxis);

		const yAxis = new NumericAxis(surface.webAssemblyContext2D, {
			autoRange: EAutoRange.Never,
			visibleRange: new NumberRange(-1000, 1000),
			drawLabels: false,
			id: SIGNAL_CHART_AXIS_AMPLITUDE_ID + axis,
			drawMinorTickLines: false,
			drawMajorTickLines: false,
			drawMajorBands: false,
			drawMinorGridLines: false,
			drawMajorGridLines: false,
			axisAlignment: EAxisAlignment.Left,
		});
		surface.yAxes.add(yAxis);

		const signalData = new XyDataSeries(surface.webAssemblyContext2D, {
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

		// Line series to render the live signal data.
		const signalSeries = new FastLineRenderableSeries(surface.webAssemblyContext2D, {
			xAxisId: SIGNAL_CHART_AXIS_SIGNAL_ID + axis,
			yAxisId: SIGNAL_CHART_AXIS_AMPLITUDE_ID + axis,
			stroke: color[400],
			strokeThickness: 2,
			dataSeries: signalData,
			effect: new GlowEffect(surface.webAssemblyContext2D, {
				intensity: 2,
				range: 1.2,
			}),
		});

		surface.renderableSeries.add(signalSeries);

		const historyData = new XyDataSeries(surface.webAssemblyContext2D, {
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

		// Line series to render the historical signal data (last 200 buffers)
		const HistorySeries = new FastLineRenderableSeries(surface.webAssemblyContext2D, {
			stroke: color[500] + '22',
			strokeThickness: 1,
			opacity: 0.6,
			yAxisId: SIGNAL_CHART_AXIS_AMPLITUDE_ID + axis,
			xAxisId: SIGNAL_CHART_AXIS_HISTORY_ID + axis,
			dataSeries: historyData,
		});
		surface.renderableSeries.add(HistorySeries);

		return {
			signalData: signalData,
			signalSeries: signalSeries,
			historyData: historyData,
			historySeries: HistorySeries,
			xAxis,
			xHistoryAxis,
			yAxis,
		};
	});
};

export const PSD_CHART_AXIS_AMPLITUDE_ID = 'amplitude';
export const PSDChartMinimumYVisibleRange = new NumberRange(0, 1500);
export const PSDChartDefinition: ISciChart2DDefinition = {
	surface: {
		theme: theme,
		padding: Thickness.fromNumber(15),
	},
	xAxes: [
		{
			type: EAxisType.NumericAxis,
			options: {
				visibleRange: new NumberRange(0, 200),
				axisTitleStyle: { fontSize: 10 },
				drawMinorGridLines: false,
				drawMinorTickLines: false,
				drawMajorTickLines: false,
			},
		},
	],
	yAxes: [
		{
			type: EAxisType.NumericAxis,
			options: {
				id: PSD_CHART_AXIS_AMPLITUDE_ID,
				axisAlignment: EAxisAlignment.Left,
				growBy: new NumberRange(0, 0.1),
				visibleRange: PSDChartMinimumYVisibleRange,
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
			},
		},
	],
	series: [
		{
			type: ESeriesType.MountainSeries,
			options: {
				id: 'total',
				yAxisId: PSD_CHART_AXIS_AMPLITUDE_ID,
				strokeThickness: 3,
				fill: fullConfig.theme.colors.brand[500] + '22',
				stroke: fullConfig.theme.colors.brand[400],
			},
			xyData: {
				containsNaN: false,
				isSorted: true,
				xValues: Array(PSDLength)
					.fill(0)
					.map((_, i) => Math.floor((i / PSDLength) * 200)),
				yValues: Array(PSDLength)
					.fill(0)
					.map((_, i) => 0),
			},
		},
		{
			type: ESeriesType.MountainSeries,
			options: {
				id: 'z',
				yAxisId: PSD_CHART_AXIS_AMPLITUDE_ID,
				strokeThickness: 3,
				fill: 'transparent',
				stroke: getAxisColor('z')[400],
			},
			xyData: {
				containsNaN: false,
				isSorted: true,
				xValues: Array(PSDLength)
					.fill(0)
					.map((_, i) => Math.floor((i / PSDLength) * 200)),
				yValues: Array(PSDLength)
					.fill(0)
					.map((_, i) => 0),
			},
		},
		{
			type: ESeriesType.MountainSeries,
			options: {
				id: 'y',
				yAxisId: PSD_CHART_AXIS_AMPLITUDE_ID,
				strokeThickness: 3,
				fill: 'transparent',
				stroke: getAxisColor('y')[400],
			},
			xyData: {
				containsNaN: false,
				isSorted: true,
				xValues: Array(PSDLength)
					.fill(0)
					.map((_, i) => Math.floor((i / PSDLength) * 200)),
				yValues: Array(PSDLength)
					.fill(0)
					.map((_, i) => 0),
			},
		},
		{
			type: ESeriesType.MountainSeries,
			options: {
				id: 'x',
				yAxisId: PSD_CHART_AXIS_AMPLITUDE_ID,
				strokeThickness: 3,
				fill: 'transparent',
				stroke: getAxisColor('x')[400],
			},
			xyData: {
				containsNaN: false,
				isSorted: true,
				xValues: Array(PSDLength)
					.fill(0)
					.map((_, i) => Math.floor((i / PSDLength) * 200)),
				yValues: Array(PSDLength)
					.fill(0)
					.map((_, i) => 0),
			},
		},
	],
};

export const usePSDChart = () => {
	return useChart(PSDChartDefinition, (surface) => {
		const xAnimationSeries = new XyDataSeries(surface.webAssemblyContext2D, {
			id: 'xAnimationSeries',
			containsNaN: false,
			isSorted: true,
			dataIsSortedInX: true,
		});
		surface.addDeletable(xAnimationSeries);
		const yAnimationSeries = new XyDataSeries(surface.webAssemblyContext2D, {
			id: 'yAnimationSeries',
			containsNaN: false,
			isSorted: true,
			dataIsSortedInX: true,
		});
		surface.addDeletable(yAnimationSeries);
		const zAnimationSeries = new XyDataSeries(surface.webAssemblyContext2D, {
			id: 'zAnimationSeries',
			containsNaN: false,
			isSorted: true,
			dataIsSortedInX: true,
		});
		surface.addDeletable(zAnimationSeries);
		const totalAnimationSeries = new XyDataSeries(surface.webAssemblyContext2D, {
			id: 'totalAnimationSeries',
			containsNaN: false,
			isSorted: true,
			dataIsSortedInX: true,
		});
		surface.addDeletable(totalAnimationSeries);
		(surface.renderableSeries.asArray() as FastMountainRenderableSeries[]).forEach((rs) => {
			if (rs.id === 'total') {
				rs.paletteProvider = PaletteFactory.createGradient(
					surface.webAssemblyContext2D,
					new GradientParams(new Point(0, 0), new Point(1, 1), [
						{ offset: 0, color: fullConfig.theme.colors.brand[400] },
						{ offset: 0.8, color: fullConfig.theme.colors.brand[600] },
					]),
					{
						enableStroke: true,
						enableFill: true,
						fillOpacity: 0.17,
						pointMarkerOpacity: 0.5,
					},
				);
			}
			rs.animation = new WaveAnimation({
				duration: 1000,
				fadeEffect: true,
			});
		});
		return {
			animationSeries: {
				x: xAnimationSeries,
				y: yAnimationSeries,
				z: zAnimationSeries,
				total: totalAnimationSeries,
			},
		};
	});
};

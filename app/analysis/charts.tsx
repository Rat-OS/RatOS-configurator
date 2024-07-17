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
	ISciChart2DDefinition,
	EAxisType,
	ESeriesType,
	WaveAnimation,
	GlowEffect,
	SeriesInfo,
	CursorModifier,
	TRolloverTooltipSvgTemplate,
	parseColorToTArgb,
	parseTArgbToHtmlColor,
	CursorTooltipSvgAnnotation,
	EDataSeriesType,
	XyySeriesInfo,
	XyyDataSeries,
	IDataSeries,
} from 'scichart';
import { useChart } from '@/app/analysis/hooks';
import { ChartTheme } from '@/app/analysis/chart-theme';

import { inter } from '@/app/fonts';
import { TWShadeableColorName, shadableTWColors, twColors } from '@/app/_helpers/colors';
import { useCallback } from 'react';

export const ADXL_STREAM_BUFFER_SIZE = 128;
const historyCount = 200;

SciChartSurface.configure({
	wasmUrl: '/configure/scichart2d.wasm',
	dataUrl: '/configure/scichart2d.data',
});
SciChartSurface.UseCommunityLicense();
const theme = new ChartTheme();

export const SIGNAL_CHART_AXIS_SIGNAL_ID = 'signal';
export const SIGNAL_CHART_AXIS_HISTORY_ID = 'history';
export const SIGNAL_CHART_SERIES_SIGNAL_ID = 'signal-series';
export const SIGNAL_CHART_SERIES_HISTORY_ID = 'history-series';
export const SIGNAL_CHART_AXIS_AMPLITUDE_ID = 'amplitude';

type ADXLAxes = 'x' | 'y' | 'z';

export const isXyyDataSeries = (ds: IDataSeries): ds is XyyDataSeries => {
	return ds.type === EDataSeriesType.Xyy;
};

export const isXyDataSeries = (ds: IDataSeries): ds is XyDataSeries => {
	return ds.type === EDataSeriesType.Xy;
};

export const isXyySeriesInfo = (si: SeriesInfo): si is XyySeriesInfo => {
	return si.dataSeriesType === EDataSeriesType.Xyy;
};

export const isXySeriesInfo = (si: SeriesInfo): si is SeriesInfo => {
	return si.dataSeriesType === EDataSeriesType.Xy;
};

export const getAxisColorName = (axis: ADXLAxes): TWShadeableColorName => {
	switch (axis) {
		case 'x':
			return `yellow`;
		case 'y':
			return `sky`;
		case 'z':
			return `rose`;
		default:
			return `brand`;
	}
};

export const getAxisColor = (axis: ADXLAxes) => {
	return twColors[getAxisColorName(axis)];
};

export const SignalChartMinimumRange = new NumberRange(-10000, 10000);

export const useADXLSignalChart = (axis: ADXLAxes) => {
	return useChart(
		null,
		useCallback(
			(surface: SciChartSurface) => {
				const color = getAxisColor(axis);
				// Category axis as the actual time doesn't matter (samples are evenly spaced).
				const xAxis = new NumericAxis(surface.webAssemblyContext2D, {
					id: SIGNAL_CHART_AXIS_SIGNAL_ID + axis,
					autoRange: EAutoRange.Always,
					maxAutoTicks: ADXL_STREAM_BUFFER_SIZE,
					drawLabels: false,
					drawMinorTickLines: false,
					drawMajorTickLines: false,
					drawMajorBands: false,
					drawMinorGridLines: false,
					drawMajorGridLines: false,
				});
				surface.xAxes.add(xAxis);

				// Category axis as the actual time doesn't matter (samples are evenly spaced).
				const xHistoryAxis = new NumericAxis(surface.webAssemblyContext2D, {
					id: SIGNAL_CHART_AXIS_HISTORY_ID + axis,
					autoRange: EAutoRange.Always,
					drawLabels: false,
					drawMinorGridLines: false,
					drawMajorTickLines: false,
				});
				surface.xAxes.add(xHistoryAxis);

				const yAxis = new NumericAxis(surface.webAssemblyContext2D, {
					autoRange: EAutoRange.Never,
					visibleRange: new NumberRange(-5000, 5000),
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
						intensity: 1,
						range: 1,
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
						.map((_, i) => i * 3.2),
					yValues: Array(ADXL_STREAM_BUFFER_SIZE * historyCount).fill(0),
				});

				// Line series to render the historical signal data (last 200 buffers)
				const historySeries = new FastLineRenderableSeries(surface.webAssemblyContext2D, {
					stroke: color[500] + '22',
					strokeThickness: 1,
					opacity: 0.6,
					yAxisId: SIGNAL_CHART_AXIS_AMPLITUDE_ID + axis,
					xAxisId: SIGNAL_CHART_AXIS_HISTORY_ID + axis,
					dataSeries: historyData,
				});
				surface.renderableSeries.add(historySeries);

				signalSeries.animation = new WaveAnimation({
					duration: 500,
				});
				historySeries.animation = new WaveAnimation({
					duration: 500,
				});

				return {
					signalData: signalData,
					signalSeries: signalSeries,
					historyData: historyData,
					historySeries: historySeries,
					xAxis,
					xHistoryAxis,
					yAxis,
				};
			},
			[axis],
		),
	);
};

export const PSD_CHART_AXIS_AMPLITUDE_ID = 'amplitude';
export const PSD_CHART_AXIS_SHAPER_ID = 'shaper';
export const PSDChartMinimumYVisibleRange = new NumberRange(0, 1500);
export const PSDChartNoSeriesDefinition: ISciChart2DDefinition = {
	surface: {
		theme: theme,
		padding: Thickness.fromNumber(0),
	},
	xAxes: [
		{
			type: EAxisType.NumericAxis,
			options: {
				visibleRange: new NumberRange(0, 200),
				labelStyle: {
					...inter.style,
					fontSize: 13,
					fontWeight: '600',
					padding: new Thickness(15, 15, 15, 15),
				},
				labelPostfix: 'Hz',
				drawMinorGridLines: true,
				minorsPerMajor: 10,
				drawMinorTickLines: false,
				drawMajorTickLines: false,
				drawMajorBands: false,
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
				labelStyle: {
					...inter.style,
					fontSize: 13,
					fontWeight: '600',
					padding: new Thickness(15, 15, 15, 15),
				},
				autoRangeAnimation: {
					duration: 140,
					animateInitialRanging: false,
					animateSubsequentRanging: true,
					easing: easing.inOutCubic,
				},
				drawMinorGridLines: true,
				drawMinorTickLines: false,
				drawMajorTickLines: false,
				drawMajorBands: false,
				axisTitleStyle: { fontSize: 10 },
			},
		},
		{
			type: EAxisType.NumericAxis,
			options: {
				id: PSD_CHART_AXIS_SHAPER_ID,
				axisAlignment: EAxisAlignment.Right,
				isVisible: false,
				growBy: new NumberRange(0, 0.1),
				autoRange: EAutoRange.Never,
				visibleRange: new NumberRange(0, 1),
				drawMinorGridLines: false,
				drawMinorTickLines: false,
				drawMajorTickLines: false,
				drawMajorBands: false,
				axisTitleStyle: { fontSize: 10 },
				axisTitle: 'Shaper vibration reduction (ratio)',
			},
		},
	],
};
export const PSDChartDefinition: ISciChart2DDefinition = {
	...PSDChartNoSeriesDefinition,
	series: [
		{
			type: ESeriesType.MountainSeries,
			options: {
				id: 'total',
				yAxisId: PSD_CHART_AXIS_AMPLITUDE_ID,
				strokeThickness: 3,
				fill: twColors.brand[500] + '22',
				stroke: twColors.brand[400],
			},
			xyData: {
				containsNaN: false,
				isSorted: true,
				xValues: Array(ADXL_STREAM_BUFFER_SIZE)
					.fill(0)
					.map((_, i) => Math.floor((i / ADXL_STREAM_BUFFER_SIZE) * 200)),
				yValues: Array(ADXL_STREAM_BUFFER_SIZE)
					.fill(0)
					.map((_, i) => 0),
			},
		},
		{
			type: ESeriesType.LineSeries,
			options: {
				id: 'z',
				yAxisId: PSD_CHART_AXIS_AMPLITUDE_ID,
				strokeThickness: 3,
				stroke: getAxisColor('z')[400],
			},
			xyData: {
				containsNaN: false,
				isSorted: true,
				xValues: Array(ADXL_STREAM_BUFFER_SIZE)
					.fill(0)
					.map((_, i) => Math.floor((i / ADXL_STREAM_BUFFER_SIZE) * 200)),
				yValues: Array(ADXL_STREAM_BUFFER_SIZE)
					.fill(0)
					.map((_, i) => 0),
			},
		},
		{
			type: ESeriesType.LineSeries,
			options: {
				id: 'y',
				yAxisId: PSD_CHART_AXIS_AMPLITUDE_ID,
				strokeThickness: 3,
				stroke: getAxisColor('y')[400],
			},
			xyData: {
				containsNaN: false,
				isSorted: true,
				xValues: Array(ADXL_STREAM_BUFFER_SIZE)
					.fill(0)
					.map((_, i) => Math.floor((i / ADXL_STREAM_BUFFER_SIZE) * 200)),
				yValues: Array(ADXL_STREAM_BUFFER_SIZE)
					.fill(0)
					.map((_, i) => 0),
			},
		},
		{
			type: ESeriesType.LineSeries,
			options: {
				id: 'x',
				yAxisId: PSD_CHART_AXIS_AMPLITUDE_ID,
				strokeThickness: 3,
				stroke: getAxisColor('x')[400],
			},
			xyData: {
				containsNaN: false,
				isSorted: true,
				xValues: Array(ADXL_STREAM_BUFFER_SIZE)
					.fill(0)
					.map((_, i) => Math.floor((i / ADXL_STREAM_BUFFER_SIZE) * 200)),
				yValues: Array(ADXL_STREAM_BUFFER_SIZE)
					.fill(0)
					.map((_, i) => 0),
			},
		},
	],
};

// Override the standard tooltip displayed by CursorModifier
export const getPSDTooltipLegendTemplate = (seriesInfos: SeriesInfo[], svgAnnotation: CursorTooltipSvgAnnotation) => {
	let outputSvgString = '';

	// Foreach series there will be a seriesInfo supplied by SciChart. This contains info about the series under the house
	const padding = 16;
	let y = padding * 2;
	const valuesWithLabels: string[] = [];
	seriesInfos.forEach((seriesInfo, index) => {
		if (seriesInfo.renderableSeries.rolloverModifierProps.showRollover === false) {
			return;
		}
		let separator = ':';
		let textColor = seriesInfo.renderableSeries.rolloverModifierProps.tooltipColor as TWShadeableColorName;
		valuesWithLabels.push(
			`${seriesInfo.renderableSeries.rolloverModifierProps.tooltipTitle}${separator} ${(seriesInfo.yValue / 1000).toFixed(2)} g^2/Hz @ ${seriesInfo.formattedXValue}`,
		);
		outputSvgString += `<text x="${padding}" y="${y}" class="text-sm text-medium font-sans" fill="${shadableTWColors[textColor][400]}">
		<tspan class="font-bold">${seriesInfo.renderableSeries.rolloverModifierProps.tooltipTitle}</tspan>${separator} ${(seriesInfo.yValue / 1000).toFixed(2)} g<tspan y="${y - 4}" class="sup">2</tspan><tspan y=${y}>/Hz</tspan> @ ${seriesInfo.formattedXValue}
		</text>`;
		y += 20;
		if (seriesInfo.dataSeriesType === EDataSeriesType.Xyy) {
			if (seriesInfo.renderableSeries.rolloverModifierProps1.showRollover === false) {
				return;
			}
			const si = seriesInfo as XyySeriesInfo;
			let textColor = seriesInfo.renderableSeries.rolloverModifierProps1.tooltipColor as TWShadeableColorName;
			valuesWithLabels.push(
				`${si.renderableSeries.rolloverModifierProps1.tooltipTitle}${separator} ${(si.y1Value / 1000).toFixed(2)} g^2/Hz @ ${si.formattedXValue}`,
			);
			outputSvgString += `<text x="${padding}" y="${y}" class="text-sm text-medium font-sans" fill="${shadableTWColors[textColor][400]}">
				<tspan class="font-bold">${si.renderableSeries.rolloverModifierProps1.tooltipTitle}</tspan>${separator} ${(si.y1Value / 1000).toFixed(2)} g<tspan y="${y - 4}" class="sup">2</tspan><tspan y=${y}>/Hz</tspan> @ ${si.formattedXValue}
			</text>`;
			y += 20;

			outputSvgString += `<text x="${padding}" y="${y}" class="text-sm text-medium font-sans" fill="${shadableTWColors['zinc'][400]}">
				<tspan class="font-bold">Amplitude Difference</tspan>${separator} ${Math.abs((si.y1Value - si.yValue) / 1000).toFixed(2)} g<tspan y="${y - 4}" class="sup">2</tspan><tspan y=${y}>/Hz</tspan>
			</text>`;
			y += 20;
		}
	});
	const width =
		seriesInfos.length === 0
			? 0
			: padding +
				calcTooltipWidth(
					valuesWithLabels.reduce(function (prev, cur) {
						return cur.length > prev ? cur.length : prev;
					}, 0),
				) *
					1.7;
	// tooltip height
	const height = seriesInfos.length === 0 ? 0 : y;

	return `<svg width="${width}" height="${height}">
				<rect rx="8" ry="8" width="100%" height="100%" class="stroke-zinc-400/10 fill-zinc-900/70 stroke-1" />
                ${outputSvgString}
            </svg>`;
};

// Override the standard tooltip displayed by CursorModifier
export const psdRolloverTooltipTemplate: TRolloverTooltipSvgTemplate = (id, seriesInfo, rolloverTooltip) => {
	let valuesBlock = '';
	const tooltipProps = rolloverTooltip.tooltipProps;
	const tooltipTitle = tooltipProps.tooltipTitle,
		tooltipColor = tooltipProps.tooltipColor as TWShadeableColorName,
		tooltipTextColor = twColors[tooltipColor][100],
		tooltipBorderColor = parseColorToTArgb(twColors[tooltipColor][400]),
		tooltipBGColor = parseColorToTArgb(twColors[tooltipColor][600]),
		tooltipLabelX = tooltipProps.tooltipLabelX,
		tooltipLabelY = tooltipProps.tooltipLabelY,
		shadowColor = twColors[tooltipColor][900];

	tooltipBorderColor.opacity = Math.round(255 * 0.8);
	tooltipBGColor.opacity = Math.round(255 * 0.2);
	const tooltipDataTemplate =
		rolloverTooltip.tooltipProps.tooltipDataTemplate ??
		rolloverTooltip.tooltipProps.rolloverModifier.tooltipDataTemplate;
	const valuesWithLabels = tooltipDataTemplate(seriesInfo, tooltipTitle, tooltipLabelX, tooltipLabelY);
	// tooltip width
	const width =
		tooltipProps.width ??
		calcTooltipWidth(
			valuesWithLabels.reduce(function (prev, cur) {
				return cur.length > prev ? cur.length : prev;
			}, 0),
		);
	// tooltip height
	const height = tooltipProps.height ?? calcTooltipHeight(valuesWithLabels.length);
	rolloverTooltip.updateSize(width, height);
	valuesWithLabels.forEach(function (val, index) {
		valuesBlock += `<tspan x="8" dy="1.2em">${val}</tspan>`;
	});
	let blur = `<feGaussianBlur result="blurOut" in="offOut" stdDeviation="3" />`;
	if (shadowColor !== undefined) {
		var shadowRGBA = parseColorToTArgb(shadowColor);
		blur = `
			<feColorMatrix result="matrixOut" in="offOut" type="matrix"
				values="0 0 0 0 
				${shadowRGBA.red / 255}
				0 0 0 0
				${shadowRGBA.green / 255}
				0 0 0 0
				${shadowRGBA.blue / 255}
				0 0 0 
				${shadowRGBA.opacity / 255}
				0 0" 
			/>
			<feGaussianBlur result="blurOut" in="matrixOut" stdDeviation="3" />`;
	}
	return `
		<svg class="scichart__rollover-tooltip transition-all" width="${width}" height="${height}">
			<defs>
				<filter id="${id}" x="0" y="0" width="200%" height="200%">
					<feOffset result="offOut" in="SourceAlpha" dx="3" dy="3" />
						
						${blur}
					<feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
				</filter>
			</defs>
			<rect rx="8" ry="8" width="100%" height="100%" fill="${parseTArgbToHtmlColor(tooltipBGColor)}" stroke="${parseTArgbToHtmlColor(tooltipBorderColor)}" stroke-width="2"  filter="url(#${id}" />
			<svg width="100%">
				<text x="8" y="3" class="text-sm font-sans font-semibold" dy="0" fill="${tooltipTextColor}">
				${valuesBlock}
				</text>
			</svg>
		</svg>`;
};

export const createPSDAnimationSeries = (surface: SciChartSurface) => {
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
	return {
		x: xAnimationSeries,
		y: yAnimationSeries,
		z: zAnimationSeries,
		total: totalAnimationSeries,
	};
};

export const usePSDChart = () => {
	return useChart(
		PSDChartDefinition,
		useCallback((surface: SciChartSurface) => {
			(surface.renderableSeries.asArray() as FastMountainRenderableSeries[]).forEach((rs) => {
				rs.rolloverModifierProps.tooltipColor = getAxisColorName(rs.id as ADXLAxes);
				rs.rolloverModifierProps.tooltipTemplate = psdRolloverTooltipTemplate;
				rs.rolloverModifierProps.tooltipTitle =
					rs.id.substring(0, 1).toUpperCase() + rs.id.substring(1) + ' Power Spectral Density';
				rs.animation = new WaveAnimation({
					duration: 500,
				});
			});

			surface.chartModifiers.add(
				new CursorModifier({
					// Defines if crosshair is shown
					crosshairStroke: twColors.sky[400],
					crosshairStrokeThickness: 1,
					showXLine: true,
					showYLine: true,
					// Shows the default tooltip
					showTooltip: false,
					tooltipLegendTemplate: getPSDTooltipLegendTemplate,
					tooltipLegendOffsetX: 16,
					tooltipLegendOffsetY: 16,
					yAxisId: PSD_CHART_AXIS_AMPLITUDE_ID,
					axisLabelFill: twColors.zinc[900],
					axisLabelStroke: twColors.zinc[100],
				}),
			);

			return {
				animationSeries: createPSDAnimationSeries(surface),
			};
		}, []),
	);
};
var calcTooltipWidth = function (textLength: number = 20, charWidth = 4) {
	return textLength * charWidth + 20;
};
/** @ignore */
var calcTooltipHeight = function (lines: number = 2, lineHeight = 15) {
	return lineHeight * lines + 16;
};

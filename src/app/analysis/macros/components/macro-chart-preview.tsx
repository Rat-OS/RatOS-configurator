import { macroSequenceSchema } from '@/zods/analysis';
import {
	PSDChardNoSeriesDefinition,
	PSD_CHART_AXIS_AMPLITUDE_ID,
	psdRolloverTooltipTemplate,
} from '@/app/analysis/charts';
import { useChart } from '@/app/analysis/hooks';
import { z } from 'zod';
import React, { useCallback, useEffect, useRef } from 'react';
import {
	CursorModifier,
	FastBandRenderableSeries,
	FastLineRenderableSeries,
	RolloverModifier,
	SciChartSurface,
	SeriesInfo,
	WaveAnimation,
	XyDataSeries,
	XyyDataSeries,
} from 'scichart';
import { shadableTWColors } from '@/app/_helpers/colors';
import { SciChartReact } from 'scichart-react';
import deepEqual from 'deep-equal';

SciChartSurface.configure({
	wasmUrl: '/configure/scichart2d.wasm',
	dataUrl: '/configure/scichart2d.data',
});

interface MacroChartPreviewProps {
	sequences: z.input<typeof macroSequenceSchema>[];
}

const getBandTooltipDataTemplate = (
	seriesInfo: SeriesInfo,
	tooltipTitle: string,
	tooltipLabelX: string,
	tooltipLabelY: string,
) => {
	// Lines here are returned to the tooltip and displayed as text-line per tooltip
	const lines: string[] = [];
	lines.push(tooltipTitle);
	lines.push(
		`<tspan class="opacity-70 font-medium">${seriesInfo.formattedYValue} @ ${seriesInfo.formattedXValue}</tspan>`,
	);
	return lines;
};
const getTooltipDataTemplate = (
	seriesInfo: SeriesInfo,
	tooltipTitle: string,
	tooltipLabelX: string,
	tooltipLabelY: string,
) => {
	// Lines here are returned to the tooltip and displayed as text-line per tooltip
	const lines: string[] = [];
	lines.push(tooltipTitle);
	lines.push(
		`<tspan class="opacity-70 font-medium">${seriesInfo.formattedYValue} @ ${seriesInfo.formattedXValue}</tspan>`,
	);
	return lines;
};

export const MacroChartPreview: React.FC<MacroChartPreviewProps> = ({ sequences }) => {
	const sequenceData = sequences
		.map((seq) => {
			return seq.recording?.capturePSD
				? {
						accel: seq.recording.accelerometer,
						color: seq.recording.color,
						name: seq.name,
					}
				: null;
		})
		.filter(Boolean);
	const prevSequenceData = useRef(sequenceData);

	const setupChart = useCallback(
		(surface: SciChartSurface) => {
			if (sequenceData.length === 2) {
				const randMul1 = Math.random() * 50 + 184;
				const randAdd1 = Math.random() * 400 + 900;
				const randMul2 = Math.random() * 50 + 184;
				const randAdd2 = Math.random() * 200 + 1000;
				const step1 = 4 + Math.random() * 3;
				const step2 = 4 + Math.random() * 3;
				const rs = new FastBandRenderableSeries(surface.webAssemblyContext2D, {
					dataSeries: new XyyDataSeries(surface.webAssemblyContext2D, {
						containsNaN: false,
						isSorted: true,
						xValues: Array(130)
							.fill(0)
							.map((_, i) => (200 / 130) * i),
						yValues: Array(130)
							.fill(0)
							.map((_, i) =>
								i > Math.random() * 10 + 65
									? ((180 - i) / randMul1) * (Math.sin(i / step1) * randMul1 + randAdd1)
									: (i / 100) * (Math.sin(i / step1) * randMul1 + randAdd1),
							),
						y1Values: Array(130)
							.fill(0)
							.map((_, i) =>
								i > Math.random() * 10 + 65
									? ((180 - i) / randMul2) * (Math.sin(i / step2) * randMul2 + randAdd2)
									: (i / 100) * (Math.sin(i / step2) * randMul2 + randAdd2),
							),
					}),
					fill: shadableTWColors[(sequenceData[1].color ?? 'sky') as keyof typeof shadableTWColors][600] + 22,
					fillY1: shadableTWColors[(sequenceData[0].color ?? 'rose') as keyof typeof shadableTWColors][600] + 22,
					stroke: shadableTWColors[(sequenceData[0].color ?? 'rose') as keyof typeof shadableTWColors][400],
					strokeY1: shadableTWColors[(sequenceData[1].color ?? 'sky') as keyof typeof shadableTWColors][400],
					strokeThickness: 3,
					yAxisId: PSD_CHART_AXIS_AMPLITUDE_ID,
				});
				rs.rolloverModifierProps.tooltipColor = sequenceData[0].color ?? 'zinc';
				rs.rolloverModifierProps.tooltipTemplate = psdRolloverTooltipTemplate;
				rs.rolloverModifierProps.tooltipDataTemplate = getBandTooltipDataTemplate;
				rs.rolloverModifierProps.tooltipTitle = sequenceData[0].name + ' Power';
				rs.rolloverModifierProps1.tooltipColor = sequenceData[1].color ?? 'zinc';
				rs.rolloverModifierProps1.tooltipTemplate = psdRolloverTooltipTemplate;
				rs.rolloverModifierProps1.tooltipDataTemplate = getBandTooltipDataTemplate;
				rs.rolloverModifierProps1.tooltipTitle = sequenceData[1].name + ' Power';
				rs.animation = new WaveAnimation({
					duration: 500,
				});
				surface.renderableSeries.add(rs);
			} else {
				sequenceData.forEach((seq) => {
					const randMul1 = Math.random() * 50 + 184;
					const randAdd1 = Math.random() * 400 + 900;
					const step1 = 4 + Math.random() * 3;
					const rs = new FastLineRenderableSeries(surface.webAssemblyContext2D, {
						dataSeries: new XyDataSeries(surface.webAssemblyContext2D, {
							containsNaN: false,
							isSorted: true,
							xValues: Array(130)
								.fill(0)
								.map((_, i) => (200 / 130) * i),
							yValues: Array(130)
								.fill(0)
								.map((_, i) =>
									i > Math.random() * 10 + 65
										? ((180 - i) / randMul1) * (Math.sin(i / step1) * randMul1 + randAdd1)
										: (i / 100) * (Math.sin(i / step1) * randMul1 + randAdd1),
								),
						}),
						stroke: shadableTWColors[(seq.color ?? 'brand') as keyof typeof shadableTWColors][400],
						strokeThickness: 3,
						yAxisId: PSD_CHART_AXIS_AMPLITUDE_ID,
					});
					rs.rolloverModifierProps.tooltipColor = seq.color ?? 'zinc';
					rs.rolloverModifierProps.tooltipTemplate = psdRolloverTooltipTemplate;
					rs.rolloverModifierProps.tooltipDataTemplate = getTooltipDataTemplate;
					rs.rolloverModifierProps.tooltipTitle = seq.name + ' Power';
					rs.animation = new WaveAnimation({
						duration: 500,
					});
					surface.renderableSeries.add(rs);
				});
			}

			surface.chartModifiers.add(
				new RolloverModifier({
					// Defines if rollover vertical line is shown
					showRolloverLine: true,
					// Shows the default tooltip
					showTooltip: true,
					yAxisId: PSD_CHART_AXIS_AMPLITUDE_ID,
					// Optional: Overrides the content of the tooltip
				}),
			);

			surface.chartModifiers.add(
				new CursorModifier({
					// Defines if crosshair is shown
					crosshairStroke: shadableTWColors.sky[400],
					crosshairStrokeThickness: 1,
					showXLine: true,
					showYLine: true,
					yAxisId: PSD_CHART_AXIS_AMPLITUDE_ID,
					// Shows the default tooltip
					showTooltip: false,
					axisLabelFill: shadableTWColors.zinc[900],
					axisLabelStroke: shadableTWColors.zinc[100],
				}),
			);
		},
		[sequenceData],
	);

	const chart = useChart(PSDChardNoSeriesDefinition, setupChart);

	useEffect(() => {
		if (sequenceData.length != 0 && deepEqual(sequenceData, prevSequenceData.current) === false) {
			if (chart.surface.current) {
				chart.surface.current?.renderableSeries.clear();
				chart.surface.current?.chartModifiers.clear();
				setupChart(chart.surface.current);
				chart.surface.current.invalidateElement();
			}
			prevSequenceData.current = sequenceData;
		}
	}, [chart.surface, sequenceData, setupChart]);

	return <SciChartReact {...chart.forwardProps}></SciChartReact>;
};

'use client';
import { macroRecordingSchema, macroSequenceSchema } from '@/zods/analysis';
import {
	PSDChardNoSeriesDefinition,
	PSD_CHART_AXIS_AMPLITUDE_ID,
	getPSDTooltipLegendTemplate,
	psdRolloverTooltipTemplate,
} from '@/app/analysis/charts';
import { useChart } from '@/app/analysis/hooks';
import { z } from 'zod';
import React, { useCallback, useEffect, useRef } from 'react';
import {
	CursorModifier,
	EDataSeriesType,
	FastBandRenderableSeries,
	FastLineRenderableSeries,
	NumberRange,
	RolloverModifier,
	SciChartSurface,
	SeriesInfo,
	WaveAnimation,
	XyDataSeries,
	XyyDataSeries,
	XyySeriesInfo,
} from 'scichart';
import { shadableTWColors } from '@/app/_helpers/colors';
import { SciChartReact } from 'scichart-react';
import deepEqual from 'deep-equal';

SciChartSurface.configure({
	wasmUrl: '/configure/scichart2d.wasm',
	dataUrl: '/configure/scichart2d.data',
});

interface MacroRunChartProps {
	recordings: z.infer<typeof macroRecordingSchema>[];
	sequences: z.infer<typeof macroSequenceSchema>[];
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
	if (seriesInfo.dataSeriesType === EDataSeriesType.Xyy) {
		const xyyInfo = seriesInfo as XyySeriesInfo;
		lines.push(
			`<tspan class="opacity-70 font-medium">${xyyInfo.formattedY1Value} @ ${xyyInfo.formattedXValue}</tspan>`,
		);
	}
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

export const MacroRunChart: React.FC<MacroRunChartProps> = ({ recordings, sequences }) => {
	const sequenceData = recordings
		.map((rec) => {
			const sequence = sequences.find((seq) => seq.id === rec.sequenceId);
			return sequence?.recording
				? {
						color: sequence?.recording?.color,
						name: rec.name,
						psd: rec.psd.total,
					}
				: null;
		})
		.filter(Boolean);
	const prevSequenceData = useRef(sequenceData);

	const setupChart = useCallback(
		(surface: SciChartSurface) => {
			let bandSeries = false;
			if (sequenceData.length === 2) {
				bandSeries = true;
				for (let i = 0; i < sequenceData[0].psd.frequencies.length; i++) {
					if (Math.abs(sequenceData[0].psd.frequencies[i] - sequenceData[1].psd.frequencies[i]) > 1) {
						bandSeries = false;
					}
				}
			}

			if (bandSeries) {
				const rs = new FastBandRenderableSeries(surface.webAssemblyContext2D, {
					dataSeries: new XyyDataSeries(surface.webAssemblyContext2D, {
						containsNaN: false,
						isSorted: true,
						xValues: sequenceData[0].psd.frequencies,
						yValues: sequenceData[0].psd.estimates,
						y1Values: sequenceData[1].psd.estimates,
					}),
					fill: shadableTWColors[(sequenceData[1].color ?? 'sky') as keyof typeof shadableTWColors][600] + 22,
					fillY1: shadableTWColors[(sequenceData[0].color ?? 'rose') as keyof typeof shadableTWColors][600] + 22,
					stroke: shadableTWColors[(sequenceData[0].color ?? 'rose') as keyof typeof shadableTWColors][400],
					strokeY1: shadableTWColors[(sequenceData[1].color ?? 'sky') as keyof typeof shadableTWColors][400],
					strokeThickness: 3,
					yAxisId: PSD_CHART_AXIS_AMPLITUDE_ID,
				});
				rs.rolloverModifierProps.tooltipColor = sequenceData[0].color ?? 'zinc';
				rs.rolloverModifierProps.tooltipTitle = sequenceData[0].name + ' Power';
				rs.rolloverModifierProps1.tooltipColor = sequenceData[1].color ?? 'zinc';
				rs.rolloverModifierProps1.tooltipTitle = sequenceData[1].name + ' Power';
				rs.animation = new WaveAnimation({
					duration: 500,
				});
				surface.renderableSeries.add(rs);
			} else {
				sequenceData.forEach((seq) => {
					const rs = new FastLineRenderableSeries(surface.webAssemblyContext2D, {
						dataSeries: new XyDataSeries(surface.webAssemblyContext2D, {
							containsNaN: false,
							isSorted: true,
							xValues: seq.psd.frequencies,
							yValues: seq.psd.estimates,
						}),
						stroke: shadableTWColors[(seq.color ?? 'brand') as keyof typeof shadableTWColors][400],
						strokeThickness: 3,
						yAxisId: PSD_CHART_AXIS_AMPLITUDE_ID,
					});
					rs.rolloverModifierProps.tooltipColor = seq.color ?? 'zinc';
					rs.rolloverModifierProps.tooltipTitle = seq.name + ' Power';
					rs.animation = new WaveAnimation({
						duration: 500,
					});
					surface.renderableSeries.add(rs);
				});
			}

			const yAxis = surface.yAxes.getById(PSD_CHART_AXIS_AMPLITUDE_ID);
			if (yAxis) {
				yAxis.visibleRange = new NumberRange(
					Math.min(...sequenceData.map((seq) => seq.psd.powerRange.min)),
					Math.max(...sequenceData.map((seq) => seq.psd.powerRange.max)),
				).growBy(new NumberRange(0.0, 0.1));
			}

			surface.chartModifiers.add(
				new RolloverModifier({
					// Defines if rollover vertical line is shown
					showRolloverLine: true,
					// Shows the default tooltip
					showTooltip: false,
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
					tooltipLegendTemplate: getPSDTooltipLegendTemplate,
					tooltipLegendOffsetX: 16,
					tooltipLegendOffsetY: 16,
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

	return <SciChartReact {...chart.forwardProps} className="flex-1 bg-zinc-900/50"></SciChartReact>;
};

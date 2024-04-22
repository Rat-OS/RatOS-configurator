'use client';
import { macroRecordingSchemaWithoutSourcePSDs, macroSequenceSchema } from '@/zods/analysis';
import {
	PSDChartNoSeriesDefinition,
	PSD_CHART_AXIS_AMPLITUDE_ID,
	getPSDTooltipLegendTemplate,
	isXyDataSeries,
	isXyyDataSeries,
} from '@/app/analysis/charts';
import { useChart } from '@/app/analysis/hooks';
import { z } from 'zod';
import React, { useCallback, useEffect, useRef } from 'react';
import {
	BandAnimation,
	CursorModifier,
	FastBandRenderableSeries,
	FastLineRenderableSeries,
	LineAnimation,
	NumberRange,
	RolloverModifier,
	SciChartSurface,
	WaveAnimation,
	XyDataSeries,
	XyyDataSeries,
	easing,
} from 'scichart';
import { shadableTWColors } from '@/app/_helpers/colors';
import { SciChartReact } from 'scichart-react';
import deepEqual from 'deep-equal';

SciChartSurface.configure({
	wasmUrl: '/configure/scichart2d.wasm',
	dataUrl: '/configure/scichart2d.data',
});

interface MacroRunChartProps {
	recordings: z.infer<typeof macroRecordingSchemaWithoutSourcePSDs>[];
	sequences: z.infer<typeof macroSequenceSchema>[];
}

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
					pointDurationFraction: 1,
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
						pointDurationFraction: 1,
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

	const chart = useChart(PSDChartNoSeriesDefinition, setupChart);

	const transitionToChart = useCallback(
		(data: typeof sequenceData) => {
			if (chart.surface.current == null) {
				return;
			}
			// if no previous sequenceData, run setupChart
			if (prevSequenceData.current.length === 0) {
				setupChart(chart.surface.current);
				return;
			}
			// If same number of data series, animate style and data
			if (data.length === prevSequenceData.current.length) {
				data.forEach((seq, i) => {
					const rs = chart.surface.current?.renderableSeries.get(i);
					if (rs) {
						if (chart.surface.current == null) {
							throw new Error('Missing chart surface');
						}
						const prevCount = rs.dataSeries.count();
						if (isXyyDataSeries(rs.dataSeries)) {
							// We're dealing with a band series, which means it's combined with the next sequence as well.
							const nextSeq = data[i + 1];
							if (prevCount > seq.psd.frequencies.length) {
								// Pad new sequence data
								const padFreq = new Array(prevCount - seq.psd.frequencies.length).fill(0);
								const padEstimates = new Array(prevCount - seq.psd.estimates.length).fill(0);
								seq.psd.frequencies.unshift(...padFreq);
								seq.psd.estimates.unshift(...padEstimates);
								nextSeq.psd.frequencies.unshift(...padFreq);
								nextSeq.psd.estimates.unshift(...padEstimates);
							}
							if (prevCount < seq.psd.frequencies.length) {
								// Drop the last n elements of the new sequence data
								seq.psd.frequencies = seq.psd.frequencies.slice(0, prevCount);
								seq.psd.estimates = seq.psd.estimates.slice(0, prevCount);
								nextSeq.psd.frequencies = nextSeq.psd.frequencies.slice(0, prevCount);
								nextSeq.psd.estimates = nextSeq.psd.estimates.slice(0, prevCount);
							}
							const newDs = new XyyDataSeries(chart.surface.current.webAssemblyContext2D, {
								containsNaN: false,
								isSorted: true,
							});
							newDs.appendRange(seq.psd.frequencies, seq.psd.estimates, nextSeq.psd.estimates);
							chart.surface.current.addDeletable(newDs);
							rs.rolloverModifierProps.tooltipColor = seq.color ?? 'zinc';
							rs.rolloverModifierProps.tooltipTitle = seq.name + ' Power';
							rs.rolloverModifierProps1.tooltipColor = nextSeq.color ?? 'zinc';
							rs.rolloverModifierProps1.tooltipTitle = nextSeq.name + ' Power';
							rs.runAnimation(new BandAnimation({ duration: 500, ease: easing.inOutCirc, dataSeries: newDs }));
						}
						if (isXyDataSeries(rs.dataSeries)) {
							if (prevCount > seq.psd.frequencies.length) {
								// Pad new sequence data
								const padFreq = new Array(prevCount - seq.psd.frequencies.length).fill(0);
								const padEstimates = new Array(prevCount - seq.psd.estimates.length).fill(0);
								seq.psd.frequencies.unshift(...padFreq);
								seq.psd.estimates.unshift(...padEstimates);
							}
							if (prevCount < seq.psd.frequencies.length) {
								// Drop the last n elements of the new sequence data
								seq.psd.frequencies = seq.psd.frequencies.slice(0, prevCount);
								seq.psd.estimates = seq.psd.estimates.slice(0, prevCount);
							}
							const newDs = new XyDataSeries(chart.surface.current.webAssemblyContext2D, {
								containsNaN: false,
								isSorted: true,
							});
							newDs.appendRange(seq.psd.frequencies, seq.psd.estimates);
							chart.surface.current.addDeletable(newDs);
							rs.rolloverModifierProps.tooltipColor = seq.color ?? 'zinc';
							rs.rolloverModifierProps.tooltipTitle = seq.name + ' Power';
							rs.runAnimation(
								new LineAnimation({
									duration: 500,
									ease: easing.inOutCirc,
									dataSeries: newDs,
									styles: {
										stroke: shadableTWColors[(seq.color ?? 'brand') as keyof typeof shadableTWColors][400],
									},
								}),
							);
						}
					}
				});
				return;
			}
			// If different number of data series, animate data to zero, then run setupChart.
			if (data.length !== prevSequenceData.current.length) {
				prevSequenceData.current.forEach((seq, i) => {
					const rs = chart.surface.current?.renderableSeries.get(i);
					if (rs) {
						if (chart.surface.current == null) {
							throw new Error('Missing chart surface');
						}
						const prevCount = rs.dataSeries.count();
						if (isXyyDataSeries(rs.dataSeries)) {
							const newDs = new XyyDataSeries(chart.surface.current.webAssemblyContext2D, {
								containsNaN: false,
								isSorted: true,
							});
							newDs.appendRange(
								prevSequenceData.current[i].psd.frequencies,
								new Array(prevCount).fill(0),
								new Array(prevCount).fill(0),
							);
							chart.surface.current.addDeletable(newDs);
							rs.runAnimation(new BandAnimation({ duration: 500, ease: easing.inOutCirc, dataSeries: newDs }));
						}
						if (isXyDataSeries(rs.dataSeries)) {
							const newDs = new XyDataSeries(chart.surface.current.webAssemblyContext2D, {
								containsNaN: false,
								isSorted: true,
							});
							newDs.appendRange(prevSequenceData.current[i].psd.frequencies, new Array(prevCount).fill(0));
							chart.surface.current.addDeletable(newDs);
							rs.runAnimation(
								new LineAnimation({
									duration: 500,
									ease: easing.inOutCirc,
									dataSeries: newDs,
									styles: {
										stroke: shadableTWColors[(seq.color ?? 'brand') as keyof typeof shadableTWColors][400],
									},
								}),
							);
						}
					}
				});
				setTimeout(() => {
					if (chart.surface.current) {
						chart.surface.current?.renderableSeries.clear();
						chart.surface.current?.chartModifiers.clear();
						setupChart(chart.surface.current);
						chart.surface.current.invalidateElement();
					}
				}, 500);
				return;
			}
		},
		[chart.surface, setupChart],
	);

	useEffect(() => {
		if (sequenceData.length != 0 && deepEqual(sequenceData, prevSequenceData.current) === false) {
			if (chart.surface.current) {
				transitionToChart(sequenceData);
			}
			prevSequenceData.current = sequenceData;
		}
	}, [chart.surface, sequenceData, setupChart, transitionToChart]);

	return <SciChartReact {...chart.forwardProps} className="flex-1 bg-zinc-900/50"></SciChartReact>;
};

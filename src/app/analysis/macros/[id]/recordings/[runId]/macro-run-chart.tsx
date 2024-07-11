'use client';
import { macroRecordingSchemaWithoutSourcePSDs, macroSequenceSchema } from '@/zods/analysis';
import {
	PSDChartNoSeriesDefinition,
	PSD_CHART_AXIS_AMPLITUDE_ID,
	PSD_CHART_AXIS_SHAPER_ID,
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
	EAutoRange,
	EDataSeriesValueType,
	FastBandRenderableSeries,
	FastLineRenderableSeries,
	FastMountainRenderableSeries,
	LineAnimation,
	MountainAnimation,
	NumberRange,
	RolloverModifier,
	SciChartSurface,
	WaveAnimation,
	XyDataSeries,
	XyMovingAverageFilter,
	XyyDataSeries,
	easing,
} from 'scichart';
import { shadableTWColors } from '@/app/_helpers/colors';
import { SciChartReact } from 'scichart-react';
import deepEqual from 'deep-equal';
import { findBestShaper, ShaperCalibrationResult } from '@/app/analysis/_worker/input-shaper';
import { getLogger } from '@/app/_helpers/logger';

SciChartSurface.configure({
	wasmUrl: '/configure/scichart2d.wasm',
	dataUrl: '/configure/scichart2d.data',
});

interface MacroRunChartProps {
	recordings: z.infer<typeof macroRecordingSchemaWithoutSourcePSDs>[];
	sequences: z.infer<typeof macroSequenceSchema>[];
	shapers?: ShaperCalibrationResult[];
	recommendedShaper?: ShaperCalibrationResult | null;
}

export const MacroRunChart: React.FC<MacroRunChartProps> = ({ recordings, sequences, shapers, recommendedShaper }) => {
	const sequenceData = recordings
		.flatMap((rec) => {
			const sequence = sequences.find((seq) => seq.id === rec.sequenceId);
			if (recordings.length === 1 && sequence?.recording != null) {
				return [
					{
						color: 'red',
						name: rec.name + ' (X)',
						psd: rec.psd.x,
						type: 'line',
					},
					{
						color: 'yellow',
						name: rec.name + ' (Y)',
						psd: rec.psd.y,
						type: 'line',
					},
					{
						color: 'blue',
						name: rec.name + ' (Z)',
						psd: rec.psd.z,
						type: 'line',
					},
					{
						color: sequence?.recording?.color,
						name: rec.name + ' (Total)',
						psd: rec.psd.total,
						type: 'mountain',
					},
				].filter(Boolean);
			}
			return sequence?.recording
				? {
						color: sequence?.recording?.color,
						name: rec.name,
						psd: rec.psd.total,
						type: 'mountain',
					}
				: null;
		})
		.filter(Boolean);
	const prevSequenceData = useRef(sequenceData);
	const currentInputShapers = useRef(shapers);
	currentInputShapers.current = shapers;
	const currentRecommendedShaper = useRef(recommendedShaper);
	currentRecommendedShaper.current = recommendedShaper;
	const prevInputShapers = useRef(shapers);

	const initializeInputShapers = useCallback(
		(surface: SciChartSurface, skip: string[] = []) => {
			if (currentRecommendedShaper.current != null && surface.renderableSeries.getById('recommended-shaper') == null) {
				const rs = new FastMountainRenderableSeries(surface.webAssemblyContext2D, {
					id: 'recommended-shaper',
					dataSeries: new XyDataSeries(surface.webAssemblyContext2D, {
						containsNaN: false,
						isSorted: true,
						xValues: sequenceData[0].psd.frequencies,
						yValues: currentRecommendedShaper.current.psd,
					}),
					stroke: shadableTWColors[currentRecommendedShaper.current.color][400],
					fill: shadableTWColors[currentRecommendedShaper.current.color][600] + 11,
					strokeThickness: 4,
					yAxisId: PSD_CHART_AXIS_AMPLITUDE_ID,
				});
				rs.rolloverModifierProps.tooltipTitle =
					currentRecommendedShaper.current.name.toLocaleUpperCase() +
					' @ ' +
					Math.round(currentRecommendedShaper.current.freq * 100) / 100 +
					'Hz';
				rs.rolloverModifierProps.tooltipColor = currentRecommendedShaper.current.color;
				rs.animation = new WaveAnimation({
					duration: 1000,
					ease: easing.inOutCirc,
					fadeEffect: true,
				});
				surface.renderableSeries.add(rs);
			}
			currentInputShapers.current?.forEach((seq, i) => {
				if (surface == null || skip.includes(seq.name) || surface.renderableSeries.getById(seq.name) != null) {
					return;
				}
				const rs = new FastLineRenderableSeries(surface.webAssemblyContext2D, {
					id: seq.name,
					dataSeries: new XyDataSeries(surface.webAssemblyContext2D, {
						containsNaN: false,
						isSorted: true,
						xValues: sequenceData[0].psd.frequencies,
						yValues: seq.vals,
					}),
					stroke: shadableTWColors[seq.color][400],
					strokeThickness: seq.name === currentRecommendedShaper.current?.name ? 5 : 2,
					strokeDashArray: seq.name === currentRecommendedShaper.current?.name ? [10, 5, 2, 5] : [3, 5],
					yAxisId: PSD_CHART_AXIS_SHAPER_ID,
				});
				rs.rolloverModifierProps.showRollover = false;
				rs.animation = new WaveAnimation({
					duration: 1000,
					ease: easing.inOutCubic,
					fadeEffect: true,
				});
				surface.renderableSeries.add(rs);
			});
			prevInputShapers.current = currentInputShapers.current;
		},
		[sequenceData],
	);

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
					strokeThickness: 4,
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

				// Moving average
				const movingAverageFirst = new XyMovingAverageFilter(
					new XyDataSeries(surface.webAssemblyContext2D, {
						containsNaN: false,
						isSorted: true,
						xValues: sequenceData[0].psd.frequencies,
						yValues: sequenceData[0].psd.estimates,
					}),
					{ length: 2 },
				);
				const movingAverageSecond = new XyMovingAverageFilter(
					new XyDataSeries(surface.webAssemblyContext2D, {
						containsNaN: false,
						isSorted: true,
						xValues: sequenceData[0].psd.frequencies,
						yValues: sequenceData[1].psd.estimates,
					}),
					{ length: 2 },
				);
				const ma = new FastLineRenderableSeries(surface.webAssemblyContext2D, {
					dataSeries: movingAverageFirst,
					stroke: shadableTWColors['sky'][400],
					strokeThickness: 2,
					yAxisId: PSD_CHART_AXIS_AMPLITUDE_ID,
				});
				ma.rolloverModifierProps.showRollover = false;
				ma.animation = new WaveAnimation({
					duration: 500,
				});
				surface.renderableSeries.add(ma);
				const ma1 = movingAverageFirst.getNativeYValues();
				for (let i = 1; i < ma1.size(); i++) {
					if (ma1.get(i - 1) < ma1.get(i) && ma1.get(i + 1) < ma1.get(i)) {
						// peak identified.
						console.log('peak at frequency', sequenceData[0].psd.frequencies[i], 'hz at', ma1.get(i));
					}
				}
			} else {
				sequenceData.forEach((seq) => {
					const Series = seq.type === 'line' ? FastLineRenderableSeries : FastMountainRenderableSeries;
					const rs = new Series(surface.webAssemblyContext2D, {
						dataSeries: new XyDataSeries(surface.webAssemblyContext2D, {
							containsNaN: false,
							isSorted: true,
							xValues: seq.psd.frequencies,
							yValues: seq.psd.estimates,
						}),
						stroke: shadableTWColors[(seq.color ?? 'brand') as keyof typeof shadableTWColors][400],
						fill: shadableTWColors[(seq.color ?? 'brand') as keyof typeof shadableTWColors][600] + 11,
						strokeThickness: 4,
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
				).growBy(new NumberRange(0.0, 0.2));
				yAxis.autoRange = EAutoRange.Once;
				yAxis.autoRangeAnimation.duration = 500;
				yAxis.autoRangeAnimation.easing = easing.inOutCirc;
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
			if (recordings.length === 1) {
				initializeInputShapers(surface);
			}
		},
		[initializeInputShapers, recordings.length, sequenceData],
	);

	const chart = useChart(PSDChartNoSeriesDefinition, setupChart);

	const updateInputShapers = useCallback(() => {
		// Update input shapers
		if (chart.surface.current == null) {
			return;
		}
		if (
			recordings.length === 1 &&
			(shapers?.length ?? 0) > 0 &&
			deepEqual(shapers, prevInputShapers.current) === false
		) {
			if ((prevInputShapers.current?.length ?? 0) > 0) {
				// Animate input shapers
				const skip: string[] = [];
				chart.surface.current.renderableSeries
					.asArray()
					.filter((rs) => rs.yAxisId === PSD_CHART_AXIS_SHAPER_ID)
					.forEach((rs) => {
						if (chart.surface.current == null) {
							return;
						}
						const shaper = shapers?.find((shaper) => shaper.name === rs.id);
						const prevShaper = prevInputShapers.current?.find((shaper) => shaper.name === rs.id);
						if (shaper && prevShaper && !deepEqual(shaper.vals, prevShaper.vals)) {
							const newDs = new XyDataSeries(chart.surface.current.webAssemblyContext2D, {
								containsNaN: false,
								isSorted: true,
							});
							chart.surface.current.addDeletable(newDs);
							if (shaper == null) {
								// Remove shaper if it no longer exists
								newDs.appendRange(sequenceData[0].psd.frequencies, new Array(rs.dataSeries.count()).fill(0));
								chart.surface.current.addDeletable(newDs);
								rs.runAnimation(
									new LineAnimation({
										duration: 500,
										ease: easing.inOutCirc,
										fadeEffect: true,
										reverse: true,
										dataSeries: newDs,
										onCompleted: () => {
											chart.surface.current?.renderableSeries.remove(rs, true);
										},
									}),
								);
								return;
							}
							if (!rs.isRunningAnimation) {
								newDs.appendRange(sequenceData[0].psd.frequencies, shaper.vals);
								rs.runAnimation(
									new LineAnimation({
										duration: 500,
										ease: easing.inOutCirc,
										dataSeries: newDs,
									}),
								);
							}
						}
						skip.push(rs.id);
					});
				initializeInputShapers(chart.surface.current, skip);
			} else {
				initializeInputShapers(chart.surface.current);
			}
		} else if (shapers?.length === 0 && (prevInputShapers.current?.length ?? 0) > 0) {
			// Animate input shapers to zero
			chart.surface.current.renderableSeries
				.asArray()
				.filter((rs) => rs.yAxisId === PSD_CHART_AXIS_SHAPER_ID || rs.id === 'recommended-shaper')
				.forEach((rs) => {
					if (chart.surface.current == null || rs.isRunningAnimation) {
						return;
					}
					const newDs = new XyDataSeries(chart.surface.current.webAssemblyContext2D, {
						containsNaN: false,
						isSorted: true,
					});
					chart.surface.current.addDeletable(newDs);
					if (rs.dataSeries == null) {
						getLogger().warn(rs.id, 'dataSeries is null');
						return;
					}
					newDs.appendRange(sequenceData[0].psd.frequencies, new Array(rs.dataSeries.count()).fill(0));
					rs.runAnimation(
						new LineAnimation({
							duration: 500,
							fadeEffect: true,
							reverse: true,
							ease: easing.inOutCirc,
							dataSeries: newDs,
							onCompleted: () => {
								chart.surface.current?.renderableSeries.remove(rs, true);
							},
						}),
					);
				});
		}
		prevInputShapers.current = shapers;
	}, [chart.surface, initializeInputShapers, recordings.length, sequenceData, shapers]);

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
								new MountainAnimation({
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
				// Update input shapers
				updateInputShapers();
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
							rs.runAnimation(
								new BandAnimation({
									duration: 500,
									fadeEffect: true,
									reverse: true,
									ease: easing.inOutCirc,
									dataSeries: newDs,
								}),
							);
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
									fadeEffect: true,
									reverse: true,
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
		[chart.surface, setupChart, updateInputShapers],
	);

	useEffect(() => {
		if (sequenceData.length != 0 && deepEqual(sequenceData, prevSequenceData.current) === false) {
			if (chart.surface.current) {
				transitionToChart(sequenceData);
			}
			prevSequenceData.current = sequenceData;
		} else if (shapers?.length) {
			updateInputShapers();
		}
	}, [chart.surface, sequenceData, setupChart, shapers?.length, transitionToChart, updateInputShapers]);

	return <SciChartReact {...chart.forwardProps} className="flex-1 bg-zinc-900/50"></SciChartReact>;
};

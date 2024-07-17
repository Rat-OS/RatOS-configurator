'use client';
import { isXyDataSeries, isXyyDataSeries } from '@/app/analysis/charts';
import React, { MutableRefObject, useCallback, useEffect, useRef, useState } from 'react';
import {
	BandAnimation,
	LineAnimation,
	MountainAnimation,
	SciChartSurface,
	XyDataSeries,
	XyyDataSeries,
	easing,
} from 'scichart';
import { shadableTWColors } from '@/app/_helpers/colors';
import { SciChartReact } from 'scichart-react';
import deepEqual from 'deep-equal';
import { animateYAxis, SequenceData, setupChart } from '@/app/analysis/macros/[id]/recordings/[runId]/setup';
import { ShaperCalibrationResult } from '@/app/analysis/_worker/input-shaper';
import { useChart } from '@/app/analysis/hooks';
import {
	useSeriesSubcomponentsChart,
	useInputShaperChart,
	initSeriesSubcomponents,
	updateSeriesSubcomponents,
} from '@/app/analysis/macros/hooks';

SciChartSurface.configure({
	wasmUrl: '/configure/scichart2d.wasm',
	dataUrl: '/configure/scichart2d.data',
});

interface MacroRunChartProps {
	sequenceSeries: SequenceData[];
	shapers?: ShaperCalibrationResult[];
	prevShapers?: MutableRefObject<ShaperCalibrationResult[]>;
	recommendedShaper?: ShaperCalibrationResult | null;
	chart: ReturnType<typeof useChart>;
	subcomponentSeries: ReturnType<typeof useSeriesSubcomponentsChart>['subcomponentSeries'];
}

export const MacroRunChart: React.FC<MacroRunChartProps> = (props) => {
	const { sequenceSeries, shapers, recommendedShaper, chart, prevShapers, subcomponentSeries } = props;
	const [isTransitioning, setIsTransitioning] = useState(false);
	const isTransitioningRef = useRef(isTransitioning);
	isTransitioningRef.current = isTransitioning;
	const afterTransition = useRef<Promise<void | void[]>>(Promise.resolve());
	const subComponentSeriesRef = useRef(subcomponentSeries);
	subComponentSeriesRef.current = subcomponentSeries;

	const prevSequenceData = useRef(sequenceSeries);
	const { updateInputShapers, initializeInputShapers } = useInputShaperChart(
		(shapers?.length ?? 0) > 0,
		sequenceSeries[0],
		shapers ?? [],
		recommendedShaper,
	);

	const transitionToChart = useCallback(
		(data: typeof sequenceSeries) => {
			if (chart.surface.current == null) {
				return;
			}
			const subcomponentData = data.filter((d) => subcomponentSeries.includes(d.sequenceId));
			// if no previous sequenceSeries, run setupChart
			if (prevSequenceData.current.length === 0) {
				setupChart(chart.surface.current, data);
				initializeInputShapers(chart.surface.current);
				subcomponentData.forEach((seq) => {
					initSeriesSubcomponents(chart.surface.current, seq);
				});
				return;
			}
			setIsTransitioning(true);
			const promises: Promise<void | void>[] = [];
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
							if (prevCount > seq.psd.total.frequencies.length) {
								// Pad new sequence data
								const padFreq = new Array(prevCount - seq.psd.total.frequencies.length).fill(0);
								const padEstimates = new Array(prevCount - seq.psd.total.estimates.length).fill(0);
								seq.psd.total.frequencies.unshift(...padFreq);
								seq.psd.total.estimates.unshift(...padEstimates);
								nextSeq.psd.total.frequencies.unshift(...padFreq);
								nextSeq.psd.total.estimates.unshift(...padEstimates);
							}
							if (prevCount < seq.psd.total.frequencies.length) {
								// Drop the last n elements of the new sequence data
								seq.psd.total.frequencies = seq.psd.total.frequencies.slice(0, prevCount);
								seq.psd.total.estimates = seq.psd.total.estimates.slice(0, prevCount);
								nextSeq.psd.total.frequencies = nextSeq.psd.total.frequencies.slice(0, prevCount);
								nextSeq.psd.total.estimates = nextSeq.psd.total.estimates.slice(0, prevCount);
							}
							const newDs = new XyyDataSeries(chart.surface.current.webAssemblyContext2D, {
								containsNaN: false,
								isSorted: true,
							});
							newDs.appendRange(seq.psd.total.frequencies, seq.psd.total.estimates, nextSeq.psd.total.estimates);
							chart.surface.current.addDeletable(newDs);
							rs.rolloverModifierProps.tooltipColor = seq.color ?? 'zinc';
							rs.rolloverModifierProps.tooltipTitle = seq.name + ' Power';
							rs.rolloverModifierProps1.tooltipColor = nextSeq.color ?? 'zinc';
							rs.rolloverModifierProps1.tooltipTitle = nextSeq.name + ' Power';
							promises.push(
								new Promise((resolve) => {
									rs.runAnimation(
										new BandAnimation({
											duration: 500,
											ease: easing.inOutCirc,
											dataSeries: newDs,
											onCompleted: resolve,
										}),
									);
								}),
							);
						}
						if (isXyDataSeries(rs.dataSeries)) {
							if (prevCount > seq.psd.total.frequencies.length) {
								// Pad new sequence data
								const padFreq = new Array(prevCount - seq.psd.total.frequencies.length).fill(0);
								const padEstimates = new Array(prevCount - seq.psd.total.estimates.length).fill(0);
								seq.psd.total.frequencies.unshift(...padFreq);
								seq.psd.total.estimates.unshift(...padEstimates);
							}
							if (prevCount < seq.psd.total.frequencies.length) {
								// Drop the last n elements of the new sequence data
								seq.psd.total.frequencies = seq.psd.total.frequencies.slice(0, prevCount);
								seq.psd.total.estimates = seq.psd.total.estimates.slice(0, prevCount);
							}
							const newDs = new XyDataSeries(chart.surface.current.webAssemblyContext2D, {
								containsNaN: false,
								isSorted: true,
							});
							newDs.appendRange(seq.psd.total.frequencies, seq.psd.total.estimates);
							chart.surface.current.addDeletable(newDs);
							rs.rolloverModifierProps.tooltipColor = seq.color ?? 'zinc';
							rs.rolloverModifierProps.tooltipTitle = seq.name + ' Power';
							promises.push(
								new Promise((resolve) => {
									rs.runAnimation(
										new MountainAnimation({
											duration: 500,
											ease: easing.inOutCirc,
											dataSeries: newDs,
											onCompleted: resolve,
											styles: {
												stroke: shadableTWColors[(seq.color ?? 'zinc') as keyof typeof shadableTWColors][400],
											},
										}),
									);
								}),
							);
						}
					}
				});
				// Update input shapers
				updateInputShapers(chart.surface.current);
				subcomponentData.forEach((seq) => {
					updateSeriesSubcomponents(chart.surface.current, seq);
				});
				animateYAxis(chart.surface.current, data);
				afterTransition.current = Promise.all(promises);
				return;
			}
			// If different number of data series, animate data to zero, then run setupChart.
			if (data.length !== prevSequenceData.current.length) {
				chart.surface.current?.renderableSeries.asArray().forEach((rs) => {
					if (rs) {
						if (chart.surface.current == null) {
							throw new Error('Missing chart surface');
						}
						const prevCount = rs.dataSeries.count();
						const prevNativeXValues = rs.dataSeries.getNativeXValues();
						const prevXValues: number[] = [];
						for (let i = 0; i < prevNativeXValues.size(); i++) {
							prevXValues.push(prevNativeXValues.get(i));
						}
						if (isXyyDataSeries(rs.dataSeries)) {
							const newDs = new XyyDataSeries(chart.surface.current.webAssemblyContext2D, {
								containsNaN: false,
								isSorted: true,
							});
							newDs.appendRange(prevXValues, new Array(prevCount).fill(0), new Array(prevCount).fill(0));
							chart.surface.current.addDeletable(newDs);
							promises.push(
								new Promise((resolve) => {
									rs.runAnimation(
										new BandAnimation({
											duration: 500,
											fadeEffect: true,
											reverse: true,
											ease: easing.inOutCirc,
											dataSeries: newDs,
											onCompleted: () => {
												chart.surface.current?.renderableSeries.remove(rs);
												resolve();
											},
										}),
									);
								}),
							);
						}
						if (isXyDataSeries(rs.dataSeries)) {
							const newDs = new XyDataSeries(chart.surface.current.webAssemblyContext2D, {
								containsNaN: false,
								isSorted: true,
							});
							newDs.appendRange(prevXValues, new Array(prevCount).fill(0));
							chart.surface.current.addDeletable(newDs);
							promises.push(
								new Promise((resolve) => {
									rs.runAnimation(
										new LineAnimation({
											duration: 500,
											ease: easing.inOutCirc,
											dataSeries: newDs,
											fadeEffect: true,
											reverse: true,
											onCompleted: () => {
												chart.surface.current?.renderableSeries.remove(rs);
												resolve();
											},
										}),
									);
								}),
							);
						}
					}
				});
				afterTransition.current = Promise.all(promises).then(
					() =>
						new Promise((resolve) => {
							if (chart.surface.current) {
								chart.surface.current?.renderableSeries.clear();
								chart.surface.current?.chartModifiers.clear();
								setupChart(chart.surface.current, data);
							}
							resolve();
						}),
				);
				return;
			}
		},
		[chart.surface, initializeInputShapers, subcomponentSeries, updateInputShapers],
	);

	useEffect(() => {
		if (sequenceSeries.length != 0 && deepEqual(sequenceSeries, prevSequenceData.current) === false) {
			if (chart.surface.current) {
				transitionToChart(sequenceSeries);
			}
			prevSequenceData.current = sequenceSeries;
		} else {
			if (chart.surface.current) {
				updateInputShapers(chart.surface.current);
			}
		}
	}, [
		chart.surface,
		initializeInputShapers,
		prevShapers,
		sequenceSeries,
		shapers,
		subcomponentSeries,
		transitionToChart,
		updateInputShapers,
	]);

	useEffect(() => {
		if (subcomponentSeries.length && chart.surface.current) {
			if (isTransitioningRef.current) {
				afterTransition.current.then(() => {
					subComponentSeriesRef.current.forEach((seq) => {
						sequenceSeries
							.filter((s) => subComponentSeriesRef.current.includes(s.sequenceId))
							.forEach((seq) => {
								initSeriesSubcomponents(chart.surface.current, seq);
							});
					});
				});
			} else {
				subComponentSeriesRef.current.forEach((seq) => {
					sequenceSeries
						.filter((s) => subComponentSeriesRef.current.includes(s.sequenceId))
						.forEach((seq) => {
							initSeriesSubcomponents(chart.surface.current, seq);
						});
				});
			}
		}
	}, [chart.surface, sequenceSeries, subcomponentSeries]);

	return <SciChartReact {...chart.forwardProps} className="flex-1 bg-zinc-900/50"></SciChartReact>;
};

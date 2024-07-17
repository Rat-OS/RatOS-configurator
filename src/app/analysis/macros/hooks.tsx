import {
	FastMountainRenderableSeries,
	XyDataSeries,
	WaveAnimation,
	FastLineRenderableSeries,
	LineAnimation,
	CustomAnnotation,
	ECoordinateMode,
	EHorizontalAnchorPoint,
	EVerticalAnchorPoint,
	GenericAnimation,
	DoubleAnimator,
	easing,
	SciChartSurface,
} from 'scichart';
import { shadableTWColors, TWShadeableColorName } from '@/app/_helpers/colors';
import { PSD_CHART_AXIS_AMPLITUDE_ID, PSD_CHART_AXIS_SHAPER_ID } from '@/app/analysis/charts';
import type { ShaperCalibrationResult } from '@/app/analysis/_worker/input-shaper';
import deepEqual from 'deep-equal';
import { getLogger } from '@/app/_helpers/logger';
import { SequenceData } from '@/app/analysis/macros/[id]/recordings/[runId]/setup';
import { detectPeaks, MechanicalHealthResult, PeakPairingResult } from '@/app/analysis/_worker/graph-comparison';
import { useState, useRef, useCallback } from 'react';

export const useBeltTensionState = () => {
	const [sequencePair, setSequencePair] = useState<[SequenceData, SequenceData] | null>(null);
	const [peakPairingResults, setPeakPairingResults] = useState<PeakPairingResult | null>(null);
	const [mechanicalHealth, setMechanicalHealth] = useState<MechanicalHealthResult | null>(null);
	return {
		sequencePair,
		setSequencePair,
		peakPairingResults,
		setPeakPairingResults,
		mechanicalHealth,
		setMechanicalHealth,
	};
};

export const initBeltTensionChartAnnotations = async (
	surface: SciChartSurface | null,
	sequencePair: [SequenceData, SequenceData] | null,
	peakPairingResult: PeakPairingResult | null,
	delay: number = 1000,
) => {
	if (sequencePair == null || peakPairingResult == null || surface == null) {
		return;
	}
	const [seq1, seq2] = sequencePair;
	const { pairedPeaks: pairs, unpairedPeaks1, unpairedPeaks2 } = peakPairingResult;
	const yAnimOffset =
		Math.max(
			surface.yAxes.getById(PSD_CHART_AXIS_AMPLITUDE_ID)?.visibleRange.max,
			seq1.psd.total.powerRange.max,
			seq2.psd.total.powerRange.max,
		) * 0.1;
	const annotations = pairs
		.flatMap(([p1, p2], i) => {
			if (
				surface.annotations.getById(String.fromCharCode(65 + i) + '-peak-1') == null &&
				surface.annotations.getById(String.fromCharCode(65 + i) + '-peak-2') == null
			) {
				const x = p1.freq;
				const y = p1.amplitude;
				const x2 = p2.freq;
				const y2 = p2.amplitude;

				const a = new CustomAnnotation({
					id: String.fromCharCode(65 + i) + '-peak-1',
					xCoordinateMode: ECoordinateMode.DataValue,
					yCoordinateMode: ECoordinateMode.DataValue,
					yAxisId: PSD_CHART_AXIS_AMPLITUDE_ID,
					x1: x,
					y1: y + yAnimOffset,
					opacity: 0,
					verticalAnchorPoint: EVerticalAnchorPoint.Bottom,
					horizontalAnchorPoint: EHorizontalAnchorPoint.Center,
					svgString: `
					<svg height="50" width="100" xmlns="http://www.w3.org/2000/svg">
						<g transform="translate(11.5,2)">
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-corner-left-down"><polyline points="14 15 9 20 4 15"/><path d="M20 4h-7a4 4 0 0 0-4 4v12"/></svg>
						</g>
						<text x="48" y="8" dominant-baseline="middle" text-anchor="middle" stroke-width="2" paint-order="stroke" stroke="black" fill="currentColor" font-size="14px">${String.fromCharCode(65 + i)}1</text>
					</svg>`,
				});
				surface.annotations.add(a);

				const b = new CustomAnnotation({
					id: String.fromCharCode(65 + i) + '-peak-2',
					xCoordinateMode: ECoordinateMode.DataValue,
					yCoordinateMode: ECoordinateMode.DataValue,
					yAxisId: PSD_CHART_AXIS_AMPLITUDE_ID,
					x1: x2,
					y1: y2 + yAnimOffset,
					opacity: 0,
					verticalAnchorPoint: EVerticalAnchorPoint.Bottom,
					horizontalAnchorPoint: EHorizontalAnchorPoint.Center,
					svgString: `
					<svg height="50" width="100" xmlns="http://www.w3.org/2000/svg">
						<g transform="translate(11.5,2)">
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-corner-left-down"><polyline points="14 15 9 20 4 15"/><path d="M20 4h-7a4 4 0 0 0-4 4v12"/></svg>
						</g>
						<text x="48" y="8" dominant-baseline="middle" text-anchor="middle" stroke-width="2" paint-order="stroke" stroke="black" fill="currentColor" font-size="14px">${String.fromCharCode(65 + i)}2</text>
					</svg>`,
				});
				surface.annotations.add(b);
				return [
					new Promise<void>((resolve) => {
						const annotationAnimation1 = new GenericAnimation({
							from: { opacity: 0, y1: y + yAnimOffset },
							to: { opacity: 1, y1: y },
							duration: 200,
							delay: delay + i * 200,
							ease: easing.outCubic,
							onAnimate: (from, to, progress) => {
								a.opacity = DoubleAnimator.interpolate(from.opacity, to.opacity, progress);
								a.y1 = DoubleAnimator.interpolate(from.y1, to.y1, progress);
							},
							onCompleted: resolve,
						});
						surface.addAnimation(annotationAnimation1);
					}),
					new Promise<void>((resolve) => {
						const annotationAnimation2 = new GenericAnimation({
							from: { opacity: 0, y1: y2 + yAnimOffset },
							to: { opacity: 1, y1: y2 },
							duration: 200,
							delay: delay + i * 200,
							ease: easing.outCubic,
							onAnimate: (from, to, progress) => {
								b.opacity = DoubleAnimator.interpolate(from.opacity, to.opacity, progress);
								b.y1 = DoubleAnimator.interpolate(from.y1, to.y1, progress);
							},
							onCompleted: resolve,
						});
						surface.addAnimation(annotationAnimation2);
					}),
				];
			}
		})
		.concat(
			unpairedPeaks1.concat(unpairedPeaks2).map((p, i) => {
				const x = p.freq;
				const y = p.amplitude;
				if (surface.annotations.getById('unpaired-peak-' + i) != null) {
					return Promise.resolve();
				}
				const a = new CustomAnnotation({
					id: 'unpaired-peak-' + i,
					xCoordinateMode: ECoordinateMode.DataValue,
					yCoordinateMode: ECoordinateMode.DataValue,
					yAxisId: PSD_CHART_AXIS_AMPLITUDE_ID,
					x1: x,
					y1: y + yAnimOffset,
					opacity: 0,
					verticalAnchorPoint: EVerticalAnchorPoint.Bottom,
					horizontalAnchorPoint: EHorizontalAnchorPoint.Right,
					svgString: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" class="stroke-red-600" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`,
				});
				surface.annotations.add(a);
				return new Promise<void>((resolve) => {
					const annotationAnimation1 = new GenericAnimation({
						from: { opacity: 0, y1: y + yAnimOffset },
						to: { opacity: 1, y1: y },
						duration: 200,
						delay: delay + pairs.length * 200 + i * 200,
						ease: easing.outCubic,
						onAnimate: (from, to, progress) => {
							a.opacity = DoubleAnimator.interpolate(from.opacity, to.opacity, progress);
							a.y1 = DoubleAnimator.interpolate(from.y1, to.y1, progress);
						},
						onCompleted: resolve,
					});
					surface.addAnimation(annotationAnimation1);
				});
			}),
		);
	return await Promise.all(annotations);
};

export const removeBeltTensionChartAnnotations = async (
	surface: SciChartSurface | null,
	fromPairIndex: number = 0,
	fromUnpairedIndex: number = 0,
) => {
	if (surface == null) {
		return;
	}
	let i = fromPairIndex;
	const yAnimOffset = surface.yAxes.getById(PSD_CHART_AXIS_AMPLITUDE_ID)?.visibleRange.max * 0.1;
	const promises: Promise<void>[] = [];
	while (surface.annotations.getById(String.fromCharCode(65 + i) + '-peak-1') != null) {
		const a = surface.annotations.getById(String.fromCharCode(65 + i) + '-peak-1');
		const b = surface.annotations.getById(String.fromCharCode(65 + i) + '-peak-2');
		i++;
		if (a != null) {
			promises.push(
				new Promise((resolve) => {
					const annotationAnimation1 = new GenericAnimation({
						from: { opacity: a.opacity, y1: a.y1 },
						to: { opacity: 0, y1: a.y1 - yAnimOffset },
						duration: 500,
						ease: easing.inOutCirc,
						onAnimate: (from, to, progress) => {
							a.opacity = DoubleAnimator.interpolate(from.opacity, to.opacity, progress);
							a.y1 = DoubleAnimator.interpolate(from.y1, to.y1, progress);
						},
						onCompleted: () => {
							surface.annotations.remove(a);
							resolve();
						},
					});
					surface.addAnimation(annotationAnimation1);
				}),
			);
		}
		if (b != null) {
			promises.push(
				new Promise((resolve) => {
					const annotationAnimation2 = new GenericAnimation({
						from: { opacity: b.opacity, y1: b.y1 },
						to: { opacity: 0, y1: b.y1 - yAnimOffset },
						duration: 500,
						ease: easing.inOutCirc,
						onAnimate: (from, to, progress) => {
							b.opacity = DoubleAnimator.interpolate(from.opacity, to.opacity, progress);
							b.y1 = DoubleAnimator.interpolate(from.y1, to.y1, progress);
						},
						onCompleted: () => {
							surface.annotations.remove(b);
							resolve();
						},
					});
					surface.addAnimation(annotationAnimation2);
				}),
			);
		}
	}
	let j = fromUnpairedIndex;
	while (surface.annotations.getById('unpaired-peak-' + j) != null) {
		const a = surface.annotations.getById('unpaired-peak-' + j);
		j++;
		if (a != null) {
			promises.push(
				new Promise((resolve) => {
					const annotationAnimation1 = new GenericAnimation({
						from: { opacity: a.opacity, y1: a.y1 },
						to: { opacity: 0, y1: a.y1 - yAnimOffset },
						duration: 500,
						ease: easing.inOutCirc,
						onAnimate: (from, to, progress) => {
							a.opacity = DoubleAnimator.interpolate(from.opacity, to.opacity, progress);
							a.y1 = DoubleAnimator.interpolate(from.y1, to.y1, progress);
						},
						onCompleted: () => {
							surface.annotations.remove(a);
							resolve();
						},
					});
					surface.addAnimation(annotationAnimation1);
				}),
			);
		}
	}
	return await Promise.all(promises);
};

export const updateBeltTensionChartAnnotations = async (
	surface: SciChartSurface | null,
	sequencePair: [SequenceData, SequenceData] | null,
	pairedPeaks: PeakPairingResult | null,
) => {
	if (sequencePair == null || pairedPeaks == null || surface == null) {
		return await removeBeltTensionChartAnnotations(surface);
	}
	const { pairedPeaks: pairs, unpairedPeaks1, unpairedPeaks2 } = pairedPeaks;
	let foundPairs = 0;
	let foundUnpaired = 0;
	const promises = pairs
		.flatMap(async ([p1, p2], i) => {
			const x = p1.freq;
			const y = p1.amplitude;
			const x2 = p2.freq;
			const y2 = p2.amplitude;
			const a = surface.annotations.getById(String.fromCharCode(65 + i) + '-peak-1');
			const b = surface.annotations.getById(String.fromCharCode(65 + i) + '-peak-2');
			if (a == null || b == null) {
				return [Promise.resolve()];
			}
			foundPairs++;
			return [
				new Promise<void>((resolve) => {
					const annotationAnimation1 = new GenericAnimation({
						from: { x1: a.x1, y1: a.y1 },
						to: { x1: x, y1: y },
						duration: 500,
						ease: easing.inOutCirc,
						onAnimate: (from, to, progress) => {
							a.x1 = DoubleAnimator.interpolate(from.x1, to.x1, progress);
							a.y1 = DoubleAnimator.interpolate(from.y1, to.y1, progress);
						},
						onCompleted: resolve,
					});
					surface.addAnimation(annotationAnimation1);
				}),
				new Promise<void>((resolve) => {
					const annotationAnimation2 = new GenericAnimation({
						from: { x1: b.x1, y1: b.y1 },
						to: { x1: x2, y1: y2 },
						duration: 500,
						ease: easing.inOutCirc,
						onAnimate: (from, to, progress) => {
							b.x1 = DoubleAnimator.interpolate(from.x1, to.x1, progress);
							b.y1 = DoubleAnimator.interpolate(from.y1, to.y1, progress);
						},
						onCompleted: resolve,
					});
					surface.addAnimation(annotationAnimation2);
				}),
			];
		})
		.concat(
			unpairedPeaks1.concat(unpairedPeaks2).flatMap(async (p, i) => {
				const x = p.freq;
				const y = p.amplitude;
				const a = surface.annotations.getById('unpaired-peak-' + i);
				if (a == null) {
					return [Promise.resolve()];
				}
				foundUnpaired++;
				return [
					new Promise<void>((resolve) => {
						const annotationAnimation1 = new GenericAnimation({
							from: { x1: a.x1, y1: a.y1 },
							to: { x1: x, y1: y },
							duration: 500,
							ease: easing.inOutCirc,
							onAnimate: (from, to, progress) => {
								a.x1 = DoubleAnimator.interpolate(from.x1, to.x1, progress);
								a.y1 = DoubleAnimator.interpolate(from.y1, to.y1, progress);
							},
							onCompleted: resolve,
						});
						surface.addAnimation(annotationAnimation1);
					}),
				];
			}),
		);
	// Remove old pairs
	return await Promise.all([removeBeltTensionChartAnnotations(surface, foundPairs, foundUnpaired), ...promises]);
};

export const useInputShapersState = () => {
	const [sequenceId, setSequenceId] = useState<string | null>(null);
	const [shapers, setShapers] = useState<ShaperCalibrationResult[]>([]);
	const [recommendedShaper, setRecommendedShaper] = useState<ShaperCalibrationResult | null>(null);
	return {
		shapers,
		setShapers,
		recommendedShaper,
		setRecommendedShaper,
		sequenceId,
		setSequenceId,
	};
};

export const initSeriesSubcomponents = (surface: SciChartSurface | null, sequenceData: SequenceData) => {
	if (surface == null) {
		return null;
	}
	// Find original series
	const originalSeries = surface.renderableSeries.asArray().find((rs) => rs.id === sequenceData.sequenceId);
	if (originalSeries != null) {
		// Fix series title
		originalSeries.rolloverModifierProps.tooltipTitle = sequenceData.name + ' (Total)';
	}

	// Initialize subcomponents
	for (const axis of ['x', 'y', 'z'] as (keyof SequenceData['psd'])[]) {
		if (surface.renderableSeries.getById(sequenceData.sequenceId + '-sub-' + axis) == null) {
			const color: TWShadeableColorName = axis === 'x' ? 'red' : axis === 'y' ? 'yellow' : 'blue';
			const rs = new FastLineRenderableSeries(surface.webAssemblyContext2D, {
				id: sequenceData.sequenceId + '-sub-' + axis,
				dataSeries: new XyDataSeries(surface.webAssemblyContext2D, {
					containsNaN: false,
					isSorted: true,
					xValues: sequenceData.psd[axis].frequencies,
					yValues: sequenceData.psd[axis].estimates,
				}),
				stroke: shadableTWColors[color][400],
				strokeThickness: 2,
				yAxisId: PSD_CHART_AXIS_AMPLITUDE_ID,
			});
			rs.rolloverModifierProps.tooltipTitle = sequenceData.name + ' Power';
			rs.rolloverModifierProps.tooltipColor = color;
			rs.animation = new WaveAnimation({
				duration: 1000,
				ease: easing.inOutCubic,
				fadeEffect: true,
			});
			surface.renderableSeries.add(rs);
		}
	}
};

export const updateSeriesSubcomponents = (surface: SciChartSurface | null, sequenceData: SequenceData) => {
	if (surface == null) {
		return null;
	}
	// Find original series
	const originalSeries = surface.renderableSeries.asArray().find((rs) => rs.id === sequenceData.sequenceId);
	if (originalSeries != null) {
		// Fix series title
		originalSeries.rolloverModifierProps.tooltipTitle = sequenceData.name + ' (Total)';
	}
	// Update subcomponents
	for (const axis of ['x', 'y', 'z'] as (keyof SequenceData['psd'])[]) {
		const rs = surface.renderableSeries.getById(sequenceData.sequenceId + '-sub-' + axis);
		if (rs == null) {
			continue;
		}
		const newDs = new XyDataSeries(surface.webAssemblyContext2D, {
			containsNaN: false,
			isSorted: true,
			xValues: sequenceData.psd[axis].frequencies,
			yValues: sequenceData.psd[axis].estimates,
		});
		surface.addDeletable(newDs);
		rs.enqueueAnimation(
			new LineAnimation({
				duration: 500,
				ease: easing.inOutCirc,
				dataSeries: newDs,
			}),
		);
	}
};

export const useSeriesSubcomponentsChart = () => {
	const [subcomponentSeries, setSubcomponentSeries] = useState<string[]>([]);
	return {
		subcomponentSeries,
		setSubcomponentSeries,
	};
};

export const useInputShaperChart = (
	enabled: boolean,
	sequenceData: SequenceData,
	shapers: ShaperCalibrationResult[],
	recommendedShaper?: ShaperCalibrationResult | null,
) => {
	const currentInputShapers = useRef(shapers);
	currentInputShapers.current = shapers;
	const currentRecommendedShaper = useRef(recommendedShaper);
	currentRecommendedShaper.current = recommendedShaper;
	const prevShapers = useRef(shapers);
	const prevRecommendedShaper = useRef(recommendedShaper);

	const initializeInputShapers = useCallback(
		(surface: SciChartSurface, skip: string[] = []) => {
			// Initialize input shapers
			if (currentRecommendedShaper.current != null && surface.renderableSeries.getById('recommended-shaper') == null) {
				const rs = new FastMountainRenderableSeries(surface.webAssemblyContext2D, {
					id: 'recommended-shaper',
					dataSeries: new XyDataSeries(surface.webAssemblyContext2D, {
						containsNaN: false,
						isSorted: true,
						xValues: sequenceData.psd.total.frequencies,
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
			currentInputShapers.current?.forEach((shaper, i) => {
				if (surface == null || skip.includes(shaper.name) || surface.renderableSeries.getById(shaper.name) != null) {
					return;
				}
				const rs = new FastLineRenderableSeries(surface.webAssemblyContext2D, {
					id: shaper.name,
					dataSeries: new XyDataSeries(surface.webAssemblyContext2D, {
						containsNaN: false,
						isSorted: true,
						xValues: sequenceData.psd.total.frequencies,
						yValues: shaper.vals,
					}),
					stroke: shadableTWColors[shaper.color][400],
					strokeThickness: shaper.name === currentRecommendedShaper.current?.name ? 5 : 2,
					strokeDashArray: shaper.name === currentRecommendedShaper.current?.name ? [10, 5, 2, 5] : [3, 5],
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
			prevShapers.current = currentInputShapers.current;
		},
		[sequenceData],
	);

	const updateInputShapers = useCallback(
		async (surface: SciChartSurface) => {
			// Update input shapers
			if (surface == null) {
				return;
			}
			if (
				enabled === true &&
				(shapers?.length ?? 0) > 0 &&
				(deepEqual(shapers, prevShapers.current) === false ||
					(recommendedShaper &&
						(deepEqual(recommendedShaper, prevRecommendedShaper.current) === false ||
							prevRecommendedShaper.current == null)))
			) {
				if ((prevShapers.current?.length ?? 0) > 0) {
					// Animate input shapers
					const skip: string[] = [];
					surface.renderableSeries
						.asArray()
						.filter((rs) => rs.yAxisId === PSD_CHART_AXIS_SHAPER_ID)
						.forEach((rs) => {
							if (surface == null) {
								return;
							}
							const shaper = shapers?.find((shaper) => shaper.name === rs.id);
							const prevShaper = prevShapers.current?.find((shaper) => shaper.name === rs.id);
							if (
								(shaper && prevShaper && !deepEqual(shaper.vals, prevShaper.vals)) ||
								(currentRecommendedShaper.current?.name === rs.id && prevRecommendedShaper.current?.name != rs.id)
							) {
								const newDs = new XyDataSeries(surface.webAssemblyContext2D, {
									containsNaN: false,
									isSorted: true,
								});
								surface.addDeletable(newDs);
								if (shaper == null) {
									// Remove shaper if it no longer exists
									newDs.appendRange(sequenceData.psd.total.frequencies, new Array(rs.dataSeries.count()).fill(0));
									surface.addDeletable(newDs);
									rs.enqueueAnimation(
										new LineAnimation({
											duration: 500,
											ease: easing.inOutCirc,
											fadeEffect: true,
											reverse: true,
											dataSeries: newDs,
											onCompleted: () => {
												surface?.renderableSeries.remove(rs, true);
											},
										}),
									);
									return;
								}
								if (!rs.isRunningAnimation) {
									newDs.appendRange(sequenceData.psd.total.frequencies, shaper.vals);
									rs.enqueueAnimation(
										new LineAnimation({
											duration: 500,
											ease: easing.inOutCirc,
											dataSeries: newDs,
											styles: {
												strokeThickness: rs.id === currentRecommendedShaper.current?.name ? 5 : 2,
											},
										}),
									);
								}
							}
							skip.push(rs.id);
						});
					initializeInputShapers(surface, skip);
				} else {
					initializeInputShapers(surface);
				}
			} else if (shapers?.length === 0 && (prevShapers.current?.length ?? 0) > 0) {
				// Animate input shapers to zero
				surface.renderableSeries
					.asArray()
					.filter((rs) => rs.yAxisId === PSD_CHART_AXIS_SHAPER_ID || rs.id === 'recommended-shaper')
					.forEach((rs) => {
						if (surface == null || rs.isRunningAnimation) {
							return;
						}
						const newDs = new XyDataSeries(surface.webAssemblyContext2D, {
							containsNaN: false,
							isSorted: true,
						});
						surface.addDeletable(newDs);
						if (rs.dataSeries == null) {
							getLogger().warn(rs.id, 'dataSeries is null');
							return;
						}
						newDs.appendRange(sequenceData.psd.total.frequencies, new Array(rs.dataSeries.count()).fill(0));
						rs.enqueueAnimation(
							new LineAnimation({
								duration: 500,
								fadeEffect: true,
								reverse: true,
								ease: easing.inOutCirc,
								dataSeries: newDs,
								onCompleted: () => {
									surface?.renderableSeries.remove(rs, true);
								},
							}),
						);
					});
			}
			// if (
			// 	enabled === true &&
			// 	(shapers?.length ?? 0) > 0 &&
			// 	recommendedShaper &&
			// 	deepEqual(recommendedShaper, prevRecommendedShaper.current) === false
			// ) {
			// 	const rs = surface.renderableSeries.getById(recommendedShaper.name);
			// 	if (surface == null || rs.isRunningAnimation) {
			// 		return;
			// 	}
			// 	const newDs = new XyDataSeries(surface.webAssemblyContext2D, {
			// 		containsNaN: false,
			// 		isSorted: true,
			// 	});
			// 	surface.addDeletable(newDs);
			// 	if (rs.dataSeries == null) {
			// 		getLogger().warn(rs.id, 'dataSeries is null');
			// 		return;
			// 	}
			// 	newDs.appendRange(sequenceData.psd.total.frequencies, new Array(rs.dataSeries.count()).fill(0));
			// 	await new Promise<void>((resolve) => {
			// 		rs.enqueueAnimation(
			// 			new LineAnimation({
			// 				duration: 500,
			// 				fadeEffect: true,
			// 				reverse: true,
			// 				ease: easing.inOutCirc,
			// 				dataSeries: newDs,
			// 				onCompleted: () => {
			// 					surface?.renderableSeries.remove(rs, true);
			// 					resolve();
			// 				},
			// 			}),
			// 		);
			// 	});
			// 	const newRs = new FastLineRenderableSeries(surface.webAssemblyContext2D, {
			// 		id: recommendedShaper.name,
			// 		dataSeries: new XyDataSeries(surface.webAssemblyContext2D, {
			// 			containsNaN: false,
			// 			isSorted: true,
			// 			xValues: sequenceData.psd.total.frequencies,
			// 			yValues: recommendedShaper.psd,
			// 		}),
			// 		stroke: shadableTWColors[recommendedShaper.color][400],
			// 		strokeThickness: 5,
			// 		strokeDashArray: [10, 5, 2, 5],
			// 		yAxisId: PSD_CHART_AXIS_SHAPER_ID,
			// 	});
			// 	newRs.rolloverModifierProps.showRollover = false;
			// 	newRs.animation = new WaveAnimation({
			// 		duration: 1000,
			// 		ease: easing.inOutCubic,
			// 		fadeEffect: true,
			// 	});
			// 	surface.renderableSeries.add(newRs);
			// 	prevRecommendedShaper.current = recommendedShaper;
			// }
			prevRecommendedShaper.current = recommendedShaper;
			prevShapers.current = shapers;
		},
		[enabled, shapers, recommendedShaper, initializeInputShapers, sequenceData.psd.total.frequencies],
	);

	return {
		updateInputShapers,
		initializeInputShapers,
		shapers,
		prevShapers,
	};
};

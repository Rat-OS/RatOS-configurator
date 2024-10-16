import { shadableTWColors, TWShadeableColorName } from '@/app/_helpers/colors';
import { PSD_CHART_AXIS_AMPLITUDE_ID, getPSDTooltipLegendTemplate } from '@/app/analysis/charts';
import { PSD } from '@/zods/analysis';
import {
	SciChartSurface,
	FastBandRenderableSeries,
	XyyDataSeries,
	WaveAnimation,
	FastLineRenderableSeries,
	FastMountainRenderableSeries,
	XyDataSeries,
	NumberRange,
	EAutoRange,
	easing,
	RolloverModifier,
	CursorModifier,
} from 'scichart';

export enum SequenceDataChartType {
	Line = 'line',
	Mountain = 'mountain',
}

export type SequenceData = {
	sequenceId: string;
	color: TWShadeableColorName;
	name: string;
	psd: {
		total: PSD;
		x: PSD;
		y: PSD;
		z: PSD;
	};
	type: 'line' | 'mountain';
};

export const animateYAxis = (surface: SciChartSurface, sequenceData: SequenceData[]) => {
	const yAxis = surface.yAxes.getById(PSD_CHART_AXIS_AMPLITUDE_ID);
	if (yAxis) {
		yAxis.autoRange = EAutoRange.Never;
		const newMax = Math.max(...sequenceData.map((seq) => Math.max(...seq.psd.total.estimates)));
		if (yAxis.visibleRange.max < newMax || yAxis.visibleRange.max > newMax * 5) {
			yAxis.animateVisibleRange(
				new NumberRange(Math.min(...sequenceData.map((seq) => seq.psd.total.powerRange.min)), newMax).growBy(
					new NumberRange(0.0, 0.2),
				),
				500,
				easing.inOutCirc,
			);
		}
	}
};

export const setupChart = (surface: SciChartSurface, sequenceData: SequenceData[]) => {
	let bandSeries = false;
	if (sequenceData.length === 2) {
		bandSeries = true;
		for (let i = 0; i < sequenceData[0].psd.total.frequencies.length; i++) {
			if (Math.abs(sequenceData[0].psd.total.frequencies[i] - sequenceData[1].psd.total.frequencies[i]) > 1) {
				bandSeries = false;
			}
		}
	}
	if (bandSeries) {
		const rs = new FastBandRenderableSeries(surface.webAssemblyContext2D, {
			dataSeries: new XyyDataSeries(surface.webAssemblyContext2D, {
				containsNaN: false,
				isSorted: true,
				xValues: sequenceData[0].psd.total.frequencies,
				yValues: sequenceData[0].psd.total.estimates,
				y1Values: sequenceData[1].psd.total.estimates,
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
			delay: 200,
			ease: easing.inOutQuad,
		});
		surface.renderableSeries.add(rs);
	} else {
		sequenceData.forEach((seq) => {
			const Series = seq.type === SequenceDataChartType.Line ? FastLineRenderableSeries : FastMountainRenderableSeries;
			const rs = new Series(surface.webAssemblyContext2D, {
				id: seq.sequenceId,
				dataSeries: new XyDataSeries(surface.webAssemblyContext2D, {
					containsNaN: false,
					isSorted: true,
					xValues: seq.psd.total.frequencies,
					yValues: seq.psd.total.estimates,
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
				delay: 200,
				ease: easing.inOutQuad,
			});
			surface.renderableSeries.add(rs);
		});
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
	animateYAxis(surface, sequenceData);
};

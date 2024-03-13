import { csv, array } from '@tensorflow/tfjs-data';
import { Tensor1D, mean, slice1d, split, sub, tensor1d, tensor2d, unstack } from '@tensorflow/tfjs-core';
import {
	EWatermarkPosition,
	EllipsePointMarker,
	FastLineRenderableSeries,
	FastMountainRenderableSeries,
	GradientParams,
	NumberRange,
	NumericAxis,
	PaletteFactory,
	Point,
	SciChartJSDarkv2Theme,
	SciChartSurface,
	Thickness,
	XyDataSeries,
} from 'scichart';
import { useEffect } from 'react';
import { powerSpectralDensity, welch } from '@/app/analysis/periodogram';
import EventEmitter from 'events';
SciChartSurface.UseCommunityLicense();

const data = csv('/configure/raw_data.csv', {
	columnConfigs: {
		'#time': {
			dtype: 'float32',
		},
		accel_x: {
			dtype: 'float32',
		},
		accel_y: {
			dtype: 'float32',
		},
		accel_z: {
			dtype: 'float32',
		},
	},
});

type DataRow = { [`#time`]: number; accel_x: number; accel_y: number; accel_z: number };

const drawExample = async (chartId: string) => {
	let fftDS: XyDataSeries;
	const theme = new SciChartJSDarkv2Theme();

	const initTensionChart = async () => {
		const { sciChartSurface, wasmContext } = await SciChartSurface.create(chartId, {
			theme,
			padding: Thickness.fromString('0, 0, 0, 300'),
		});
		sciChartSurface.watermarkRelativeToCanvas = true;
		sciChartSurface.watermarkPosition = EWatermarkPosition.BottomLeft;
		const xAxis = new NumericAxis(wasmContext, {
			// visibleRange: new NumberRange(0, 200),
		});
		const yAxis = new NumericAxis(wasmContext, {
			growBy: new NumberRange(0, 0.1),
		});
		sciChartSurface.xAxes.add(xAxis);
		sciChartSurface.yAxes.add(yAxis);
		fftDS = new XyDataSeries(wasmContext);
		sciChartSurface.renderableSeries.add(
			new FastMountainRenderableSeries(wasmContext, {
				dataSeries: fftDS,
				pointMarker: new EllipsePointMarker(wasmContext, { width: 9, height: 9 }),
				strokeThickness: 3,
				paletteProvider: PaletteFactory.createGradient(
					wasmContext,
					new GradientParams(new Point(0, 0), new Point(1, 1), [
						{ offset: 0, color: '#36B8E6' },
						{ offset: 0.2, color: '#5D8CC2' },
						{ offset: 0.4, color: '#8166A2' },
						{ offset: 0.6, color: '#AE418C' },
						{ offset: 0.8, color: '#CA5B79' },
					]),
					{
						enableStroke: true,
						enableFill: true,
						enablePointMarkers: true,
						fillOpacity: 0.17,
						pointMarkerOpacity: 0.5,
					},
				),
			}),
		);
	};

	const updateTensionChart = async () => {
		// const N = data.base.size;
		// const first = await data.take(1).toArray();
		// const last = (await data.skip(N - 1).toArray()).at(0) as number;
		// console.log(N, first, last);
		const memData = await data
			.map((row) => {
				const d = row as DataRow;
				return [d['#time'], d.accel_x + d.accel_y + d.accel_z];
			})
			.toArray();
		const tensor = tensor2d(memData);
		const [time, vals] = unstack(tensor, 1) as [Tensor1D, Tensor1D];
		const N = vals.size;
		const T = await sub(slice1d(time, time.size - 1, 1), slice1d(time, 0, 1)).array();
		const sampleRate = N / (Array.isArray(T) ? (T[0] as number) : (T as number));
		// const time = data.map((row) => {
		// 	const d = row as number[];
		// 	return d[0];
		// });
		const fftData = await powerSpectralDensity(vals, Math.floor(sampleRate));
		fftDS.clear();
		console.log(fftData.frequencies.length, fftData.estimates.length);
		fftDS.appendRange(fftData.frequencies, fftData.estimates);
	};

	await initTensionChart();
	await updateTensionChart();
};

export const BeltTension = () => {
	const rogress = new EventEmitter();
	useEffect(() => {
		const chartInitializationPromise = drawExample('adxlX');

		// // Delete sciChartSurface on unmount component to prevent memory leak
		// return () => {
		// 	// check if chart is already initialized
		// 	if (accelChartRef.current?.charts.x != null) {
		// 		accelChartRef.current.charts.x.delete();
		// 		accelChartRef.current.charts.y?.delete();
		// 		accelChartRef.current.charts.z?.delete();
		// 		return;
		// 	}
		// 	// else postpone deletion
		// 	chartInitializationPromise.then(() => {
		// 		accelChartRef.current?.charts.x?.delete();
		// 		accelChartRef.current?.charts.y?.delete();
		// 		accelChartRef.current?.charts.z?.delete();
		// 	});
		// };
	}, []);
	return (
		<div className="h-full w-full">
			<div
				style={{
					width: '100%',
					height: '100%',
					display: 'flex',
					flexDirection: 'column',
					overflow: 'hidden',
				}}
			>
				<div className="rounded-lg" id="adxlX" style={{ marginLeft: -300 }} />
			</div>
		</div>
	);
};

import { KlipperAccelSensorName } from '@/zods/hardware';
import { DoWork, runWorker } from 'observable-webworker';
import { Observable, from, of, throwError } from 'rxjs';
import { map, mergeAll, mergeMap } from 'rxjs/operators';
import { createSignalBuffers, type AccelSampleMs } from '@/app/analysis/_worker/processing';
import { createADXL345Stream } from '@/app/analysis/_worker/adxl345-stream';

export enum WorkCommand {
	START = 'START',
	STOP = 'STOP',
	ACCUMULATE = 'ACCUMULATE',
}

export enum WorkResult {
	STARTED = 'STARTED',
	STOPPED = 'STOPPED',
	ACCUMULATED = 'ACCUMULATED',
	SIGNAL = 'SIGNAL',
	PSD = 'PSD',
	RX_RATE = 'RX_RATE',
	SAMPLE_RATE = 'SAMPLE_RATE',
	SPEC_SAMPLE_RATE = 'SPEC_SAMPLE_RATE',
}

export type WorkerInput =
	| {
			type: WorkCommand.STOP;
	  }
	| {
			type: WorkCommand.START;
			payload: {
				url: string;
				sensor: KlipperAccelSensorName;
			};
	  };

export type WorkerSignalOutput = {
	type: WorkResult.SIGNAL;
	/**
	 * The buffer of a Float64Array containing the timestamp in milliseconds and the x, y, z values.
	 */
	payload: ArrayBuffer;
};

export type WorkerOutput =
	| {
			type: WorkResult.STARTED;
			/**
			 * The first timestamp recieved from the socket (seconds).
			 */
			payload: number;
	  }
	| {
			type: WorkResult.STOPPED;
	  }
	| WorkerSignalOutput
	| {
			type: WorkResult.SAMPLE_RATE;
			/**
			 * The sample rate in Hz.
			 */
			payload: number;
	  }
	| {
			type: WorkResult.SPEC_SAMPLE_RATE;
			/**
			 * Normalized spec sheet sample rate in Hz.
			 */
			payload: number;
	  }
	| {
			/**
			 * The rate at which samples are recieved in Hz.
			 */
			type: WorkResult.RX_RATE;
			payload: number;
	  };

const mapToWorkerOutput = <T>(mapFn: (input: T) => WorkerOutput) => map(mapFn);

export class AccelSensorWorker implements DoWork<WorkerInput, WorkerOutput> {
	private stream: ReturnType<typeof createADXL345Stream> | null = null;
	private processor: Awaited<ReturnType<typeof createSignalBuffers>> | null = null;
	public work(input$: Observable<WorkerInput>) {
		return input$.pipe(
			mergeMap((input): Observable<WorkerOutput> => {
				console.log('got input', input);
				switch (input.type) {
					case WorkCommand.START: {
						if (this.stream != null) {
							throw Error(`Stream already started`);
						}
						console.log('starting stream!');
						this.stream = createADXL345Stream(input.payload.url, input.payload.sensor);
						const setup = async (): Promise<Observable<WorkerOutput>> => {
							if (this.stream == null) {
								throw Error(`Stream not initialized`);
							}
							this.processor = await createSignalBuffers(this.stream.dataStream$);
							return from([
								of({
									type: WorkResult.STARTED,
									payload: this.processor.timeStamp,
								} as WorkerOutput),
								this.processor.timeMappedSignal$.pipe(
									mapToWorkerOutput((data) => {
										const sample = new Float64Array([data[0].toNumber(), ...data.slice(1)] as AccelSampleMs);
										return {
											type: WorkResult.SIGNAL,
											payload: sample.buffer,
										};
									}),
								),
								this.processor.sampleRate$.pipe(
									mapToWorkerOutput((sampleRate) => ({
										type: WorkResult.SAMPLE_RATE,
										payload: sampleRate,
									})),
								),
								this.processor.specSampleRate$.pipe(
									mapToWorkerOutput((specSampleRate) => ({
										type: WorkResult.SPEC_SAMPLE_RATE,
										payload: specSampleRate,
									})),
								),
								this.processor.rxRate$.pipe(
									mapToWorkerOutput((rxRate) => ({
										type: WorkResult.RX_RATE,
										payload: rxRate,
									})),
								),
							]).pipe(mergeAll());
						};
						return from(setup()).pipe(mergeAll());
					}
					case WorkCommand.STOP: {
						console.log('stopping stream!');
						if (this.stream != null) {
							this.stream.close();
							this.stream = null;
						}
						return of({
							type: WorkResult.STOPPED,
						} as WorkerOutput);
					}
					default: {
						this.stream?.close();
						this.stream = null;
						throw new Error(`Invalid command`);
					}
				}
			}),
		);
	}
	public selectTransferables(output: WorkerOutput): Transferable[] {
		switch (output.type) {
			case WorkResult.SIGNAL: {
				return [output.payload];
			}
			default: {
				return [];
			}
		}
	}
}

runWorker(AccelSensorWorker);

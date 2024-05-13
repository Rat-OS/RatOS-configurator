import { KlipperAccelSensorName } from '@/zods/hardware';
import { DoWork, runWorker } from 'observable-webworker';
import { EMPTY, Observable, Subject, from, of, throwError } from 'rxjs';
import { map, mergeAll, mergeMap } from 'rxjs/operators';
import { createSignalBuffers, type AccelSampleMs } from '@/app/analysis/_worker/processing';
import { createADXL345Stream } from '@/app/analysis/_worker/adxl345-stream';
import { PSD } from '@/zods/analysis';
import { AccumulateAndCallback, PSDResult, createPSDProcessor } from '@/app/analysis/_worker/psd';
import { rejects } from 'assert';

export enum WorkCommand {
	START = 'START',
	STOP = 'STOP',
	START_ACCUMULATION = 'START_ACCUMULATION',
	STOP_ACCUMULATION = 'STOP_ACCUMULATION',
}

export enum WorkResult {
	STARTED = 'STARTED',
	STOPPED = 'STOPPED',
	ACCUMULATING = 'ACCUMULATING',
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
	  }
	| {
			type: WorkCommand.START_ACCUMULATION;
	  }
	| {
			type: WorkCommand.STOP_ACCUMULATION;
	  };

export type WorkerSignalOutput = {
	type: WorkResult.SIGNAL;
	/**
	 * The buffer of a Float64Array containing the timestamp in milliseconds and the x, y, z values.
	 */
	payload: ArrayBuffer;
};

export type WorkerPSDOutput = {
	type: WorkResult.PSD;
	/**
	 * The power spectral density.
	 */
	payload: Omit<PSDResult, 'source'>;
};

export type WorkerAccumulationResultOuput = {
	type: WorkResult.ACCUMULATED;
	/**
	 * The power spectral density.
	 */
	payload: PSDResult;
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
	| WorkerPSDOutput
	| WorkerAccumulationResultOuput;

const mapToWorkerOutput = <T>(mapFn: (input: T) => WorkerOutput) => map(mapFn);

export class AccelSensorWorker implements DoWork<WorkerInput, WorkerOutput> {
	private stream: ReturnType<typeof createADXL345Stream> | null = null;
	private signalProcessor: Awaited<ReturnType<typeof createSignalBuffers>> | null = null;
	private psdProcessor: Awaited<ReturnType<typeof createPSDProcessor>> | null = null;
	private accumulationSubject = new Subject<AccumulateAndCallback>();
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
							this.signalProcessor = await createSignalBuffers(this.stream.dataStream$);
							this.psdProcessor = createPSDProcessor(
								this.signalProcessor.signal$,
								this.accumulationSubject.asObservable(),
								this.signalProcessor.specSampleRate$,
							);
							setTimeout(() => {
								this.accumulationSubject.next(false);
							}, 200);
							return from([
								of({
									type: WorkResult.STARTED,
									payload: this.signalProcessor.timeStamp,
								} as WorkerOutput),
								this.signalProcessor.timeMappedSignal$.pipe(
									mapToWorkerOutput((data) => {
										const sample = new Float64Array([data[0].toNumber(), ...data.slice(1)] as AccelSampleMs);
										return {
											type: WorkResult.SIGNAL,
											payload: sample.buffer,
										};
									}),
								),
								this.signalProcessor.sampleRate$.pipe(
									mapToWorkerOutput((sampleRate) => ({
										type: WorkResult.SAMPLE_RATE,
										payload: sampleRate,
									})),
								),
								this.signalProcessor.specSampleRate$.pipe(
									mapToWorkerOutput((specSampleRate) => ({
										type: WorkResult.SPEC_SAMPLE_RATE,
										payload: specSampleRate,
									})),
								),
								this.psdProcessor.pipe(
									mapToWorkerOutput((psd) => {
										return {
											type: WorkResult.PSD,
											payload: psd,
										};
									}),
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
					case WorkCommand.START_ACCUMULATION: {
						if (this.signalProcessor == null) {
							throw Error(`Stream not initialized`);
						}
						if (this.psdProcessor == null) {
							throw Error(`PSD process not initialized`);
						}

						return from(
							new Promise<PSDResult>((resolve, reject) => {
								this.accumulationSubject.next(resolve);
								setTimeout(
									() => {
										this.accumulationSubject.next(false);
										reject('Accumulation timed out at 5 minutes');
									},
									1000 * 60 * 5,
								);
							}),
						).pipe(
							mapToWorkerOutput((result) => ({
								type: WorkResult.ACCUMULATED,
								payload: result,
							})),
						);
					}
					case WorkCommand.STOP_ACCUMULATION: {
						if (this.psdProcessor == null) {
							throw Error(`Stream not initialized`);
						}
						if (this.psdProcessor == null) {
							throw Error(`PSD process not initialized`);
						}
						this.accumulationSubject.next(false);
						return EMPTY;
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

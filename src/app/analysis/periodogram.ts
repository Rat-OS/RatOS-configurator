import { signal as tfSignal, Tensor1D, sum, pow, div, mean, sub, tidy } from '@tensorflow/tfjs-core';
import { NumberRange } from 'scichart';
import { PSD } from '@/zods/analysis';
import { shaperDefaults } from '@/app/analysis/_worker/input-shaper';

export interface TypedArrayPSD extends Omit<PSD, 'estimates' | 'frequencies'> {
	estimates: Float64Array;
	frequencies: Float64Array;
}

export const detrendSignal = (signal: Tensor1D) => tidy(() => sub<Tensor1D>(signal, mean(signal, 0, true)));

export const getFFTSize = (sampleRate: number, windowT: number = shaperDefaults.WINDOW_T_SEC): number =>
	1 << Math.floor(sampleRate * windowT - 1).toString(2).length;

/**
 * Estimates the power spectral density of a real-valued input signal using the periodogram method and a hann window.
 * Output units are based on that of the input signal, of the form X^2/Hz, where X is the units of the input signal.
 *
 * @memberof module:bcijs
 * @function
 * @name periodogram
 * @param {number[]} signal - The signal.
 * @param {number} sampleRate - sample rate in Hz
 * @param {Object} [options]
 * @param {number} [options.fftSize=1 << nextpow2(sample_rate * WINDOW_T_SEC - 1)] - Size of the fft to be used. Should be a power of 2.
 * @returns {Object} Object with keys 'estimates' (the psd estimates) and 'frequencies' (the corresponding frequencies in Hz)
 */
export async function powerSpectralDensity(
	signal: Tensor1D,
	sampleRate: number,
	options?: { fftSize?: number; _scaling?: string; isDetrended?: boolean },
): Promise<TypedArrayPSD> {
	let { fftSize, _scaling } = Object.assign(
		{
			fftSize: getFFTSize(sampleRate, shaperDefaults.WINDOW_T_SEC),
			_scaling: 'psd',
		},
		options,
	);
	// Validate _scaling
	if (_scaling != 'psd' && _scaling != 'none') {
		throw new Error('Unknown scaling');
	}

	let scaling_factor: number = _scaling === 'none' ? 1 : 2;
	const win = tidy(() => tfSignal.hannWindow(fftSize));
	let windowLossCompensationFactor = (await tidy(() => div(div(1.0, sum(pow(win, 2))), sampleRate)).array()) as number;

	const detrended = options?.isDetrended ? signal : detrendSignal(signal);
	// await setBackend('webgl');
	let f = tidy(() => tfSignal.stft(detrended, fftSize, Math.floor(fftSize / 2), fftSize, tfSignal.hannWindow));

	let x = (await f.array()) as number[][];
	f.dispose();
	detrended.dispose();
	win.dispose();

	const data = x.map((series) => {
		// Get the power of each FFT bin value
		let powers: number[] = [];
		let frequencies: number[] = [];
		let maxPower = 0;
		let minPower = 0;
		let skipped = 0;
		const fftRatio = sampleRate / fftSize;
		for (var i = 0; i < series.length - 1; i += 2) {
			const frequency = (i === 0 ? 0 : i / 2) * fftRatio;
			if (frequency > shaperDefaults.MAX_FREQ) {
				skipped++;
				continue;
			}
			const nextFrequency = ((i + 2) / 2) * fftRatio;
			// apply scaling
			// magnitude is sqrt(real^2 + imag^2), power is magnitude^2
			let power: number = series[i] ** 2 + series[i + 1] ** 2;
			power *= windowLossCompensationFactor;
			// Don't scale DC or Nyquist by 2
			if (_scaling == 'psd' && i > 0 && nextFrequency < shaperDefaults.MAX_FREQ) {
				power *= scaling_factor;
			}
			if (power > maxPower) {
				maxPower = power;
			}
			if (power < minPower) {
				minPower = power;
			}
			powers.push(power);
			frequencies.push(frequency);
		}

		return {
			estimates: powers,
			frequencies: frequencies,
			powerRange: new NumberRange(minPower, maxPower),
		};
	});
	const avg = welch(data);
	return avg;
}

export class WelchError extends Error {
	constructor(msg: string) {
		super(msg);
		this.name = 'WelchError';
	}
}

// Keep this async so that we can potentially move it to the GPU
export const welch = async (PSDs: PSD[]): Promise<TypedArrayPSD> => {
	if (PSDs.length == 0) throw new WelchError('Unable to calculate any PSD estimates');
	// if (PSDs.length == 1) {
	// 	getLogger().warn('Not enough data to compute more than one segment, returning single modified periodogram.');
	// 	return PSDs[0];
	// }

	// Compute average PSD
	let num_estimates = PSDs[0].estimates.length;
	let avg = new Float64Array(num_estimates).fill(0);
	for (let p = 0; p < PSDs.length; p++) {
		for (let i = 0; i < num_estimates; i++) {
			avg[i] += PSDs[p].estimates[i];
		}
	}
	let maxPower = 0;
	let minPower = 0;
	for (let i = 0; i < num_estimates; i++) {
		avg[i] = avg[i] / PSDs.length;
		if (avg[i] > maxPower) {
			maxPower = avg[i];
		}
		if (avg[i] < minPower) {
			minPower = avg[i];
		}
	}

	return {
		estimates: avg,
		frequencies: Float64Array.from(PSDs[0].frequencies),
		powerRange: new NumberRange(minPower, maxPower),
	};
};

export const sumPSDs = (PSDs: TypedArrayPSD[]): TypedArrayPSD => {
	let num_estimates = PSDs[0].estimates.length;
	let sum = new Float64Array(num_estimates).fill(0);
	for (let p = 0; p < PSDs.length; p++) {
		for (let i = 0; i < num_estimates; i++) {
			sum[i] += PSDs[p].estimates[i];
		}
	}
	return {
		estimates: sum,
		frequencies: Float64Array.from(PSDs[0].frequencies),
		powerRange: new NumberRange(Math.min(...sum), Math.max(...sum)),
	};
};

import { signal as tfSignal, Tensor1D, sum, pow, div, mean, sub, tidy } from '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-backend-webgl';

export type PSD = { frequencies: number[]; estimates: number[] };

/**
 * Returns the ceil of the log2 of the absolute value of the passed number
 * @memberof module:bcijs
 * @function
 * @name nextpow2
 * @param {number} num
 * @returns {number} The ceil of the log2 of the absolute value of the passed number
 * @example
 * nextpow2(8); // 3
 * nextpow2(9); // 4
 * nextpow2(16); // 4
 * nextpow2(30); // 5
 * nextpow2(0); // -Infinity
 */
export function nextpow2(num: number): number {
	return Math.ceil(Math.log2(Math.abs(num)));
}

const WINDOW_T_SEC = 0.5;
const MAX_FREQ = 200;

/**
 * Estimates the power spectral density of a real-valued input signal using the periodogram method and a hann window.
 * Output units are based on that of the input signal, of the form X^2/Hz, where X is the units of the input signal.
 *
 * @memberof module:bcijs
 * @function
 * @name periodogram
 * @param {number[]} signal - The signal.
 * @param {number} sample_rate - sample rate in Hz
 * @param {Object} [options]
 * @param {number} [options.fftSize=1 << nextpow2(sample_rate * WINDOW_T_SEC - 1)] - Size of the fft to be used. Should be a power of 2.
 * @returns {Object} Object with keys 'estimates' (the psd estimates) and 'frequencies' (the corresponding frequencies in Hz)
 */
export async function powerSpectralDensity(
	signal: Tensor1D,
	sample_rate: number,
	options?: { fftSize?: number; _scaling?: string },
): Promise<PSD> {
	let { fftSize, _scaling } = Object.assign(
		{
			fftSize: 1 << nextpow2(sample_rate * WINDOW_T_SEC - 1),
			_scaling: 'psd',
		},
		options,
	);
	// Validate _scaling
	if (_scaling != 'psd' && _scaling != 'none') {
		throw new Error('Unknown scaling');
	}

	let scaling_factor: number = _scaling === 'none' ? 1 : 2;
	const win = tfSignal.hannWindow(fftSize);
	let klipScale = (await tidy(() => div(div(1.0, sum(pow(win, 2))), sample_rate)).array()) as number;

	const avged = sub<Tensor1D>(signal, mean(signal, 0, true));
	// console.log('stft options', sample_rate, signal.size, fftSize);
	let f = tfSignal.stft(avged, fftSize, Math.floor(fftSize / 2), fftSize, tfSignal.hannWindow);
	// Complex array [real, imag, real, imag, etc.]
	// let x = add(pow(real(f), 2), pow(imag(f), 2));
	// x = mul(x, klipScale);
	// const size = x.size / 2 - 2;
	// // const sliced = slice(x, [1, 0], [size]);
	// const res = mul(x, 2);
	// const frequencyLength =
	// const psd = (await mean(res, -1).array()) as number[];
	// console.log(psd.length);
	// console.log(psd[0]);
	// psd[0] /= 2;
	// psd[psd.length - 1] /= 2;
	// const frequencies = (await mul(range(0, psd.length, 1), 2 * (sample_rate / fftSize)).array()) as number[];
	// console.timeEnd('done');
	// return {
	// 	estimates: psd,
	// 	frequencies: frequencies,
	// };
	let x = (await f.array()) as number[][];
	f.dispose();
	avged.dispose();
	win.dispose();

	return welch(
		x.map((series) => {
			// Get the power of each FFT bin value
			let powers: number[] = [];
			let frequencies: number[] = [];

			for (var i = 0; i < series.length - 1; i += 2) {
				const frequency = (i === 0 ? 0 : i / 2) * (sample_rate / fftSize);
				if (frequency > MAX_FREQ) {
					continue;
				}
				const nextFrequency = ((i + 2) / 2) * (sample_rate / fftSize);
				// magnitude is sqrt(real^2 + imag^2)
				let magnitude: number = Math.sqrt(series[i] ** 2 + series[i + 1] ** 2);
				// apply scaling
				let power: number = magnitude ** 2;
				power *= klipScale;
				// Don't scale DC or Nyquist by 2
				if (_scaling == 'psd' && i > 0 && nextFrequency < MAX_FREQ) {
					power *= scaling_factor;
				}
				powers.push(power);
				frequencies.push(frequency);
			}

			return {
				estimates: powers,
				frequencies: frequencies,
			};
		}),
	);
}

export const welch = async (PSDs: PSD[]): Promise<PSD> => {
	if (PSDs.length == 0) throw new Error('Unable to calculate any PSD estimates');
	if (PSDs.length == 1) {
		console.warn('Not enough data to compute more than one segment, returning single modified periodogram.');
		return PSDs[0];
	}

	// Compute average PSD
	let num_estimates = PSDs[0].estimates.length;
	let avg = new Array(num_estimates).fill(0);
	for (let p = 0; p < PSDs.length; p++) {
		for (let i = 0; i < num_estimates; i++) {
			avg[i] += PSDs[p].estimates[i];
		}
	}
	for (let i = 0; i < num_estimates; i++) {
		avg[i] = avg[i] / PSDs.length;
	}

	return {
		estimates: avg,
		frequencies: PSDs[0].frequencies,
	};
};

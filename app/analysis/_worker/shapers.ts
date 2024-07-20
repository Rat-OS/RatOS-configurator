'use client';
/**
 * Adapted from Dmitry Butyugin <dmbutyugin@google.com> input shaper code in Klipper.
 * This file may be distributed under the terms of the GNU GPLv3 license.
 */
import { shaperDefaults } from '@/app/analysis/_worker/input-shaper';
import { shadableTWColors } from '@/app/_helpers/colors';

export type Shaper = [number[], number[]];

export type ShaperModels = 'zv' | 'mzv' | 'zvd' | 'ei' | '2hump_ei' | '3hump_ei';

export type InputShaperModel = {
	minFreq: number;
	initFunc: (shaperFrequency: number, dampingRatio: number) => Shaper;
	name: ShaperModels;
	color: keyof typeof shadableTWColors;
};

export function inputShaperCfg(
	name: ShaperModels,
	initFunc: (shaperFrequency: number, dampingRatio: number) => Shaper,
	minFreq: number,
	color: keyof typeof shadableTWColors,
): InputShaperModel {
	return { name, initFunc, minFreq, color };
}

export function get_none_shaper(): Shaper {
	return [[], []];
}

export function get_zv_shaper(shaper_freq: number, damping_ratio: number): Shaper {
	const df = Math.sqrt(1 - damping_ratio ** 2);
	const K = Math.exp((-damping_ratio * Math.PI) / df);
	const t_d = 1 / (shaper_freq * df);
	const A = [1, K];
	const T = [0, 0.5 * t_d];
	return [A, T];
}

export function get_zvd_shaper(shaper_freq: number, damping_ratio: number): Shaper {
	const df = Math.sqrt(1 - damping_ratio ** 2);
	const K = Math.exp((-damping_ratio * Math.PI) / df);
	const t_d = 1 / (shaper_freq * df);
	const A = [1, 2 * K, K ** 2];
	const T = [0, 0.5 * t_d, t_d];
	return [A, T];
}

export function get_mzv_shaper(shaper_freq: number, damping_ratio: number): Shaper {
	const df = Math.sqrt(1 - damping_ratio ** 2);
	const K = Math.exp((-0.75 * damping_ratio * Math.PI) / df);
	const t_d = 1 / (shaper_freq * df);

	const a1 = 1 - 1 / Math.sqrt(2);
	const a2 = (Math.sqrt(2) - 1) * K;
	const a3 = a1 * K * K;

	const A = [a1, a2, a3];
	const T = [0, 0.375 * t_d, 0.75 * t_d];
	return [A, T];
}

export function get_ei_shaper(shaper_freq: number, damping_ratio: number): Shaper {
	const v_tol = 1 / shaperDefaults.SHAPER_VIBRATION_REDUCTION; // vibration tolerance
	const df = Math.sqrt(1 - damping_ratio ** 2);
	const K = Math.exp((-damping_ratio * Math.PI) / df);
	const t_d = 1 / (shaper_freq * df);

	const a1 = 0.25 * (1 + v_tol);
	const a2 = 0.5 * (1 - v_tol) * K;
	const a3 = a1 * K * K;

	const A = [a1, a2, a3];
	const T = [0, 0.5 * t_d, t_d];
	return [A, T];
}

export function get_2hump_ei_shaper(shaper_freq: number, damping_ratio: number): Shaper {
	const v_tol = 1 / shaperDefaults.SHAPER_VIBRATION_REDUCTION; // vibration tolerance
	const df = Math.sqrt(1 - damping_ratio ** 2);
	const K = Math.exp((-damping_ratio * Math.PI) / df);
	const t_d = 1 / (shaper_freq * df);

	const V2 = v_tol ** 2;
	const X = Math.pow(V2 * (Math.sqrt(1 - V2) + 1), 1 / 3);
	const a1 = (3 * X * X + 2 * X + 3 * V2) / (16 * X);
	const a2 = (0.5 - a1) * K;
	const a3 = a2 * K;
	const a4 = a1 * K * K * K;

	const A = [a1, a2, a3, a4];
	const T = [0, 0.5 * t_d, t_d, 1.5 * t_d];
	return [A, T];
}

export function get_3hump_ei_shaper(shaper_freq: number, damping_ratio: number): Shaper {
	const v_tol = 1 / shaperDefaults.SHAPER_VIBRATION_REDUCTION; // vibration tolerance
	const df = Math.sqrt(1 - damping_ratio ** 2);
	const K = Math.exp((-damping_ratio * Math.PI) / df);
	const t_d = 1 / (shaper_freq * df);

	const K2 = K * K;
	const a1 = 0.0625 * (1 + 3 * v_tol + 2 * Math.sqrt(2 * (v_tol + 1) * v_tol));
	const a2 = 0.25 * (1 - v_tol) * K;
	const a3 = (0.5 * (1 + v_tol) - 2 * a1) * K2;
	const a4 = a2 * K2;
	const a5 = a1 * K2 * K2;

	const A = [a1, a2, a3, a4, a5];
	const T = [0, 0.5 * t_d, t_d, 1.5 * t_d, 2 * t_d];
	return [A, T];
}

export const INPUT_SHAPERS = [
	inputShaperCfg('zv', get_zv_shaper, 21, 'blue'),
	inputShaperCfg('mzv', get_mzv_shaper, 23, 'rose'),
	inputShaperCfg('zvd', get_zvd_shaper, 29, 'lime'),
	inputShaperCfg('ei', get_ei_shaper, 29, 'amber'),
	inputShaperCfg('2hump_ei', get_2hump_ei_shaper, 39, 'pink'),
	inputShaperCfg('3hump_ei', get_3hump_ei_shaper, 48, 'violet'),
];

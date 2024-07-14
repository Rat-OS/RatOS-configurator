export const sumArray = (arr: number[]) => arr.reduce((a, b) => a + b, 0);
export const meanArray = (arr: number[]) => sumArray(arr) / arr.length;

export function pearsonCorrelation(x: number[], y: number[]): number {
	if (x.length !== y.length) {
		throw new Error('Input arrays must have the same length.');
	}

	const n = x.length;
	const meanX = meanArray(x);
	const meanY = meanArray(y);

	let numerator = 0;
	let denominatorX = 0;
	let denominatorY = 0;

	for (let i = 0; i < n; i++) {
		const dx = x[i] - meanX;
		const dy = y[i] - meanY;
		numerator += dx * dy;
		denominatorX += dx * dx;
		denominatorY += dy * dy;
	}

	const denominator = Math.sqrt(denominatorX) * Math.sqrt(denominatorY);
	if (denominator === 0) {
		return 0; // Avoid division by zero
	}

	return numerator / denominator;
}

export function calculatePercentile(arr: number[], percentile: number): number {
	arr.sort((a, b) => a - b);
	const index = (percentile / 100) * (arr.length - 1);
	const lower = Math.floor(index);
	const upper = Math.ceil(index);
	if (lower === upper) {
		return arr[lower];
	}
	return arr[lower] + (arr[upper] - arr[lower]) * (index - lower);
}

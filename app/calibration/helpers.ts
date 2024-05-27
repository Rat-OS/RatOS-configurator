export type CameraOption = {
	key: string;
	value?: number | boolean;
} & ({ min: number; max: number; float?: boolean } | { toggle?: true });

export const parseOptions = (options: string) => {
	const ints = options.matchAll(/- available option:\s(\w+)\s.+(\[-?\d+\.\.\d+\])/g);
	let result: CameraOption[] = [];
	for (const match of ints) {
		const [min, max] = match[2]
			.slice(1, -1)
			.split('..')
			.map((n) => parseInt(n, 10));
		const existing = result.find((o) => o.key === match[1]);
		if (existing && 'max' in existing && existing.max && existing.max <= max) {
			continue;
		}
		result.push({
			key: match[1],
			min,
			max: ['redbalance', 'bluebalance', 'greenbalance'].includes(match[1]) ? 2000 : max,
		});
	}
	const floats = options.matchAll(/- available option:\s(\w+)\s.+(\[-?\d+\.\d+\.\.\d+\.\d+\])/g);
	for (const match of floats) {
		const [min, max] = match[2]
			.slice(1, -1)
			.split('..')
			.map((n) => parseFloat(n));
		const existing = result.find((o) => o.key === match[1]);
		if (existing && 'max' in existing && existing.max && existing.max <= max) {
			continue;
		}
		result.push({
			key: match[1],
			float: true,
			min,
			max: ['redbalance', 'bluebalance', 'greenbalance'].includes(match[1]) ? 2000 : max,
		});
	}
	const bools = options.matchAll(/- available option:\s(\w+)\s.+(\[false\.\.true\])/g);
	for (const match of bools) {
		result.push({
			key: match[1],
			toggle: true,
		});
	}
	return result;
};

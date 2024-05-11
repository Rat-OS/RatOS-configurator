import { Bench, hrtimeNow } from 'tinybench';
import BigNumber from 'bignumber.js';

const bench = new Bench({ now: hrtimeNow, time: 100 });

const samples = new Array(3200).fill(0).map(() => Math.random().toString());
const ones = new Array(20).fill(0).map((_, i) => samples.map((sample) => sample + Array(i).fill(1).join('')));
ones.map((sampleSet, i) => {
	return bench.add(`3200 stringified doubles + ${i} 1's to BigNumber`, () => {
		sampleSet.map((sample) => new BigNumber(sample));
	});
});
const zeros = new Array(20).fill(0).map((_, i) => samples.map((sample) => sample + Array(i).fill(0).join('')));
zeros.map((sampleSet, i) => {
	return bench.add(`3200 stringified doubles + ${i} 0's to BigNumber`, () => {
		sampleSet.map((sample) => new BigNumber(sample));
	});
});
const randos = new Array(20).fill(0).map((_, i) =>
	samples.map(
		(sample) =>
			sample +
			Array(i)
				.map((_, i) => Math.floor(Math.random() * 9))
				.join(''),
	),
);
randos.map((sampleSet, i) => {
	return bench.add(`3200 stringified doubles + ${i} ?'s to BigNumber`, () => {
		sampleSet.map((sample) => new BigNumber(sample));
	});
});
await bench.warmup(); // make results more reliable, ref: https://github.com/tinylibs/tinybench/pull/50
await bench.runConcurrently(10, 'bench');
const winner = bench.tasks.reduce((prev, cur, i) => {
	if ((cur.result?.hz ?? Infinity) > (prev.result?.hz ?? Infinity)) {
		return cur;
	}
	return prev;
}, bench.tasks[0]);
console.log(winner.name, `is the fastest with ${winner.result?.hz} ops/sec`);
console.table(bench.table());

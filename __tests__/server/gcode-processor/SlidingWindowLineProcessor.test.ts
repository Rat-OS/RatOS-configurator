/**
 * @file SlidingWindowLineProcessor.test.ts
 * @description
 *
 * @author Tom Glastonbury <t@tg73.net>
 * @license MIT
 * @copyright 2024
 *
 * THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
 * PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
 * TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
 * USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import {
	ProcessLineContext,
	ProcessorLine,
	SlidingWindowLineProcessor,
} from '@/server/gcode-processor/SlidingWindowLineProcessor';
import { Readable, Writable } from 'stream';
import { describe, test, expect } from 'vitest';
import { pipeline } from 'node:stream/promises';

class TestProcessor extends SlidingWindowLineProcessor {
	constructor(processLine: (c: ProcessLineContext) => void, maxLinesAhead = 10, maxLinesBehind = 10) {
		super(maxLinesAhead, maxLinesBehind);
		this._processLine = processLine;
	}

	protected _processLine(context: ProcessLineContext): void {
		throw new Error('Method not implemented.');
	}
}

class ArrayWriter extends Writable {
	data: any[] = [];
	constructor() {
		super({ objectMode: true });
	}
	_write(chunk: any, encoding: BufferEncoding, callback: (error?: Error | null) => void): void {
		this.data.push(chunk);
		callback();
	}
}

const alpha = Array.from(Array(26)).map((e, i) => String.fromCharCode(i + 65));

describe('SlidingWindowLineProcessor', (async) => {
	test('behaviour is correct', async () => {
		const log: [line: string, back: string[], fwd: string[]][] = [];
		const data = alpha.slice(0, 10);
		const source = Readable.from(data.concat(), { objectMode: true });
		const dest = new ArrayWriter();
		let pos = -1;
		const maxAhead = 2;
		const maxBehind = 3;
		const proc = new TestProcessor(
			(c) => {
				++pos;
				const back = Array.from(c.scanBack(99)).map((v) => v.line);
				const fwd = Array.from(c.scanForward(99)).map((v) => v.line);
				log.push([c.line, back, fwd]);
			},
			maxAhead,
			maxBehind,
		);

		await pipeline(source, proc, dest);

		/**
		 * Explanation:
		 *
		 * The processor does not make any calls to `processLine` until it has received
		 * enough data to provide the requested max lines behind and ahead at position
		 * (maxLinesBehind + 1) - so it needs to see (maxLinesBehind + maxLinesAhead + 1)
		 * lines before it starts calling processLine. At this point, it calls processLine
		 * for all lines up to position (maxLinesBehind + 1). During this phase, it's possible
		 * to scan ahead further than maxLinesAhead, because the data has been pre-loaded.
		 *
		 * A similar situation happens on flush, as the final lines are processed, and more
		 * than the usual number of lines of look-behind are available.
		 */

		expect(log).toEqual([
			// Priming
			['A', [], ['B', 'C', 'D', 'E', 'F']],
			['B', ['A'], ['C', 'D', 'E', 'F']],
			['C', ['B', 'A'], ['D', 'E', 'F']],
			// Steady state
			['D', ['C', 'B', 'A'], ['E', 'F']],
			['E', ['D', 'C', 'B'], ['F', 'G']],
			['F', ['E', 'D', 'C'], ['G', 'H']],
			['G', ['F', 'E', 'D'], ['H', 'I']],
			['H', ['G', 'F', 'E'], ['I', 'J']],
			// Flushing
			['I', ['H', 'G', 'F', 'E'], ['J']],
			['J', ['I', 'H', 'G', 'F', 'E'], []],
		]);

		expect(dest.data as string[]).toEqual(data.map((v) => new ProcessorLine(v)));
	});
});

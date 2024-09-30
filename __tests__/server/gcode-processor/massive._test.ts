/**
 * @file massive.test.ts
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

/* eslint-disable no-console */

import {
	BookmarkingBufferEncoder,
	replaceBookmarkedGcodeLine,
} from '@/server/gcode-processor/BookmarkingBufferEncoder';
import { GCodeProcessor } from '@/server/gcode-processor/GCodeProcessor';
import { createReadStream, createWriteStream } from 'node:fs';
import fs, { FileHandle } from 'node:fs/promises';
import { pipeline } from 'node:stream/promises';
import split from 'split2';
import { describe, test, expect, chai } from 'vitest';

async function processOneFile(inFile: string, outFile: string) {
	console.log(`   input: ${inFile}\n  output: ${outFile}`);
	let fh: FileHandle | undefined = undefined;
	try {
		fh = await fs.open(outFile, 'w');
		const gcodeProcessor = new GCodeProcessor(true, false, false);
		const encoder = new BookmarkingBufferEncoder();

		await pipeline(
			createReadStream(inFile),
			split(),
			gcodeProcessor,
			encoder,
			createWriteStream('|notused|', { fd: fh.fd, highWaterMark: 256 * 1024, autoClose: false }),
		);

		await gcodeProcessor.processBookmarks(encoder, (bm, line) => replaceBookmarkedGcodeLine(fh!, bm, line));
	} finally {
		await fh?.close();
	}
}

/**
 * To enable this test, rename this file, removing the underscore (massive.test.ts).
 * Don't commit it with the underscore removed!
 *
 * You must update the paths below to suit your local environment and provide
 * a suitable gcode file. To run the test under linux or WSL with memory usage
 * stats etc:
 *
 * `~/RatOS-dev/RatOS-configurator/src$ /usr/bin/time -v pnpm vitest run --no-ui massive`
 *
 */
describe('massive', async () => {
	test('massive', { timeout: 999999999 }, async () => {
		await processOneFile(
			'/mnt/c/dev/ratos-gcode-samples/massive.gcode',
			'/mnt/c/dev/ratos-gcode-samples/massive.out.gcode',
		);
	});
});

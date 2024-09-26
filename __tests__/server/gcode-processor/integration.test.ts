/**
 * @file integration.test.ts
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
import { glob } from 'glob';
import { createReadStream, createWriteStream } from 'node:fs';
import fs, { FileHandle } from 'node:fs/promises';
import path from 'node:path';
import { pipeline } from 'node:stream/promises';
import split from 'split2';
import { describe, test, expect, chai } from 'vitest';

chai.use(require('chai-string'));

// https://stackoverflow.com/a/43053803
function cartesian(...a: any) {
	return a.reduce((a: any, b: any) => a.flatMap((d: any) => b.map((e: any) => [d, e].flat())));
}

function replaceExtension(pathStr: string, extensionWithDot: string) {
	return path.format({ ...path.parse(pathStr), base: '', ext: extensionWithDot });
}

async function legacyAndModernGcodeFilesAreEquivalent(legacyPath: string, modernPath: string) {
	let fhLegacy: FileHandle | undefined = undefined;
	let fhModern: FileHandle | undefined = undefined;
	try {
		console.log(`Comparing legacy file ${legacyPath} to modern file ${modernPath}`);

		fhLegacy = await fs.open(legacyPath);
		fhModern = await fs.open(modernPath);

		const iterLegacy = fhLegacy.readLines()[Symbol.asyncIterator]();
		const iterModern = fhModern.readLines()[Symbol.asyncIterator]();

		// Skip '; processed by...' line in modern
		let modern = await iterModern.next();
		expect(modern.value).to.startWith('; processed by RatOS');

		let lineNumber = 2;

		while (true) {
			let legacy = await iterLegacy.next();
			modern = await iterModern.next();

			++lineNumber;

			if (modern.done) {
				expect(legacy.value).to.startWith('; processed by RatOS');
				break;
			}

			expect(legacy.done).toBeFalsy();

			// Work around the double-commenting bug in legacy gcode.
			const legacyLine = legacy.value.startsWith(
				'; Removed by RatOS post processor: ; Removed by RatOS post processor: ',
			)
				? legacy.value.substring('; Removed by RatOS post processor: '.length)
				: legacy.value;
			expect(modern.value.trimEnd()).to.equal(legacyLine.trimEnd(), `at line ${lineNumber}`);
		}

		console.log(`  ${lineNumber} lines compared ok.`);
	} finally {
		fhLegacy?.close();
		fhModern?.close();
	}
}

describe('legacy equivalence', { timeout: 60000 }, async () => {
	test.each(
		cartesian(await glob('**/*.gcode', { cwd: path.join(__dirname, 'fixtures', 'slicer_output') }), [false, true]) as [
			[string, boolean],
		],
	)('%s with rmmu_hub=%s', async (fixtureFile, printerHasRmmuHub) => {
		const outputDir = path.join(__dirname, 'fixtures', 'output');
		fs.mkdir(outputDir, { recursive: true });
		let outputPath = path.join(outputDir, fixtureFile);
		if (printerHasRmmuHub) {
			outputPath = replaceExtension(outputPath, '.rmmu.gcode');
		}

		console.log(`   input: ${fixtureFile}\n  output: ${outputPath}`);
		let fh: FileHandle | undefined = undefined;
		try {
			fh = await fs.open(outputPath, 'w');
			const gcodeProcessor = new GCodeProcessor(true, printerHasRmmuHub, false);
			const encoder = new BookmarkingBufferEncoder();

			await pipeline(
				createReadStream(path.join(__dirname, 'fixtures', 'slicer_output', fixtureFile)),
				split(),
				gcodeProcessor,
				encoder,
				createWriteStream('|notused|', { fd: fh.fd, highWaterMark: 256 * 1024, autoClose: false }),
			);

			await gcodeProcessor.processBookmarks(encoder, (bm, line) => replaceBookmarkedGcodeLine(fh!, bm, line));
		} finally {
			await fh?.close();
		}

		let legacyPath = path.join(__dirname, 'fixtures', 'transformed_legacy', fixtureFile);
		if (printerHasRmmuHub) {
			legacyPath = replaceExtension(legacyPath, '.rmmu.gcode');
		}

		await legacyAndModernGcodeFilesAreEquivalent(legacyPath, outputPath);
	});
});

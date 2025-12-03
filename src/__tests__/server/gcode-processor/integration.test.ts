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

import { BookmarkingBufferEncoder } from '@/server/gcode-processor/BookmarkingBufferEncoder';
import { GCodeProcessor } from '@/server/gcode-processor/GCodeProcessor';
import { glob } from 'glob';
import { createReadStream } from 'node:fs';
import fs, { FileHandle } from 'node:fs/promises';
import path from 'node:path';
import { Writable } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import split from 'split2';
import { describe, test, expect, chai } from 'vitest';
import semver from 'semver';
import { GCodeFile, TransformOptions } from '@/server/gcode-processor/GCodeFile';

chai.use(require('chai-string'));

class NullSink extends Writable {
	_write(chunk: any, encoding: BufferEncoding, callback: (error?: Error | null) => void): void {
		callback();
	}
}

async function processToNullWithoutBookmarkProcessing(gcodePath: string, abortSignal?: AbortSignal) {
	const gcodeProcessor = new GCodeProcessor({
		printerHasIdex: true,
		quickInspectionOnly: false,
		allowUnsupportedSlicerVersions: false,
		onWarning: () => {},
		abortSignal: abortSignal,
	});
	const encoder = new BookmarkingBufferEncoder(undefined, undefined, abortSignal);
	await pipeline(createReadStream(gcodePath), split(), gcodeProcessor, encoder, new NullSink());
}

// https://stackoverflow.com/a/43053803
function cartesian(...a: any) {
	return a.reduce((a: any, b: any) => a.flatMap((d: any) => b.map((e: any) => [d, e].flat())));
}

function replaceExtension(pathStr: string, extensionWithDot: string) {
	return path.format({ ...path.parse(pathStr), base: '', ext: extensionWithDot });
}

async function readLines(
	iter: AsyncIterableIterator<string>,
	count: number,
): Promise<{ lines: string; lastIterResult: IteratorResult<string, any> }> {
	let v = '';
	let r: IteratorResult<string, any> | undefined;

	for (let n = 0; n < count; ++n) {
		r = await iter.next();
		if (r.done) {
			break;
		}
		v = v + '\n' + r.value;
	}
	return { lines: v, lastIterResult: r! };
}

async function processedGCodeFilesAreEquivalent(expectedPath: string, actualPath: string) {
	let fhExpected: FileHandle | undefined = undefined;
	let fhActual: FileHandle | undefined = undefined;
	try {
		// console.log(`Comparing expected file ${expectedPath} to actual file ${actualPath}`);

		fhExpected = await fs.open(expectedPath);
		fhActual = await fs.open(actualPath);

		const iterExpected = fhExpected.readLines()[Symbol.asyncIterator]();
		const iterActual = fhActual.readLines()[Symbol.asyncIterator]();

		const expectedHeader = await readLines(iterExpected, 3);
		const actualHeader = await readLines(iterActual, 3);

		const gciExpected = GCodeFile.tryParseHeader(expectedHeader.lines);
		const gciActual = GCodeFile.tryParseHeader(actualHeader.lines);

		expect(gciExpected, ' (could not parse expected file header)').not.toBeNull;
		expect(gciActual, ' (could not parse actual file header)').not.toBeNull;

		expect(gciExpected!.postProcessorVersion).toBeTruthy();
		expect(gciExpected!.postProcessorTimestamp).toBeTruthy();
		expect(gciActual!.postProcessorVersion).toBeTruthy();
		expect(gciActual!.postProcessorTimestamp).toBeTruthy();
		expect(gciActual!.flavour).to.equal(gciExpected!.flavour, ' while comparing headers');
		expect(gciActual!.generator).to.equal(gciExpected!.generator, ' while comparing headers');
		expect(semver.eq(gciActual!.generatorVersion, gciExpected!.generatorVersion)).toBeTruthy();
		expect(gciActual!.ratosDialectVersion).to.equal(gciExpected!.ratosDialectVersion, ' while comparing headers');

		let lineNumber = 1;
		let expected = expectedHeader.lastIterResult;
		let actual = actualHeader.lastIterResult;

		while (true) {
			expected = await iterExpected.next();
			actual = await iterActual.next();

			++lineNumber;

			expect(actual.done).toStrictEqual(expected.done);

			if (actual.value.startsWith('; ratos_meta begin ') && expected.value.startsWith('; ratos_meta begin ')) {
				// Stop comparing. We can't meaningfully compare ratos_meta blocks. This is handled by other tests.
				break;
			}

			if (actual.done) {
				break;
			}

			expect(actual.value.trimEnd()).to.equal(expected.value.trimEnd(), `at line ${lineNumber}`);
		}

		// console.log(`  ${lineNumber} lines compared ok.`);
	} finally {
		fhExpected?.close();
		fhActual?.close();
	}
}

describe('other', async () => {
	test('START_PRINT must occur before first move or toolchange', async () => {
		await expect(
			async () =>
				await processToNullWithoutBookmarkProcessing(
					path.join(__dirname, 'fixtures', 'other', 'without_start_print.gcode'),
				),
		).rejects.toThrow(/START_PRINT command was not found before the first move or toolchange instruction/);
	});

	test('G2/G3 arcs are not supported', async () => {
		await expect(
			async () =>
				await processToNullWithoutBookmarkProcessing(path.join(__dirname, 'fixtures', 'other', 'has_arcs_ps.gcode')),
		).rejects.toThrow(/arcs.*not.*supported/);
	});

	test('processing can be cancelled', async () => {
		await expect(async () =>
			processToNullWithoutBookmarkProcessing(
				path.join(__dirname, 'fixtures', 'slicer_output', '001', 'SS_IDEX_MultiColor_WipeTower.gcode'),
				AbortSignal.timeout(100),
			),
		).rejects.toThrow(/timeout/);
	});
});

describe('output equivalence', { timeout: 60000 }, async () => {
	test.each(await glob('**/*.gcode', { cwd: path.join(__dirname, 'fixtures', 'slicer_output') }))(
		'%s',
		async (fixtureFile) => {
			const outputPath = path.join(__dirname, 'fixtures', 'output', fixtureFile);
			const outputDir = path.dirname(outputPath);
			await fs.mkdir(outputDir, { recursive: true });

			// console.log(`   input: ${fixtureFile}\n  output: ${outputPath}`);

			let gotWarnings = false;
			const gcfOptions: TransformOptions = {
				printerHasIdex: true,
				allowUnsupportedSlicerVersions: false,
				onWarning: (c, m) => {
					// If some specific warning is acceptable during this test, add logic here to ignore it.
					// Generally, we don't want to encounter warnings in tests.
					console.warn(`  Warning: ${m} (${c})`);
					gotWarnings = true;
				},
			};

			const gcf = await GCodeFile.inspect(path.join(__dirname, 'fixtures', 'slicer_output', fixtureFile), gcfOptions);

			expect(gotWarnings).to.equal(
				false,
				'One or more warnings were raised during inspection, check console output for details. Correct tests must not produce warnings.',
			);

			gotWarnings = false;

			await gcf.transform(outputPath, gcfOptions);

			expect(gotWarnings).to.equal(
				false,
				'One or more warnings were raised during processing, check console output for details. Correct tests must not produce warnings.',
			);
			const expectedPath = path.join(__dirname, 'fixtures', 'expected', fixtureFile);
			await processedGCodeFilesAreEquivalent(expectedPath, outputPath);
		},
	);
});

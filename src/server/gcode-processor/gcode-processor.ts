/**
 * @file gcode-processor.ts
 * @description Public API of the RatOS gcode post-processor.
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

/**
 * NOTE: Incomplete, API requirements to be determined.
 */

import { GCodeProcessor } from '@/server/gcode-processor/GCodeProcessor';
import { createReadStream, createWriteStream, existsSync, PathLike } from 'node:fs';
import { FileHandle, access, constants, stat, open } from 'node:fs/promises';
import path from 'node:path';
import { pipeline } from 'node:stream/promises';
import progress from 'progress-stream';
import split from 'split2';
import {
	BookmarkingBufferEncoder,
	replaceBookmarkedGcodeLine,
} from '@/server/gcode-processor/BookmarkingBufferEncoder';
import { Writable } from 'node:stream';

class NullSink extends Writable {
	_write(chunk: any, encoding: BufferEncoding, callback: (error?: Error | null) => void): void {
		callback();
	}
}

interface Options {
	idex?: boolean;
	rmmu?: boolean;
	overwrite?: boolean;
	onProgress?: (report: progress.Progress) => void;
}

export async function processGCode(inputFile: string, outputFile: string, options: Options) {
	let fh: FileHandle | undefined = undefined;
	const inputStat = await stat(path.resolve(inputFile));
	const outPath = path.resolve(path.dirname(outputFile));
	if (!inputStat.isFile()) {
		throw new Error(`${inputFile} is not a file`);
	}
	try {
		await access(outPath, constants.W_OK);
	} catch (e) {
		throw new Error(`${outPath} is not a writable directory`);
	}
	if (existsSync(path.resolve(outputFile)) && !options.overwrite) {
		throw new Error(`${outputFile} already exists`);
	}
	try {
		fh = await open(outputFile, 'w');
		const gcodeProcessor = new GCodeProcessor(!!options.idex, !!options.rmmu, false);
		const encoder = new BookmarkingBufferEncoder();
		const progressStream = progress({ length: inputStat.size });
		if (options.onProgress) {
			progressStream.on('progress', options.onProgress);
		}
		await pipeline(
			createReadStream(inputFile),
			progressStream,
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

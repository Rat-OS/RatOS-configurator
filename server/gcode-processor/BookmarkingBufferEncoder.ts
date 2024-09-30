/**
 * @file BookmarkingBufferEncoder.ts
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

import { Transform, TransformCallback } from 'node:stream';
import { Bookmark, BookmarkKey, BookmarkableLine } from '@/server/gcode-processor/Bookmark';
import { GCodeProcessorError, InternalError } from '@/server/gcode-processor/errors';

export class BookmarkingBufferError extends GCodeProcessorError {}

export interface BookmarkCollection {
	/** Get the bookmark for the given key, or throw if not found. */
	getBookmark(key: BookmarkKey): Bookmark;

	/** Get the bookmark for the given key, or `undefined` if not found. */
	getBookmarkOrUndefined(key: BookmarkKey): Bookmark | undefined;

	/** Get the collection of bookmarks. */
	getBookmarks(): IterableIterator<[BookmarkKey, Bookmark]>;
}

/**
 * Consumes {@link BookmarkableLine} objects, encoding lines to {@link Buffer} to track actual
 * encoded byte length, tracks any requested bookmarks, and passes on the encoded
 * buffers. Intended to be pipelined immediately after {@link SlidingWindowLineProcessor}.
 */
export class BookmarkingBufferEncoder extends Transform implements BookmarkCollection {
	constructor(
		/** A function to be invoked before the transform stream is closed. Typically used to
		 * apply bookmarks.
		 */
		public readonly newline: string = '\n',
		public readonly encoding: BufferEncoding = 'utf8',
	) {
		super({ objectMode: true });
	}

	#bookmarks: Map<BookmarkKey, Bookmark> = new Map<BookmarkKey, Bookmark>();
	#bytesWritten: number = 0;

	_transform(chunk: any, encoding: BufferEncoding, callback: TransformCallback): void {
		if (chunk instanceof BookmarkableLine) {
			let buffer = Buffer.from(chunk.line + this.newline, this.encoding);
			if (chunk.bookmarkKey) {
				this.#bookmarks.set(chunk.bookmarkKey, new Bookmark(chunk.line, this.#bytesWritten, buffer.byteLength));
			}
			this.#bytesWritten += buffer.byteLength;
			this.push(buffer);
			callback();
		} else if (chunk) {
			callback(
				new BookmarkingBufferError(
					'Received a chunk of an unexpected type. Chunks must be instanceof BookmarkableLine.',
				),
			);
		}
	}

	getBookmark(key: BookmarkKey): Bookmark {
		let b = this.#bookmarks.get(key);
		if (b) {
			return b;
		}

		throw new RangeError('The specified bookmark key was not found.');
	}

	getBookmarkOrUndefined(key: BookmarkKey): Bookmark | undefined {
		return this.#bookmarks.get(key);
	}

	getBookmarks(): IterableIterator<[BookmarkKey, Bookmark]> {
		return this.#bookmarks.entries();
	}
}

/**
 * `BookmarkingWriterDestination` contains the methods of `FileHandle` required by `BookmarkingWriter` and
 * `replaceBookmarkedGcodeLine`. This allows other implementations to be used, for example for testing without
 * using disk writes.
 */
export interface WritableFileHandleLike {
	write(
		data: string,
		position?: number | null,
		encoding?: BufferEncoding | null,
	): Promise<{
		bytesWritten: number;
		buffer: string;
	}>;

	write<TBuffer extends Uint8Array>(
		buffer: TBuffer,
		offset?: number | null,
		length?: number | null,
		position?: number | null,
	): Promise<{
		bytesWritten: number;
		buffer: TBuffer;
	}>;
}

/**
 * Replaces a bookmarked line in a file. GCode-compatible padding is added as required to match the size of the line being
 * replaced. The file must be UTF8 encoded.
 * @param fh
 * @param bookmark
 * @param replacementLine
 * @param encoding
 */
export async function replaceBookmarkedGcodeLine(
	fh: WritableFileHandleLike,
	bookmark: Bookmark,
	replacementLine: string,
): Promise<void> {
	let line = replacementLine.trimEnd();
	let buf = Buffer.from(line);
	if (buf.length + 1 > bookmark.byteLength) {
		// Too long, allowing for terminating \n.
		throw new RangeError(
			`The line cannot be replaced in-place. The replacement requires ${buf.length + 1} bytes, but only ${bookmark.byteLength} bytes are available.`,
		);
	}
	buf = Buffer.from(line.padEnd(line.length + bookmark.byteLength - buf.length - 1) + '\n');
	if (buf.length != bookmark.byteLength) {
		// Should never happen, sanity check.
		throw new InternalError('Unexpected buffer length mismatch!');
	}
	await fh.write(buf, undefined, undefined, bookmark.byteOffset);
}

/**
 * @file SlidingWindowLineProcessor.ts
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
import { RingBuffer } from 'ring-buffer-ts';
import { BookmarkableLine, BookmarkKey } from '@/server/gcode-processor/Bookmark';
import { InternalError } from '@/server/gcode-processor/errors';

export class ProcessorLine extends BookmarkableLine {
	emit: boolean = true;
}

/**
 * A context class passed to {@link ProcessLineCallback} for each line as it is processed.
 *
 * Implementations of {@link ProcessLineCallback} can:
 * - Inspect the line of text by getting {@link line}.
 * - Change the line of text that will be output by setting {@link line}.
 * - Stop the line from being output by setting {@link emit} to `false`.
 * - Get a {@link ProcessLineContext} for a nearby line (within the sliding window) using
 *   {@link getLine} or {@link getLineOrUndefined}.
 * - Iterate backwards or forwards through the available lines in the sliding window
 *   using {@link scanBack} and {@link scanForward} which yield {@link ProcessLineContext}
 *   objects.
 * - Change other lines within the available sliding window through the {@link ProcessLineContext}
 *   objects obtained.
 */
export class ProcessLineContext {
	constructor(
		item: ProcessorLine,
		getLineContextOrUndefined: (offset: number) => ProcessLineContext | undefined,
		offset: number,
	) {
		this.#item = item;
		this.#getLineOrUndefined = getLineContextOrUndefined;
		this.#offset = offset;
	}

	#getLineOrUndefined: (offset: number) => ProcessLineContext | undefined;
	#item: ProcessorLine;
	#offset: number;

	get offset(): number {
		return this.#offset;
	}

	get line(): string {
		return this.#item.line;
	}

	set line(value: string) {
		this.#item.line = value;
	}

	/** Prepend a prefix to the line. */
	prepend(prefix?: string) {
		if (prefix) {
			this.#item.line = prefix + this.#item.line;
		}
	}

	/** Should this line be emitted to output? */
	get emit(): boolean {
		return this.#item.emit;
	}

	/** Should this line be emitted to output? */
	set emit(value: boolean) {
		this.#item.emit = value;
	}

	get bookmarkKey(): BookmarkKey | undefined {
		return this.#item.bookmarkKey;
	}

	set bookmarkKey(key: BookmarkKey) {
		if (this.#item.bookmarkKey === undefined) {
			this.#item.bookmarkKey = key;
		} else {
			throw new Error('The bookmark key has already been set and cannot be changed.');
		}
	}

	getLine(offset: number): ProcessLineContext {
		if (offset == 0) {
			return this;
		}
		let ctx = this.#getLineOrUndefined(this.#offset + offset);
		if (ctx) {
			return ctx;
		}
		throw new RangeError('The specified offset is outside the available window.');
	}

	getLineOrUndefined(offset: number): ProcessLineContext | undefined {
		if (offset == 0) {
			return this;
		}
		return this.#getLineOrUndefined(this.#offset + offset);
	}

	*scanForward(maxOffset?: number) {
		let offset = 1;
		while (!maxOffset || offset <= maxOffset) {
			const offsetLine = this.#getLineOrUndefined(this.#offset + offset);
			if (!offsetLine) {
				return;
			}
			yield offsetLine;
			++offset;
		}
	}

	*scanBack(maxOffset?: number) {
		let offset = 1;
		while (!maxOffset || offset <= maxOffset) {
			const offsetLine = this.#getLineOrUndefined(this.#offset - offset);
			if (!offsetLine) {
				return;
			}
			yield offsetLine;
			++offset;
		}
	}
}

export type ProcessLineCallback = (context: ProcessLineContext) => void;

/**
 * Principle of Operation
 * ----------------------
 * Analysis and possible update of line content is performed by the `ProcessLineCallback` callback passed to
 * the ctor. `SlidingWindowLineProcessor` is only responsible for presenting data for analysis.
 *
 * `SlidingWindowLineProcessor` maintains a ring buffer of lines. Other than at the start and end sections of the stream,
 * processing is invoked on the nominal midpoint of the ring buffer, lying between `maxLinesBehind` and `maxLinesAhead`.
 * `ProcessLineCallback` can access by offset any other line in the current window and modify it. Lines are only
 * pushed to the output of the transform just prior to being removed from the ring buffer when a new item is added.
 */
export abstract class SlidingWindowLineProcessor extends Transform {
	constructor(
		public readonly maxLinesAhead = 10,
		public readonly maxLinesBehind = 10,
	) {
		super({ objectMode: true });

		this.#buf = new RingBuffer<ProcessorLine>(maxLinesBehind + maxLinesAhead + 1);
	}

	protected abstract _processLine(context: ProcessLineContext): void;

	/**
	 * The current position within `#buf`. When the window is primed and streaming
	 * is well underway, `#position` will always be `maxLinesBehind`. During initial priming,
	 * `#position` can be less than `maxLinesBehind`, and while processing the end of
	 * the stream in `_flush`, `#position` can be greater than `maxLinesBehind`.
	 */
	#position = -1;

	#buf: RingBuffer<ProcessorLine>;

	#getLineContext(offset: number): ProcessLineContext | undefined {
		let p = this.#position + offset;
		if (p < 0 || p >= this.#buf.getBufferLength()) {
			return undefined;
		}
		return new ProcessLineContext(this.#buf.get(p)!, this.#getLineContextClosure, offset);
	}

	#getLineContextClosure = (offset: number) => this.#getLineContext(offset);

	_transform(chunk: any, encoding: BufferEncoding, callback: TransformCallback): void {
		if (typeof chunk !== 'string') {
			return callback(new InternalError('chunk must be a string'));
		}

		if (!this.#buf.isFull()) {
			// Not fully primed yet.
			this.#buf.add(new ProcessorLine(chunk));

			if (!this.#buf.isFull()) {
				return callback();
			}
		}

		if (this.#position == -1) {
			// Priming of the ring buffer has just completed. Process all lines up to position `maxLinesBehind`.
			while (this.#position < this.maxLinesBehind) {
				++this.#position;
				try {
					this._processLine(this.#getLineContext(0)!);
				} catch (err) {
					if (err instanceof Error) {
						return callback(err);
					} else {
						return callback(new Error('Unrecognized error, see cause.', { cause: err }));
					}
				}
			}
			return callback();
		}

		if (this.#position != this.maxLinesBehind) {
			return callback(new InternalError('Unexpected state!'));
		}

		const itemToPush = this.#buf.get(0)!;

		this.#buf.add(new ProcessorLine(chunk));
		try {
			this._processLine(this.#getLineContext(0)!);
		} catch (err) {
			if (err instanceof Error) {
				return callback(err);
			} else {
				return callback(new Error('Unrecognized error, see cause.', { cause: err }));
			}
		}

		if (itemToPush.emit) {
			this.push(itemToPush);
		}

		callback();
	}

	_flush(callback: TransformCallback): void {
		// At this point:
		// 1. Any items in #buf at index > #position in #buf have not yet been processed.
		// 2. No items in #buf have been pushed.

		// Process all unprocessed items:
		while (this.#position < this.#buf.getBufferLength() - 1) {
			++this.#position;

			try {
				this._processLine(this.#getLineContext(0)!);
			} catch (err) {
				if (err instanceof Error) {
					return callback(err);
				} else {
					return callback(new Error('Unrecognized error, see cause.', { cause: err }));
				}
			}
		}

		// Push all items:
		for (let index = 0; index < this.#buf.getBufferLength(); ++index) {
			const itemToPush = this.#buf.get(index)!;
			if (itemToPush.emit) {
				this.push(itemToPush);
			}
		}
		callback();
	}
}

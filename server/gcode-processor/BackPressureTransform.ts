/**
 * @file BackPressureTransform.ts
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

/**
 * NOTE: Currently not used, retained as important knowledge.
 */

import { Transform, TransformCallback, TransformOptions } from 'node:stream';

// Informed by https://stackoverflow.com/a/43811543

export interface BackPressureTransformOptions extends TransformOptions {
	/**
	 * When `respectBackPressure` is `false`, the result of `Transform.push()` is ignored. This
	 * approach is suggested by the comments in the NodeJS `Transform` source code. This means
	 * that all the output from processing one chunk will be buffered by the pipeline. If a
	 * single chunk can result in a large amount of output (so-called 'pathalogical inflation'),
	 * set `respectBackPressure` to `true`. This mode respects the result of `Transform.push()`,
	 * and waits until `Transform.read()` is called before pushing more output. Note that
	 * `respectBackPressure` only has an effect when `transformChunkToMany` yields more than one
	 * item.
	 *
	 * The default value is `true`.
	 */
	respectBackPressure?: boolean | undefined;
}

/**
 * An implementation of {@link Transform} that provides back pressure flow control in scenarios
 * where a single input chunk can result in a large amount of output (so-called 'pathalogical inflation').
 *
 * Implement {@link transformChunkToMany} to process input chunks and yield output.
 *
 * Implement {@link _flush} if you need to flush final data at the end of processing. Ignore the return
 * value of `this.push()` in your implementation of `_flush`.
 *
 * In scenarios where the amount of output is not signficantly larger than the amount of input,
 * implement {@link Transform} directly, and ignore the return value of `this.push()` in your implementation
 * of `_transform`.
 */
export abstract class BackPressureTransform extends Transform {
	constructor(opts?: BackPressureTransformOptions) {
		super(opts);
		this.#respectBackPressure = opts?.respectBackPressure ?? true;
	}

	#continueTransform: (() => void) | null = null;
	#transforming = false;
	readonly #respectBackPressure: boolean;

	protected abstract transformChunkToMany(
		chunk: any,
		encoding: BufferEncoding,
	): IterableIterator<[chunk: any, encoding?: BufferEncoding]>;

	_transform(chunk: any, encoding: BufferEncoding, callback: TransformCallback): void {
		if (this.#continueTransform !== null) {
			return callback(new Error('re-entrant call to _transform'));
		}

		this.#transforming = true;

		let iter = this.transformChunkToMany(chunk, encoding);
		let current = iter.next();

		if (current.done) {
			// Nothing to push
			callback();
		} else if (!this.#respectBackPressure) {
			while (!current.done) {
				this.push(...current.value);
				current = iter.next();
			}
			callback();
		} else {
			this.#continueTransform = () => {
				try {
					while (!current.done) {
						let next = iter.next();
						if (!this.push(...current.value) && !next.done) {
							current = next;
							return;
						}
						current = next;
					}

					this.#continueTransform = null;
					return callback();
				} catch (err) {
					if (err instanceof Error) {
						return callback(err);
					} else {
						return callback(new Error('Unknown error (see data)'), err);
					}
				}
			};

			this.#continueTransform();
		}

		this.#transforming = false;
	}

	_read(size: number): void {
		if (this.#transforming) {
			// Sanity check. This should never happen.
			throw new Error('_read called during the execution of _transform');
		}
		if (this.#continueTransform !== null) {
			this.#continueTransform();
		} else {
			super._read(size);
		}
	}
}

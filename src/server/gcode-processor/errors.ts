/**
 * @file errors.ts
 * @description Common error classes for the G-code processor.
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

export class GCodeProcessorError extends Error {}

/** Indicates an error with the logic of the G-code processor, such as an unexpected state. */
export class InternalError extends GCodeProcessorError {}

declare class GCodeInfo {}

export class AlreadyProcessedError extends GCodeProcessorError {
	constructor(public readonly gcodeInfo: GCodeInfo) {
		super('The file or stream has already been processed by RatOS.');
	}
}

export class SlicerIdentificationNotFound extends GCodeProcessorError {
	constructor(message?: string) {
		super(message ?? 'Valid slicer identification was not found.');
	}
}

export class SlicerNotSupported extends GCodeProcessorError {}

export class GCodeError extends GCodeProcessorError {
	constructor(
		message: string,
		public readonly line?: string,
		public readonly lineNumber?: number,
	) {
		super(message);
	}
}

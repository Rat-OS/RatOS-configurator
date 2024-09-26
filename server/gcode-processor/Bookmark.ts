/**
 * @file Bookmark.ts
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

/** Identifies a byte range that is associated with a line of text. */
export class Bookmark {
	constructor(
		public readonly originalLine: string,
		public readonly byteOffset: number,
		public readonly byteLength: number,
	) {}
}

/** The key type for bookmarks. */
export type BookmarkKey = string | symbol;

/**
 * Instances of {@link BookmarkableLine} are consumed by {@link BookmarkingBufferEncoder}. When
 * {@link bookmarkKey} is defined, {@link BookmarkingBufferEncoder} will note the byte location
 * of the written line in the output stream, allowing for later in-place replacement.
 */
export class BookmarkableLine {
	constructor(public line: string) {}

	public bookmarkKey: BookmarkKey | undefined;
}

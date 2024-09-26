/**
 * @file CommonGCodeCommand.ts
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
 * Note: See gcode_match_benchmarks.bench.ts (under __tests___) for performance considerations. The
 * approach implemented here is around 2.6x faster than the initial naive implementation.
 *
 * Note: We avoid the `d` regex flag (which generates the indicies array) as this requires es2022 and
 * roughly doubles execution time (from benchmark tests). This is why we have the `probably` in
 * `probablyWrongOrderOptimization`.
 */

export const rxXYEZF =
	/^(?:T(\d+))|(?:(G0|G1)(?=\s)(?:(?:\sX([+-]?[\d.]+))|(?=.*(?:\sX([+-]?[\d.]+)))|)(?:(?:\sY([+-]?[\d.]+))|(?=.*(?:\sY([+-]?[\d.]+)))|)(?:(?:\sE([+-]?[\d.]+))|(?=.*(?:\sE([+-]?[\d.]+)))|)(?:(?:\sZ([+-]?[\d.]+))|(?=.*(?:\sZ([+-]?[\d.]+)))|)(?=.*(?:\sF([\d.]+))|))/;

export const rxZXYEF =
	/^(?:T(\d+))|(?:(G0|G1)(?=\s)(?:(?:\sZ([+-]?[\d.]+))|(?=.*(?:\sZ([+-]?[\d.]+)))|)(?:(?:\sX([+-]?[\d.]+))|(?=.*(?:\sX([+-]?[\d.]+)))|)(?:(?:\sY([+-]?[\d.]+))|(?=.*(?:\sY([+-]?[\d.]+)))|)(?:(?:\sE([+-]?[\d.]+))|(?=.*(?:\sE([+-]?[\d.]+)))|)(?=.*(?:\sF([\d.]+))|))/;

export class CommonGCodeCommand {
	/**
	 * @param probablyWrongOrderOptimization If `true`, indicates that the other order optimization would likely have been ideal.
	 */
	constructor(
		readonly probablyWrongOrderOptimization: boolean,
		readonly t?: string,
		readonly g?: string,
		readonly x?: string,
		readonly y?: string,
		readonly e?: string,
		readonly z?: string,
		readonly f?: string,
	) {}

	/**
	 * parse, optimised for the order most common in non-vase-mode prints.
	 */
	static parseOptimisedForOrderXYEZF(line: string): CommonGCodeCommand | null {
		const m = rxXYEZF.exec(line);
		if (m) {
			return new CommonGCodeCommand(
				// This condition is true at least for pattern ZXYE (F absent):
				m[4] !== undefined && m[6] !== undefined && m[8] !== undefined && m[9] !== undefined && m[11] === undefined,
				m[1],
				m[2],
				m[3] ?? m[4],
				m[5] ?? m[6],
				m[7] ?? m[8],
				m[9] ?? m[10],
				m[11],
			);
		} else {
			return null;
		}
	}

	/**
	 * parse, optimised for the order most common in vase-mode prints (after the base layers).
	 */
	static parseOptimisedForOrderZXYEF(line: string): CommonGCodeCommand | null {
		const m = rxZXYEF.exec(line);
		if (m) {
			return new CommonGCodeCommand(
				// This condition is true at least for pattern XYE (Z and F absent):
				m[3] === undefined &&
					m[4] === undefined &&
					m[5] !== undefined &&
					m[7] !== undefined &&
					m[9] !== undefined &&
					m[11] === undefined,
				m[1],
				m[2],
				m[5] ?? m[6],
				m[7] ?? m[8],
				m[9] ?? m[10],
				m[3] ?? m[4],
				m[11],
			);
		} else {
			return null;
		}
	}
}

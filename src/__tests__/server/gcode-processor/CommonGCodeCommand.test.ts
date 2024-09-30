/**
 * @file CommonGCodeCommand.test.ts
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

import { CommonGCodeCommand } from '@/server/gcode-processor/CommonGCodeCommand';
import { describe, test, expect } from 'vitest';

test.each([
	['T0', false, '0', undefined, undefined, undefined, undefined, undefined, undefined],
	['T99', false, '99', undefined, undefined, undefined, undefined, undefined, undefined],
	['G1 X1.23', false, undefined, 'G1', '1.23', undefined, undefined, undefined, undefined],
	['G1 Y1.23', false, undefined, 'G1', undefined, '1.23', undefined, undefined, undefined],
	['G1 E1.23', false, undefined, 'G1', undefined, undefined, '1.23', undefined, undefined],
	['G1 Z1.23', false, undefined, 'G1', undefined, undefined, undefined, '1.23', undefined],
	['G1 F1.23', false, undefined, 'G1', undefined, undefined, undefined, undefined, '1.23'],
	['G1 X-1.23', false, undefined, 'G1', '-1.23', undefined, undefined, undefined, undefined],
	['G1 Y-1.23', false, undefined, 'G1', undefined, '-1.23', undefined, undefined, undefined],
	['G1 E-1.23', false, undefined, 'G1', undefined, undefined, '-1.23', undefined, undefined],
	['G1 Z-1.23', false, undefined, 'G1', undefined, undefined, undefined, '-1.23', undefined],
	['G1 X1.23', false, undefined, 'G1', '1.23', undefined, undefined, undefined, undefined],
	['G1 X1 Y2 E3', false, undefined, 'G1', '1', '2', '3', undefined, undefined],
	['G1 X1 Y2 E3 F5', false, undefined, 'G1', '1', '2', '3', undefined, '5'],
	['G1 Z1 X2 Y3 E5', true, undefined, 'G1', '2', '3', '5', '1', undefined],
])(
	"parseOptimisedForOrderXYEZF '%s'",
	(
		input: string,
		probablyWrongOrderOptimization: boolean,
		t?: string,
		g?: string,
		x?: string,
		y?: string,
		e?: string,
		z?: string,
		f?: string,
	) => {
		const p = CommonGCodeCommand.parseOptimisedForOrderXYEZF(input)!;
		expect(p.probablyWrongOrderOptimization).toEqual(probablyWrongOrderOptimization);
		expect(p.t).toStrictEqual(t);
		expect(p.g).toStrictEqual(g);
		expect(p.x).toStrictEqual(x);
		expect(p.y).toStrictEqual(y);
		expect(p.e).toStrictEqual(e);
		expect(p.z).toStrictEqual(z);
		expect(p.f).toStrictEqual(f);
	},
);

test.each([
	['T0', false, '0', undefined, undefined, undefined, undefined, undefined, undefined],
	['T99', false, '99', undefined, undefined, undefined, undefined, undefined, undefined],
	['G1 X1.23', false, undefined, 'G1', '1.23', undefined, undefined, undefined, undefined],
	['G1 Y1.23', false, undefined, 'G1', undefined, '1.23', undefined, undefined, undefined],
	['G1 E1.23', false, undefined, 'G1', undefined, undefined, '1.23', undefined, undefined],
	['G1 Z1.23', false, undefined, 'G1', undefined, undefined, undefined, '1.23', undefined],
	['G1 F1.23', false, undefined, 'G1', undefined, undefined, undefined, undefined, '1.23'],
	['G1 X-1.23', false, undefined, 'G1', '-1.23', undefined, undefined, undefined, undefined],
	['G1 Y-1.23', false, undefined, 'G1', undefined, '-1.23', undefined, undefined, undefined],
	['G1 E-1.23', false, undefined, 'G1', undefined, undefined, '-1.23', undefined, undefined],
	['G1 Z-1.23', false, undefined, 'G1', undefined, undefined, undefined, '-1.23', undefined],
	['G1 X1.23', false, undefined, 'G1', '1.23', undefined, undefined, undefined, undefined],
	['G1 X1 Y2 E3 F5', false, undefined, 'G1', '1', '2', '3', undefined, '5'],
	['G1 Z1 X2 Y3 E5', false, undefined, 'G1', '2', '3', '5', '1', undefined],
	['G1 X1 Y2 E3', true, undefined, 'G1', '1', '2', '3', undefined, undefined],
])(
	"parseOptimisedForOrderZXYEF '%s'",
	(
		input: string,
		probablyWrongOrderOptimization: boolean,
		t?: string,
		g?: string,
		x?: string,
		y?: string,
		e?: string,
		z?: string,
		f?: string,
	) => {
		const p = CommonGCodeCommand.parseOptimisedForOrderZXYEF(input)!;
		expect(p.probablyWrongOrderOptimization).toEqual(probablyWrongOrderOptimization);
		expect(p.t).toStrictEqual(t);
		expect(p.g).toStrictEqual(g);
		expect(p.x).toStrictEqual(x);
		expect(p.y).toStrictEqual(y);
		expect(p.e).toStrictEqual(e);
		expect(p.z).toStrictEqual(z);
		expect(p.f).toStrictEqual(f);
	},
);

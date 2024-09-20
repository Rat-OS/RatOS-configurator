/**
 * @file gcode_match_benchmarks.bench.ts
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

import { describe, bench } from 'vitest';

const rxParseCommonCommands =
	/^(?:T(?<T>\d+))|(?:(?<G>G0|G1)(?=\s)(?=.*(\sX(?<X>[\d.]+))|)(?=.*(\sY(?<Y>[\d.]+))|)(?=.*(\sZ(?<Z>[\d.]+))|)(?=.*(\sE(?<E>[\d.]+))|)(?=.*(\sF(?<F>[\d.]+))|))/i;

/**
 * For each parameter, try to match it in the most common parameter order. This match will
 * move the match position forward, reducing the length of any subsequent matches. Fall back to
 * lookahead, which will tollerate any parameter order.
 *
 * The most common patterns (by my estimation, to be proved), are:
 * * G1 X1.23 Y1.23 E1.23
 * * G1 Z1.23 X1.23 Y1.23 E1.23 (vase mode)
 * * When F is present, it's typically last.
 * * E and Z rarely occur in the same line, except for vase mode.
 */
const rxParseCommonCommandsOptimised =
	/^(?:T(?<T>\d+))|(?:(?<G>G0|G1)(?=\s)(?:(\sX(?<X>[\d.]+))|(?=.*(\sX(?<X2>[\d.]+)))|)(?:(\sY(?<Y>[\d.]+))|(?=.*(\sY(?<Y2>[\d.]+)))|)(?:(\sE(?<E>[\d.]+))|(?=.*(\sE(?<E2>[\d.]+)))|)(?:(\sZ(?<Z>[\d.]+))|(?=.*(\sZ(?<Z2>[\d.]+)))|)(?=.*(\sF(?<F>[\d.]+))|))/i;

const rxParseCommonCommandsOptimisedVaseMode =
	/^(?:T(?<T>\d+))|(?:(?<G>G0|G1)(?=\s)(?:(\sZ(?<Z>[\d.]+))|(?=.*(\sZ(?<Z2>[\d.]+)))|)(?:(\sX(?<X>[\d.]+))|(?=.*(\sX(?<X2>[\d.]+)))|)(?:(\sY(?<Y>[\d.]+))|(?=.*(\sY(?<Y2>[\d.]+)))|)(?:(\sE(?<E>[\d.]+))|(?=.*(\sE(?<E2>[\d.]+)))|)(?=.*(\sF(?<F>[\d.]+))|))/i;

const rxParseCommonCommandsOptimisedV2 =
	/^(?:T(?<T>\d+))|(?:(?<G>G0|G1)(?=\s)(?:(\sX(?<X>[+-]?[\d.]+))|(?=.*(\sX(?<X2>[+-]?[\d.]+)))|)(?:(\sY(?<Y>[+-]?[\d.]+))|(?=.*(\sY(?<Y2>[+-]?[\d.]+)))|)(?:(\sE(?<E>[+-]?[\d.]+))|(?=.*(\sE(?<E2>[+-]?[\d.]+)))|)(?:(\sZ(?<Z>[+-]?[\d.]+))|(?=.*(\sZ(?<Z2>[+-]?[\d.]+)))|)(?=.*(\sF(?<F>[\d.]+))|))/i;

const rxParseCommonCommandsOptimisedV2CaseSensitive =
	/^(?:T(?<T>\d+))|(?:(?<G>G0|G1)(?=\s)(?:(\sX(?<X>[+-]?[\d.]+))|(?=.*(\sX(?<X2>[+-]?[\d.]+)))|)(?:(\sY(?<Y>[+-]?[\d.]+))|(?=.*(\sY(?<Y2>[+-]?[\d.]+)))|)(?:(\sE(?<E>[+-]?[\d.]+))|(?=.*(\sE(?<E2>[+-]?[\d.]+)))|)(?:(\sZ(?<Z>[+-]?[\d.]+))|(?=.*(\sZ(?<Z2>[+-]?[\d.]+)))|)(?=.*(\sF(?<F>[\d.]+))|))/;

const rxParseCommonCommandsOptimisedV2CaseSensitiveNoNames =
	/^(?:T(\d+))|(?:(G0|G1)(?=\s)(?:(?:\sX([+-]?[\d.]+))|(?=.*(?:\sX([+-]?[\d.]+)))|)(?:(?:\sY([+-]?[\d.]+))|(?=.*(?:\sY([+-]?[\d.]+)))|)(?:(?:\sE([+-]?[\d.]+))|(?=.*(?:\sE([+-]?[\d.]+)))|)(?:(?:\sZ([+-]?[\d.]+))|(?=.*(?:\sZ([+-]?[\d.]+)))|)(?=.*(?:\sF([\d.]+))|))/;

// Adds /d flag, which adds the indices array to the result of exec. This requires es2022, and takes more that twice as long as without /d.
// const rxParseCommonCommandsOptimisedV2CaseSensitiveNoNamesWithIndices =
// 	/^(?:T(\d+))|(?:(G0|G1)(?=\s)(?:(?:\sX([+-]?[\d.]+))|(?=.*(?:\sX([+-]?[\d.]+)))|)(?:(?:\sY([+-]?[\d.]+))|(?=.*(?:\sY([+-]?[\d.]+)))|)(?:(?:\sE([+-]?[\d.]+))|(?=.*(?:\sE([+-]?[\d.]+)))|)(?:(?:\sZ([+-]?[\d.]+))|(?=.*(?:\sZ([+-]?[\d.]+)))|)(?=.*(?:\sF([\d.]+))|))/d;

describe('G1 XYE', () => {
	bench('rx naive', () => {
		rxParseCommonCommands.exec('G1 X234.55 Y257.654 E.01224');
	});

	bench('rx XYE-optimised', () => {
		rxParseCommonCommandsOptimised.exec('G1 X234.55 Y257.654 E.01224');
	});

	bench('rx ZXYE-optimised', () => {
		rxParseCommonCommandsOptimisedVaseMode.exec('G1 X234.55 Y257.654 E.01224');
	});

	bench('rx XYE-optimised V2', () => {
		rxParseCommonCommandsOptimisedV2.exec('G1 X234.55 Y257.654 E.01224');
	});

	bench('rx XYE-optimised V2-CS', () => {
		rxParseCommonCommandsOptimisedV2CaseSensitive.exec('G1 X234.55 Y257.654 E.01224');
	});

	bench('rx XYE-optimised V2-CS-NN', () => {
		rxParseCommonCommandsOptimisedV2CaseSensitiveNoNames.exec('G1 X234.55 Y257.654 E.01224');
	});

	// Adds /d flag, which adds the indices array to the result of exec. This requires es2022, and takes more that twice as long as without /d.
	// bench('rx XYE-optimised V2-CS-NN-IX', () => {
	// 	rxParseCommonCommandsOptimisedV2CaseSensitiveNoNamesWithIndices.exec('G1 X234.55 Y257.654 E.01224');
	// });
});

describe('G1 ZXYE (vase mode)', () => {
	bench('rx naive', () => {
		rxParseCommonCommands.exec('G1 Z1.23 X234.55 Y257.654 E.01224');
	});

	bench('rx XYE-optimised', () => {
		rxParseCommonCommandsOptimised.exec('G1 Z1.23 X234.55 Y257.654 E.01224');
	});

	bench('rx ZXYE-optimised', () => {
		rxParseCommonCommandsOptimisedVaseMode.exec('G1 Z1.23 X234.55 Y257.654 E.01224');
	});
});

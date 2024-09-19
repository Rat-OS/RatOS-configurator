/**
 * @file GCodeProcessor.test.ts
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

import { describe, test, expect, should } from 'vitest';
import { GCodeProcessor } from '@/server/gcode-processor/GCodeProcessor';
import { GCodeFlavour, GCodeInfo } from '@/server/gcode-processor/GCodeInfo';
import semver from 'semver';
import { InternalError } from '@/server/gcode-processor/errors';
import { ActionResult } from '@/server/gcode-processor/ActionSequence';
import { Action } from '@/server/gcode-processor/Actions';
import { State } from '@/server/gcode-processor/State';
import { ProcessLineContext, ProcessorLine } from '@/server/gcode-processor/SlidingWindowLineProcessor';

type TestActionResult = ActionResult | [ActionResult, TestAction];
type TestAction = [id: string, result: TestActionResult];

describe('invokeAction', async () => {
	const state = new State(false, false, false);
	state.gcodeInfo = new GCodeInfo('PrusaSlicer', semver.coerce('2.8')!, GCodeFlavour.PrusaSlicer, new Date());
	const ctx = new ProcessLineContext(new ProcessorLine('; test'), (n) => undefined, 0);
	const stateWithoutGCodeInfo = new State(false, false, false);

	test.each([
		['simple void', undefined, ActionResult.Continue],
		['simple Continue', ActionResult.Continue, ActionResult.Continue],
		['simple Stop', ActionResult.Stop, ActionResult.Stop],
		['simple RemoveAndContinue', ActionResult.RemoveAndContinue, ActionResult.RemoveAndContinue],
		['simple RemoveAndStop', ActionResult.RemoveAndStop, ActionResult.RemoveAndStop],
		['simple RemoveAndStop', ActionResult.RemoveAndStop, ActionResult.RemoveAndStop],
	])('%s', (name, ret, expected) => {
		const action: Action = (c, s) => {
			return ret;
		};
		expect(GCodeProcessor['invokeAction'](action, ctx, state)).toEqual(expected);
	});

	test.each([
		['filtered, match, Continue', GCodeFlavour.PrusaSlicer, ActionResult.Continue, [ActionResult.Continue]],
		['filtered, match, Stop', GCodeFlavour.PrusaSlicer, ActionResult.Stop, [ActionResult.Stop]],
		[
			'filtered, match, RemoveAndStop',
			GCodeFlavour.PrusaSlicer,
			ActionResult.RemoveAndStop,
			[ActionResult.RemoveAndStop],
		],
		[
			'filtered, match, RemoveAndContinue',
			GCodeFlavour.PrusaSlicer,
			ActionResult.RemoveAndContinue,
			[ActionResult.RemoveAndContinue],
		],
		['filtered, not-match, Continue', GCodeFlavour.SuperSlicer, ActionResult.Continue, ActionResult.RemoveAndContinue],
		['filtered, not-match, Stop', GCodeFlavour.SuperSlicer, ActionResult.Stop, ActionResult.RemoveAndContinue],
		[
			'filtered, not-match, RemoveAndContinue',
			GCodeFlavour.SuperSlicer,
			ActionResult.RemoveAndContinue,
			ActionResult.RemoveAndContinue,
		],
		[
			'filtered, not-match, RemoveAndStop',
			GCodeFlavour.SuperSlicer,
			ActionResult.RemoveAndStop,
			ActionResult.RemoveAndContinue,
		],
		[
			'filtered, no GCodeInfo, Continue',
			GCodeFlavour.PrusaSlicer,
			ActionResult.Continue,
			typeof InternalError,
			stateWithoutGCodeInfo,
		],
		[
			'filtered, no GCodeInfo, Stop',
			GCodeFlavour.PrusaSlicer,
			ActionResult.Stop,
			typeof InternalError,
			stateWithoutGCodeInfo,
		],
		[
			'filtered, no GCodeInfo, RemoveAndContinue',
			GCodeFlavour.PrusaSlicer,
			ActionResult.RemoveAndContinue,
			typeof InternalError,
			stateWithoutGCodeInfo,
		],
		[
			'filtered, no GCodeInfo, RemoveAndStop',
			GCodeFlavour.PrusaSlicer,
			ActionResult.RemoveAndStop,
			typeof InternalError,
			stateWithoutGCodeInfo,
		],
	])('%s', (name, filter, ret, expected, customState?) => {
		const action: Action = (c, s) => {
			return ret;
		};
		if (expected === typeof InternalError) {
			expect(() => GCodeProcessor['invokeAction']([filter, action], ctx, customState ?? state)).throws(InternalError);
		} else if (Array.isArray(expected)) {
			expect(GCodeProcessor['invokeAction']([filter, action], ctx, customState ?? state)).toEqual([
				expected[0],
				action,
			]);
		} else {
			expect(GCodeProcessor['invokeAction']([filter, action], ctx, customState ?? state)).toEqual(expected);
		}
	});
});

describe('satisfiesFilter', async () => {
	test('simple match', () => {
		const gcodeInfo = new GCodeInfo('PrusaSlicer', semver.coerce('2.8')!, GCodeFlavour.PrusaSlicer, new Date());
		const match = GCodeProcessor['satisfiesFilter'](gcodeInfo, GCodeFlavour.PrusaSlicer);
		expect(match).toStrictEqual(true);
	});

	test('simple match 2-or', () => {
		const gcodeInfo = new GCodeInfo('PrusaSlicer', semver.coerce('2.8')!, GCodeFlavour.PrusaSlicer, new Date());
		const match = GCodeProcessor['satisfiesFilter'](gcodeInfo, GCodeFlavour.PrusaSlicer | GCodeFlavour.OrcaSlicer);
		expect(match).toStrictEqual(true);
	});

	test('simple not-match', () => {
		const gcodeInfo = new GCodeInfo('PrusaSlicer', semver.coerce('2.8')!, GCodeFlavour.PrusaSlicer, new Date());
		const match = GCodeProcessor['satisfiesFilter'](gcodeInfo, GCodeFlavour.OrcaSlicer);
		expect(match).toStrictEqual(false);
	});

	test('version match 1', () => {
		const gcodeInfo = new GCodeInfo('PrusaSlicer', semver.coerce('2.8')!, GCodeFlavour.PrusaSlicer, new Date());
		const match = GCodeProcessor['satisfiesFilter'](gcodeInfo, [GCodeFlavour.PrusaSlicer, '>2.1']);
		expect(match).toStrictEqual(true);
	});

	test('version match 2', () => {
		const gcodeInfo = new GCodeInfo('PrusaSlicer', semver.coerce('2.8')!, GCodeFlavour.PrusaSlicer, new Date());
		const match = GCodeProcessor['satisfiesFilter'](gcodeInfo, [
			[GCodeFlavour.OrcaSlicer, '>5.9'],
			[GCodeFlavour.PrusaSlicer, '>2.1'],
		]);
		expect(match).toStrictEqual(true);
	});

	test('mixed match 1', () => {
		const gcodeInfo = new GCodeInfo('PrusaSlicer', semver.coerce('2.8')!, GCodeFlavour.PrusaSlicer, new Date());
		const match = GCodeProcessor['satisfiesFilter'](gcodeInfo, [
			[GCodeFlavour.OrcaSlicer, '>5.9'],
			GCodeFlavour.PrusaSlicer,
		]);
		expect(match).toStrictEqual(true);
	});

	test('mixed match 2', () => {
		const gcodeInfo = new GCodeInfo('PrusaSlicer', semver.coerce('2.8')!, GCodeFlavour.PrusaSlicer, new Date());
		const match = GCodeProcessor['satisfiesFilter'](gcodeInfo, [
			[GCodeFlavour.OrcaSlicer, '>5.9'],
			GCodeFlavour.SuperSlicer,
			[GCodeFlavour.PrusaSlicer, '>2.7'],
		]);
		expect(match).toStrictEqual(true);
	});

	test('version not-match 1', () => {
		const gcodeInfo = new GCodeInfo('PrusaSlicer', semver.coerce('1.8')!, GCodeFlavour.PrusaSlicer, new Date());
		const match = GCodeProcessor['satisfiesFilter'](gcodeInfo, [GCodeFlavour.PrusaSlicer, '>2.1']);
		expect(match).toStrictEqual(false);
	});

	test('version not-match 2', () => {
		const gcodeInfo = new GCodeInfo('PrusaSlicer', semver.coerce('1.8')!, GCodeFlavour.PrusaSlicer, new Date());
		const match = GCodeProcessor['satisfiesFilter'](gcodeInfo, [
			[GCodeFlavour.OrcaSlicer, '>5.9'],
			[GCodeFlavour.PrusaSlicer, '>2.1'],
		]);
		expect(match).toStrictEqual(false);
	});

	test('match GCodeFlavour.Unknown should throw', () => {
		const gcodeInfo = new GCodeInfo('PrusaSlicer', semver.coerce('2.8')!, GCodeFlavour.PrusaSlicer, new Date());
		expect(() => {
			GCodeProcessor['satisfiesFilter'](gcodeInfo, GCodeFlavour.Unknown);
		}).toThrow(InternalError);
	});

	test('version match GCodeFlavour.Unknown should throw', () => {
		const gcodeInfo = new GCodeInfo('PrusaSlicer', semver.coerce('2.8')!, GCodeFlavour.PrusaSlicer, new Date());
		expect(() => {
			GCodeProcessor['satisfiesFilter'](gcodeInfo, [GCodeFlavour.Unknown, '>2.1']);
		}).toThrow(InternalError);
	});

	test('version match two bits should throw', () => {
		const gcodeInfo = new GCodeInfo('PrusaSlicer', semver.coerce('2.8')!, GCodeFlavour.PrusaSlicer, new Date());
		expect(() => {
			GCodeProcessor['satisfiesFilter'](gcodeInfo, [GCodeFlavour.PrusaSlicer | GCodeFlavour.OrcaSlicer, '>2.1']);
		}).toThrow(InternalError);
	});
});

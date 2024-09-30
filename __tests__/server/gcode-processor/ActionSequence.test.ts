/**
 * @file ActionSequence.test.ts
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

import { describe, test, expect } from 'vitest';
import {
	ActionResult,
	ActionSequence,
	ActionSubSequence,
	executeActionSequence,
	executeActionSequenceAsync,
	subSequence,
} from '@/server/gcode-processor/ActionSequence';

type TestActionResult = ActionResult | [result: ActionResult, replaceWith: TestAction | ActionSubSequence<TestAction>];
type TestAction = [id: string, result: TestActionResult];

describe('ActionSequence', async () => {
	test('continue', () => {
		let log: string[] = [];
		const fixture: TestAction[] = [
			['A', ActionResult.Continue],
			['B', ActionResult.Continue],
			['C', ActionResult.Continue],
		];
		const actions = fixture.concat();
		const invoke = (act: [id: string, result: TestActionResult]) => {
			log.push(act[0]);
			return act[1];
		};
		executeActionSequence(actions, invoke);
		expect(log).toEqual(['A', 'B', 'C']);
		expect(actions).toEqual(fixture);
	});

	test('stop', () => {
		let log: string[] = [];
		const fixture: TestAction[] = [
			['A', ActionResult.Continue],
			['B', ActionResult.Stop],
			['C', ActionResult.Continue],
		];
		const actions = fixture.concat();
		const invoke = (act: [id: string, result: TestActionResult]) => {
			log.push(act[0]);
			return act[1];
		};
		executeActionSequence(actions, invoke);
		expect(log).toEqual(['A', 'B']);
		expect(actions).toEqual(fixture);
	});

	test('remove and stop', () => {
		let log: string[] = [];
		const fixture: TestAction[] = [
			['A', ActionResult.Continue],
			['B', ActionResult.RemoveAndStop],
			['C', ActionResult.Continue],
		];
		const actions = fixture.concat();
		const invoke = (act: [id: string, result: TestActionResult]) => {
			log.push(act[0]);
			return act[1];
		};
		executeActionSequence(actions, invoke);
		expect(log).toEqual(['A', 'B']);
		expect(actions).toEqual([
			['A', ActionResult.Continue],
			['C', ActionResult.Continue],
		]);
	});

	test('remove and continue', () => {
		let log: string[] = [];
		const fixture: TestAction[] = [
			['A', ActionResult.Continue],
			['B', ActionResult.RemoveAndContinue],
			['C', ActionResult.Continue],
		];
		const actions = fixture.concat();
		const invoke = (act: [id: string, result: TestActionResult]) => {
			log.push(act[0]);
			return act[1];
		};
		executeActionSequence(actions, invoke);
		expect(log).toEqual(['A', 'B', 'C']);
		expect(actions).toEqual([
			['A', ActionResult.Continue],
			['C', ActionResult.Continue],
		]);
	});

	test('replace and continue', () => {
		let log: string[] = [];
		const fixture: TestAction[] = [
			['A', ActionResult.Continue],
			['B', [ActionResult.Continue, ['X', ActionResult.Continue]]],
			['C', ActionResult.Continue],
		];
		const actions = fixture.concat();
		const invoke = (act: [id: string, result: TestActionResult]) => {
			log.push(act[0]);
			return act[1];
		};
		executeActionSequence(actions, invoke);
		expect(log).toEqual(['A', 'B', 'C']);
		expect(actions).toEqual([
			['A', ActionResult.Continue],
			['X', ActionResult.Continue],
			['C', ActionResult.Continue],
		]);
	});

	test('stop', () => {
		let log: string[] = [];
		const fixture: TestAction[] = [
			['A', ActionResult.Continue],
			['B', ActionResult.Stop],
			['C', ActionResult.Continue],
		];
		const actions = fixture.concat();
		const invoke = (act: [id: string, result: TestActionResult]) => {
			log.push(act[0]);
			return act[1];
		};
		executeActionSequence(actions, invoke);
		expect(log).toEqual(['A', 'B']);
		expect(actions).toEqual(fixture);
	});

	// -------------------------------------------

	test('continue async', async () => {
		let log: string[] = [];
		const fixture: TestAction[] = [
			['A', ActionResult.Continue],
			['B', ActionResult.Continue],
			['C', ActionResult.Continue],
		];
		const actions = fixture.concat();
		const invoke = async (act: [id: string, result: TestActionResult]) => {
			log.push(act[0]);
			return act[1];
		};
		await executeActionSequenceAsync(actions, invoke);
		expect(log).toEqual(['A', 'B', 'C']);
		expect(actions).toEqual(fixture);
	});

	test('replace and continue async', async () => {
		let log: string[] = [];
		const fixture: TestAction[] = [
			['A', ActionResult.Continue],
			['B', [ActionResult.Continue, ['X', ActionResult.Continue]]],
			['C', ActionResult.Continue],
		];
		const actions = fixture.concat();
		const invoke = async (act: [id: string, result: TestActionResult]) => {
			log.push(act[0]);
			return act[1];
		};
		await executeActionSequenceAsync(actions, invoke);
		expect(log).toEqual(['A', 'B', 'C']);
		expect(actions).toEqual([
			['A', ActionResult.Continue],
			['X', ActionResult.Continue],
			['C', ActionResult.Continue],
		]);
	});

	test('stop async', async () => {
		let log: string[] = [];
		const fixture: TestAction[] = [
			['A', ActionResult.Continue],
			['B', ActionResult.Stop],
			['C', ActionResult.Continue],
		];
		const actions = fixture.concat();
		const invoke = async (act: [id: string, result: TestActionResult]) => {
			log.push(act[0]);
			return act[1];
		};
		await executeActionSequenceAsync(actions, invoke);
		expect(log).toEqual(['A', 'B']);
		expect(actions).toEqual(fixture);
	});

	test('remove and stop async', async () => {
		let log: string[] = [];
		const fixture: TestAction[] = [
			['A', ActionResult.Continue],
			['B', ActionResult.RemoveAndStop],
			['C', ActionResult.Continue],
		];
		const actions = fixture.concat();
		const invoke = async (act: [id: string, result: TestActionResult]) => {
			log.push(act[0]);
			return act[1];
		};
		await executeActionSequenceAsync(actions, invoke);
		expect(log).toEqual(['A', 'B']);
		expect(actions).toEqual([
			['A', ActionResult.Continue],
			['C', ActionResult.Continue],
		]);
	});

	test('remove and continue async', async () => {
		let log: string[] = [];
		const fixture: TestAction[] = [
			['A', ActionResult.Continue],
			['B', ActionResult.RemoveAndContinue],
			['C', ActionResult.Continue],
		];
		const actions = fixture.concat();
		const invoke = async (act: [id: string, result: TestActionResult]) => {
			log.push(act[0]);
			return act[1];
		};
		await executeActionSequenceAsync(actions, invoke);
		expect(log).toEqual(['A', 'B', 'C']);
		expect(actions).toEqual([
			['A', ActionResult.Continue],
			['C', ActionResult.Continue],
		]);
	});

	// ---------------------------------------

	test('remove and continue all', async () => {
		let log: string[] = [];
		const fixture: TestAction[] = [
			['A', ActionResult.RemoveAndContinue],
			['B', ActionResult.RemoveAndContinue],
			['C', ActionResult.RemoveAndContinue],
		];
		const actions = fixture.concat();
		const invoke = (act: [id: string, result: TestActionResult]) => {
			log.push(act[0]);
			return act[1];
		};
		executeActionSequence(actions, invoke);
		expect(log).toEqual(['A', 'B', 'C']);
		expect(actions.length).toEqual(0);
	});

	test('async remove and continue all', async () => {
		let log: string[] = [];
		const fixture: TestAction[] = [
			['A', ActionResult.RemoveAndContinue],
			['B', ActionResult.RemoveAndContinue],
			['C', ActionResult.RemoveAndContinue],
		];
		const actions = fixture.concat();
		const invoke = async (act: [id: string, result: TestActionResult]) => {
			log.push(act[0]);
			return act[1];
		};
		await executeActionSequenceAsync(actions, invoke);
		expect(log).toEqual(['A', 'B', 'C']);
		expect(actions.length).toEqual(0);
	});

	// ---------------------------------------

	test('subseq continue enter', () => {
		let log: string[] = [];
		const fixture: ActionSequence<TestAction> = [
			['A', ActionResult.Continue],
			subSequence(
				['B', ActionResult.Continue],
				[
					['B1', ActionResult.Continue],
					['B2', ActionResult.Continue],
				],
			),
			['C', ActionResult.Continue],
		];
		const actions = fixture.concat();
		const invoke = (act: [id: string, result: TestActionResult]) => {
			log.push(act[0]);
			return act[1];
		};
		executeActionSequence(actions, invoke);
		expect(log).toEqual(['A', 'B', 'B1', 'B2', 'C']);
		expect(actions).toEqual(fixture);
	});

	test('subseq continue skip', () => {
		let log: string[] = [];
		const fixture: ActionSequence<TestAction> = [
			['A', ActionResult.Continue],
			subSequence(
				['B', ActionResult.Continue | ActionResult.flagSkipSubSequence],
				[
					['B1', ActionResult.Continue],
					['B2', ActionResult.Continue],
				],
			),
			['C', ActionResult.Continue],
		];
		const actions = fixture.concat();
		const invoke = (act: [id: string, result: TestActionResult]) => {
			log.push(act[0]);
			return act[1];
		};
		executeActionSequence(actions, invoke);
		expect(log).toEqual(['A', 'B', 'C']);
		expect(actions).toEqual(fixture);
	});

	test('subseq stop enter', () => {
		let log: string[] = [];
		const fixture: ActionSequence<TestAction> = [
			['A', ActionResult.Continue],
			subSequence(
				['B', ActionResult.Stop],
				[
					['B1', ActionResult.Continue],
					['B2', ActionResult.Continue],
				],
			),
			['C', ActionResult.Continue],
		];
		const actions = fixture.concat();
		const invoke = (act: [id: string, result: TestActionResult]) => {
			log.push(act[0]);
			return act[1];
		};
		executeActionSequence(actions, invoke);
		expect(log).toEqual(['A', 'B', 'B1', 'B2']);
		expect(actions).toEqual(fixture);
	});

	test('subseq stop skip', () => {
		let log: string[] = [];
		const fixture: ActionSequence<TestAction> = [
			['A', ActionResult.Continue],
			subSequence(
				['B', ActionResult.Stop | ActionResult.flagSkipSubSequence],
				[
					['B1', ActionResult.Continue],
					['B2', ActionResult.Continue],
				],
			),
			['C', ActionResult.Continue],
		];
		const actions = fixture.concat();
		const invoke = (act: [id: string, result: TestActionResult]) => {
			log.push(act[0]);
			return act[1];
		};
		executeActionSequence(actions, invoke);
		expect(log).toEqual(['A', 'B']);
		expect(actions).toEqual(fixture);
	});

	test('subseq replace entry action', () => {
		let log: string[] = [];
		const fixture: ActionSequence<TestAction> = [
			['A', ActionResult.Continue],
			subSequence(
				['B', [ActionResult.Continue | ActionResult.flagReplaceEntryAction, ['Q', ActionResult.Continue]]],
				[
					['B1', ActionResult.Continue],
					['B2', ActionResult.Continue],
				],
			),
			['C', ActionResult.Continue],
		];
		const actions = fixture.concat();
		const invoke = (act: [id: string, result: TestActionResult]) => {
			log.push(act[0]);
			return act[1];
		};
		executeActionSequence(actions, invoke);
		expect(log).toEqual(['A', 'B', 'B1', 'B2', 'C']);
		log = [];
		executeActionSequence(actions, invoke);
		expect(log).toEqual(['A', 'Q', 'B1', 'B2', 'C']);
	});

	test('subseq replace entry action and skip', () => {
		let log: string[] = [];
		const fixture: ActionSequence<TestAction> = [
			['A', ActionResult.Continue],
			subSequence(
				[
					'B',
					[
						ActionResult.Continue | ActionResult.flagReplaceEntryAction | ActionResult.flagSkipSubSequence,
						['Q', ActionResult.Continue],
					],
				],
				[
					['B1', ActionResult.Continue],
					['B2', ActionResult.Continue],
				],
			),
			['C', ActionResult.Continue],
		];
		const actions = fixture.concat();
		const invoke = (act: [id: string, result: TestActionResult]) => {
			log.push(act[0]);
			return act[1];
		};
		executeActionSequence(actions, invoke);
		expect(log).toEqual(['A', 'B', 'C']);
		log = [];
		executeActionSequence(actions, invoke);
		expect(log).toEqual(['A', 'Q', 'B1', 'B2', 'C']);
	});

	test('subseq replace subseq with action', () => {
		let log: string[] = [];
		const fixture: ActionSequence<TestAction> = [
			['A', ActionResult.Continue],
			subSequence(
				['B', [ActionResult.Continue, ['Q', ActionResult.Continue]]],
				[
					['B1', ActionResult.Continue],
					['B2', ActionResult.Continue],
				],
			),
			['C', ActionResult.Continue],
		];
		const actions = fixture.concat();
		const invoke = (act: [id: string, result: TestActionResult]) => {
			log.push(act[0]);
			return act[1];
		};
		executeActionSequence(actions, invoke);
		expect(log).toEqual(['A', 'B', 'B1', 'B2', 'C']);
		log = [];
		executeActionSequence(actions, invoke);
		expect(log).toEqual(['A', 'Q', 'C']);
	});

	test('subseq replace subseq with action and skip', () => {
		let log: string[] = [];
		const fixture: ActionSequence<TestAction> = [
			['A', ActionResult.Continue],
			subSequence(
				['B', [ActionResult.Continue | ActionResult.flagSkipSubSequence, ['Q', ActionResult.Continue]]],
				[
					['B1', ActionResult.Continue],
					['B2', ActionResult.Continue],
				],
			),
			['C', ActionResult.Continue],
		];
		const actions = fixture.concat();
		const invoke = (act: [id: string, result: TestActionResult]) => {
			log.push(act[0]);
			return act[1];
		};
		executeActionSequence(actions, invoke);
		expect(log).toEqual(['A', 'B', 'C']);
		log = [];
		executeActionSequence(actions, invoke);
		expect(log).toEqual(['A', 'Q', 'C']);
	});

	test('subseq replace subseq with subseq', () => {
		let log: string[] = [];
		const fixture: ActionSequence<TestAction> = [
			['A', ActionResult.Continue],
			subSequence(
				[
					'B',
					[
						ActionResult.Continue,
						subSequence(
							['Q', ActionResult.Continue],
							[
								['Q1', ActionResult.Continue],
								['Q2', ActionResult.Continue],
							],
						),
					],
				],
				[
					['B1', ActionResult.Continue],
					['B2', ActionResult.Continue],
				],
			),
			['C', ActionResult.Continue],
		];
		const actions = fixture.concat();
		const invoke = (act: [id: string, result: TestActionResult]) => {
			log.push(act[0]);
			return act[1];
		};
		executeActionSequence(actions, invoke);
		expect(log).toEqual(['A', 'B', 'B1', 'B2', 'C']);
		log = [];
		executeActionSequence(actions, invoke);
		expect(log).toEqual(['A', 'Q', 'Q1', 'Q2', 'C']);
	});

	test('async subseq continue enter', async () => {
		let log: string[] = [];
		const fixture: ActionSequence<TestAction> = [
			['A', ActionResult.Continue],
			subSequence(
				['B', ActionResult.Continue],
				[
					['B1', ActionResult.Continue],
					['B2', ActionResult.Continue],
				],
			),
			['C', ActionResult.Continue],
		];
		const actions = fixture.concat();
		const invoke = async (act: [id: string, result: TestActionResult]) => {
			log.push(act[0]);
			return act[1];
		};
		await executeActionSequenceAsync(actions, invoke);
		expect(log).toEqual(['A', 'B', 'B1', 'B2', 'C']);
		expect(actions).toEqual(fixture);
	});

	test('async subseq continue skip', async () => {
		let log: string[] = [];
		const fixture: ActionSequence<TestAction> = [
			['A', ActionResult.Continue],
			subSequence(
				['B', ActionResult.Continue | ActionResult.flagSkipSubSequence],
				[
					['B1', ActionResult.Continue],
					['B2', ActionResult.Continue],
				],
			),
			['C', ActionResult.Continue],
		];
		const actions = fixture.concat();
		const invoke = async (act: [id: string, result: TestActionResult]) => {
			log.push(act[0]);
			return act[1];
		};
		await executeActionSequenceAsync(actions, invoke);
		expect(log).toEqual(['A', 'B', 'C']);
		expect(actions).toEqual(fixture);
	});

	test('async subseq stop enter', async () => {
		let log: string[] = [];
		const fixture: ActionSequence<TestAction> = [
			['A', ActionResult.Continue],
			subSequence(
				['B', ActionResult.Stop],
				[
					['B1', ActionResult.Continue],
					['B2', ActionResult.Continue],
				],
			),
			['C', ActionResult.Continue],
		];
		const actions = fixture.concat();
		const invoke = async (act: [id: string, result: TestActionResult]) => {
			log.push(act[0]);
			return act[1];
		};
		await executeActionSequenceAsync(actions, invoke);
		expect(log).toEqual(['A', 'B', 'B1', 'B2']);
		expect(actions).toEqual(fixture);
	});

	test('async subseq stop skip', async () => {
		let log: string[] = [];
		const fixture: ActionSequence<TestAction> = [
			['A', ActionResult.Continue],
			subSequence(
				['B', ActionResult.Stop | ActionResult.flagSkipSubSequence],
				[
					['B1', ActionResult.Continue],
					['B2', ActionResult.Continue],
				],
			),
			['C', ActionResult.Continue],
		];
		const actions = fixture.concat();
		const invoke = async (act: [id: string, result: TestActionResult]) => {
			log.push(act[0]);
			return act[1];
		};
		await executeActionSequenceAsync(actions, invoke);
		expect(log).toEqual(['A', 'B']);
		expect(actions).toEqual(fixture);
	});

	test('async subseq replace entry action', async () => {
		let log: string[] = [];
		const fixture: ActionSequence<TestAction> = [
			['A', ActionResult.Continue],
			subSequence(
				['B', [ActionResult.Continue | ActionResult.flagReplaceEntryAction, ['Q', ActionResult.Continue]]],
				[
					['B1', ActionResult.Continue],
					['B2', ActionResult.Continue],
				],
			),
			['C', ActionResult.Continue],
		];
		const actions = fixture.concat();
		const invoke = async (act: [id: string, result: TestActionResult]) => {
			log.push(act[0]);
			return act[1];
		};
		await executeActionSequenceAsync(actions, invoke);
		expect(log).toEqual(['A', 'B', 'B1', 'B2', 'C']);
		log = [];
		await executeActionSequenceAsync(actions, invoke);
		expect(log).toEqual(['A', 'Q', 'B1', 'B2', 'C']);
	});

	test('async subseq replace entry action and skip', async () => {
		let log: string[] = [];
		const fixture: ActionSequence<TestAction> = [
			['A', ActionResult.Continue],
			subSequence(
				[
					'B',
					[
						ActionResult.Continue | ActionResult.flagReplaceEntryAction | ActionResult.flagSkipSubSequence,
						['Q', ActionResult.Continue],
					],
				],
				[
					['B1', ActionResult.Continue],
					['B2', ActionResult.Continue],
				],
			),
			['C', ActionResult.Continue],
		];
		const actions = fixture.concat();
		const invoke = async (act: [id: string, result: TestActionResult]) => {
			log.push(act[0]);
			return act[1];
		};
		await executeActionSequenceAsync(actions, invoke);
		expect(log).toEqual(['A', 'B', 'C']);
		log = [];
		await executeActionSequenceAsync(actions, invoke);
		expect(log).toEqual(['A', 'Q', 'B1', 'B2', 'C']);
	});

	test('async subseq replace subseq with action', async () => {
		let log: string[] = [];
		const fixture: ActionSequence<TestAction> = [
			['A', ActionResult.Continue],
			subSequence(
				['B', [ActionResult.Continue, ['Q', ActionResult.Continue]]],
				[
					['B1', ActionResult.Continue],
					['B2', ActionResult.Continue],
				],
			),
			['C', ActionResult.Continue],
		];
		const actions = fixture.concat();
		const invoke = async (act: [id: string, result: TestActionResult]) => {
			log.push(act[0]);
			return act[1];
		};
		await executeActionSequenceAsync(actions, invoke);
		expect(log).toEqual(['A', 'B', 'B1', 'B2', 'C']);
		log = [];
		await executeActionSequenceAsync(actions, invoke);
		expect(log).toEqual(['A', 'Q', 'C']);
	});

	test('async subseq replace subseq with action and skip', async () => {
		let log: string[] = [];
		const fixture: ActionSequence<TestAction> = [
			['A', ActionResult.Continue],
			subSequence(
				['B', [ActionResult.Continue | ActionResult.flagSkipSubSequence, ['Q', ActionResult.Continue]]],
				[
					['B1', ActionResult.Continue],
					['B2', ActionResult.Continue],
				],
			),
			['C', ActionResult.Continue],
		];
		const actions = fixture.concat();
		const invoke = async (act: [id: string, result: TestActionResult]) => {
			log.push(act[0]);
			return act[1];
		};
		await executeActionSequenceAsync(actions, invoke);
		expect(log).toEqual(['A', 'B', 'C']);
		log = [];
		await executeActionSequenceAsync(actions, invoke);
		expect(log).toEqual(['A', 'Q', 'C']);
	});

	test('async subseq replace subseq with subseq', async () => {
		let log: string[] = [];
		const fixture: ActionSequence<TestAction> = [
			['A', ActionResult.Continue],
			subSequence(
				[
					'B',
					[
						ActionResult.Continue,
						subSequence(
							['Q', ActionResult.Continue],
							[
								['Q1', ActionResult.Continue],
								['Q2', ActionResult.Continue],
							],
						),
					],
				],
				[
					['B1', ActionResult.Continue],
					['B2', ActionResult.Continue],
				],
			),
			['C', ActionResult.Continue],
		];
		const actions = fixture.concat();
		const invoke = async (act: [id: string, result: TestActionResult]) => {
			log.push(act[0]);
			return act[1];
		};
		await executeActionSequenceAsync(actions, invoke);
		expect(log).toEqual(['A', 'B', 'B1', 'B2', 'C']);
		log = [];
		await executeActionSequenceAsync(actions, invoke);
		expect(log).toEqual(['A', 'Q', 'Q1', 'Q2', 'C']);
	});
});

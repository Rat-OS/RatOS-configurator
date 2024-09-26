/**
 * @file ActionSequence.ts
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

/** The result of executing an action in an action sequence. */
export enum ActionResult {
	/**
	 * Continue processing subsequent actions in the sequence.
	 */
	Continue = 0,
	/**
	 * Remove the current action, then continue processing subsequent actions in the sequence.
	 */
	RemoveAndContinue,
	/**
	 * Do not process any subsequent actions in the sequence.
	 */
	Stop,
	/**
	 * Remove the current action, and not process any subsequent actions in the sequence.
	 */
	RemoveAndStop,

	/**
	 * A flag that can be or'd with one of the non-flag values when returned by an action that is
	 * a sub-sequence entry action. {@link flagSkipSubSequence} indicates that the
	 * the sub-sequence actions should not be processed. If {@link flagSkipSubSequence} is not set,
	 *  the sub-sequence will be processed regardless of the main {@link ActionResult} value.
	 *
	 * Note that {@link flagSkipSubSequence} on its own is equivalent to
	 * {@link flagSkipSubSequence}` | `{@link Continue}, because {@link Continue} has value `0`.
	 *
	 * Note that there is no opposite `flagProcessSubSequence`, because sub-sequences are processed
	 * by default unless the {@link flagSkipSubSequence} flag is set.
	 */
	flagSkipSubSequence = 1 << 8,

	/**
	 * A flag that can be or'd with one of the non-flag values when returned by an action that is
	 * a sub-sequence entry action as part of a replacement tuple
	 * `[result: ActionResult, replaceWith: TAction | ActionSubSequence<TAction>]`, when `replaceWith`
	 * is `TAction`. {@link flagReplaceEntryAction} indicates that the `replaceWith` action should
	 * replace the entry action of the current sub-sequence. If {@link flagReplaceEntryAction} is not
	 * set, the {@link ActionSubSequence} item in the parent action sequence will be replaced
	 * by the `replaceWith` action, such that it is no longer a sub-sequence.
	 *
	 * This flag is only relevant when `replaceWith` is `TAction`. If `replaceWith` is `ActionSubSequence<TAction>`,
	 * the {@link ActionSubSequence} item in the parent action sequence will be replaced regardless, becasue
	 * an entry action cannot be an {@link ActionSubSequence}.
	 */
	flagReplaceEntryAction = 1 << 9,
}

const kActionResultNonFlagMask = (1 << 8) - 1;

/**
 * A sub-sequence of actions that can occur within an action sequence.
 **/
export class ActionSubSequence<TAction> {
	constructor(
		public entryAction: TAction,
		public readonly sequence: TAction[],
	) {}
}

/**
 * Convenience factory function for {@link ActionSubSequence}
 *
 * @param entryAction An action that determines if the contained sequence will be executed.
 * @param sequence The sequence of actions gated by {@link entryAction}.
 *
 * @see {@link ActionResult.flagSkipSubSequence}
 * @see {@link ActionResult.flagReplaceEntryAction}
 * */
export function subSequence<TAction>(entryAction: TAction, sequence: TAction[]) {
	return new ActionSubSequence<TAction>(entryAction, sequence);
}

/** A sequence of actions and sub-sequences of actions. */
export type ActionSequence<TAction> = Array<TAction | ActionSubSequence<TAction>>;

/** Execute an action sequence. */
export function executeActionSequence<TAction>(
	actions: ActionSequence<TAction>,
	invoke: (action: TAction) => ActionResult | [result: ActionResult, replaceWith: TAction | ActionSubSequence<TAction>],
) {
	let idx = 0;
	while (idx < actions.length) {
		let item = actions[idx];

		let action: TAction | undefined = undefined;
		let subseq: TAction[] | undefined = undefined;
		let ret: ActionResult | [result: ActionResult, replaceWith: TAction | ActionSubSequence<TAction>] | undefined =
			undefined;

		if (item instanceof ActionSubSequence) {
			action = item.entryAction;
			subseq = item.sequence;
		} else {
			action = item;
		}

		ret = invoke(action);

		let result: ActionResult;

		if (Array.isArray(ret)) {
			result = ret[0];
			if (subseq) {
				if (ret[1] instanceof ActionSubSequence) {
					actions[idx] = ret[1];
				} else {
					if ((result & ActionResult.flagReplaceEntryAction) > 0) {
						(item as ActionSubSequence<TAction>).entryAction = ret[1];
					} else {
						actions[idx] = ret[1];
					}
				}
			} else {
				actions[idx] = ret[1];
			}
		} else {
			result = ret;
		}

		if (subseq && subseq.length > 0 && (result & ActionResult.flagSkipSubSequence) == 0) {
			executeActionSequence(subseq, invoke);
		}

		switch (result & kActionResultNonFlagMask) {
			case ActionResult.Continue:
				++idx;
				break;
			case ActionResult.Stop:
				return;
			case ActionResult.RemoveAndContinue:
				actions.splice(idx, 1);
				break;
			case ActionResult.RemoveAndStop:
				actions.splice(idx, 1);
				return;
		}
	}
}

/** Execute an action sequence asynchronously. */
export async function executeActionSequenceAsync<TAction>(
	actions: ActionSequence<TAction>,
	invoke: (
		action: TAction,
	) => Promise<ActionResult | [result: ActionResult, replaceWith: TAction | ActionSubSequence<TAction>]>,
): Promise<void> {
	let idx = 0;
	while (idx < actions.length) {
		let item = actions[idx];

		let action: TAction | undefined = undefined;
		let subseq: TAction[] | undefined = undefined;
		let ret: ActionResult | [result: ActionResult, replaceWith: TAction | ActionSubSequence<TAction>] | undefined =
			undefined;

		if (item instanceof ActionSubSequence) {
			action = item.entryAction;
			subseq = item.sequence;
		} else {
			action = item;
		}

		ret = await invoke(action);

		let result: ActionResult;

		if (Array.isArray(ret)) {
			result = ret[0];
			if (subseq) {
				if (ret[1] instanceof ActionSubSequence) {
					actions[idx] = ret[1];
				} else {
					if ((result & ActionResult.flagReplaceEntryAction) > 0) {
						(item as ActionSubSequence<TAction>).entryAction = ret[1];
					} else {
						actions[idx] = ret[1];
					}
				}
			} else {
				actions[idx] = ret[1];
			}
		} else {
			result = ret;
		}

		if (subseq && subseq.length > 0 && (result & ActionResult.flagSkipSubSequence) == 0) {
			await executeActionSequenceAsync(subseq, invoke);
		}

		switch (result & kActionResultNonFlagMask) {
			case ActionResult.Continue:
				++idx;
				break;
			case ActionResult.Stop:
				return;
			case ActionResult.RemoveAndContinue:
				actions.splice(idx, 1);
				break;
			case ActionResult.RemoveAndStop:
				actions.splice(idx, 1);
				return;
		}
	}
}

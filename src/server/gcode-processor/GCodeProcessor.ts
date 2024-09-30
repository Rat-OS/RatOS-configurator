/**
 * @file GCodeProcessor.ts
 * @description The RatOS gcode post-processor.
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

import {
	ActionResult,
	ActionSequence,
	executeActionSequence,
	subSequence,
} from '@/server/gcode-processor/ActionSequence';
import { BookmarkCollection } from '@/server/gcode-processor/BookmarkingBufferEncoder';
import { Bookmark } from '@/server/gcode-processor/Bookmark';
import { ProcessLineContext, SlidingWindowLineProcessor } from '@/server/gcode-processor/SlidingWindowLineProcessor';
import { InternalError } from '@/server/gcode-processor/errors';
import { GCodeFlavour, GCodeInfo } from '@/server/gcode-processor/GCodeInfo';
import { State } from '@/server/gcode-processor/State';
import { exactlyOneBitSet } from '@/server/gcode-processor/helpers';
import { Action, ActionFilter, REMOVED_BY_RATOS } from '@/server/gcode-processor/Actions';
import * as act from '@/server/gcode-processor/Actions';
import semver from 'semver';

/**
 * Force all output other than 'processed by ratos' headers to match the legacy python implementation
 * Remove this ASAP after merging the rewrite.
 * */
const LEGACY_MODE = true;

/**
 * Processes a stream of text lines read-forward-once, analysing and transforming on the fly.
 *
 * Analysis is performed using {@link ActionSequence}, which supports state-machine-like behaviour
 * and action sequence short-circuiting.
 *
 * Where the output is streamed to a {@link BookmarkingBufferEncoder} and then to disk, changes to lines that
 * require forward knowledge are speculatively padded with spaces, bookmarked, then retrospectively replaced
 * by random access changes to the output file at the end of streaming.
 **/
export class GCodeProcessor extends SlidingWindowLineProcessor {
	constructor(printerHasIdex: boolean, printerHasRmmuHub: boolean, inspectionOnly: boolean) {
		super(20, 20);
		this.#state = new State(printerHasIdex, printerHasRmmuHub, inspectionOnly);
	}

	#state: State;

	// NB: The order of actions is significant.
	#actions: ActionSequence<Action> = [
		act.getGcodeInfo,
		// NB: sequence won't execute past getStartPrint until the START_PRINT line is found.
		act.getStartPrint,
		// NB: sequence won't continue past whenCommonCommandDoThenStop when the current line matches a common command (Tn/G0/G1).
		subSequence(act.whenCommonCommandDoThenStop, [act.findFirstMoveXY, act.findMinMaxX, act.processToolchange]),
		act.fixOtherLayerTemperature,
		act.fixOrcaSetAccelaration,
		act.captureConfigSection,
	];

	_processLine(ctx: ProcessLineContext) {
		this.#state.resetIterationState();
		++this.#state.currentLineNumber;

		executeActionSequence(this.#actions, (action: Action) => GCodeProcessor.invokeAction(action, ctx, this.#state));
	}

	// NB: Static for easier unit testing.
	/**
	 * Wraps action invocation with additional {@link GCodeProcessor}-specific convenience logic.
	 *  * The action function can return `ActionResult | void`, where `void` is equivalent to
	 *    {@link ActionResult.Continue}.
	 *  * Some union alternates of the {@link Action} type allow common relevance filters to be
	 *    expressed declaritively (currently by {@link GCodeFlavour}).
	 * */
	private static invokeAction(
		action: Action,
		ctx: ProcessLineContext,
		state: State,
	): ActionResult | [result: ActionResult, replaceWith: Action] {
		if (!Array.isArray(action)) {
			// It's a plain action, no filter.
			let result = action(ctx, state);
			return result === undefined ? ActionResult.Continue : result;
		} else {
			if (state.gcodeInfoOrUndefined === undefined) {
				// Allowing flavour-filtered actions to execute before the flavour is known is considered a
				// design error. An preceding action should return ActionResult.Stop or throw.
				throw new InternalError('Attemted to invoke flavour-filtered action before the flavour is known.');
			} else {
				const keep = this.satisfiesFilter(state.gcodeInfoOrUndefined, action[0]);
				if (keep) {
					const result = action[1](ctx, state);
					// We don't need to evaluate the ActionFilter(s) again (because gcodeInfo never changes),
					// so remove the filter by replacing the action, either with the simple function form, or
					// with the replacement it provided.
					if (Array.isArray(result)) {
						return result;
					} else {
						return [result === undefined ? ActionResult.Continue : result, action[1]];
					}
				} else {
					// Filter is not a match, remove the action.
					return ActionResult.RemoveAndContinue;
				}
			}
		}
	}

	private static satisfiesFilter(gcodeInfo: GCodeInfo, include: ActionFilter | ActionFilter[]): boolean {
		const flat = Array.isArray(include) ? include.flat(Infinity) : [include];

		// Evaluation is 'or' - any criterion matching is success.
		let i = 0;
		while (i < flat.length) {
			const flavour = flat[i] as GCodeFlavour;
			if (flavour == GCodeFlavour.Unknown) {
				throw new InternalError('GCodeFlavour.Unknown must not be used in action filters.');
			}

			if ((flavour & gcodeInfo.flavour) > 0) {
				const semVerRange = flat[i + 1];

				if (typeof semVerRange === 'string') {
					if (!exactlyOneBitSet(flavour)) {
						throw new InternalError(
							'An ActionFilter with semVerRange specified must specify exactly one GCodeFlavour to which the filter applies.',
						);
					}
					if (
						semver.satisfies(
							flavour == GCodeFlavour.RatOS ? gcodeInfo.ratosDialectVersion! : gcodeInfo.generatorVersion!,
							semVerRange,
						)
					) {
						return true;
					}
					++i;
				} else {
					// Simple flavour-only filter has matched.
					return true;
				}
			}
			++i;
		}
		return false;
	}

	/**
	 * Applies all the retrospective changes required after analysing the whole file/stream.
	 */
	async processBookmarks(
		bookmarks: BookmarkCollection,
		replaceLine: (bookmark: Bookmark, line: string) => Promise<void>,
	) {
		const s = this.#state;
		// TODO: apply boookmarks. If a file is only being inspected, BookmarkingBufferEncoder won't
		// be in the pipeline, and it would be pointless to call this method. This is also expressed
		// via State.kInspectionOnly: most processing code will behave the same regardless, but this
		// flag can be used to skip some expensive mutation that won't end up being used anyhow.
		if (s.firstLine) {
			await replaceLine(
				bookmarks.getBookmark(s.firstLine.bookmark),
				(await GCodeInfo.getProcessedByRatosHeader()) + '\n' + s.firstLine.line.trimEnd(),
			);
		}

		if (s.startPrintLine) {
			let toAdd = '';

			if (s.toolChangeCount > 0) {
				toAdd += ` TOTAL_TOOLSHIFTS=${s.toolChangeCount - 1}`;
			}

			if (s.firstMoveX && s.firstMoveY) {
				toAdd += ` FIRST_X=${s.firstMoveX} FIRST_Y=${s.firstMoveY}`;
			}

			if (s.minX < Number.MAX_VALUE) {
				toAdd += ` MIN_X=${s.minX} MAX_X=${s.maxX}`;
			}

			if (s.usedTools.length > 0) {
				toAdd += ` USED_TOOLS=${s.usedTools.join()}`;

				const wipeAccel = s.configSection?.get('wipe_tower_acceleration');
				if (wipeAccel) {
					toAdd += ` WIPE_ACCEL=${wipeAccel}`;
				} else if (LEGACY_MODE) {
					toAdd += ` WIPE_ACCEL=0`;
				}
			}

			if (toAdd) {
				await replaceLine(bookmarks.getBookmark(s.startPrintLine.bookmark), s.startPrintLine.line.trimEnd() + toAdd);
			}

			toAdd = '';

			if (s.usedTools.length > 0 && s.extruderTemps && s.onLayerChange2Line) {
				for (let tool of s.usedTools) {
					toAdd += `\nM104 S${s.extruderTemps[Number(tool)]} T${tool}`;
				}

				await replaceLine(
					bookmarks.getBookmark(s.onLayerChange2Line.bookmark),
					s.onLayerChange2Line.line.trimEnd() + toAdd,
				);

				if (s.extruderTempLines) {
					for (let bmLine of s.extruderTempLines) {
						await replaceLine(bookmarks.getBookmark(bmLine.bookmark), REMOVED_BY_RATOS + bmLine.line.trimEnd());
					}
				}
			}
		}
	}

	/**
	 * TODO, pending public API requirements, to be decided.
	 */
	getSidecarData(): Object {
		// TODO: This can be called at the end of both inspection and transformation pipelines to emit sidecar
		// data. For inspection pipelines, this is the only way to emit the results of the analysis.
		// For mutating pipelines, some data is also extracted for UI use, such as filament information
		// or toolchange timings.
		throw new InternalError('not implemented');
	}
}

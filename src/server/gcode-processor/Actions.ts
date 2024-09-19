/**
 * @file Actions.ts
 * @description
 *
 * @author Tom Glastonbury <t@tg73.net>
 * @author Portions originally ported from Python code authored by Helge Keck <helgekeck@hotmail.com>
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

import { ActionResult } from '@/server/gcode-processor/ActionSequence';
import { ProcessLineContext } from '@/server/gcode-processor/SlidingWindowLineProcessor';
import semver from 'semver';
import {
	InternalError,
	GCodeError,
	SlicerIdentificationNotFound,
	AlreadyProcessedError,
	SlicerNotSupported,
} from '@/server/gcode-processor/errors';
import { GCodeInfo, GCodeFlavour } from '@/server/gcode-processor/GCodeInfo';
import { State, BookmarkedLine } from '@/server/gcode-processor/State';

// TODO: Review pad lengths.

/*
GCODE FORMAT NOTES
------------------
gcode in the wild includes the comment suffix with no leading whitespace. Example from orcaslicer:

SET_PRESSURE_ADVANCE ADVANCE=0.03; Override pressure advance value

*/

export const CHANGED_BY_RATOS = ' ; Changed by RatOS post processor: ';
export const REMOVED_BY_RATOS = '; Removed by RatOS post processor: ';

/**
 * Matches `G0|G1|Tn` followed by args like `X1.2` for X, Y, Z, E and F in any order, each being optional.
 * Groups:
 * 'G' - will be 'G0' or 'G1'
 * 'T' - will be 'n', like '0' or '1', accepts any number of digits.
 * 'X' - will be the (decimal) number after 'X', like '12.3' in 'X12.3'.
 * ditto for Y, Z, E and F.
 */
const rxParseCommonCommands =
	/^(?:T(?<T>\d+))|(?:(?<G>G0|G1)(?=\s)(?=.*(\sX(?<X>[\d.]+))|)(?=.*(\sY(?<Y>[\d.]+))|)(?=.*(\sZ(?<Z>[\d.]+))|)(?=.*(\sE(?<E>[\d.]+))|)(?=.*(\sF(?<F>[\d.]+))|))/i;

/**
 * Either:
 * * {@link GCodeFlavour} - one or more G-code flavours to which the aciton applies (or'd together), regardless of generator or dialect version.
 * * `[flavour: `{@link GCodeFlavour}`, semVerRange: string]` - a (single) G-code flavour and the generator or dialect version range to which
 *   the action applies. If `flavour` is {@link GCodeFlavour.RatOS}, then then {@link GCodeInfo.ratosDialectVersion} is compared, otherwise
 *   {@link GCodeInfo.generatorVersion} is compared.
 */
export type ActionFilter = GCodeFlavour | [flavour: GCodeFlavour, semVerRange: string];

/**
 * For the function return value `ActionResult | void`, `void` is equivalent to `ActionResult.Continue`.
 * The array form of the `include: ActionFilter | ActionFilter[]` parameter expresses a list of inclusion
 * criteria which are or'd together: if any filter is a match, the action is included; if no filters match,
 * the action is not included.
 */
export type Action =
	| ((c: ProcessLineContext, s: State) => ActionResult | [result: ActionResult, replaceWith: Action] | void)
	| [
			include: ActionFilter | ActionFilter[],
			(c: ProcessLineContext, s: State) => ActionResult | [result: ActionResult, replaceWith: Action] | void,
	  ];

export function newGCodeError(message: string, ctx: ProcessLineContext, state: State) {
	return new GCodeError(message, ctx.line, state.currentLineNumber);
}

// export const test1: Action = [GCodeFlavour.OrcaSlicer, (c, s) => {}];
// export const test2: Action = [[GCodeFlavour.OrcaSlicer, '1.0.0'], (c, s) => {}];
// export const test3: Action = [
// 	[
// 		[GCodeFlavour.OrcaSlicer, '1.0.0'],
// 		[GCodeFlavour.PrusaSlicer, '>2.8'],
// 	],
// 	(c, s) => {},
// ];

export const getGcodeInfo: Action = (c, s) => {
	let parsed = GCodeInfo.tryParseHeader(
		c.line + '\n' + c.getLineOrUndefined(1)?.line + '\n' + c.getLineOrUndefined(2)?.line + '\n',
	);
	if (!parsed) {
		throw new SlicerIdentificationNotFound();
	} else {
		if (parsed.processedByRatOSVersion) {
			throw new AlreadyProcessedError(parsed);
		}
		s.gcodeInfo = parsed;
		switch (parsed.flavour) {
			case GCodeFlavour.Unknown:
				throw new SlicerNotSupported(
					`Slicer '${parsed.generator}' is not supported, and RatOS dialect conformance was not declared.`,
					{ cause: parsed },
				);
			case GCodeFlavour.PrusaSlicer:
				if (semver.neq('2.8.0', parsed.generatorVersion)) {
					throw new SlicerNotSupported(
						`Only version 2.8.0 of PrusaSlicer is supported. Version ${parsed.generatorVersion} is not supported`,
						{ cause: parsed },
					);
				}
				break;
			case GCodeFlavour.OrcaSlicer:
				if (semver.neq('2.1.1', parsed.generatorVersion)) {
					throw new SlicerNotSupported(
						`Only version 2.1.1 of OrcasSlicer is supported. Version ${parsed.generatorVersion} is not supported`,
						{ cause: parsed },
					);
				}
				break;
			case GCodeFlavour.SuperSlicer:
				if (semver.neq('2.5.59', parsed.generatorVersion)) {
					throw new SlicerNotSupported(
						`Only version 2.5.59 of SuperSlicer is supported. Version ${parsed.generatorVersion} is not supported`,
						{ cause: parsed },
					);
				}
				break;
			case GCodeFlavour.RatOS:
				if (semver.neq('0.1', parsed.generatorVersion)) {
					throw new SlicerNotSupported(
						`Only version 0.1 of the RatOS G-code dialect is supported. Version ${parsed.generatorVersion} is not supported`,
						{ cause: parsed },
					);
				}
				break;
			default:
				throw new InternalError('unexpected state'); // should never happen
		}
	}
	c.line = c.line.padEnd(c.line.length + 100);
	c.bookmarkKey = Symbol('first line');
	s.firstLine = new BookmarkedLine(c.line, c.bookmarkKey);
	return ActionResult.RemoveAndStop;
};

export const getStartPrint: Action = (c, s) => {
	let match =
		/^(START_PRINT|RMMU_START_PRINT)(?=[ $])((?=.*(\sINITIAL_TOOL=(?<INITIAL_TOOL>(\d+))))|)((?=.*(\sEXTRUDER_OTHER_LAYER_TEMP=(?<EXTRUDER_OTHER_LAYER_TEMP>(\d+(,\d+)*))))|)/i.exec(
			c.line,
		);
	if (match) {
		// Fix colour variable format and pad for later modification
		c.line = c.line.replace('#', '').padEnd(c.line.length + 250);
		c.bookmarkKey = Symbol('START_PRINT');
		s.startPrintLine = new BookmarkedLine(c.line, c.bookmarkKey);

		let initialTool = match.groups?.INITIAL_TOOL;
		if (initialTool) {
			s.usedTools.push(initialTool);
		}

		let extruderOtherLayerTemp = match?.groups?.EXTRUDER_OTHER_LAYER_TEMP;
		if (extruderOtherLayerTemp) {
			s.extruderTemps = extruderOtherLayerTemp.split(',');
		}

		return ActionResult.RemoveAndStop;
	}

	if (s.currentLineNumber > 5000) {
		// Most likely the START_PRINT line is missing. If this is a huge file, failing fast will be
		// a better UX.
		// TODO: Make this behaviour configurable, eg add to opts on public API, State holds opts.
		throw new GCodeError(
			'The START_PRINT or RMMU_START_PRINT command has not been found within the first 5000 lines of the file. Please refer to the slicer configuration instructions.',
		);
	}

	// Stop at this point in the action sequence until we find START_LINE. If any actions need to inspect pre-START_LINE,
	// they must be ordered before this action. All actions ordered after this action can assume that
	// the start print line has been found.
	return ActionResult.Stop;
};

export const fixOtherLayerTemperature: Action = [
	GCodeFlavour.OrcaSlicer | GCodeFlavour.SuperSlicer,
	(c, s) => {
		if (!s.onLayerChange2Line) {
			if (/^_ON_LAYER_CHANGE LAYER=2($|[\s;])/i.test(c.line)) {
				c.line = c.line.padEnd(c.line.length + 250);
				c.bookmarkKey = Symbol('on_layer_change 2');
				s.onLayerChange2Line = new BookmarkedLine(c.line, c.bookmarkKey);

				for (let scan of c.scanForward(9)) {
					if (scan.line.startsWith('M104 S')) {
						s.extruderTempLines ??= [];
						scan.line = scan.line.padEnd(scan.line.length + REMOVED_BY_RATOS.length);
						scan.bookmarkKey = Symbol(`extruder temp @ ${scan.offset}`);
						s.extruderTempLines.push(new BookmarkedLine(scan.line, scan.bookmarkKey));
					}
				}

				return ActionResult.RemoveAndStop;
			}
		}
	},
];

export const fixOrcaSetAccelaration: Action = [
	GCodeFlavour.OrcaSlicer,
	(c, s) => {
		// SET_VELOCITY_LIMIT ACCEL=2500 ACCEL_TO_DECEL=1250
		const match = /^SET_VELOCITY_LIMIT.*\sACCEL=(\d+)/i.exec(c.line);
		if (match) {
			c.line = `M204 S${match[1]}${CHANGED_BY_RATOS}${c.line}`;
			return ActionResult.Stop;
		}
	},
];

/**
 * A subsequence entry action that parses `Tn`, `G0` and `G1` commands. All handlers for these commands
 * must be placed in this command's subsequence in the action sequence. If the current line is one
 * of the common commands, the subsequence is executed, then the main sequence stops. If the current
 * line is not one of the common commands, the subsequence is skipped, and the main sequence continues.
 */
export const whenCommonCommandDoThenStop: Action = (c, s) => {
	s._cmd = rxParseCommonCommands.exec(c.line);
	return s._cmd ? ActionResult.Stop : ActionResult.Continue | ActionResult.flagSkipSubSequence;
};

export const findFirstMoveXY: Action = (c, s) => {
	if (s._cmd!.groups?.G) {
		s.firstMoveX ??= s._cmd?.groups?.X;
		s.firstMoveY ??= s._cmd?.groups?.Y;

		if (s.firstMoveX && s.firstMoveY) {
			// We don't need to do this check any more. G0/G1 are extremely frequent, so avoid any excess work.
			return ActionResult.RemoveAndContinue;
		}

		// NOTE: original ratos.py has a short-circuit when !enable_post_processing and both firstMoveX and firstMoveY have been found,
		// which calls run_script_from_command  then returns. (see around line 320). Something like this would be the equivalent
		// short circuit here: if (s.kInpsectionOnly) { throw new SomeObjectToSayAnalysisIsDone() }
	}
};

export const findMinMaxX: Action = (c, s) => {
	if (s._cmd!.groups?.G) {
		let x = s._cmd?.groups?.X;
		if (x) {
			let n = Number(x);
			if (n < s.minX) {
				s.minX = n;
			}
			if (n > s.maxX) {
				s.maxX = n;
			}
		}

		// Within the commom commands subgroup, this is the last action that handles to G lines. Subsequent
		// actions will not match, don't bother trying.
		// TODO: Discuss. Optimal, but only a marginal gain in exchange for brittleness of subsequence order.
		return ActionResult.Stop;
	}
};

export const processToolchange: Action = (c, s) => {
	let tool = s._cmd!.groups?.T;
	if (tool) {
		if (++s.toolChangeCount == 1) {
			// Remove first toolchange
			c.prepend(REMOVED_BY_RATOS);

			// This is the only action that handles `Tn` lines.
			return ActionResult.Stop;
		}

		if (!s.usedTools.includes(tool)) {
			s.usedTools.push(tool);
		}

		// TOOLSHIFT PROCESSING
		// ====================

		// Detect purge/wipe tower:
		if (s.hasPurgeTower === undefined) {
			s.hasPurgeTower = false;
			for (let scan of c.scanBack(19)) {
				if (scan.line.startsWith('; CP TOOLCHANGE START')) {
					s.hasPurgeTower = true;
					break;
				}
			}
		}

		// NOT PORTING `#z-hop before toolchange` (line ~356)
		//  1) it looks like PS and OS no longer zhop around a tool change.
		//  2) SS does still zhop, but will not emit '; custom gcode: end_filament_gcode' by default
		//     and the instructions don't say to set this, so current output from SS will not be
		//     detected anyhow.
		// TODO: Consider reinstating and fixing after initial regression tests pass.

		// NOT PORTING `# toolchange line` section (line ~379)
		// - This looks for `Tn` from the current line up to 19 lines ahead, but will always match
		//   on the current line because all the code is inside an
		//  `if current line is 'Tn'` check. So `toolchange_line` will always be equal to the current line.

		// Retraction before toolchange:
		let retractLine: ProcessLineContext | undefined = undefined;

		if (!s.hasPurgeTower) {
			switch (s.gcodeInfo.flavour) {
				case GCodeFlavour.PrusaSlicer:
				case GCodeFlavour.SuperSlicer:
					for (let scan of c.scanForward(19)) {
						if (scan.line.startsWith('G1 E-')) {
							retractLine = scan;
							break;
						}
					}
					break;
				case GCodeFlavour.OrcaSlicer:
					for (let scan of c.scanBack(19)) {
						if (scan.line.startsWith('G1 E-')) {
							retractLine = scan;
							break;
						}
					}
					break;
			}
		}

		// XY move after toolchange:
		let xyMoveAfterToolchange: [x: string, y: string, line: ProcessLineContext] | undefined = undefined;
		for (let scan of c.scanForward(19)) {
			const match = rxParseCommonCommands.exec(scan.line);
			if (match) {
				const x = match.groups?.X;
				const y = match.groups?.Y;
				if (x && y) {
					if (match.groups?.E) {
						throw newGCodeError('Unexpected extruding move after toolchange.', scan, s);
					}
					xyMoveAfterToolchange = [x, y, scan];
					break;
				} else if (x || y) {
					throw newGCodeError('Unexpected X-only or Y-only move after toolchange.', scan, s);
				}
			}
		}

		// NOT PORTING `# z-drop after toolchange` section (line ~379)
		// 1) it looks like PS and OS no longer zhop around a tool change.
		// 2) SS does still zhop, but:
		//    a) the python code fails to detect the hop
		//    b) the python code only looks up to 2 lines ahead for the drop, and this is not far
		//       enough with current SS version output, which has 2 lines of comments after the move line.
		// TODO: Consider reinstating and fixing after initial regression tests pass.

		// Z-move after toolchange. This can be either a z-drop after a z-hop, or it can be just
		// a statement of desired z height, often effectively a no-op.
		let zMoveAfterToolchange: [z: string, line: ProcessLineContext] | undefined = undefined;

		if (!s.hasPurgeTower) {
			switch (s.gcodeInfo.flavour) {
				case GCodeFlavour.PrusaSlicer:
				case GCodeFlavour.SuperSlicer:
				case GCodeFlavour.OrcaSlicer:
					for (let scan of (xyMoveAfterToolchange?.[2] ?? c).scanForward(2)) {
						const match = rxParseCommonCommands.exec(scan.line);
						if (match) {
							const z = match.groups?.Z;
							if (z) {
								zMoveAfterToolchange = [z, scan];
								break;
							}
						}
					}
					break;
				// TODO: Porting - Orca branch only applies if there's a z-hop, and z-hop detection is
				// broken in the python code. Reinstate and fix.
			}
		}

		// Deretract after toolchange (`# extrusion after move` in original python)
		let deretractLine: ProcessLineContext | undefined = undefined;

		if (!s.hasPurgeTower && xyMoveAfterToolchange) {
			// TODO: Brittle. Must scan beyond filament start gcode, which is of unknown length. Often at least contains
			// SET_PRESSURE_ADVANCE. Maybe require stricter custom gcode format, eg must end with a line `;END filament gcode`.
			// TODO: BUGGY IN PYTHON, produces incorrect gcode, bug reproduced here for initial regression testing.
			for (let scan of xyMoveAfterToolchange[2].scanForward(4)) {
				if (scan.line.startsWith('G1 E')) {
					deretractLine = scan;
					break;
				}
			}
		}

		// Convert toolchange to toolshift
		if (xyMoveAfterToolchange) {
			// The aboe condition is ported from python - but why? Should it be an error if there's a toolchange with no xy move found?
			// TODO: reinstate and fix zhop line redaction.

			if (zMoveAfterToolchange) {
				zMoveAfterToolchange[1].prepend(REMOVED_BY_RATOS);
			}

			c.line = s.kPrinterHasRmmuHub
				? `TOOL T=${tool} X=${xyMoveAfterToolchange[0]} Y=${xyMoveAfterToolchange[1]}${zMoveAfterToolchange ? ' Z=' + zMoveAfterToolchange[0] : ''}`
				: `T${tool} X${xyMoveAfterToolchange[0]} Y${xyMoveAfterToolchange[1]}${zMoveAfterToolchange ? ' Z' + zMoveAfterToolchange[0] : ''}`;

			xyMoveAfterToolchange[2].prepend(REMOVED_BY_RATOS);

			if (retractLine && deretractLine) {
				retractLine.prepend(REMOVED_BY_RATOS);
				deretractLine.prepend(REMOVED_BY_RATOS);
			}
		}

		// This is the only action that handles `Tn` lines.
		return ActionResult.Stop;
	}
};

export const captureConfigSection: Action = (c, s) => {
	let startLine: string | undefined = undefined;
	let endLine: string | undefined = undefined;
	switch (s.gcodeInfo.flavour) {
		case GCodeFlavour.PrusaSlicer:
			startLine = '; prusaslicer_config = begin';
			endLine = '; prusaslicer_config = end';
			break;
		case GCodeFlavour.OrcaSlicer:
			startLine = '; CONFIG_BLOCK_START';
			endLine = '; CONFIG_BLOCK_END';
			break;
		case GCodeFlavour.SuperSlicer:
			startLine = '; SuperSlicer_config = begin';
			endLine = '; SuperSlicer_config = end';
			break;
		default:
			// Config section not supported
			return ActionResult.RemoveAndContinue;
	}

	// Replace this action with the action to look for the flavour-specific start line:
	return [
		ActionResult.Continue,
		(c, s) => {
			if (c.line.startsWith(startLine)) {
				s.configSection = new Map<string, string>();
				// Replace this action with the action to capture the config section:
				return [
					ActionResult.Stop,
					(c, s) => {
						if (c.line.startsWith(endLine)) {
							return ActionResult.RemoveAndStop;
						} else {
							const match = /^; ([^\s]+)\s=\s(.+)/.exec(c.line);
							if (match) {
								s.configSection!.set(match[1], match[2]);
							}
						}
					},
				];
			}
		},
	];
};

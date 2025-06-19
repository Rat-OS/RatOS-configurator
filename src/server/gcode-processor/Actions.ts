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
	GeneratorIdentificationNotFound,
	AlreadyProcessedError,
	SlicerNotSupported,
} from '@/server/gcode-processor/errors';
import { GCodeInfo } from '@/server/gcode-processor/GCodeInfo';
import { GCodeFlavour } from '@/server/gcode-processor/GCodeFlavour';
import { State, BookmarkedLine } from '@/server/gcode-processor/State';
import { CommonGCodeCommand, parseCommonGCodeCommandLine } from '@/server/gcode-processor/CommonGCodeCommand';
import { InspectionIsComplete } from '@/server/gcode-processor/GCodeProcessor';
import { GCodeFile } from '@/server/gcode-processor/GCodeFile';
import { WarningCodes } from '@/server/gcode-processor/WarningCodes';

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

export function validateGenerator(
	gcodeInfo: GCodeInfo,
	allowUnsupportedSlicerVersions: boolean,
	onWarning?: (code: string, message: string) => void,
) {
	try {
		switch (gcodeInfo.flavour) {
			case GCodeFlavour.Unknown:
				throw new SlicerNotSupported(
					`Slicer '${gcodeInfo.generator}' is not supported, and RatOS dialect conformance was not declared.`,
					{ cause: gcodeInfo },
				);
			case GCodeFlavour.PrusaSlicer:
				if (!semver.satisfies(gcodeInfo.generatorVersion, '2.8.0 || 2.8.1 || 2.9.0')) {
					throw new SlicerNotSupported(
						`Only versions 2.8.0, 2.8.1 and 2.9.0 of PrusaSlicer are supported. Version ${gcodeInfo.generatorVersion} is not supported.`,
						{ cause: gcodeInfo },
					);
				}
				break;
			case GCodeFlavour.OrcaSlicer:
				if (!semver.satisfies(gcodeInfo.generatorVersion, '2.1.1 || 2.2.0')) {
					throw new SlicerNotSupported(
						`Only versions 2.1.1 and 2.2.0 of OrcasSlicer are supported. Version ${gcodeInfo.generatorVersion} is not supported.`,
						{ cause: gcodeInfo },
					);
				}
				break;
			case GCodeFlavour.SuperSlicer:
				if (!semver.satisfies(gcodeInfo.generatorVersion, '2.5.59 || 2.5.60')) {
					throw new SlicerNotSupported(
						`Only versions 2.5.59 and 2.5.60 of SuperSlicer are supported. Version ${gcodeInfo.generatorVersion} is not supported.`,
						{ cause: gcodeInfo },
					);
				}
				break;
			case GCodeFlavour.RatOS:
				if (semver.neq('0.1', gcodeInfo.ratosDialectVersion)) {
					throw new SlicerNotSupported(
						`Only version 0.1 of the RatOS G-code dialect is supported. Version ${gcodeInfo.ratosDialectVersion} is not supported.`,
						{ cause: gcodeInfo },
					);
				}
				break;
			default:
				throw new InternalError('unexpected state'); // should never happen
		}
	} catch (ex) {
		if (allowUnsupportedSlicerVersions && onWarning && ex instanceof SlicerNotSupported) {
			onWarning(
				WarningCodes.UNSUPPORTED_SLICER_VERSION,
				ex.message + ' This may result in print defects and incorrect operation of the printer.',
			);
		} else {
			throw ex;
		}
	}
}

export const getGcodeInfo: Action = (c, s) => {
	const parsed = GCodeFile.tryParseHeader(
		c.line + '\n' + c.getLineOrUndefined(1)?.line + '\n' + c.getLineOrUndefined(2)?.line + '\n',
	);
	if (!parsed) {
		throw new GeneratorIdentificationNotFound();
	} else {
		if (parsed.postProcessorVersion) {
			throw new AlreadyProcessedError(parsed);
		}
		s.gcodeInfo = parsed;
		validateGenerator(s.gcodeInfo, s.kAllowUnsupportedSlicerVersions, s.onWarning);
	}
	c.line = c.line.padEnd(c.line.length + 100);
	c.bookmarkKey = Symbol('first line');
	s.firstLine = new BookmarkedLine(c.line, c.bookmarkKey);
	return ActionResult.RemoveAndStop;
};

export const getStartPrint: Action = (c, s) => {
	// Quick skip for comment lines, there can be lots for thumbnails before we get to START_PRINT.
	if (!c.line.startsWith(';')) {
		const spMatch =
			/^(START_PRINT)(?=[ $])((?=.*(\sINITIAL_TOOL=(?<INITIAL_TOOL>(\d+))))|)((?=.*(\sEXTRUDER_OTHER_LAYER_TEMP=(?<EXTRUDER_OTHER_LAYER_TEMP>(\d+(,\d+)*))))|)/i.exec(
				c.line,
			);

		if (spMatch) {
			// Pad for later modification
			c.line = c.line.padEnd(c.line.length + 250);
			c.bookmarkKey = Symbol('START_PRINT');
			s.startPrintLine = new BookmarkedLine(c.line, c.bookmarkKey);

			const initialTool = spMatch.groups?.INITIAL_TOOL;
			if (initialTool) {
				s.usedTools.push(initialTool);
			}

			const extruderOtherLayerTemp = spMatch?.groups?.EXTRUDER_OTHER_LAYER_TEMP;
			if (extruderOtherLayerTemp) {
				s.extruderTemps = extruderOtherLayerTemp.split(',');
			}

			return ActionResult.RemoveAndStop;
		}

		const cmd = parseCommonGCodeCommandLine(c.line);

		if (
			cmd &&
			((cmd.letter === 'G' && (cmd.value === '1' || cmd.value === '2' || cmd.value === '3')) || cmd.letter === 'T')
		) {
			throw newGCodeError(
				'The START_PRINT command was not found before the first move or toolchange instruction. Please refer to the slicer configuration instructions.',
				c,
				s,
			);
		}
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

/**
 * A subsequence entry action that parses `Tn`, `G0` and `G1` commands. All handlers for these commands
 * must be placed in this command's subsequence in the action sequence. If the current line is one
 * of the common commands, the subsequence is executed, then the main sequence stops. If the current
 * line is not one of the common commands, the subsequence is skipped, and the main sequence continues.
 */
export const whenCommonCommandDoThenStop: Action = (c, s) => {
	s._cmd = parseCommonGCodeCommandLine(c.line);
	return s._cmd ? ActionResult.Stop : ActionResult.Continue | ActionResult.flagSkipSubSequence;
};

export const findFirstMoveXY: Action = (c, s) => {
	if (s._cmd!.letter === 'G') {
		s.firstMoveX ??= s._cmd!.x;
		s.firstMoveY ??= s._cmd!.y;

		if (s.firstMoveX && s.firstMoveY) {
			if (s.kQuickInpsectionOnly) {
				throw new InspectionIsComplete();
			}
			// We don't need to do this check any more. G0/G1 are extremely frequent, so avoid any excess work.
			return ActionResult.RemoveAndContinue;
		}
	}
};

export const findMinMaxX: Action = (c, s) => {
	// TODO: Support G2/G3 (arcs)
	if (s._cmd!.letter === 'G') {
		switch (s._cmd!.value) {
			// Reminder: parseCommonGCodeCommandLine normalizes G0 to G1, we only need to check for '1'.
			case '1':
				const x = s._cmd!.x;
				if (x) {
					const n = Number(x);
					if (n < s.minX) {
						s.minX = n;
					}
					if (n > s.maxX) {
						s.maxX = n;
					}
				}
				break;
			case '2':
			case '3':
				throw newGCodeError('G2/G3 commands (arcs) are not currently supported.', c, s);
		}

		// Within the commom commands subgroup, this is the last action that handles to G lines. Subsequent
		// actions will not match, don't bother trying.
		// TODO: Discuss. Optimal, but only a marginal gain in exchange for brittleness of subsequence order.
		return ActionResult.Stop;
	}
};

export const processToolchange: Action = (c, s) => {
	if (s._cmd!.letter === 'T') {
		const tool = s._cmd!.value;
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
			for (let scan of c.scanBack(100)) {
				if (scan.line.startsWith('; CP TOOLCHANGE START')) {
					s.hasPurgeTower = true;
					break;
				}
			}
		}

		// BEFORE TOOLCHANGE
		// Look backwards:
		// - skip if a purge tower is used
		// - stop looking on any X and/or Y move
		// - remove all E and Z moves except those in the two lines directly under a `;WIPE_END` line
		if (!s.hasPurgeTower) {
			let foundStop = false;
			for (let scan of c.scanBack(19)) {
				const cmd = parseCommonGCodeCommandLine(scan.line);
				if (cmd && cmd.letter === 'G' && cmd.value === '1') {
					// Stop on any XY move:
					if (cmd.x || cmd.y) {
						foundStop = true;
						break;
					}

					// Remove any E or Z moves except those in the two lines directly under a `;WIPE_END` line:
					if (
						(cmd.e || cmd.z) &&
						!scan.getLine(-1).line.startsWith(';WIPE_END') &&
						!scan.getLine(-2).line.startsWith(';WIPE_END')
					) {
						scan.prepend(REMOVED_BY_RATOS);
					}
				}
			}

			if (!foundStop) {
				// Smells bad, we hit the end of the scan back without explicitly
				// detecting a stop condition.
				s.onWarning?.(
					WarningCodes.HEURISTIC_SMELL,
					`End of scan back before toolchange at line ${s.currentLineNumber} reached without detecting end condition.`,
				);
			}
		}

		// AFTER TOOLCHANGE
		// Look forwards:
		// - note the first XY move encountered
		// - stop looking on any subsequent XY move
		// - If there's no purge tower:
		//   - remove all E moves
		//   - remove all but the last z move, noting the last move encountered
		let xyMoveAfterToolchange: CommonGCodeCommand | undefined = undefined;
		let zMoveAfterToolchange: CommonGCodeCommand | undefined = undefined;
		let zMoveCount1 = 0;
		let zMoveCount2 = 0;
		{
			let foundStop = false;
			let prevZMove: ProcessLineContext | undefined;
			for (let scan of c.scanForward(49)) {
				const cmd = parseCommonGCodeCommandLine(scan.line);
				if (cmd && cmd.letter === 'G' && cmd.value === '1') {
					if (cmd.x || cmd.y) {
						if (!xyMoveAfterToolchange) {
							xyMoveAfterToolchange = cmd;
						} else {
							// Stop on any XY move after the first one:
							foundStop = true;
							break;
						}
					}

					if (!s.hasPurgeTower) {
						if (cmd.e) {
							scan.prepend(REMOVED_BY_RATOS);
						} else if (cmd.z) {
							zMoveAfterToolchange = cmd;
							// Remove all but the last z move
							prevZMove?.prepend(REMOVED_BY_RATOS);
							prevZMove = scan;
							if (!xyMoveAfterToolchange) {
								++zMoveCount1;
							} else {
								++zMoveCount2;
							}
						}
					}
				}
			}

			if (!foundStop) {
				// Smells bad, we hit the end of the scan forwards without explicitly
				// detecting a stop condition.
				s.onWarning?.(
					WarningCodes.HEURISTIC_SMELL,
					`End of scan forward after toolchange at line ${s.currentLineNumber} reached without detecting end condition.`,
				);
			}

			if (zMoveCount1 > 2 || zMoveCount2 > 2) {
				// We've only seen examples with 0, 1 or 2 z moves. We need to take a look.
				s.onWarning?.(
					WarningCodes.HEURISTIC_SMELL,
					`Detected a group with more than two z moves after toolchange at line ${s.currentLineNumber}.`,
				);
			}
		}

		if (!xyMoveAfterToolchange) {
			throw newGCodeError('Failed to detect XY move after toolchange.', c, s);
		}

		c.line = `T${tool} X${xyMoveAfterToolchange.x} Y${xyMoveAfterToolchange.y}${zMoveAfterToolchange ? ' Z' + zMoveAfterToolchange.z : ''}`;

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

/**
 * @file GCodeInfo.ts
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

import { getConfiguratorVersion } from '@/server/gcode-processor/helpers';
import semver, { SemVer } from 'semver';
import { GCodeError } from '@/server/gcode-processor/errors';
import date2 from 'date-and-time';
const fsReader = require('fs-reader');
import util from 'node:util';

/** A known flavour of G-code. */
export enum GCodeFlavour {
	Unknown = 0,

	PrusaSlicer = 1 << 0,
	OrcaSlicer = 1 << 1,
	SuperSlicer = 1 << 2,

	/** Custom-generated G-code, may declare conformance with the RatOS dialect. This is yet to be defined. */
	RatOS = 1 << 3,

	Any = 0xffff,
}

const fsReaderGetLines = util.promisify(fsReader) as (path: string, lines: number) => Promise<string>;

/** Characteristics of a G-code file, typically determined from the header lines of the file. */
export class GCodeInfo {
	/** The placeholder version used to represent files transformed by the legacy ratos.py post processor. */
	static readonly LEGACY_RATOS_VERSION = new SemVer('1.0.0-legacy');
	/**
	 * Parses header information from the specified file. This method will also detect files already processed by the legacy Python-based post processor.
	 * */
	static async fromFile(path: string): Promise<GCodeInfo | null> {
		const tail = await fsReaderGetLines(path, -3);
		const isAlreadyLegacyProcessed = /^; processed by RatOS($|\s)/im.test(tail);

		const header = await fsReaderGetLines(path, 4);
		return GCodeInfo.#tryParseHeader(header, isAlreadyLegacyProcessed);
	}

	/**
	 * Parses header (top of file) comments. This method will not detect files already processed by the legacy Python-based post processor.
	 * @param header One or more newline-separated lines from the start of a gcode file. Normally, at least the first three lines should be provided.
	 */
	static tryParseHeader(header: string): GCodeInfo | null {
		return GCodeInfo.#tryParseHeader(header);
	}

	static #tryParseHeader(header: string, isAlreadyLegacyProcessed: boolean = false): GCodeInfo | null {
		let match =
			/^; generated (by|with) (?<GENERATOR>[^\s]+) (?<VERSION>[^\s]+) (in RatOS dialect (?<RATOS_DIALECT_VERSION>[^\s]+) )?on (?<DATE>[^\s]+) at (?<TIME>.*)$/im.exec(
				header,
			);

		if (match) {
			let flavour = GCodeFlavour.Unknown;
			let ratosDialectVersion: string | undefined = undefined;

			switch (match.groups?.GENERATOR?.toLowerCase()) {
				case 'prusaslicer':
					flavour = GCodeFlavour.PrusaSlicer;
					break;
				case 'orcaslicer':
					flavour = GCodeFlavour.OrcaSlicer;
					break;
				case 'superslicer':
					flavour = GCodeFlavour.SuperSlicer;
					break;
				default:
					if (match.groups?.RATOS_DIALECT_VERSION) {
						flavour = GCodeFlavour.RatOS;
						ratosDialectVersion = match.groups?.RATOS_DIALECT_VERSION;
					}
					break;
			}

			let processedByRatOSVersion: SemVer | undefined = undefined;
			let processedByRatOSTimestamp: Date | undefined = undefined;

			if (isAlreadyLegacyProcessed) {
				processedByRatOSVersion = GCodeInfo.LEGACY_RATOS_VERSION;
			} else {
				let processedByRatosMatch =
					/^; processed by RatOS (?<VERSION>[^\s]+) on (?<DATE>[^\s]+) at (?<TIME>.*)$/im.exec(header);

				if (processedByRatosMatch) {
					processedByRatOSVersion = GCodeInfo.#coerceSemVerOrThrow(
						processedByRatosMatch?.groups?.VERSION,
						'The processed by RatOS version is not a valid SemVer.',
					);
					processedByRatOSTimestamp = new Date(
						processedByRatosMatch.groups?.DATE + ' ' + processedByRatosMatch.groups?.TIME,
					);
				}
			}
			return new GCodeInfo(
				match.groups?.GENERATOR!,
				GCodeInfo.#coerceSemVerOrThrow(match.groups?.VERSION!, 'The generator version is not a valid SemVer.')!,
				flavour,
				new Date(match.groups?.DATE + ' ' + match.groups?.TIME),
				GCodeInfo.#coerceSemVerOrThrow(ratosDialectVersion, 'The RatOS dialect version is not a valid SemVer.'),
				processedByRatOSVersion,
				processedByRatOSTimestamp,
			);
		}

		return null;
	}

	static #coerceSemVerOrThrow(version: string | undefined, message: string): SemVer | undefined {
		if (version === undefined) {
			return undefined;
		}
		const sv = semver.coerce(version);
		if (sv === null) {
			throw new GCodeError(message);
		}
		return sv;
	}

	static async getProcessedByRatosHeader(): Promise<string> {
		const currentCodeVersion = await getConfiguratorVersion();
		const now = new Date();
		return `; processed by RatOS ${currentCodeVersion.toString()} on ${date2.format(now, 'YYYY-MM-DD [at] HH:mm:ss [UTC]', true)}`;
	}

	constructor(
		public readonly generator: string,
		public readonly generatorVersion: SemVer,
		public readonly flavour: GCodeFlavour,
		public readonly generatorTimestamp: Date,
		public readonly ratosDialectVersion?: SemVer,
		public readonly processedByRatOSVersion?: SemVer,
		public readonly processedByRatOSTimestamp?: Date,
	) {}
}

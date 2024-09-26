/**
 * @file helpers.ts
 * @description Common helper functions
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

import { SemVer } from 'semver';
import { promisify } from 'node:util';
import { exec } from 'child_process';
import { getLogger } from '@/server/helpers/logger';

let parsedVersion: null | SemVer = null;

/** Gets the RatOS-configurator git repo version. */
export async function getConfiguratorVersion(): Promise<SemVer> {
	let v = '__not_set__';
	try {
		v = (await promisify(exec)('git describe --tags --always', {
			cwd: process.env.RATOS_SCRIPT_DIR,
		}).then(({ stdout }) => stdout.trim())) as GitVersion;
		parsedVersion = new SemVer(v);
	} catch (e) {
		// TODO: Figure out why this doesn't work in CI and fix it
		getLogger().error('Failed to get RatOS-configurator version', { versionString: v, error: e });
		return new SemVer('2.0.2'); // Fallback to oldest version of the gcode processor.
	}
	return parsedVersion;
}

export function exactlyOneBitSet(integer: number) {
	// https://graphics.stanford.edu/~seander/bithacks.html#DetermineIfPowerOf2
	return integer != 0 && (integer & (integer - 1)) == 0;
}

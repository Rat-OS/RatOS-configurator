import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';
import { serverSchema } from '@/env/schema.mjs';
import { glob } from 'glob';
import JSZip from 'jszip';
import { readlink, stat } from 'fs/promises';
import { getLogger } from '@/server/helpers/logger';
import { createReadStream } from 'fs';

export const getDebugZipFiles = async () => {
	if (process.env.RATOS_CONFIGURATION_PATH == null) {
		throw new Error('RATOS_CONFIGURATION_PATH environment variable not set');
	}
	const environment = serverSchema.parse(process.env);

	let ratosFiles: string[] = await glob([`${environment.RATOS_DATA_DIR}/*.+(cfg|json)`]);
	ratosFiles = ratosFiles
		.filter((file, index) => ratosFiles.indexOf(file) === index)
		.filter((f) => {
			f.indexOf('printer_data/config/RatOS') === -1;
		});

	let logs = await glob([`${environment.KLIPPER_CONFIG_PATH}/../logs/*.log`, `${environment.LOG_FILE}`]);
	logs = logs.filter((file, index) => logs.indexOf(file) === index);

	let exlude = await glob([`${environment.KLIPPER_CONFIG_PATH}/+([a-z|A-Z]|-)+(+([0-9])*(_|-)*([0-9])).cfg`]);
	let configs = (await glob([`${environment.KLIPPER_CONFIG_PATH}/*.cfg`])).filter((file) => !exlude.includes(file));
	configs = configs.filter((file, index) => configs.indexOf(file) === index);

	let vars = await glob([`/var/log/ratos-configurator.log`]);

	const gatherInfo = async (f: string, source: string, dest: string) => {
		let s = await stat(f);
		let p = f;
		if (s.isSymbolicLink()) {
			p = path.resolve(path.dirname(f), await readlink(f));
			s = await stat(p);
		}
		return {
			path: p,
			orgPath: f,
			name: path.basename(f),
			size: s.size,
			isFile: s.isFile(),
			dest,
			source,
		};
	};

	const files = (
		await Promise.all(
			ratosFiles
				.map((f) => gatherInfo(f, 'RatOS', 'RatOS'))
				.concat(logs.map((f) => gatherInfo(f, 'logs', 'logs')))
				.concat(configs.map((f) => gatherInfo(f, 'configs', 'configs')))
				.concat(vars.map((f) => gatherInfo(f, 'var/log', 'var/log'))),
		)
	).filter((f) => f.isFile);
	return files;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		if (req.method === 'GET') {
			const files = await getDebugZipFiles();
			const zip = new JSZip();
			files.map((f, i) => {
				getLogger().info(f, `Adding file to zip... (${files.length - (i + 1)} remaining)`);
				zip.file(path.join(f.dest, f.name), createReadStream(f.path));
			});

			try {
				const buf = zip.generateNodeStream({ type: 'nodebuffer', streamFiles: true });
				res.setHeader('Content-Type', 'application/x-zip');
				res.setHeader('Content-Disposition', `attachment; filename=ratos-debug.zip`);
				return res.status(200).send(buf);
			} catch (e) {
				getLogger().error(e instanceof Error ? e.message : 'Unknown error while generating debug zip');
				return res.status(200).json({
					result: 'error',
					data: {
						message: `Something went wrong, the irony..`,
					},
				});
			}
		}
		res.status(405).json({
			result: 'error',
			data: {
				message: 'Method not allowed',
			},
		});
	} catch (e) {
		getLogger().error(e instanceof Error ? e.message : 'Unknown error while generating debug zip');
		return res.status(500).json({
			result: 'error',
			data: {
				message: `Something went wrong, the irony..`,
			},
		});
	}
}

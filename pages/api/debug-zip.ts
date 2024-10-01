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

	const extensions = `+(cfg|json|ndjson|conf|log)`;

	let ratosFiles: string[] = await glob([
		`${environment.RATOS_DATA_DIR}/*.+(cfg|json|conf|log)`,
		`${environment.RATOS_DATA_DIR}/**/*.+(cfg|json|conf|log)`,
	]);
	ratosFiles = ratosFiles.filter((file, index) => ratosFiles.indexOf(file) === index);

	let logs = await glob([
		`${environment.KLIPPER_CONFIG_PATH}/../logs/*.${extensions}`,
		`${environment.LOG_FILE}`,
		'/var/log/kern.+(log|log.1)',
	]);
	logs = logs.filter((file, index) => logs.indexOf(file) === index);

	let exclude = await glob([
		`${environment.KLIPPER_CONFIG_PATH}/+([a-z|A-Z]|-)+(+([0-9])*(_|-)*([0-9])).${extensions}`,
	]);
	let configs = (
		await glob([
			`${environment.KLIPPER_CONFIG_PATH}/*.${extensions}`,
			`${environment.KLIPPER_CONFIG_PATH}/**/*.${extensions}`,
		])
	).filter((file) => !exclude.includes(file) && file.indexOf('printer_data/config/RatOS/') === -1);

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

const getConsoleHistory = async () => {
	let consoleHistory = JSON.stringify({ result: 'error', msg: 'Failed to fetch console history' });
	try {
		consoleHistory = await (await fetch('http://localhost:7125/server/gcode_store?count=1000')).text();
	} catch (e) {
		getLogger().error(
			e,
			"Couldn't fetch console history: " +
				(e instanceof Error ? e.message : 'Unknown error while fetching console history'),
		);
		consoleHistory = JSON.stringify({
			result: 'error',
			msg: e instanceof Error ? e.message : 'Unknown error while fetching console history',
		});
	}
	return consoleHistory;
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
			zip.file('logs/console_history.json', await getConsoleHistory());

			try {
				res.setHeader('Content-Type', 'application/x-zip');
				res.setHeader('Content-Disposition', `attachment; filename=ratos-debug.zip`);
				getLogger().info(`Sending zip to client...`);
				zip
					.generateNodeStream({
						type: 'nodebuffer',
						streamFiles: true,
						compression: 'DEFLATE',
						compressionOptions: { level: 1 },
					})
					.pipe(res.status(200), { end: true })
					.on('finish', () => {
						res.end();
					});
				return;
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

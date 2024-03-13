import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';
import { serverSchema } from '../../env/schema.mjs';
import { glob } from 'glob';
import JSZip from 'jszip';
import { readFile } from 'fs/promises';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'GET') {
		if (process.env.RATOS_CONFIGURATION_PATH == null) {
			return res.status(500).json({
				result: 'error',
				data: {
					message: 'RATOS_CONFIGURATION_PATH environment variable not set',
				},
			});
		}
		const environment = serverSchema.parse(process.env);

		let ratosFiles: string[] = await glob([`${environment.RATOS_DATA_DIR}/*.+(cfg|json)`]);
		ratosFiles = ratosFiles.filter((file, index) => ratosFiles.indexOf(file) === index);

		let logs = await glob([`${environment.KLIPPER_CONFIG_PATH}/../logs/*.log`, `${environment.LOG_FILE}`]);
		logs = logs.filter((file, index) => logs.indexOf(file) === index);

		let exlude = await glob([`${environment.KLIPPER_CONFIG_PATH}/+([a-z|A-Z]|-)+(+([0-9])*(_|-)*([0-9])).cfg`]);
		let configs = (await glob([`${environment.KLIPPER_CONFIG_PATH}/*.cfg`])).filter((file) => !exlude.includes(file));
		configs = configs.filter((file, index) => configs.indexOf(file) === index);

		let vars = await glob([`/var/log/ratos-configurator.log`]);

		console.log(ratosFiles);

		const zip = new JSZip();
		ratosFiles.forEach((file) => {
			zip.file(path.join('RatOS', path.basename(file)), readFile(file));
		});
		logs.forEach((file) => {
			zip.file(path.join('logs', path.basename(file)), readFile(file));
		});
		configs.forEach((file) => {
			zip.file(path.join('configs', path.basename(file)), readFile(file));
		});
		vars.forEach((file) => {
			zip.file(path.join('var/log', path.basename(file)), readFile(file));
		});

		try {
			const buf = zip.generateNodeStream({ type: 'nodebuffer', streamFiles: true });
			res.setHeader('Content-Type', 'application/x-zip');
			res.setHeader('Content-Disposition', `attachment; filename=ratos-debug.zip`);
			return res.status(200).send(buf);
		} catch (e) {
			return res.status(200).json({
				result: 'error',
				data: {
					message: `Something went wrong, the irony..`,
				},
			});
		}
	}
}

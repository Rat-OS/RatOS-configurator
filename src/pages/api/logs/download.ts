import { NextApiRequest, NextApiResponse } from 'next';
import { readFile, stat } from 'fs/promises';
import { existsSync } from 'fs';
import { serverSchema } from '@/env/schema.mjs';
import { getLogger } from '@/server/helpers/logger';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== 'GET') {
		res.setHeader('Allow', 'GET');
		return res.status(405).json({
			error: 'Method not allowed',
		});
	}

	try {
		const environment = serverSchema.parse(process.env);
		const logPath = `${environment.RATOS_DATA_DIR}/logs/ratos-update.log`;

		if (!existsSync(logPath)) {
			return res.status(404).json({
				error: 'Update log file not found',
			});
		}

		const stats = await stat(logPath);
		const content = await readFile(logPath, 'utf-8');

		// Set headers for file download
		res.setHeader('Content-Type', 'text/plain');
		res.setHeader(
			'Content-Disposition',
			`attachment; filename="ratos-update-${new Date().toISOString().split('T')[0]}.log"`,
		);
		res.setHeader('Content-Length', stats.size);

		return res.status(200).send(content);
	} catch (error) {
		getLogger().error(`Failed to download update log: ${error instanceof Error ? error.message : 'Unknown error'}`);
		return res.status(500).json({
			error: 'Failed to download log file',
		});
	}
}

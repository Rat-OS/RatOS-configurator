// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { exec } from 'child_process';
import path from 'path';
import { GenericErrorResponse } from '../types';

export interface ChangeHostnameSuccessResponse {
	result: 'success';
}

export interface ChangeHostnameErrorResponse extends GenericErrorResponse {
	type: 'UnknownError';
}

export type ChangeHostnameResponse = ChangeHostnameSuccessResponse | ChangeHostnameErrorResponse;

export interface HostnameInput {
	hostname: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ChangeHostnameResponse>) {
	if (req.method !== 'POST') {
		console.log('wrong method', req.method);
		return res.status(405);
	}

	// This is ... not great.. come up with something better
	const scriptRoot = __dirname.split('configurator/')[0] + 'configurator/';
	const body = req.body as HostnameInput;
	return new Promise((resolve, reject) => {
		exec(`sudo ${path.join(scriptRoot, 'scripts/change-hostname.sh')} ${body.hostname}`, (err, stdout) => {
			if (err) {
				console.log(err);
				return reject(
					res.status(200).json({
						result: 'error',
						type: 'UnknownError',
						data: { message: 'An error occured while attempting to change the hostname' },
					}),
				);
			}
			resolve(res.status(200).json({ result: 'success' }));
		});
	});
}

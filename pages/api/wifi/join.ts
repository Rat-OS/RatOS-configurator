// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { exec } from 'child_process';
import path from 'path';
import { GenericErrorResponse } from '../types';

export interface JoinSuccessResponse {
	result: 'success';
}

export interface JoinErrorResponse extends GenericErrorResponse {
	type: 'PasswordError' | 'UnknownError';
}

export type JoinResponse = JoinSuccessResponse | JoinErrorResponse;

export interface WifiCredentials {
	ssid: string;
	passphrase: string;
	country?: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<JoinResponse>) {
	if (req.method !== 'POST') {
		console.log('wrong method', req.method);
		return res.status(405);
	}

	// This is ... not great.. come up with something better
	const scriptRoot = __dirname.split('configurator/')[0] + 'configurator/';
	const body = req.body as WifiCredentials;
	return new Promise((resolve, reject) => {
		exec(
			`sudo ${path.join(scriptRoot, 'scripts/add-wifi-network.sh')} ${body.ssid} ${body.passphrase} ${
				body.country ?? 'GB'
			}`,
			(err, stdout) => {
				if (err) {
					console.log(err);
					return reject(
						res.status(200).json({ result: 'error', type: 'UnknownError', data: { message: 'failed to add network' } }),
					);
				}
				resolve(res.status(200).json({ result: 'success' }));
			},
		);
	});
}

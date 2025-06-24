import type { NextApiRequest, NextApiResponse } from 'next';
import { execSync } from 'child_process';
import path from 'path';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	// Only allow POST requests
	if (req.method !== 'POST') {
		return res.status(405).json({ error: 'Method not allowed' });
	}

	// Only allow in development mode
	if (process.env.NODE_ENV !== 'development') {
		return res.status(403).json({ error: 'Test data generation only available in development mode' });
	}

	try {
		// Path to the mock logs generator script
		const scriptPath = path.join(process.cwd(), 'src', 'scripts', 'generate-mock-logs.js');

		// Execute the script to generate mock logs
		execSync(`node "${scriptPath}"`, {
			stdio: 'inherit',
			timeout: 30000, // 30 second timeout
		});

		res.status(200).json({
			success: true,
			message: 'Test data generated successfully',
		});
	} catch (error) {
		// Log error for debugging in development
		if (process.env.NODE_ENV === 'development') {
			// eslint-disable-next-line no-console
			console.error('Error generating test data:', error);
		}
		res.status(500).json({
			error: 'Failed to generate test data',
			details: error instanceof Error ? error.message : 'Unknown error',
		});
	}
}

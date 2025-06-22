#!/usr/bin/env tsx
/* eslint-disable no-console */

/**
 * Script to generate mock update log entries for testing the Update Logs Viewer component.
 * This creates realistic test data with various log levels, contexts, and scenarios.
 */

import { writeFile, appendFile, existsSync, mkdirSync } from 'fs';
import { writeFile as writeFileAsync, appendFile as appendFileAsync } from 'fs/promises';
import { dirname } from 'path';
import { serverSchema } from '@/env/schema.mjs';

// Log levels matching Pino
const LOG_LEVELS = {
	trace: 10,
	debug: 20,
	info: 30,
	warn: 40,
	error: 50,
	fatal: 60,
} as const;

interface LogEntry {
	level: number;
	time: number;
	msg: string;
	source: string;
	context?: string;
	errorCode?: string;
	pid: number;
	hostname: string;
}

// Mock contexts for different update operations
const CONTEXTS = [
	'update_symlinks',
	'install_dependencies',
	'update_klipper',
	'update_moonraker',
	'update_mainsail',
	'update_fluidd',
	'update_crowsnest',
	'backup_config',
	'restart_services',
	'validate_config',
	'cleanup_temp',
	'update_firmware',
];

// Mock error codes
const ERROR_CODES = [
	'SYMLINK_CREATE_FAILED',
	'DEPENDENCY_INSTALL_FAILED',
	'SERVICE_RESTART_FAILED',
	'CONFIG_VALIDATION_FAILED',
	'NETWORK_TIMEOUT',
	'PERMISSION_DENIED',
	'DISK_SPACE_LOW',
	'BACKUP_FAILED',
];

// Mock hostnames
const HOSTNAMES = ['ratos-pi', 'ratos-cb1', 'ratos-manta', 'ratos-octopus'];

// Generate a realistic log message based on level and context
function generateLogMessage(level: number, context?: string, errorCode?: string): string {
	const messages: Record<number, string[]> = {
		[LOG_LEVELS.trace]: [
			`Entering function ${context || 'main'}()`,
			`Processing item ${Math.floor(Math.random() * 100)}`,
			`Variable state: ${context || 'unknown'} = ${Math.random().toFixed(3)}`,
			`Debug checkpoint reached in ${context || 'process'}`,
		],
		[LOG_LEVELS.debug]: [
			`Checking ${context || 'system'} status...`,
			`Found ${Math.floor(Math.random() * 10)} items to process`,
			`Executing command: systemctl status ${context || 'service'}`,
			`Reading configuration from ${context || 'config'}.conf`,
		],
		[LOG_LEVELS.info]: [
			`Successfully updated ${context || 'component'}`,
			`Starting ${context || 'operation'} process`,
			`Completed ${context || 'task'} in ${(Math.random() * 5).toFixed(2)}s`,
			`${context || 'Service'} is running normally`,
			`Downloaded ${Math.floor(Math.random() * 1000)}KB of updates`,
		],
		[LOG_LEVELS.warn]: [
			`${context || 'Component'} version mismatch detected`,
			`Retrying ${context || 'operation'} (attempt ${Math.floor(Math.random() * 3) + 1}/3)`,
			`${context || 'Service'} taking longer than expected`,
			`Deprecated configuration option found in ${context || 'config'}`,
			`Low disk space warning: ${Math.floor(Math.random() * 20) + 5}% remaining`,
		],
		[LOG_LEVELS.error]: [
			`Failed to ${context || 'execute operation'}: ${errorCode || 'Unknown error'}`,
			`${context || 'Service'} failed to start: ${errorCode || 'STARTUP_FAILED'}`,
			`Network error during ${context || 'download'}: ${errorCode || 'NETWORK_ERROR'}`,
			`Permission denied accessing ${context || 'file'}: ${errorCode || 'PERMISSION_DENIED'}`,
			`Timeout occurred during ${context || 'operation'}: ${errorCode || 'TIMEOUT'}`,
		],
		[LOG_LEVELS.fatal]: [
			`Critical failure in ${context || 'system'}: ${errorCode || 'CRITICAL_ERROR'}`,
			`System corruption detected: ${errorCode || 'CORRUPTION_DETECTED'}`,
			`Unable to recover from ${context || 'error'}: ${errorCode || 'RECOVERY_FAILED'}`,
			`Fatal error during ${context || 'initialization'}: ${errorCode || 'INIT_FAILED'}`,
		],
	};

	const levelMessages = messages[level] || messages[LOG_LEVELS.info];
	return levelMessages[Math.floor(Math.random() * levelMessages.length)];
}

// Generate a single log entry
function generateLogEntry(
	baseTime: Date,
	offsetMs: number,
	level: number,
	context?: string,
	errorCode?: string,
): LogEntry {
	const time = new Date(baseTime.getTime() + offsetMs);
	const pid = Math.floor(Math.random() * 10000) + 1000;
	const hostname = HOSTNAMES[Math.floor(Math.random() * HOSTNAMES.length)];

	return {
		level,
		time: time.getTime(),
		msg: generateLogMessage(level, context, errorCode),
		source: 'ratos-update',
		context,
		errorCode,
		pid,
		hostname,
	};
}

// Generate a complete update scenario
function generateUpdateScenario(baseTime: Date, success: boolean = true): LogEntry[] {
	const entries: LogEntry[] = [];
	let timeOffset = 0;

	// Start of update
	entries.push(generateLogEntry(baseTime, timeOffset, LOG_LEVELS.info, undefined));
	timeOffset += 1000;

	// Pre-update checks
	entries.push(generateLogEntry(baseTime, timeOffset, LOG_LEVELS.debug, 'validate_config'));
	timeOffset += 500;
	entries.push(generateLogEntry(baseTime, timeOffset, LOG_LEVELS.info, 'backup_config'));
	timeOffset += 2000;

	// Update various components
	const updateContexts = ['update_klipper', 'update_moonraker', 'update_mainsail', 'install_dependencies'];

	for (const context of updateContexts) {
		// Start component update
		entries.push(generateLogEntry(baseTime, timeOffset, LOG_LEVELS.info, context));
		timeOffset += Math.random() * 3000 + 1000;

		// Add some debug/trace entries
		if (Math.random() > 0.5) {
			entries.push(generateLogEntry(baseTime, timeOffset, LOG_LEVELS.debug, context));
			timeOffset += 200;
		}
		if (Math.random() > 0.7) {
			entries.push(generateLogEntry(baseTime, timeOffset, LOG_LEVELS.trace, context));
			timeOffset += 100;
		}

		// Simulate potential issues
		if (!success && Math.random() > 0.6) {
			// Add warning or error
			if (Math.random() > 0.5) {
				entries.push(generateLogEntry(baseTime, timeOffset, LOG_LEVELS.warn, context));
				timeOffset += 500;
			} else {
				const errorCode = ERROR_CODES[Math.floor(Math.random() * ERROR_CODES.length)];
				entries.push(generateLogEntry(baseTime, timeOffset, LOG_LEVELS.error, context, errorCode));
				timeOffset += 1000;
			}
		}

		// Complete component update
		entries.push(generateLogEntry(baseTime, timeOffset, LOG_LEVELS.info, context));
		timeOffset += 500;
	}

	// Service restarts
	entries.push(generateLogEntry(baseTime, timeOffset, LOG_LEVELS.info, 'restart_services'));
	timeOffset += 3000;

	if (!success) {
		// Add fatal error for failed scenario
		const errorCode = ERROR_CODES[Math.floor(Math.random() * ERROR_CODES.length)];
		entries.push(generateLogEntry(baseTime, timeOffset, LOG_LEVELS.fatal, 'restart_services', errorCode));
		timeOffset += 1000;
	}

	// Final status
	const finalLevel = success ? LOG_LEVELS.info : LOG_LEVELS.error;
	entries.push(generateLogEntry(baseTime, timeOffset, finalLevel, undefined));

	return entries;
}

// Main function to generate all test data
async function generateMockLogs() {
	try {
		// Get log file path from environment
		const environment = serverSchema.parse(process.env);
		const logPath = environment.LOG_FILE;

		// Ensure log directory exists
		const logDir = dirname(logPath);
		if (!existsSync(logDir)) {
			mkdirSync(logDir, { recursive: true });
		}

		console.log(`Generating mock update logs to: ${logPath}`);

		// Clear existing log file
		await writeFileAsync(logPath, '');

		const entries: LogEntry[] = [];

		// Generate multiple update scenarios over the past week
		const now = new Date();
		const scenarios = [
			{ time: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000), success: true }, // 7 days ago - success
			{ time: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000), success: false }, // 5 days ago - failure
			{ time: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000), success: true }, // 3 days ago - success
			{ time: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000), success: true }, // 1 day ago - success
			{ time: new Date(now.getTime() - 2 * 60 * 60 * 1000), success: false }, // 2 hours ago - failure
		];

		for (const scenario of scenarios) {
			const scenarioEntries = generateUpdateScenario(scenario.time, scenario.success);
			entries.push(...scenarioEntries);
		}

		// Sort entries by time
		entries.sort((a, b) => a.time - b.time);

		// Write all entries to log file at once
		const logContent = entries.map((entry) => JSON.stringify(entry)).join('\n') + '\n';
		await writeFileAsync(logPath, logContent);

		console.log(`Generated ${entries.length} mock log entries`);
		console.log('Mock data includes:');
		console.log(`- ${entries.filter((e) => e.level === LOG_LEVELS.trace).length} TRACE entries`);
		console.log(`- ${entries.filter((e) => e.level === LOG_LEVELS.debug).length} DEBUG entries`);
		console.log(`- ${entries.filter((e) => e.level === LOG_LEVELS.info).length} INFO entries`);
		console.log(`- ${entries.filter((e) => e.level === LOG_LEVELS.warn).length} WARN entries`);
		console.log(`- ${entries.filter((e) => e.level === LOG_LEVELS.error).length} ERROR entries`);
		console.log(`- ${entries.filter((e) => e.level === LOG_LEVELS.fatal).length} FATAL entries`);
		console.log(`- ${new Set(entries.map((e) => e.context).filter(Boolean)).size} unique contexts`);
		console.log(`- ${new Set(entries.map((e) => e.errorCode).filter(Boolean)).size} unique error codes`);
	} catch (error) {
		console.error('Error generating mock logs:', error);
		process.exit(1);
	}
}

// Run the script
if (require.main === module) {
	generateMockLogs();
}

export { generateMockLogs };

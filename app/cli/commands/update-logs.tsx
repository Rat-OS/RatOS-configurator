import { Command } from 'commander';
import { readFile, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { render, Text, Box } from 'ink';
import React from 'react';
import { Container } from '@/cli/components/container';
import { getLogger } from '@/cli/logger';
import { loadEnvironment, renderError } from '@/cli/util';
import { z } from 'zod';

// Schema for parsing log entries (matching server schema)
const LogEntrySchema = z.object({
	level: z.number(),
	time: z.number().transform((val) => {
		// Convert Unix timestamp (milliseconds) to ISO string for consistent handling
		return new Date(val).toISOString();
	}),
	msg: z.string(),
	source: z.string().optional(),
	context: z.string().optional(),
	errorCode: z.string().optional(),
	pid: z.number().optional(),
	hostname: z.string().optional(),
});

type LogEntry = z.infer<typeof LogEntrySchema>;

// Log level mappings
const LOG_LEVELS: Record<number, { name: string; color: string }> = {
	10: { name: 'TRACE', color: 'gray' },
	20: { name: 'DEBUG', color: 'cyan' },
	30: { name: 'INFO', color: 'green' },
	40: { name: 'WARN', color: 'yellow' },
	50: { name: 'ERROR', color: 'red' },
	60: { name: 'FATAL', color: 'magenta' },
};

interface LogSummary {
	totalEntries: number;
	errorCount: number;
	warnCount: number;
	infoCount: number;
	debugCount: number;
	traceCount: number;
	fatalCount: number;
	lastUpdate: string | null;
	duration: string | null;
	success: boolean;
}

// Parse log file and extract entries, filtering for ratos-update source
async function parseLogFile(logPath: string): Promise<LogEntry[]> {
	try {
		const content = await readFile(logPath, 'utf-8');
		const lines = content
			.trim()
			.split('\n')
			.filter((line) => line.trim());

		const entries: LogEntry[] = [];

		for (const line of lines) {
			try {
				const parsed = JSON.parse(line);
				const entry = LogEntrySchema.parse(parsed);

				// Only include entries from ratos-update source
				if (entry.source === 'ratos-update') {
					entries.push(entry);
				}
			} catch (e) {
				// Skip invalid JSON lines
				getLogger().debug(`Skipping invalid log line: ${line}`);
			}
		}

		return entries.sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());
	} catch (error) {
		throw new Error(`Failed to read log file: ${error instanceof Error ? error.message : 'Unknown error'}`);
	}
}

// Generate summary from log entries
function generateSummary(entries: LogEntry[]): LogSummary {
	const summary: LogSummary = {
		totalEntries: entries.length,
		errorCount: 0,
		warnCount: 0,
		infoCount: 0,
		debugCount: 0,
		traceCount: 0,
		fatalCount: 0,
		lastUpdate: null,
		duration: null,
		success: true,
	};

	let startTime: Date | null = null;
	let endTime: Date | null = null;

	for (const entry of entries) {
		// Count by level
		switch (entry.level) {
			case 10:
				summary.traceCount++;
				break;
			case 20:
				summary.debugCount++;
				break;
			case 30:
				summary.infoCount++;
				break;
			case 40:
				summary.warnCount++;
				break;
			case 50:
				summary.errorCount++;
				summary.success = false;
				break;
			case 60:
				summary.fatalCount++;
				summary.success = false;
				break;
		}

		// Track timing
		const entryTime = new Date(entry.time);
		if (!startTime || entryTime < startTime) {
			startTime = entryTime;
		}
		if (!endTime || entryTime > endTime) {
			endTime = entryTime;
		}

		// Find last update time
		if (entry.errorCode === 'SCRIPT_SUCCESS' || entry.errorCode === 'SCRIPT_ERROR') {
			summary.lastUpdate = entry.time;
		}
	}

	if (startTime && endTime) {
		const durationMs = endTime.getTime() - startTime.getTime();
		const seconds = Math.floor(durationMs / 1000);
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;

		if (minutes > 0) {
			summary.duration = `${minutes}m ${remainingSeconds}s`;
		} else {
			summary.duration = `${remainingSeconds}s`;
		}
	}

	return summary;
}

// Filter entries by severity level (inclusive - shows entries at minLevel and above)
function filterBySeverity(entries: LogEntry[], minLevel: number): LogEntry[] {
	return entries.filter((entry) => entry.level >= minLevel);
}

// Filter entries by context
function filterByContext(entries: LogEntry[], context: string): LogEntry[] {
	return entries.filter((entry) => entry.context === context);
}

// Format log entry for display
function formatLogEntry(entry: LogEntry, showDetails: boolean = false): string {
	const level = LOG_LEVELS[entry.level] || { name: 'UNKNOWN', color: 'white' };
	const timestamp = new Date(entry.time).toLocaleString();

	let formatted = `[${timestamp}] ${level.name}: ${entry.msg}`;

	if (showDetails) {
		if (entry.context) {
			formatted += ` (context: ${entry.context})`;
		}
		if (entry.errorCode) {
			formatted += ` (code: ${entry.errorCode})`;
		}
		if (entry.pid) {
			formatted += ` (pid: ${entry.pid})`;
		}
	}

	return formatted;
}

// React component for displaying log summary
const LogSummaryComponent: React.FC<{ summary: LogSummary }> = ({ summary }) => (
	<Container>
		<Box flexDirection="column" paddingY={1}>
			<Text bold color="white">
				RatOS Update Log Summary
			</Text>
			<Text color="gray">─────────────────────────</Text>

			<Box flexDirection="row" justifyContent="space-between" marginY={1}>
				<Box flexDirection="column">
					<Text color="white">Status:</Text>
					<Text color="white">Total Entries:</Text>
					<Text color="white">Duration:</Text>
					<Text color="white">Last Update:</Text>
				</Box>
				<Box flexDirection="column">
					<Text color={summary.success ? 'green' : 'red'}>{summary.success ? '✓ SUCCESS' : '✗ FAILED'}</Text>
					<Text>{summary.totalEntries}</Text>
					<Text>{summary.duration || 'Unknown'}</Text>
					<Text>{summary.lastUpdate ? new Date(summary.lastUpdate).toLocaleString() : 'Unknown'}</Text>
				</Box>
			</Box>

			<Text color="gray">Log Level Breakdown:</Text>
			<Box flexDirection="row" justifyContent="space-between" marginLeft={2}>
				<Box flexDirection="column">
					<Text color="red">Errors:</Text>
					<Text color="magenta">Fatal:</Text>
					<Text color="yellow">Warnings:</Text>
					<Text color="green">Info:</Text>
					<Text color="cyan">Debug:</Text>
					<Text color="gray">Trace:</Text>
				</Box>
				<Box flexDirection="column">
					<Text color="red">{summary.errorCount}</Text>
					<Text color="magenta">{summary.fatalCount}</Text>
					<Text color="yellow">{summary.warnCount}</Text>
					<Text color="green">{summary.infoCount}</Text>
					<Text color="cyan">{summary.debugCount}</Text>
					<Text color="gray">{summary.traceCount}</Text>
				</Box>
			</Box>
		</Box>
	</Container>
);

// React component for displaying log entries
const LogEntriesComponent: React.FC<{ entries: LogEntry[]; showDetails: boolean }> = ({ entries, showDetails }) => (
	<Container>
		<Box flexDirection="column">
			{entries.map((entry, index) => {
				const level = LOG_LEVELS[entry.level] || { name: 'UNKNOWN', color: 'white' };
				return (
					<Text key={index} color={level.color as any}>
						{formatLogEntry(entry, showDetails)}
					</Text>
				);
			})}
		</Box>
	</Container>
);

export const updateLogs = (parentCommand: Command) => {
	const updateLogs = parentCommand
		.command('update-logs')
		.description('View and analyze RatOS update script logs from the main RatOS log');

	updateLogs
		.command('summary')
		.description('Show a summary of the most recent update attempt')
		.action(async () => {
			try {
				const env = loadEnvironment();
				const logPath = env.LOG_FILE;

				if (!existsSync(logPath)) {
					return renderError(`Log file not found: ${logPath}`, { exitCode: 1 });
				}

				const entries = await parseLogFile(logPath);
				if (entries.length === 0) {
					return renderError('No log entries found', { exitCode: 1 });
				}

				const summary = generateSummary(entries);
				render(<LogSummaryComponent summary={summary} />);
			} catch (error) {
				getLogger().error('Failed to read update logs', {
					error: error instanceof Error ? error.message : String(error),
				});
				return renderError(`Failed to read update logs: ${error instanceof Error ? error.message : 'Unknown error'}`, {
					exitCode: 1,
				});
			}
		});

	updateLogs
		.command('show')
		.description('Show detailed update logs')
		.option('-n, --lines <number>', 'Number of recent lines to show', '50')
		.option('-l, --level <level>', 'Minimum log level (trace, debug, info, warn, error, fatal)', 'info')
		.option('-c, --context <context>', 'Filter by context')
		.option('-d, --details', 'Show detailed information')
		.action(async (options) => {
			try {
				const env = loadEnvironment();
				const logPath = env.LOG_FILE;

				if (!existsSync(logPath)) {
					return renderError(`Log file not found: ${logPath}`, { exitCode: 1 });
				}

				let entries = await parseLogFile(logPath);
				if (entries.length === 0) {
					return renderError('No log entries found', { exitCode: 1 });
				}

				// Apply filters
				const levelMap: Record<string, number> = {
					trace: 10,
					debug: 20,
					info: 30,
					warn: 40,
					error: 50,
					fatal: 60,
				};

				const requestedLevel = options.level.toLowerCase();
				if (!(requestedLevel in levelMap)) {
					return renderError(
						`Invalid log level '${options.level}'. Valid levels: trace, debug, info, warn, error, fatal`,
						{ exitCode: 1 },
					);
				}

				const minLevel = levelMap[requestedLevel];
				entries = filterBySeverity(entries, minLevel);

				if (options.context) {
					entries = filterByContext(entries, options.context);
				}

				// Limit number of entries
				const maxLines = parseInt(options.lines, 10);
				if (isNaN(maxLines)) {
					return renderError(`Invalid number of lines '${options.lines}'. Must be a positive integer.`, {
						exitCode: 1,
					});
				}
				if (maxLines <= 0) {
					return renderError(`Invalid number of lines '${maxLines}'. Must be greater than 0.`, { exitCode: 1 });
				}

				if (entries.length > maxLines) {
					entries = entries.slice(-maxLines);
				}

				render(<LogEntriesComponent entries={entries} showDetails={options.details} />);
			} catch (error) {
				getLogger().error('Failed to read update logs', {
					error: error instanceof Error ? error.message : String(error),
				});
				return renderError(`Failed to read update logs: ${error instanceof Error ? error.message : 'Unknown error'}`, {
					exitCode: 1,
				});
			}
		});

	updateLogs
		.command('errors')
		.description('Show only errors and warnings from the most recent update')
		.option('-d, --details', 'Show detailed information')
		.action(async (options) => {
			try {
				const env = loadEnvironment();
				const logPath = env.LOG_FILE;

				if (!existsSync(logPath)) {
					return renderError(`Log file not found: ${logPath}`, { exitCode: 1 });
				}

				let entries = await parseLogFile(logPath);
				if (entries.length === 0) {
					return renderError('No log entries found', { exitCode: 1 });
				}

				// Filter to only errors and warnings
				entries = filterBySeverity(entries, 40); // warn level and above

				if (entries.length === 0) {
					render(
						<Container>
							<Text color="green">✓ No errors or warnings found in the update logs!</Text>
						</Container>,
					);
					return;
				}

				render(<LogEntriesComponent entries={entries} showDetails={options.details} />);
			} catch (error) {
				return renderError(`Failed to read update logs: ${error instanceof Error ? error.message : 'Unknown error'}`, {
					exitCode: 1,
				});
			}
		});
};

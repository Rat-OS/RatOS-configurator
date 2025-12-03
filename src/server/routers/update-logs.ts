import { z } from 'zod';
import { readFile, stat } from 'fs/promises';
import { existsSync } from 'fs';
import { publicProcedure, router } from '@/server/trpc';
import { getLogger } from '@/server/helpers/logger';
import { serverSchema } from '@/env/schema.mjs';
import { readObjects } from '@/server/helpers/ndjson';

// Base Pino log entry schema (standard fields)
const BasePinoLogSchema = z.object({
	level: z.number(),
	time: z.number().transform((val) => {
		// Convert Unix timestamp (milliseconds) to ISO string for consistent handling
		return new Date(val).toISOString();
	}),
	msg: z.string(),
	pid: z.number().optional(),
	hostname: z.string().optional(),
});

// Extended schema for RatOS update logs with additional fields
const LogEntrySchema = BasePinoLogSchema.extend({
	source: z.string().optional(),
	context: z.string().optional(),
	errorCode: z.string().optional(),
});

const LogSummarySchema = z.object({
	totalEntries: z.number(),
	errorCount: z.number(),
	warnCount: z.number(),
	infoCount: z.number(),
	debugCount: z.number(),
	traceCount: z.number(),
	fatalCount: z.number(),
	lastUpdate: z.string().nullable(),
	duration: z.string().nullable(),
	success: z.boolean(),
	logFileSize: z.number(),
	logFileExists: z.boolean(),
});

const LogQuerySchema = z.object({
	lines: z.number().min(1).max(1000).default(50),
	level: z.enum(['trace', 'debug', 'info', 'warn', 'error', 'fatal']).default('info'),
	context: z.string().optional(),
	showDetails: z.boolean().default(false),
});

const PaginatedLogQuerySchema = z.object({
	cursor: z.number().default(0),
	limit: z.number().min(1).max(100).default(50),
	level: z.enum(['trace', 'debug', 'info', 'warn', 'error', 'fatal']).default('info'),
	context: z.string().optional(),
	showDetails: z.boolean().default(false),
	sortBy: z.enum(['time']).default('time'),
	sortDirection: z.enum(['asc', 'desc']).default('desc'),
});

export type LogEntry = z.infer<typeof LogEntrySchema>;
type LogSummary = z.infer<typeof LogSummarySchema>;

// Log level mappings
const LOG_LEVEL_MAP: Record<string, number> = {
	trace: 10,
	debug: 20,
	info: 30,
	warn: 40,
	error: 50,
	fatal: 60,
};

// Parse log file and extract entries, filtering for ratos-update source
export async function parseLogFile(logPath: string): Promise<LogEntry[]> {
	try {
		const result = await readObjects(logPath, LogEntrySchema);

		// Filter entries to only include those from ratos-update source
		const updateEntries = result.result.filter((entry) => entry.source === 'ratos-update');

		return updateEntries.sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());
	} catch (error) {
		if (error instanceof Error) {
			error.message = `Failed to read log file: ${error.message}`;
			throw error;
		}
		throw new Error(`Failed to read log file: ${error != null ? String(error) : 'Unknown error'}`);
	}
}

// Generate summary from log entries
export function generateSummary(entries: LogEntry[], logFileSize: number, logFileExists: boolean): LogSummary {
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
		logFileSize,
		logFileExists,
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

// Filter entries by severity level
export function filterBySeverity(entries: LogEntry[], minLevel: number): LogEntry[] {
	return entries.filter((entry) => entry.level >= minLevel);
}

// Filter entries by context
export function filterByContext(entries: LogEntry[], context: string): LogEntry[] {
	return entries.filter((entry) => entry.context === context);
}

// Get log file path - now uses the main RatOS log file
function getLogFilePath(): string {
	const environment = serverSchema.parse(process.env);
	return environment.LOG_FILE;
}

export const updateLogsRouter = router({
	summary: publicProcedure.query(async () => {
		const logPath = getLogFilePath();

		let logFileSize = 0;
		let logFileExists = false;
		let entries: LogEntry[] = [];

		try {
			if (existsSync(logPath)) {
				logFileExists = true;
				const stats = await stat(logPath);
				logFileSize = stats.size;
				entries = await parseLogFile(logPath);
			}
		} catch (error) {
			getLogger().error(`Failed to read update log file: ${error instanceof Error ? error.message : 'Unknown error'}`);
		}

		return generateSummary(entries, logFileSize, logFileExists);
	}),

	entries: publicProcedure.input(LogQuerySchema).query(async ({ input }) => {
		const logPath = getLogFilePath();

		if (!existsSync(logPath)) {
			throw new Error(`Log file not found: ${logPath}`);
		}

		let entries = await parseLogFile(logPath);

		// Apply filters
		const minLevel = LOG_LEVEL_MAP[input.level];
		entries = filterBySeverity(entries, minLevel);

		if (input.context) {
			entries = filterByContext(entries, input.context);
		}

		// Limit number of entries (get most recent)
		if (entries.length > input.lines) {
			entries = entries.slice(-input.lines);
		}

		return {
			entries,
			totalCount: entries.length,
			filtered: true,
		};
	}),

	errors: publicProcedure.input(z.object({ showDetails: z.boolean().default(false) })).query(async () => {
		const logPath = getLogFilePath();

		if (!existsSync(logPath)) {
			throw new Error(`Log file not found: ${logPath}`);
		}

		let entries = await parseLogFile(logPath);

		// Filter to only errors and warnings (level 40 and above)
		entries = filterBySeverity(entries, 40);

		return {
			entries,
			totalCount: entries.length,
			hasErrors: entries.length > 0,
		};
	}),

	contexts: publicProcedure.query(async () => {
		const logPath = getLogFilePath();

		if (!existsSync(logPath)) {
			return [];
		}

		const entries = await parseLogFile(logPath);
		const contexts = new Set<string>();

		entries.forEach((entry) => {
			if (entry.context) {
				contexts.add(entry.context);
			}
		});

		return Array.from(contexts).sort();
	}),

	// Paginated procedures for infinite scrolling
	entriesPaginated: publicProcedure.input(PaginatedLogQuerySchema).query(async ({ input }) => {
		// Todo: fix proper reverse pagination.

		const logPath = getLogFilePath();

		if (!existsSync(logPath)) {
			return {
				entries: [],
				hasNextPage: false,
				nextCursor: 0,
				totalCount: 0,
			};
		}

		// Read all entries to enable proper server-side sorting
		const result = await readObjects(logPath, LogEntrySchema, undefined, 0, Infinity);

		// Filter entries to only include those from ratos-update source
		let entries = result.result.filter((entry) => entry.source === 'ratos-update');

		// Apply filters
		const minLevel = LOG_LEVEL_MAP[input.level];
		entries = filterBySeverity(entries, minLevel);

		if (input.context) {
			entries = filterByContext(entries, input.context);
		}

		// Apply server-side sorting
		entries = entries.sort((a, b) => {
			const timeA = new Date(a.time).getTime();
			const timeB = new Date(b.time).getTime();

			if (input.sortDirection === 'desc') {
				return timeB - timeA; // newest first
			} else {
				return timeA - timeB; // oldest first
			}
		});

		// Apply manual pagination to the sorted results
		const totalCount = entries.length;
		const startIndex = input.cursor;
		const endIndex = Math.min(startIndex + input.limit, totalCount);
		const paginatedEntries = entries.slice(startIndex, endIndex);
		const hasNextPage = endIndex < totalCount;
		const nextCursor = hasNextPage ? endIndex : startIndex;

		return {
			entries: paginatedEntries,
			hasNextPage,
			nextCursor,
			totalCount,
		};
	}),

	errorsPaginated: publicProcedure
		.input(
			z.object({
				cursor: z.number().default(0),
				limit: z.number().min(1).max(100).default(50),
				showDetails: z.boolean().default(false),
				sortBy: z.enum(['time']).default('time'),
				sortDirection: z.enum(['asc', 'desc']).default('desc'),
			}),
		)
		.query(async ({ input }) => {
			const logPath = getLogFilePath();

			if (!existsSync(logPath)) {
				return {
					entries: [],
					hasNextPage: false,
					nextCursor: 0,
					totalCount: 0,
					hasErrors: false,
				};
			}

			// Read all entries to enable proper server-side sorting
			const result = await readObjects(logPath, LogEntrySchema, undefined, 0, Infinity);

			// Filter entries to only include those from ratos-update source
			let entries = result.result.filter((entry) => entry.source === 'ratos-update');

			// Filter to only errors and warnings (level 40 and above)
			entries = filterBySeverity(entries, 40);

			// Apply server-side sorting
			entries = entries.sort((a, b) => {
				const timeA = new Date(a.time).getTime();
				const timeB = new Date(b.time).getTime();

				if (input.sortDirection === 'desc') {
					return timeB - timeA; // newest first
				} else {
					return timeA - timeB; // oldest first
				}
			});

			// Apply manual pagination to the sorted results
			const totalCount = entries.length;
			const startIndex = input.cursor;
			const endIndex = Math.min(startIndex + input.limit, totalCount);
			const paginatedEntries = entries.slice(startIndex, endIndex);
			const hasNextPage = endIndex < totalCount;
			const nextCursor = hasNextPage ? endIndex : startIndex;

			return {
				entries: paginatedEntries,
				hasNextPage,
				nextCursor,
				totalCount,
				hasErrors: entries.length > 0,
			};
		}),

	clear: publicProcedure.mutation(async () => {
		// Note: This now operates on the main log file, so we cannot clear it entirely.
		// Instead, we would need to implement a more sophisticated approach to remove
		// only ratos-update entries, but this is complex and potentially dangerous.
		// For now, we'll disable this functionality when using the unified log.
		throw new Error('Clear operation is not supported when using the unified log file. Use log rotation instead.');
	}),

	download: publicProcedure.query(async () => {
		const logPath = getLogFilePath();

		if (!existsSync(logPath)) {
			throw new Error(`Log file not found: ${logPath}`);
		}

		try {
			const content = await readFile(logPath, 'utf-8');
			const stats = await stat(logPath);

			return {
				content,
				size: stats.size,
				lastModified: stats.mtime.toISOString(),
			};
		} catch (error) {
			throw new Error(`Failed to read log file: ${error instanceof Error ? error.message : 'Unknown error'}`);
		}
	}),

	generateMockData: publicProcedure.mutation(async () => {
		const logPath = getLogFilePath();

		try {
			// Import the mock data generator
			const { generateMockLogs } = await import('@/scripts/generate-mock-update-logs');
			await generateMockLogs();

			return {
				success: true,
				message: 'Mock update logs generated successfully',
				logPath,
			};
		} catch (error) {
			getLogger().error(`Failed to generate mock logs: ${error instanceof Error ? error.message : 'Unknown error'}`);
			throw new Error(`Failed to generate mock logs: ${error instanceof Error ? error.message : 'Unknown error'}`);
		}
	}),
});

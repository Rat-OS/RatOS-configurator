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

// Unified query schema that combines all the individual query needs
const UnifiedLogQuerySchema = z.object({
	// Single cursor for infinite scrolling (will be used for either entries or errors)
	cursor: z.number().default(0),
	// Limits - allow 0 to skip fetching that data type
	entriesLimit: z.number().min(0).max(100).default(50),
	errorsLimit: z.number().min(0).max(100).default(50),
	// Filtering options
	level: z.enum(['trace', 'debug', 'info', 'warn', 'error', 'fatal']).default('info'),
	context: z.union([z.string(), z.array(z.string())]).optional(),
	source: z.union([z.string(), z.array(z.string())]).optional(),
	showDetails: z.boolean().default(false),
	sortBy: z.enum(['time']).default('time'),
	sortDirection: z.enum(['asc', 'desc']).default('desc'),
	// Control what data to include in response
	includeSummary: z.boolean().default(true),
	includeContexts: z.boolean().default(true),
	includeSources: z.boolean().default(true),
	includeEntries: z.boolean().default(true),
	includeErrors: z.boolean().default(true),
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

/**
 * Reads and parses a log file, returning all log entries with a default source of "server" assigned to entries missing a source.
 *
 * @param logPath - Path to the log file to parse
 * @returns An array of log entries sorted by ascending timestamp
 * @throws If the log file cannot be read or parsed
 */
export async function parseLogFile(logPath: string): Promise<LogEntry[]> {
	try {
		const result = await readObjects(logPath, LogEntrySchema);

		// Add default source for entries that don't have one (typically server logs)
		const allEntries = result.result.map((entry) => ({
			...entry,
			source: entry.source || 'server',
		}));

		return allEntries.sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());
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

/**
 * Returns log entries with a severity level greater than or equal to the specified minimum.
 *
 * @param entries - The array of log entries to filter
 * @param minLevel - The minimum severity level to include
 * @returns An array of log entries meeting the minimum severity requirement
 */
export function filterBySeverity(entries: LogEntry[], minLevel: number): LogEntry[] {
	return entries.filter((entry) => entry.level >= minLevel);
}

/**
 * Filters log entries by context, supporting a single context value or an array of contexts.
 *
 * @param entries - The array of log entries to filter
 * @param context - A context string or array of context strings to match
 * @returns An array of log entries whose context matches the specified value(s)
 */
export function filterByContext(entries: LogEntry[], context: string | string[]): LogEntry[] {
	if (Array.isArray(context)) {
		return entries.filter((entry) => entry.context && context.includes(entry.context));
	}
	return entries.filter((entry) => entry.context === context);
}

/**
 * Filters log entries by their source field.
 *
 * @param entries - The array of log entries to filter
 * @param source - A source string or array of source strings to match
 * @returns An array of log entries whose source matches the specified value(s)
 */
export function filterBySource(entries: LogEntry[], source: string | string[]): LogEntry[] {
	if (Array.isArray(source)) {
		return entries.filter((entry) => entry.source && source.includes(entry.source));
	}
	return entries.filter((entry) => entry.source === source);
}

/**
 * Retrieves the main RatOS log file path from environment variables.
 *
 * @returns The absolute path to the log file as specified in the environment.
 */
function getLogFilePath(): string {
	const environment = serverSchema.parse(process.env);
	return environment.LOG_FILE;
}

export const logsRouter = router({
	summary: publicProcedure
		.input(
			z.object({
				source: z.union([z.string(), z.array(z.string())]).optional(),
			}),
		)
		.query(async ({ input }) => {
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

					// Filter by source if specified
					if (input.source) {
						entries = filterBySource(entries, input.source);
					}
				}
			} catch (error) {
				getLogger().error(`Failed to read log file: ${error instanceof Error ? error.message : 'Unknown error'}`);
			}

			return generateSummary(entries, logFileSize, logFileExists);
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

	// Unified endpoint that parses the log file once and returns all needed data
	unified: publicProcedure.input(UnifiedLogQuerySchema).query(async ({ input }) => {
		const logPath = getLogFilePath();

		// Initialize response structure
		const response: {
			summary?: LogSummary;
			sources?: string[];
			contexts?: string[];
			entries?: {
				data: LogEntry[];
				hasNextPage: boolean;
				nextCursor: number;
				totalCount: number;
			};
			errors?: {
				data: LogEntry[];
				hasNextPage: boolean;
				nextCursor: number;
				totalCount: number;
			};
		} = {};

		let logFileSize = 0;
		let logFileExists = false;
		let allEntries: LogEntry[] = [];

		try {
			if (existsSync(logPath)) {
				logFileExists = true;
				const stats = await stat(logPath);
				logFileSize = stats.size;

				// Parse the log file ONCE
				allEntries = await parseLogFile(logPath);
			}
		} catch (error) {
			getLogger().error(`Failed to read log file: ${error instanceof Error ? error.message : 'Unknown error'}`);
		}

		// Generate summary if requested
		if (input.includeSummary) {
			let summaryEntries = allEntries;
			if (input.source) {
				summaryEntries = filterBySource(summaryEntries, input.source);
			}
			response.summary = generateSummary(summaryEntries, logFileSize, logFileExists);
		}

		// Extract sources if requested
		if (input.includeSources) {
			const sources = new Set<string>();
			allEntries.forEach((entry) => {
				if (entry.source) {
					sources.add(entry.source);
				}
			});
			response.sources = Array.from(sources).sort();
		}

		// Extract contexts if requested
		if (input.includeContexts) {
			let contextEntries = allEntries;
			if (input.source) {
				contextEntries = filterBySource(contextEntries, input.source);
			}

			const contexts = new Set<string>();
			contextEntries.forEach((entry) => {
				if (entry.context) {
					contexts.add(entry.context);
				}
			});
			response.contexts = Array.from(contexts).sort();
		}

		// Process entries if requested and limit > 0
		if (input.includeEntries && input.entriesLimit > 0 && logFileExists) {
			let filteredEntries = allEntries;

			// Apply filters
			const minLevel = LOG_LEVEL_MAP[input.level];
			filteredEntries = filterBySeverity(filteredEntries, minLevel);

			if (input.context) {
				filteredEntries = filterByContext(filteredEntries, input.context);
			}

			if (input.source) {
				filteredEntries = filterBySource(filteredEntries, input.source);
			}

			// Apply server-side sorting
			filteredEntries = filteredEntries.sort((a, b) => {
				const timeA = new Date(a.time).getTime();
				const timeB = new Date(b.time).getTime();

				if (input.sortDirection === 'desc') {
					return timeB - timeA; // newest first
				} else {
					return timeA - timeB; // oldest first
				}
			});

			// Apply pagination
			const totalCount = filteredEntries.length;
			const startIndex = input.cursor;
			const endIndex = Math.min(startIndex + input.entriesLimit, totalCount);
			const paginatedEntries = filteredEntries.slice(startIndex, endIndex);
			const hasNextPage = endIndex < totalCount;
			const nextCursor = hasNextPage ? endIndex : startIndex;

			response.entries = {
				data: paginatedEntries,
				hasNextPage,
				nextCursor,
				totalCount,
			};
		}

		// Process errors if requested and limit > 0
		if (input.includeErrors && input.errorsLimit > 0 && logFileExists) {
			let errorEntries = allEntries;

			// Filter to only errors and warnings (level 40 and above)
			errorEntries = filterBySeverity(errorEntries, 40);

			if (input.source) {
				errorEntries = filterBySource(errorEntries, input.source);
			}

			// Apply server-side sorting
			errorEntries = errorEntries.sort((a, b) => {
				const timeA = new Date(a.time).getTime();
				const timeB = new Date(b.time).getTime();

				if (input.sortDirection === 'desc') {
					return timeB - timeA; // newest first
				} else {
					return timeA - timeB; // oldest first
				}
			});

			// Apply pagination
			const totalCount = errorEntries.length;
			const startIndex = input.cursor;
			const endIndex = Math.min(startIndex + input.errorsLimit, totalCount);
			const paginatedErrors = errorEntries.slice(startIndex, endIndex);
			const hasNextPage = endIndex < totalCount;
			const nextCursor = hasNextPage ? endIndex : startIndex;

			response.errors = {
				data: paginatedErrors,
				hasNextPage,
				nextCursor,
				totalCount,
			};
		}

		return response;
	}),
});

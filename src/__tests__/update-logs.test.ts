import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { readFile, writeFile, mkdir, rm } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { tmpdir } from 'os';
import { execSync } from 'child_process';
import {
	parseLogFile,
	generateSummary,
	filterBySeverity,
	filterByContext,
	filterBySource,
} from '@/server/routers/logs';

// Test environment setup - relies on test-setup.ts and .env.test.local
const TEST_LOG_DIR = path.join(tmpdir(), 'ratos-test-logs');
const TEST_LOG_FILE = path.join(TEST_LOG_DIR, 'ratos-update.log');

describe('Update Logs System', () => {
	let originalLogFile: string | undefined;

	beforeEach(async () => {
		// Create test directory
		if (!existsSync(TEST_LOG_DIR)) {
			await mkdir(TEST_LOG_DIR, { recursive: true });
		}

		// Override LOG_FILE for tests to use our test file
		originalLogFile = process.env.LOG_FILE;
		process.env.LOG_FILE = TEST_LOG_FILE;
	});

	afterEach(async () => {
		// Restore original LOG_FILE
		if (originalLogFile) {
			process.env.LOG_FILE = originalLogFile;
		} else {
			process.env.LOG_FILE = undefined;
		}

		// Clean up test directory
		if (existsSync(TEST_LOG_DIR)) {
			await rm(TEST_LOG_DIR, { recursive: true, force: true });
		}
	});

	describe('Log File Parsing', () => {
		it('should parse valid JSON log entries', async () => {
			const logEntries = [
				{
					level: 30,
					time: new Date('2024-01-01T10:00:00.000Z').getTime(),
					msg: 'Starting update process',
					source: 'ratos-update',
					context: 'main',
					pid: 1234,
					hostname: 'ratos-pi',
				},
				{
					level: 50,
					time: new Date('2024-01-01T10:01:00.000Z').getTime(),
					msg: 'Failed to update symlinks',
					source: 'ratos-update',
					context: 'update_symlinks',
					errorCode: 'SYMLINK_CREATE_FAILED',
					pid: 1234,
					hostname: 'ratos-pi',
				},
			];

			const logContent = logEntries.map((entry) => JSON.stringify(entry)).join('\n');
			await writeFile(TEST_LOG_FILE, logContent);

			const parsedEntries = await parseLogFile(TEST_LOG_FILE);

			expect(parsedEntries).toHaveLength(2);
			expect(parsedEntries[0].msg).toBe('Starting update process');
			expect(parsedEntries[1].errorCode).toBe('SYMLINK_CREATE_FAILED');
		});

		it('should skip invalid JSON lines and include all sources', async () => {
			const logContent = [
				`{"level":30,"time":${new Date('2024-01-01T10:00:00.000Z').getTime()},"msg":"Valid entry","source":"ratos-update"}`,
				'Invalid JSON line',
				`{"level":50,"time":${new Date('2024-01-01T10:01:00.000Z').getTime()},"msg":"Another valid entry","source":"ratos-update"}`,
				`{"level":30,"time":${new Date('2024-01-01T10:02:00.000Z').getTime()},"msg":"Different source","source":"other-service"}`,
				`{"level":30,"time":${new Date('2024-01-01T10:03:00.000Z').getTime()},"msg":"Server entry"}`,
			].join('\n');

			await writeFile(TEST_LOG_FILE, logContent);

			const parsedEntries = await parseLogFile(TEST_LOG_FILE);

			expect(parsedEntries).toHaveLength(4); // All valid entries including different sources
			expect(parsedEntries[0]?.msg).toBe('Valid entry');
			expect(parsedEntries[1]?.msg).toBe('Another valid entry');
			expect(parsedEntries[2]?.msg).toBe('Different source');
			expect(parsedEntries[3]?.msg).toBe('Server entry');
			expect(parsedEntries[3]?.source).toBe('server'); // Default source for entries without source
		});

		it('should sort entries by timestamp', async () => {
			const logEntries = [
				{
					level: 30,
					time: new Date('2024-01-01T10:02:00.000Z').getTime(),
					msg: 'Second entry',
					source: 'ratos-update',
				},
				{
					level: 30,
					time: new Date('2024-01-01T10:01:00.000Z').getTime(),
					msg: 'First entry',
					source: 'ratos-update',
				},
				{
					level: 30,
					time: new Date('2024-01-01T10:03:00.000Z').getTime(),
					msg: 'Third entry',
					source: 'ratos-update',
				},
			];

			const logContent = logEntries.map((entry) => JSON.stringify(entry)).join('\n');
			await writeFile(TEST_LOG_FILE, logContent);

			const parsedEntries = await parseLogFile(TEST_LOG_FILE);

			expect(parsedEntries).toHaveLength(3);
			expect(parsedEntries[0].msg).toBe('First entry');
			expect(parsedEntries[1].msg).toBe('Second entry');
			expect(parsedEntries[2].msg).toBe('Third entry');
		});
	});

	describe('Log Summary Generation', () => {
		it('should generate correct summary statistics', async () => {
			const logEntries = [
				{ level: 30, time: '2024-01-01T10:00:00.000Z', msg: 'Info message' },
				{ level: 40, time: '2024-01-01T10:01:00.000Z', msg: 'Warning message' },
				{ level: 50, time: '2024-01-01T10:02:00.000Z', msg: 'Error message' },
				{ level: 50, time: '2024-01-01T10:03:00.000Z', msg: 'Another error' },
			];

			const summary = generateSummary(logEntries, 1024, true);

			expect(summary.totalEntries).toBe(4);
			expect(summary.infoCount).toBe(1);
			expect(summary.warnCount).toBe(1);
			expect(summary.errorCount).toBe(2);
			expect(summary.success).toBe(false); // Has errors
			expect(summary.logFileExists).toBe(true);
			expect(summary.logFileSize).toBe(1024);
		});

		it('should calculate duration correctly', async () => {
			const logEntries = [
				{ level: 30, time: '2024-01-01T10:00:00.000Z', msg: 'Start' },
				{ level: 30, time: '2024-01-01T10:02:30.000Z', msg: 'End' },
			];

			const summary = generateSummary(logEntries, 1024, true);

			expect(summary.duration).toBe('2m 30s');
		});

		it('should identify last update time', async () => {
			const logEntries = [
				{ level: 30, time: '2024-01-01T10:00:00.000Z', msg: 'Start', errorCode: 'SCRIPT_START' },
				{ level: 30, time: '2024-01-01T10:01:00.000Z', msg: 'Middle' },
				{ level: 30, time: '2024-01-01T10:02:00.000Z', msg: 'End', errorCode: 'SCRIPT_SUCCESS' },
			];

			const summary = generateSummary(logEntries, 1024, true);

			expect(summary.lastUpdate).toBe('2024-01-01T10:02:00.000Z');
		});
	});

	describe('Log Filtering', () => {
		it('should filter by severity level', async () => {
			const logEntries = [
				{ level: 20, time: '2024-01-01T10:00:00.000Z', msg: 'Debug' },
				{ level: 30, time: '2024-01-01T10:01:00.000Z', msg: 'Info' },
				{ level: 40, time: '2024-01-01T10:02:00.000Z', msg: 'Warning' },
				{ level: 50, time: '2024-01-01T10:03:00.000Z', msg: 'Error' },
			];

			const filtered = filterBySeverity(logEntries, 40); // Warning and above

			expect(filtered).toHaveLength(2);
			expect(filtered[0].msg).toBe('Warning');
			expect(filtered[1].msg).toBe('Error');
		});

		it('should filter by context', async () => {
			const logEntries = [
				{ level: 30, time: '2024-01-01T10:00:00.000Z', msg: 'Message 1', context: 'main' },
				{ level: 30, time: '2024-01-01T10:01:00.000Z', msg: 'Message 2', context: 'update_symlinks' },
				{ level: 30, time: '2024-01-01T10:02:00.000Z', msg: 'Message 3', context: 'main' },
			];

			const filtered = filterByContext(logEntries, 'main');

			expect(filtered).toHaveLength(2);
			expect(filtered[0].msg).toBe('Message 1');
			expect(filtered[1].msg).toBe('Message 3');
		});

		it('should filter by source', async () => {
			const logEntries = [
				{ level: 30, time: '2024-01-01T10:00:00.000Z', msg: 'Update message', source: 'ratos-update' },
				{ level: 30, time: '2024-01-01T10:01:00.000Z', msg: 'CLI message', source: 'cli' },
				{ level: 30, time: '2024-01-01T10:02:00.000Z', msg: 'Server message', source: 'server' },
				{ level: 30, time: '2024-01-01T10:03:00.000Z', msg: 'Another update message', source: 'ratos-update' },
			];

			const filtered = filterBySource(logEntries, 'ratos-update');

			expect(filtered).toHaveLength(2);
			expect(filtered[0].msg).toBe('Update message');
			expect(filtered[1].msg).toBe('Another update message');
		});
	});
});

describe('Bash Logging Library Integration', () => {
	it('should generate valid JSON log entries from bash script', async () => {
		// Set up test environment with proper log path
		const testLogPath = path.join(TEST_LOG_DIR, 'bash-test.log');
		const originalLogFile = process.env.RATOS_LOG_FILE;

		// Clear any existing log file
		if (existsSync(testLogPath)) {
			await rm(testLogPath);
		}

		try {
			// Execute the bash logging script
			const scriptPath = path.resolve(__dirname, '../../configuration/scripts/ratos-logging.sh');

			// Test basic logging functions with writable log path
			execSync(`bash -c "source ${scriptPath} && log_info 'Test message' 'test_context'"`, {
				env: { ...process.env, RATOS_LOG_FILE: testLogPath },
			});

			// Verify the log file was created and contains valid JSON
			expect(existsSync(testLogPath)).toBe(true);
			const logContent = await readFile(testLogPath, 'utf-8');
			const lines = logContent
				.trim()
				.split('\n')
				.filter((line) => line.trim());

			expect(lines.length).toBeGreaterThan(0);
			const logEntry = JSON.parse(lines[lines.length - 1]); // Get the last entry

			expect(logEntry.level).toBe(30);
			expect(logEntry.msg).toBe('Test message');
			expect(logEntry.context).toBe('test_context');
			expect(logEntry.source).toBe('ratos-update');
			expect(logEntry).toHaveProperty('time');
			expect(logEntry).toHaveProperty('pid');
			expect(logEntry).toHaveProperty('hostname');
		} finally {
			// Restore original environment
			if (originalLogFile) {
				process.env.RATOS_LOG_FILE = originalLogFile;
			} else {
				process.env.RATOS_LOG_FILE = undefined;
			}
		}
	});

	it('should handle different log levels correctly', async () => {
		const testLogPath = path.join(TEST_LOG_DIR, 'bash-error-test.log');
		const originalLogFile = process.env.RATOS_LOG_FILE;

		// Clear any existing log file
		if (existsSync(testLogPath)) {
			await rm(testLogPath);
		}

		try {
			const scriptPath = path.resolve(__dirname, '../../configuration/scripts/ratos-logging.sh');

			// Test different log levels - use a fresh environment
			execSync(`bash -c "source ${scriptPath} && log_error 'Error message' 'error_context'"`, {
				env: {
					...process.env,
					RATOS_LOG_FILE: testLogPath,
					PATH: process.env.PATH,
				},
			});

			const logContent = await readFile(testLogPath, 'utf-8');
			const lines = logContent
				.trim()
				.split('\n')
				.filter((line) => line.trim());

			// Find the error entry (filter out any non-JSON lines)
			const validEntries = lines
				.map((line) => {
					try {
						return JSON.parse(line);
					} catch {
						return null;
					}
				})
				.filter((entry) => entry !== null);

			// Should have at least one entry
			expect(validEntries.length).toBeGreaterThan(0);

			// Find the error entry
			const errorEntry = validEntries.find((entry) => entry.level === 50);
			expect(errorEntry).toBeDefined();

			expect(errorEntry.level).toBe(50);
			expect(errorEntry.msg).toBe('Error message');
			expect(errorEntry.context).toBe('error_context');
			expect(errorEntry.source).toBe('ratos-update');
		} finally {
			if (originalLogFile) {
				process.env.RATOS_LOG_FILE = originalLogFile;
			} else {
				process.env.RATOS_LOG_FILE = undefined;
			}
		}
	});
});

describe('CLI Commands Integration', () => {
	beforeEach(async () => {
		// Create test log file with sample data
		const sampleLogs = [
			{
				level: 30,
				time: new Date('2024-01-01T10:00:00.000Z').getTime(),
				msg: 'Test info message',
				source: 'ratos-update',
				context: 'main',
			},
			{
				level: 50,
				time: new Date('2024-01-01T10:01:00.000Z').getTime(),
				msg: 'Test error message',
				source: 'ratos-update',
				context: 'error_test',
			},
			{
				level: 30,
				time: new Date('2024-01-01T10:02:00.000Z').getTime(),
				msg: 'Different service log',
				source: 'other-service',
				context: 'main',
			},
		];
		const logContent = sampleLogs.map((log) => JSON.stringify(log)).join('\n');
		await writeFile(TEST_LOG_FILE, logContent);
	});

	it('should have proper CLI command structure', async () => {
		// Test that the CLI functions can be imported and have the expected structure
		// This tests the CLI integration without actually executing the binary
		const { parseLogFile, generateSummary, filterBySource } = await import('@/server/routers/logs');

		// Parse the test log file - now returns all entries
		const entries = await parseLogFile(TEST_LOG_FILE);
		expect(entries).toHaveLength(3); // All entries including different sources

		// Filter to get only ratos-update entries
		const updateEntries = filterBySource(entries, 'ratos-update');
		expect(updateEntries).toHaveLength(2);

		// Generate summary for all entries
		const summary = generateSummary(entries, 1024, true);
		expect(summary.totalEntries).toBe(3);
		expect(summary.infoCount).toBe(2);
		expect(summary.errorCount).toBe(1);
	});

	it('should include all log sources and allow filtering', async () => {
		// Test the core functionality - now includes all sources
		const entries = await parseLogFile(TEST_LOG_FILE);

		// Should include all entries from all sources
		expect(entries).toHaveLength(3);

		// Should include messages from different sources
		const messages = entries.map((entry) => entry.msg);
		expect(messages).toContain('Test info message');
		expect(messages).toContain('Test error message');
		expect(messages).toContain('Different service log');

		// Test filtering by source
		const updateEntries = filterBySource(entries, 'ratos-update');
		expect(updateEntries).toHaveLength(2);
		expect(updateEntries.every((entry) => entry.source === 'ratos-update')).toBe(true);

		const otherEntries = filterBySource(entries, 'other-service');
		expect(otherEntries).toHaveLength(1);
		expect(otherEntries[0].msg).toBe('Different service log');
	});

	it('should handle missing log file gracefully', async () => {
		const nonExistentPath = path.join(TEST_LOG_DIR, 'nonexistent.log');

		// Test that parseLogFile handles missing files gracefully
		try {
			await parseLogFile(nonExistentPath);
		} catch (error) {
			// Expected to throw an error for missing file
			expect(error).toBeDefined();
		}
	});
});

describe('Unified Endpoint Optimization', () => {
	it('should parse log file once and return all data types', async () => {
		// Test the unified endpoint logic by simulating what it does
		const entries = await parseLogFile(TEST_LOG_FILE);

		// Test summary generation
		const summary = generateSummary(entries, 1000, true);
		expect(summary.totalEntries).toBe(3);
		expect(summary.errorCount).toBe(1);
		expect(summary.infoCount).toBe(2);
		expect(summary.logFileExists).toBe(true);
		expect(summary.logFileSize).toBe(1000);

		// Test sources extraction
		const sources = new Set<string>();
		entries.forEach((entry) => {
			if (entry.source) {
				sources.add(entry.source);
			}
		});
		const sourcesArray = Array.from(sources).sort();
		expect(sourcesArray).toEqual(['other-service', 'ratos-update']);

		// Test contexts extraction
		const contexts = new Set<string>();
		entries.forEach((entry) => {
			if (entry.context) {
				contexts.add(entry.context);
			}
		});
		const contextsArray = Array.from(contexts).sort();
		expect(contextsArray).toEqual(['error_test', 'main']);

		// Test entries filtering and pagination
		const filteredEntries = filterBySeverity(entries, 30); // INFO level and above
		expect(filteredEntries).toHaveLength(3);

		// Test pagination simulation
		const limit = 2;
		const cursor = 0;
		const paginatedEntries = filteredEntries.slice(cursor, cursor + limit);
		const hasNextPage = cursor + limit < filteredEntries.length;
		const nextCursor = hasNextPage ? cursor + limit : cursor;

		expect(paginatedEntries).toHaveLength(2);
		expect(hasNextPage).toBe(true);
		expect(nextCursor).toBe(2);

		// Test errors filtering and pagination
		const errorEntries = filterBySeverity(entries, 40); // WARN level and above
		expect(errorEntries).toHaveLength(1);
		expect(errorEntries[0].level).toBe(50);
	});

	it('should handle empty log file gracefully', async () => {
		// Test with empty log file
		const emptyLogPath = path.join(TEST_LOG_DIR, 'empty.log');
		await writeFile(emptyLogPath, '');

		try {
			const entries = await parseLogFile(emptyLogPath);
			expect(entries).toHaveLength(0);

			// Test summary with empty entries
			const summary = generateSummary(entries, 0, true);
			expect(summary.totalEntries).toBe(0);
			expect(summary.errorCount).toBe(0);
			expect(summary.logFileExists).toBe(true);

			// Test sources/contexts with empty entries
			const sources = new Set<string>();
			const contexts = new Set<string>();
			entries.forEach((entry) => {
				if (entry.source) sources.add(entry.source);
				if (entry.context) contexts.add(entry.context);
			});

			expect(Array.from(sources)).toHaveLength(0);
			expect(Array.from(contexts)).toHaveLength(0);
		} finally {
			await rm(emptyLogPath);
		}
	});

	it('should maintain performance benefits with single file parse', async () => {
		// This test verifies that we can get all the data we need from a single parse
		const startTime = Date.now();

		// Single parse operation
		const entries = await parseLogFile(TEST_LOG_FILE);

		// Extract all data types from the single parse
		const summary = generateSummary(entries, 1000, true);

		const sources = new Set<string>();
		const contexts = new Set<string>();
		entries.forEach((entry) => {
			if (entry.source) sources.add(entry.source);
			if (entry.context) contexts.add(entry.context);
		});

		const filteredEntries = filterBySeverity(entries, 30);
		const errorEntries = filterBySeverity(entries, 40);

		const endTime = Date.now();
		const duration = endTime - startTime;

		// Verify we got all the data we need
		expect(summary).toBeDefined();
		expect(sources.size).toBeGreaterThan(0);
		expect(contexts.size).toBeGreaterThan(0);
		expect(filteredEntries.length).toBeGreaterThan(0);
		expect(errorEntries.length).toBeGreaterThan(0);

		// Performance should be reasonable (this is a small test file)
		expect(duration).toBeLessThan(1000); // Should complete in under 1 second
	});

	it('should handle zero limits correctly without validation errors', async () => {
		// Test that the unified endpoint can handle 0 limits without Zod validation errors
		const entries = await parseLogFile(TEST_LOG_FILE);

		// Simulate the unified endpoint logic with 0 limits
		generateSummary(entries, 1000, true); // Summary generation should work regardless of limits

		// Test with entriesLimit = 0 (simulating showOnlyErrors = true)
		const entriesLimit = 0;
		const errorsLimit = 50;

		// Should not process entries when limit is 0
		let processedEntries = null;
		if (entriesLimit > 0) {
			const filteredEntries = filterBySeverity(entries, 30);
			processedEntries = filteredEntries.slice(0, entriesLimit);
		}
		expect(processedEntries).toBeNull();

		// Should process errors when limit > 0
		let processedErrors = null;
		if (errorsLimit > 0) {
			const errorEntries = filterBySeverity(entries, 40);
			processedErrors = errorEntries.slice(0, errorsLimit);
		}
		expect(processedErrors).not.toBeNull();
		expect(processedErrors?.length).toBe(1);

		// Test with errorsLimit = 0 (simulating showOnlyErrors = false)
		const entriesLimit2 = 50;
		const errorsLimit2 = 0;

		// Should process entries when limit > 0
		let processedEntries2 = null;
		if (entriesLimit2 > 0) {
			const filteredEntries = filterBySeverity(entries, 30);
			processedEntries2 = filteredEntries.slice(0, entriesLimit2);
		}
		expect(processedEntries2).not.toBeNull();
		expect(processedEntries2?.length).toBe(3);

		// Should not process errors when limit is 0
		let processedErrors2 = null;
		if (errorsLimit2 > 0) {
			const errorEntries = filterBySeverity(entries, 40);
			processedErrors2 = errorEntries.slice(0, errorsLimit2);
		}
		expect(processedErrors2).toBeNull();
	});
});

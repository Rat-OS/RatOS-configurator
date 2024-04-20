import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

import { z } from 'zod';
import { readFile, unlink, writeFile } from 'node:fs/promises';
import {
	fileLocks,
	findAllObjects,
	lock,
	release,
	readObjects,
	replaceObjects,
	saveObject,
	transformObjects,
} from '@/server/helpers/ndjson';

// Test schema
const schema = z.object({
	id: z.number(),
	name: z.string(),
});

const mockFile = '/tmp/mock-file.json';

describe('ndjson', () => {
	describe('readObjects', () => {
		const mockFile = '/tmp/mock-file.json';

		beforeEach(async () => {
			let mockContent = '';
			Array.from({ length: 1000 }, (_, i) => {
				mockContent += JSON.stringify({ id: i + 1, name: 'Person ' + (i + 1) }) + (i < 999 ? '\n' : '');
			});
			await writeFile(mockFile, mockContent);
		});

		afterEach(async () => {
			await unlink(mockFile);
		});

		test('should read objects with a limit from the file', async () => {
			const schema = z.object({
				id: z.number(),
				name: z.string(),
			});

			const result = await readObjects(mockFile, schema, undefined, 0, 3);

			expect(result.result).toEqual([
				{ id: 1, name: 'Person 1' },
				{ id: 2, name: 'Person 2' },
				{ id: 3, name: 'Person 3' },
			]);
		});

		test('should read objects with a start position in middle of previous line', async () => {
			const schema = z.object({
				id: z.number(),
				name: z.string(),
			});

			const result = await readObjects(mockFile, schema, undefined, 10, 2);

			expect(result.result).toEqual([
				{ id: 2, name: 'Person 2' },
				{ id: 3, name: 'Person 3' },
			]);
		});

		test('should be able to paginate objects at different page lengths', async () => {
			const schema = z.object({
				id: z.number(),
				name: z.string(),
			});

			let result = await readObjects(mockFile, schema, undefined, 0, 10);

			expect(result.result).toEqual([
				{ id: 1, name: 'Person 1' },
				{ id: 2, name: 'Person 2' },
				{ id: 3, name: 'Person 3' },
				{ id: 4, name: 'Person 4' },
				{ id: 5, name: 'Person 5' },
				{ id: 6, name: 'Person 6' },
				{ id: 7, name: 'Person 7' },
				{ id: 8, name: 'Person 8' },
				{ id: 9, name: 'Person 9' },
				{ id: 10, name: 'Person 10' },
			]);
			expect(result.hasNextPage).toEqual(true);

			let numResults = 10;
			let safety = 0;
			while (result.hasNextPage && safety < 1000) {
				safety++;
				let limit = Math.round(Math.random() * 100 + 1);
				limit = Math.min(limit, 1000 - numResults);
				result = await readObjects(mockFile, schema, undefined, result.cursor, limit);
				expect(result.result).toEqual(
					Array.from({ length: limit }).map((_, i) => ({
						id: i + numResults + 1,
						name: 'Person ' + (i + numResults + 1),
					})),
				);
				numResults += limit;
			}
			expect(result.hasNextPage).toEqual(false);
		});

		test('should return an empty result if the file does not exist', async () => {
			const schema = z.object({
				id: z.number(),
				name: z.string(),
			});

			const result = await readObjects('/path/to/nonexistent-file.json', schema);

			expect(result.result).toEqual([]);
			expect(result.cursor).toEqual(0);
			expect(result.hasNextPage).toEqual(false);
		});
	});
	describe('replaceObjects', () => {
		beforeEach(async () => {
			const mockContent =
				JSON.stringify({ id: 1, name: 'John' }) +
				'\n' +
				JSON.stringify({ id: 2, name: 'Jane' }) +
				'\n' +
				JSON.stringify({ id: 3, name: 'Bob' }) +
				'\n';
			console.log(mockContent);
			await writeFile(mockFile, mockContent);
		});
		afterEach(async () => {
			await unlink(mockFile);
		});

		test('should replace objects in the file', async () => {
			// Call the replaceObjects function
			const results = await replaceObjects(mockFile, schema, (input) => {
				if (input.id === 2) {
					return { ...input, name: 'Alice' };
				}
				return input;
			});

			// Assertions
			expect(results.linesTotal).toEqual(3);
			expect(results.linesDeleted).toEqual(0);
			expect(results.linesChanged).toEqual(1);
			expect((await readObjects(mockFile, schema)).result).toEqual([
				{ id: 1, name: 'John' },
				{ id: 2, name: 'Alice' },
				{ id: 3, name: 'Bob' },
			]);
		});

		test('should replace matched object and delete others when returning null', async () => {
			// Call the replaceObjects function
			const results = await replaceObjects(mockFile, schema, (input) => {
				if (input.id === 2) {
					return { ...input, name: 'Alice' };
				}
				return null;
			});

			const fileContent = await readFile(mockFile, 'utf-8');

			// Assertions
			expect(results.linesChanged).toEqual(1);
			expect(results.linesDeleted).toEqual(2);
			expect(results.linesTotal).toEqual(3);
			expect((await readObjects(mockFile, schema)).result).toEqual([{ id: 2, name: 'Alice' }]);
		});

		test('should throw an error if the file does not exist', async () => {
			// Mock the file that does not exist
			const file = '/path/to/nonexistent-file.json';

			// Mock the schema and the replace function
			const schema = z.object({
				id: z.number(),
				name: z.string(),
			});
			const replace = vi.fn();

			// Call the replaceObjects function and expect it to throw an error
			await expect(replaceObjects(file, schema, replace)).rejects.toThrowError('File does not exist: ' + file);
		});
	});
	describe('transformObjects', () => {
		beforeEach(async () => {
			const mockContent =
				JSON.stringify({ id: 1, name: 'John' }) +
				'\n' +
				JSON.stringify({ id: 2, name: 'Jane' }) +
				'\n' +
				JSON.stringify({ id: 3, name: 'Bob' }) +
				'\n';
			await writeFile(mockFile, mockContent);
		});

		afterEach(async () => {
			await unlink(mockFile);
		});

		test('should transform objects in the file', async () => {
			// Call the transformObjects function
			const results = await transformObjects(mockFile, schema, (input) => {
				if (input.id === 2) {
					return { ...input, name: 'Alice' };
				}
				return input;
			});

			// Assertions
			expect(results.linesTotal).toEqual(3);
			expect(results.linesChanged).toEqual(1);
			expect((await readObjects(mockFile, schema)).result).toEqual([
				{ id: 1, name: 'John' },
				{ id: 2, name: 'Alice' },
				{ id: 3, name: 'Bob' },
			]);
		});

		test('should throw an error if the file does not exist', async () => {
			// Mock the file that does not exist
			const file = '/path/to/nonexistent-file.json';

			// Mock the schema and the transform function
			const schema = z.object({
				id: z.number(),
				name: z.string(),
			});
			const transform = vi.fn();

			// Call the transformObjects function and expect it to throw an error
			await expect(transformObjects(file, schema, transform)).rejects.toThrowError('File does not exist: ' + file);
		});
	});
	describe('saveObject', () => {
		afterEach(async () => {
			await unlink(mockFile);
		});
		test('should save object to file', async () => {
			// Define the object to save
			const obj = { id: 4, name: 'Alice' };

			// Call the saveObject function
			const result = await saveObject(mockFile, schema, obj);

			// Read the file content
			const fileContent = await readFile(mockFile, 'utf-8');

			// Assertions
			expect(result).toEqual(obj);
			expect(JSON.parse(fileContent)).toEqual(obj);
		});
	});
	describe('findAllObjects', () => {
		beforeEach(async () => {
			let mockContent =
				JSON.stringify({ id: 1, name: 'John' }) +
				'\n' +
				JSON.stringify({ id: 2, name: 'Jane' }) +
				'\n' +
				JSON.stringify({ id: 3, name: 'Bob' }) +
				'\n';
			Array.from({ length: 1000 }, (_, i) => {
				mockContent += JSON.stringify({ id: i + 4, name: 'Person ' + (i + 4) }) + '\n';
			});
			mockContent += JSON.stringify({ id: 1004, name: 'Alice' }) + '\n';
			await writeFile(mockFile, mockContent);
		});

		afterEach(async () => {
			await unlink(mockFile);
		});

		test('should find all objects that match the search criteria', async () => {
			// Define the search function
			const search = (input: { id: number }) => [2, 3, 1004].includes(input.id);

			// Call the findAllObjects function
			const results = await findAllObjects(mockFile, schema, search);

			// Assertions
			expect(results.result).toEqual([
				{ id: 2, name: 'Jane' },
				{ id: 3, name: 'Bob' },
				{ id: 1004, name: 'Alice' },
			]);
		});

		test('should limit the number of objects returned', async () => {
			// Define the search function
			const search = (input: { id: number }) => true;

			// Define the limit
			const limit = 52;

			// Call the findAllObjects function
			const results = await findAllObjects(mockFile, schema, search, 0, limit);

			// Assertions
			expect(results.result.length).toEqual(limit);
		});

		test('should return an empty array if the file does not exist', async () => {
			// Mock the file that does not exist
			const file = '/path/to/nonexistent-file.json';

			// Define the search function
			const search = (input: { id: number }) => true;

			// Call the findAllObjects function
			const results = await findAllObjects(file, schema, search);

			// Assertions
			expect(results.result).toEqual([]);
		});
	});

	describe('lock', () => {
		test('should create a lock for the file', async () => {
			const file = '/path/to/file.json';
			const timeout = 1000;

			await lock(file, timeout);

			expect(fileLocks.has(file)).toBe(true);

			release(file);

			expect(fileLocks.has(file)).toBe(false);
		});

		test('should resolve the lock when released', async () => {
			const file = '/path/to/file.json';
			const lock1 = lock(file);
			const lock2 = lock(file);
			const lock3 = lock(file);
			const lock4 = lock(file);
			let isResolved = false;
			const lockPromise = lock(file);
			lockPromise.then(() => (isResolved = true));
			expect(fileLocks.has(file)).toBe(true);
			expect(fileLocks.get(file)?.length).toBe(4);
			release(file);
			expect(isResolved).toBe(false);
			expect(fileLocks.get(file)?.length).toBe(3);
			expect(isResolved).toBe(false);
			release(file);
			expect(fileLocks.get(file)?.length).toBe(2);
			expect(isResolved).toBe(false);
			release(file);
			expect(fileLocks.get(file)?.length).toBe(1);
			await lock4;
			await lock3;
			await lock2;
			await lock1;
			expect(isResolved).toBe(false);
			release(file);

			await expect(lockPromise).resolves.toBeUndefined();
			expect(isResolved).toBe(true);
			expect(fileLocks.has(file)).toBe(false);
		});

		test('should reject the lock after the timeout', async () => {
			const file = '/path/to/file.json';
			const timeout = 5;

			const lock1 = lock(file);
			await expect(lock(file, timeout)).rejects.toThrowError(
				`File lock timeout of ${timeout}ms reached, make sure to release the locks you claim on ${file}`,
			);
			release(file);
			await expect(lock1).resolves.toBeUndefined();
			release(file);
		});
	});
});

import { afterEach, beforeEach, describe, expect, test, vi, Mock } from 'vitest';
import { createTRPCProxyClient } from '@trpc/client';
import { readPackageUp } from 'read-package-up';
import { $, tmpfile, echo, path } from 'zx';
import { Command } from 'commander';
import { PostProcessorCLIOutput } from '@/cli/commands/postprocessor';
import { render as mockedRender } from 'ink';
import { formatZodError } from '@schema-hub/zod-error-formatter';
import { program } from '@/cli/commands';

// Mock dependencies
vi.mock('@trpc/client');
vi.mock('read-package-up');
vi.mock('zx');
vi.mock('@/cli/util.tsx', async () => ({
	...(await vi.importActual('@/cli/util.tsx')),
	renderError: vi.fn().mockImplementation((error: string, options: { exitCode: number }) => {
		// eslint-disable-next-line no-console
		console.trace('RenderError Mock:', error, options);
		throw new Error(error);
	}),
	getRealPath: vi.fn().mockImplementation(async (program: Command, p: string) => {
		return p;
	}),
}));
vi.mock('@/utils/trpc.js', () => ({
	getBaseUrl: () => 'http://localhost:3000',
}));

// Mock the file system to simulate stat of ./test.py
vi.mock('node:fs/promises', async () => ({
	...(await vi.importActual('node:fs/promises')),
	stat: vi.fn().mockResolvedValue({
		isFile: () => {
			return true;
		},
	}),
}));

describe('RatOS CLI', async () => {
	vi.mock('ink', async () => {
		const { render } = (await vi.importActual('ink-testing-library')) as typeof import('ink-testing-library');
		return {
			...(await vi.importActual('ink')),
			render: vi.fn().mockImplementation(render),
		};
	});
	const mockTrpcClient = {
		osVersion: { query: vi.fn<any, Promise<string>>() },
		version: { query: vi.fn<any, Promise<string>>() },
		klipperVersion: { query: vi.fn<any, Promise<string>>() },
		ipAddress: { query: vi.fn<any, Promise<string>>() },
		'klippy-extensions': {
			list: { query: vi.fn<any, Promise<any>>() },
			register: { mutate: vi.fn<any, Promise<any>>() },
			unregister: { mutate: vi.fn<any, Promise<any>>() },
			symlink: { mutate: vi.fn<any, Promise<any>>() },
		},
		'moonraker-extensions': {
			list: { query: vi.fn<any, Promise<any>>() },
			register: { mutate: vi.fn<any, Promise<any>>() },
			unregister: { mutate: vi.fn<any, Promise<any>>() },
			symlink: { mutate: vi.fn<any, Promise<any>>() },
		},
		printer: {
			regenerateConfiguration: { mutate: vi.fn<any, Promise<any>>() },
		},
		mcu: {
			flashAllConnected: { mutate: vi.fn<any, Promise<any>>() },
		},
	};

	beforeEach(() => {
		// Set NODE_ENV to test for consistent environment
		(process.env as any).NODE_ENV = 'test';

		vi.clearAllMocks();
		(createTRPCProxyClient as Mock).mockReturnValue(mockTrpcClient);
		(
			readPackageUp as unknown as Mock<Parameters<typeof readPackageUp>, ReturnType<typeof readPackageUp>>
		).mockResolvedValue({
			packageJson: { version: '1.0.0' },
			path: '',
		});
		vi.resetModules();
	});

	describe('info command', () => {
		test('should display system information', async () => {
			// Setup mock responses
			mockTrpcClient.osVersion.query.mockResolvedValue('RatOS 2.0');
			mockTrpcClient.version.query.mockResolvedValue('1.0.0');
			mockTrpcClient.klipperVersion.query.mockResolvedValue('v0.11.0');
			mockTrpcClient.ipAddress.query.mockResolvedValue('192.168.1.100');

			// Execute command
			await program.parseAsync(['node', 'ratos', 'info']);

			// Verify render was called with correct component
			expect(mockedRender).toHaveBeenCalled();
		});
	});

	describe('extensions commands', () => {
		test('should list registered extensions', async () => {
			// Setup mock responses
			mockTrpcClient['klippy-extensions'].list.query.mockResolvedValue([
				{ extensionName: 'test', path: '/path/to/', fileName: 'test.py' },
			]);
			mockTrpcClient['moonraker-extensions'].list.query.mockResolvedValue([]);

			// Execute command
			await program.parseAsync(['node', 'ratos', 'extensions', 'list']);

			expect(mockedRender).toHaveBeenCalled();
		});

		test('should register klipper extension', async () => {
			mockTrpcClient['klippy-extensions'].register.mutate.mockResolvedValue({
				message: 'Successfully registered',
				result: 'success',
			});

			await program.parseAsync(['node', 'ratos', 'extensions', 'register', 'klipper', 'test', './test.py']);

			expect(mockTrpcClient['klippy-extensions'].register.mutate).toHaveBeenCalled();
		});
	});

	describe('config commands', () => {
		test('should regenerate configuration', async () => {
			mockTrpcClient.printer.regenerateConfiguration.mutate.mockResolvedValue([
				{ action: 'created', fileName: 'printer.cfg' },
			]);

			await program.parseAsync(['node', 'ratos', 'config', 'regenerate']);

			expect(mockTrpcClient.printer.regenerateConfiguration.mutate).toHaveBeenCalled();
		});
	});

	describe('doctor command', () => {
		test('should run diagnostic and repair steps', async () => {
			const mockExec = vi.fn().mockResolvedValue({ stdout: '', stderr: '' });
			($ as unknown as Mock).mockReturnValue(mockExec);

			await program.parseAsync(['node', 'ratos', 'doctor']);

			expect(mockExec).toHaveBeenCalled();
		});
	});

	describe('postprocess command', () => {
		test('should return schema compliant success result', async () => {
			const zx = await vi.importActual('zx');
			const realPath = zx.path as typeof path;
			const realTmpfile = zx.tmpfile as typeof tmpfile;
			await program.parseAsync([
				'node',
				'ratos',
				'postprocess',
				'-i',
				'-o',
				'-a',
				'--non-interactive',
				realPath.resolve(
					__dirname,
					'server/gcode-processor/fixtures/slicer_output/002/IDEX_MultiColor/PS_2.8.1_PurgeTower.gcode',
				),
				realTmpfile(),
			]);

			expect(mockedRender).not.toHaveBeenCalled();
			expect(echo).toHaveBeenCalled();
			const results = (echo as Mock<Parameters<typeof echo>, ReturnType<typeof echo>>).mock.calls;
			const successResult = results.find((res) => JSON.parse(res[0]).result === 'success');
			expect(successResult).toBeDefined();
			if (successResult == null) {
				throw new Error('No success result found from postprocess command');
			}
			const parsedObject = JSON.parse(successResult[0]);
			const parsed = PostProcessorCLIOutput.safeParse(parsedObject);
			if (!parsed.success) {
				throw formatZodError(parsed.error, parsedObject);
			}
			if (parsed.data.result !== 'success') {
				throw new Error('Postprocess command did not return success');
			}
			expect(parsed.data.payload.generator).toBe('PrusaSlicer');
			expect(parsed.data.payload.generatorVersion).toBe('2.8.1');
			expect(parsed.data.payload.flavour).toBe('PrusaSlicer');
			expect(parsed.data.payload.generatorTimestamp).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
		});
	});
});

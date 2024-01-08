import * as commander from 'commander';
import type { AppRouter } from '../server/routers/index.js';
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import trpc from '../utils/trpc.js';
import { realpath, stat } from 'fs/promises';
import path from 'path';
import React from 'react';
import { Box, Text, render } from 'ink';
import { Container } from './components/container.jsx';
import { APIResult, Status } from './components/status.jsx';
import { Table } from './components/table.jsx';
import { readPackageUp } from 'read-package-up';

function renderError(str: string, options: { exitCode: number } = { exitCode: 1 }) {
	render(
		<Container>
			<Status results={{ message: str, result: 'error' }} />
		</Container>,
	);
	process.exit(options.exitCode);
}

function renderApiResults(results: APIResult[] | APIResult) {
	render(
		<Container>
			<Status results={results} />
		</Container>,
	);
}

function errorColor(str: string) {
	// Add ANSI escape codes to display text in red.
	return `\x1b[31m${str}\x1b[0m` as const;
}

const client = createTRPCProxyClient<AppRouter>({
	links: [
		httpBatchLink({
			url: `${trpc.getBaseUrl()}/api/trpc`,
		}),
	],
});

const getRealPath = async (p: string) => {
	if (process.env.RATOS_BIN_CWD == null && program.getOptionValue('cwd') == null) {
		renderError(
			`--cwd was not passed and RATOS_BIN_CWD environment variable is not set. 
			Either the --cwd option or the RATOS_BIN_CWD environment variable is required to run this command.`,
			{ exitCode: 1 },
		);
	}
	return await realpath(path.resolve(process.env.RATOS_BIN_CWD ?? program.getOptionValue('cwd'), p));
};

const program = new commander.Command()
	.name('RatOS CLI')
	.version((await readPackageUp())?.packageJson.version ?? 'unknown')
	.description('RatOS CLI for interacting with the RatOS Configurator')
	.option('-cwd, --cwd <path>', 'Set the current working directory')
	.configureOutput({
		outputError: (str, write) => write(errorColor(str)),
	})
	.showSuggestionAfterError(true);

const extensions = program
	.command('extensions')
	.description('Register, unregister or symlink extensions managed by the RatOS Configurator');

const registerExtensions = extensions
	.command('register')
	.description('Register an extension to be managed by the RatOS Configurator');

const unregisterExtensions = extensions
	.command('unregister')
	.description('Unregister an extension from the RatOS Configurator');

extensions
	.command('list')
	.description('List all registered extensions')
	.action(async () => {
		const klippyExtensions = (await client['klippy-extensions'].list.query()).map((ext) => ({
			...ext,
			isKinematics: ext.isKinematics ? '✓' : '✘',
		}));
		const moonrakerExtensions = await client['moonraker-extensions'].list.query();
		render(
			<Container>
				{klippyExtensions.length ? (
					<Box flexDirection="column">
						<Text>
							{klippyExtensions.length} Registered Klipper {klippyExtensions.length === 1 ? 'Extension' : 'Extensions'}
							{klippyExtensions.length ? ':' : ''}
						</Text>
						<Table
							data={klippyExtensions}
							columns={['extensionName', 'path', 'fileName', 'isKinematics']}
							cell={(props) => (
								<Text
									color={
										props.children?.toString().includes('✓')
											? 'green'
											: props.children?.toString().includes('✘')
												? 'red'
												: 'white'
									}
								>
									{props.children}
								</Text>
							)}
						></Table>
					</Box>
				) : null}
				{moonrakerExtensions.length ? (
					<Box flexDirection="column">
						<Text>
							{moonrakerExtensions.length} Registered Moonraker{' '}
							{klippyExtensions.length === 1 ? 'Extension' : 'Extensions'}
							{moonrakerExtensions.length ? ':' : ''}
						</Text>

						<Table data={moonrakerExtensions}></Table>
					</Box>
				) : null}
			</Container>,
		);
	});

registerExtensions
	.command('klipper')
	.description('Register a Klipper extension to be managed by the RatOS Configurator')
	.option('-k, --kinematics', 'Register as a kinematics extension')
	.option('-e, --error-if-exists', 'Throw error if the extension already exists')
	.argument('<name>', 'Name of the extension')
	.argument('<file>', 'The extension itself')
	.showHelpAfterError()
	.action(async (extName, extFile, options) => {
		let realPath = '';
		try {
			realPath = await getRealPath(extFile);
			if (!(await stat(realPath)).isFile() || !realPath.endsWith('.py')) {
				return renderError(`${realPath} is not a python file`, { exitCode: 2 });
			}
		} catch (e) {
			return renderError(`Failed to get file name from ${extFile}`, { exitCode: 2 });
		}
		const fileName = realPath.split(path.sep).pop();
		if (fileName == null) {
			return renderError(`Failed to get file name from ${realPath}`, { exitCode: 2 });
		}
		try {
			await client['klippy-extensions'].register.mutate({
				json: {
					extensionName: extName,
					path: realPath.lastIndexOf(fileName) === -1 ? realPath : realPath.slice(0, realPath.lastIndexOf(fileName)),
					fileName: fileName,
					isKinematics: options.kinematics,
					errorIfExists: options.errorIfExists,
				},
			});
		} catch (e) {
			if (e instanceof Error) {
				return renderError(e.message, { exitCode: 2 });
			}
			return renderError('Failed to register extension', { exitCode: 2 });
		}

		render(
			<Container>
				<Status
					results={{
						message: `Successfully registered ${options.kinematics ? 'kinematics ' : ''}extension "${extName}"`,
						result: 'success',
					}}
				/>
			</Container>,
		);
	});

registerExtensions
	.command('moonraker')
	.description('Register a Moonraker extension to be managed by the RatOS Configurator')
	.argument('<name>', 'Name of the extension')
	.argument('<file>', 'The extension itself')
	.showHelpAfterError()
	.option('-e, --error-if-exists', 'Throw error if the extension already exists')
	.action(async (extName, extFile, options) => {
		let realPath = '';
		try {
			realPath = await getRealPath(extFile);
			if (!(await stat(realPath)).isFile() || !realPath.endsWith('.py')) {
				return renderError(`${realPath} is not a python file`, { exitCode: 2 });
			}
		} catch (e) {
			return renderError(`Failed to get file name from ${extFile}`, { exitCode: 2 });
		}
		const fileName = realPath.split(path.sep).pop();
		if (fileName == null) {
			return renderError(`Failed to get file name from ${realPath}`, { exitCode: 2 });
		}
		try {
			await client['moonraker-extensions'].register.mutate({
				json: {
					extensionName: extName,
					path: realPath.lastIndexOf(fileName) === -1 ? realPath : realPath.slice(0, realPath.lastIndexOf(fileName)),
					fileName: fileName,
					errorIfExists: options.errorIfExists,
				},
			});
			render(
				<Container>
					<Status
						results={{
							message: `Successfully registered extension "${extName}"`,
							result: 'success',
						}}
					/>
				</Container>,
			);
		} catch (e) {
			if (e instanceof Error) {
				return renderError(e.message, { exitCode: 2 });
			}
			return renderError('Failed to register extension', { exitCode: 2 });
		}
	});

unregisterExtensions
	.command('klipper')
	.description('Unlink and unregister a Klipper extension managed by the RatOS Configurator')
	.argument('<name>', 'Name of the extension')
	.showHelpAfterError()
	.option('-k, --kinematics', 'Register as a kinematics extension')
	.option('-e, --error-if-not-exists', "Throw error if the extension doesn't exist")
	.action(async (extName, options) => {
		try {
			const result = await client['klippy-extensions'].unregister.mutate({
				extensionName: extName,
				errorIfNotExists: options.errorIfExists,
			});
			renderApiResults(result);
		} catch (e) {
			if (e instanceof Error) {
				return renderError(e.message, { exitCode: 2 });
			}
			return renderError('Failed to unregister extension', { exitCode: 2 });
		}
	});

unregisterExtensions
	.command('moonraker')
	.description('Unlink and unregister a Moonraker extension managed by the RatOS Configurator')
	.argument('<name>', 'Name of the extension')
	.showHelpAfterError()
	.option('-e, --error-if-not-exists', "Throw error if the extension doesn't exist")
	.action(async (extName, options) => {
		try {
			const result = await client['moonraker-extensions'].unregister.mutate({
				extensionName: extName,
				errorIfNotExists: options.errorIfNotExists,
			});
			renderApiResults(result);
		} catch (e) {
			if (e instanceof Error) {
				return renderError(e.message, { exitCode: 2 });
			}
			return renderError('Failed to unregister extension', { exitCode: 2 });
		}
	});

extensions
	.command('symlink')
	.addArgument(
		new commander.Argument('[type]', 'Type of the extension').default('all').choices(['all', 'klipper', 'moonraker']),
	)
	.option('-e, --error-if-exists', 'Throw error and abort if an extension already exist')
	.description('Symlink all registered extensions')
	.action(async (type, options) => {
		try {
			const results = [];
			if (type === 'klipper' || type === 'all') {
				const klipperExtensions = await client['klippy-extensions'].symlink.mutate({
					errorIfExists: options.errorIfExists,
				});
				results.push(...klipperExtensions.symlinkResults);
			}
			if (type === 'moonraker' || type === 'all') {
				const moonrakerExtensions = await client['moonraker-extensions'].symlink.mutate({
					errorIfExists: options.errorIfExists,
				});
				results.push(...moonrakerExtensions.symlinkResults);
			}
			renderApiResults(results);
		} catch (e) {
			if (e instanceof Error) {
				return renderError(e.message, { exitCode: 2 });
			}
			return renderError('Failed to symlink extensions', { exitCode: 2 });
		}
	});

program
	.command('config')
	.description('Commands for managing the RatOS configuration')
	.command('regenerate')
	.action(async () => {
		try {
			const result = await client['printer'].regenerateConfiguration.mutate();
			renderApiResults(
				result.map((file) => {
					let action =
						file.action === 'created'
							? 'Created'
							: file.action === 'skipped'
								? 'Skipped'
								: file.action === 'overwritten'
									? 'Updated'
									: 'Failed to write';
					return {
						result:
							file.action === 'skipped'
								? 'skip'
								: file.action === 'created'
									? 'success'
									: file.action === 'overwritten'
										? 'warning'
										: 'error',
						message:
							file.action === 'error'
								? `Error during processing of ${file.fileName}${
										file.err instanceof Error ? `: ${file.err.message}` : ''
									}`
								: `${action} config file ${file.fileName}`,
					};
				}),
			);
		} catch (e) {
			if (e instanceof Error) {
				return renderError(e.message, { exitCode: 2 });
			}
			return renderError('Failed to regenerate config', { exitCode: 2 });
		}
	});

program
	.command('flash')
	.description(`Flash all connected boards`)
	.action(async () => {
		try {
			const res = await client['mcu'].flashAllConnected.mutate();
			renderApiResults(res.flashResults);
		} catch (e) {
			if (e instanceof Error) {
				return renderError(e.message, { exitCode: 2 });
			}
			return renderError("Failed to flash mcu's", { exitCode: 2 });
		}
	});

program.parseAsync();

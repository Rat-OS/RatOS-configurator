import * as commander from 'commander';
import type { AppRouter } from '@/server/routers/index.js';
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import { getBaseUrl } from '@/utils/trpc.js';
import { stat, readFile } from 'node:fs/promises';
import path from 'path';
import React from 'react';
import { Box, Text, render } from 'ink';
import { Container } from '@/cli/components/container.jsx';
import { Status } from '@/cli/components/status.jsx';
import { readPackageUp } from 'read-package-up';
import { $, echo, which } from 'zx';
import { existsSync } from 'node:fs';
import { ensureSudo, getRealPath, renderApiResults, renderError, errorColor, getEnvironment } from '@/cli/util.tsx';
import { InstallProgressUI, InstallStep } from '@/cli/components/install-progress.tsx';
import { createSignal } from '@/app/_helpers/signal.ts';
import { getLogger } from '@/cli/logger.ts';
import { frontend } from '@/cli/commands/frontend.tsx';
import { postprocessor } from '@/cli/commands/postprocessor.tsx';

const program = new commander.Command()
	.name('ratos')
	.version((await readPackageUp())?.packageJson.version ?? 'unknown')
	.description('RatOS CLI for interacting with the RatOS Configurator')
	.option('-cwd, --cwd <path>', 'Set the current working directory')
	.configureOutput({
		outputError: (str, write) => write(errorColor(str)),
	})
	.showSuggestionAfterError(true);

program
	.command('info')
	.description('Print info about this RatOS installation')
	.action(async () => {
		const client = createTRPCProxyClient<AppRouter>({
			links: [
				httpBatchLink({
					url: `${getBaseUrl()}/api/trpc`,
				}),
			],
		});
		const info = {
			osVersion: await client.osVersion.query(),
			version: await client.version.query(),
			klipperVersion: await client.klipperVersion.query(),
			ip: await client.ipAddress.query(),
		};
		render(
			<Box flexDirection="row" columnGap={5} padding={2} paddingTop={1}>
				<Box flexDirection="column" rowGap={1}>
					<Text color="white" dimColor={true}>
						Machine IP
					</Text>
					<Text color="white" dimColor={true}>
						RatOS Version
					</Text>
					<Text color="white" dimColor={true}>
						Configurator Version
					</Text>
					<Text color="white" dimColor={true}>
						Klipper Version
					</Text>
				</Box>
				<Box flexDirection="column" rowGap={1}>
					<Text>{info.ip}</Text>
					<Text>{info.osVersion}</Text>
					<Text>{info.version}</Text>
					<Text>{info.klipperVersion}</Text>
				</Box>
			</Box>,
		);
	});

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
		const client = createTRPCProxyClient<AppRouter>({
			links: [
				httpBatchLink({
					url: `${getBaseUrl()}/api/trpc`,
				}),
			],
		});
		const klippyExtensions = await client['klippy-extensions'].list.query();
		const moonrakerExtensions = await client['moonraker-extensions'].list.query();
		render(
			<Container>
				<Box flexDirection="column" marginBottom={1}>
					<Text>
						{klippyExtensions.length} Registered Klipper {klippyExtensions.length === 1 ? 'Extension' : 'Extensions'}
						{klippyExtensions.length ? ':' : ''}
					</Text>
					{klippyExtensions.map((ext) => (
						<Box key={ext.extensionName} flexDirection="row" columnGap={2}>
							<Text color={existsSync(ext.path + ext.fileName) ? 'green' : 'red'}>
								{ext.extensionName} {'->'} {ext.path + ext.fileName}{' '}
							</Text>
						</Box>
					))}
				</Box>
				<Box flexDirection="column">
					<Text>
						{moonrakerExtensions.length} Registered Moonraker{' '}
						{moonrakerExtensions.length === 1 ? 'Extension' : 'Extensions'}
						{moonrakerExtensions.length ? ':' : ''}
					</Text>
					{moonrakerExtensions.map((ext) => (
						<Box key={ext.extensionName} flexDirection="row" columnGap={2}>
							<Text color={existsSync(ext.path + ext.fileName) ? 'green' : 'red'}>
								{ext.extensionName} {'->'} {ext.path + ext.fileName}{' '}
							</Text>
						</Box>
					))}
				</Box>
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
		const client = createTRPCProxyClient<AppRouter>({
			links: [
				httpBatchLink({
					url: `${getBaseUrl()}/api/trpc`,
				}),
			],
		});
		let realPath = '';
		try {
			realPath = await getRealPath(program, extFile);
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
		const client = createTRPCProxyClient<AppRouter>({
			links: [
				httpBatchLink({
					url: `${getBaseUrl()}/api/trpc`,
				}),
			],
		});
		let realPath = '';
		try {
			realPath = await getRealPath(program, extFile);
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
		const client = createTRPCProxyClient<AppRouter>({
			links: [
				httpBatchLink({
					url: `${getBaseUrl()}/api/trpc`,
				}),
			],
		});
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
		const client = createTRPCProxyClient<AppRouter>({
			links: [
				httpBatchLink({
					url: `${getBaseUrl()}/api/trpc`,
				}),
			],
		});
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
		const client = createTRPCProxyClient<AppRouter>({
			links: [
				httpBatchLink({
					url: `${getBaseUrl()}/api/trpc`,
				}),
			],
		});
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
	.option('-o, --overwrite-all', "Overwrite all existing files, even if they haven't been modified")
	.option('-p, --overwrite-printer-cfg', "Overwrite the printer.cfg file, even if it hasn't been modified")
	.action(async (options) => {
		try {
			const client = createTRPCProxyClient<AppRouter>({
				links: [
					httpBatchLink({
						url: `${getBaseUrl()}/api/trpc`,
					}),
				],
			});
			const overwriteFiles = [];
			if (options.overwriteAll) {
				overwriteFiles.push('*');
			}
			if (options.overwritePrinterCfg) {
				overwriteFiles.push('printer.cfg');
			}
			const result = await client['printer'].regenerateConfiguration.mutate({ overwriteFiles: overwriteFiles });
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
			const client = createTRPCProxyClient<AppRouter>({
				links: [
					httpBatchLink({
						url: `${getBaseUrl()}/api/trpc`,
					}),
				],
			});
			const res = await client['mcu'].flashAllConnected.mutate();
			renderApiResults(res.flashResults);
		} catch (e) {
			if (e instanceof Error) {
				return renderError(e.message, { exitCode: 2 });
			}
			return renderError("Failed to flash mcu's", { exitCode: 2 });
		}
	});

frontend(program);
postprocessor(program);

const log = program.command('logs').description('Commands for managing the RatOS log');

log
	.command('tail')
	.option('-f, --follow', 'Follow the log')
	.option('-n, --lines <lines>', 'Number of lines to show')
	.description('Tail the RatOS log')
	.action(async (options) => {
		const $$ = $({ verbose: true });
		const flags = [];
		if (options.follow) {
			flags.push('-f');
		}
		if (options.lines) {
			flags.push(`-n${options.lines}`);
		}
		const logFile = (await getEnvironment()).LOG_FILE;
		const whichPretty = await which('pino-pretty');
		if (whichPretty.trim() === '') {
			echo('pino-pretty not found, installing (requires sudo permissions)...');
			await $$`sudo npm install -g pino-pretty`;
		}
		$$`tail ${flags} ${logFile} | pino-pretty --colorize`;
	});

log
	.command('rotate')
	.description('force rotate the RatOS configurator log')
	.action(async () => {
		const log = '/etc/logrotate.d/ratos-configurator';
		$({ verbose: true })`logrotate -f ${log}`;
	});

const doctor = program
	.command('doctor')
	.description('Diagnose and fix common issues on a RatOS installation')
	.action(async () => {
		await ensureSudo();

		const cmdSignal = createSignal<string | null>();
		const $$ = $({
			quiet: true,
			log(entry) {
				if (entry.kind === 'cmd') {
					cmdSignal(entry.cmd);
					getLogger().info('Running command: ' + entry.cmd);
				}
			},
		});

		const steps: InstallStep[] = [];
		let { rerender } = render(
			<InstallProgressUI
				status="Fixing potential RatOS issues..."
				stepText="Repairing RatOS configurator..."
				cmdSignal={cmdSignal}
				steps={steps}
			/>,
		);

		await $$`sudo ${(await getEnvironment()).RATOS_SCRIPT_DIR}/scripts/update.sh`;
		steps.push({ name: 'Repaired RatOS configurator', status: 'success' });
		rerender(
			<InstallProgressUI
				status="Fixing potential RatOS issues..."
				stepText="Restarting RatOS configurator..."
				cmdSignal={cmdSignal}
				isLoading={true}
				steps={steps}
			/>,
		);
		await $$`sudo systemctl restart ratos-configurator`;
		steps.push({ name: 'Restarted RatOS configurator', status: 'success' });
		rerender(
			<InstallProgressUI
				status="Fixing potential RatOS issues..."
				stepText="Repairing RatOS configuration..."
				isLoading={true}
				cmdSignal={cmdSignal}
				steps={steps}
			/>,
		);
		await $$`sudo ${(await getEnvironment()).RATOS_CONFIGURATION_PATH}/scripts/ratos-update.sh`;
		steps.push({ name: 'Repaired RatOS configuration', status: 'success' });
		rerender(
			<InstallProgressUI
				status="Fixing potential RatOS issues..."
				stepText="Restarting Klipper..."
				isLoading={true}
				cmdSignal={cmdSignal}
				steps={steps}
			/>,
		);
		await $$`sudo systemctl restart klipper`;
		steps.push({ name: 'Restarted Klipper', status: 'success' });
		rerender(
			<InstallProgressUI
				status="Fixing potential RatOS issues..."
				stepText="Restarting Moonraker..."
				isLoading={true}
				cmdSignal={cmdSignal}
				steps={steps}
			/>,
		);
		await $$`sudo systemctl restart moonraker`;
		steps.push({ name: 'Restarted Moonraker', status: 'success' });
		rerender(
			<InstallProgressUI
				status="Fixing potential RatOS issues..."
				stepText="Done!"
				statusColor="greenBright"
				cmdSignal={cmdSignal}
				steps={steps}
			/>,
		);
	});

await program.parseAsync();

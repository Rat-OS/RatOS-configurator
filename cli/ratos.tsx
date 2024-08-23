import * as commander from 'commander';
import type { AppRouter } from '@/server/routers/index.js';
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import { getBaseUrl } from '@/utils/trpc.js';
import { realpath, stat, readFile, writeFile } from 'fs/promises';
import path from 'path';
import React, { useCallback, useState } from 'react';
import { Box, Static, Text, TextProps, Transform, render } from 'ink';
import { Container } from '@/cli/components/container.jsx';
import { APIResult, Status } from '@/cli/components/status.jsx';
import { readPackageUp } from 'read-package-up';
import { $, echo, which } from 'zx';
import { serverSchema } from '@/env/schema.mjs';
import dotenv from 'dotenv';
import { existsSync, writeFileSync } from 'fs';
import { getLogger } from '@/cli/logger.js';
import Spinner from 'ink-spinner';
import { createSignal, Signal, useSignal } from '@/app/_helpers/signal.ts';
import { formatCmd } from '@/cli/util.ts';
import { findSection } from '@/server/helpers/config-parsing.ts';

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
		const client = createTRPCProxyClient<AppRouter>({
			links: [
				httpBatchLink({
					url: `${getBaseUrl()}/api/trpc`,
				}),
			],
		});
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

export type InstallStep = {
	name: string;
	status: 'success' | 'error' | 'pending' | 'running' | 'warning';
};

const InstallProgressUI: React.FC<{
	cmdSignal: Signal<string | null>;
	status: string;
	statusColor?: TextProps['color'];
	stepTextBeforeSteps?: boolean;
	stepText?: string;
	stepTextColor?: TextProps['color'];
	warnings?: string[];
	errors?: string[];
	steps?: InstallStep[];
	isLoading?: boolean;
}> = (props) => {
	const [currentCmd, setCurrentCmd] = useState<string | null>(null);
	useSignal(
		props.cmdSignal,
		useCallback((cmd) => {
			setCurrentCmd(cmd);
		}, []),
	);
	return (
		<Container>
			<Box flexDirection="column" rowGap={0}>
				<Box marginBottom={1} flexDirection="column">
					<Text color={props.statusColor ?? 'white'} dimColor={false} bold={true}>
						{['red', 'redBright'].includes(props.statusColor ?? 'white') ? (
							<Text bold={true}>✘{'  '}</Text>
						) : ['green', 'greenBright'].includes(props.statusColor ?? 'white') ? (
							<Text bold={true}>✓{'  '}</Text>
						) : (
							'   '
						)}
						{props.status}
					</Text>
					{props.stepText && props.stepTextBeforeSteps && (
						<Text>
							{props.isLoading ? (
								<Text color="green" dimColor={false}>
									<Spinner type="dots" />
									{'  '}
								</Text>
							) : (
								'   '
							)}
							<Text color={props.stepTextColor ?? 'gray'} dimColor={false} bold={false}>
								{props.stepText}
							</Text>
						</Text>
					)}
				</Box>
				<Static items={props.warnings ?? []}>
					{(warning) => (
						<Text color="yellow" dimColor={true} key={warning} bold={false}>
							{'   '}
							{warning}
						</Text>
					)}
				</Static>
				<Static items={props.errors ?? []}>
					{(error) => (
						<Text color="red" dimColor={true} key={error} bold={false}>
							{'   '}
							{error}
						</Text>
					)}
				</Static>
				{props.steps &&
					props.steps.map((step) => (
						<Text key={step.name}>
							{step.status === 'running' && (
								<Text bold={true}>
									<Spinner type="dots" />
									{'  '}
								</Text>
							)}
							{step.status === 'success' && (
								<Text bold={true} color="green">
									✓{'  '}
								</Text>
							)}
							{step.status === 'error' && (
								<Text bold={true} color="red">
									✘{'  '}
								</Text>
							)}
							{step.status === 'warning' && (
								<Text bold={true} color="yellow">
									⚠{'  '}
								</Text>
							)}
							{step.status === 'pending' && (
								<Text bold={true} color="gray">
									•{'  '}
								</Text>
							)}
							<Text color="gray" bold={false}>
								{step.name}
							</Text>
						</Text>
					))}
				{props.stepText && !props.stepTextBeforeSteps && (
					<Text>
						{props.isLoading ? (
							<Text color="green" dimColor={false}>
								<Spinner type="dots" />
								{'  '}
							</Text>
						) : (
							'   '
						)}
						<Text color={props.stepTextColor ?? 'gray'} dimColor={false} bold={false}>
							{props.stepText}
						</Text>
					</Text>
				)}
			</Box>
			{currentCmd && (
				<Box marginTop={1} flexDirection="column">
					<Text color="white">
						Running: <Transform transform={formatCmd}>{currentCmd}</Transform>
					</Text>
				</Box>
			)}
		</Container>
	);
};

const frontend = program.command('frontend').description('Switch between klipper frontend UIs');

const ensureSudo = async () => {
	echo("Checking for sudo permissions. If you're prompted for a password, please enter it.");
	await $({ verbose: false, quiet: false })`sudo echo "Sudo permissions acquired"`;
};
const fluidConfigFile = `/etc/nginx/sites-available/fluidd`;
const mainsailConfigFile = `/etc/nginx/sites-available/mainsail`;

frontend
	.command('fluidd-experimental')
	.addArgument(
		new commander.Argument('[channel]', 'Release channel to use for updates through moonraker')
			.default('stable')
			.choices(['stable', 'beta']),
	)
	.description('Use experimental RatOS fork of Fluidd')
	.action(async (channel) => {
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

		const envFile = existsSync('./.env.local') ? await readFile('.env.local') : await readFile('.env');
		const environment = serverSchema.parse({ NODE_ENV: 'production', ...dotenv.parse(envFile) });
		const hostname = (await $$`tr -d " \t\n\r" < /etc/hostname`).text();

		const warnings: string[] = [];
		const errors: string[] = [];
		const steps: InstallStep[] = [];

		const moonrakerConfig = environment.KLIPPER_CONFIG_PATH + '/moonraker.conf';
		let moonrakerConfigContents = await readFile(moonrakerConfig, 'utf-8');

		let { rerender } = render(<InstallProgressUI status="Installing fluidd.." cmdSignal={cmdSignal} steps={steps} />);
		if (!existsSync(mainsailConfigFile)) {
			rerender(
				<InstallProgressUI
					cmdSignal={cmdSignal}
					steps={steps}
					status="Fluidd installation failed"
					statusColor="red"
					stepText="Stock mainsail configuration file not found"
					stepTextBeforeSteps={true}
					stepTextColor="white"
				/>,
			);
		} else {
			if (!existsSync(`/home/${environment.USER}/fluidd`)) {
				// Download and unpack latest RatOS fluidd release
				rerender(
					<InstallProgressUI
						cmdSignal={cmdSignal}
						steps={steps}
						warnings={warnings}
						errors={errors}
						status="Installing Fluidd..."
						isLoading={true}
						stepText="Downloading latest RatOS Fluidd release"
					/>,
				);
				await $$`wget https://github.com/Rat-OS/fluidd/releases/latest/download/fluidd.zip -O /tmp/fluidd.zip`;
				steps.push({ name: 'Download RatOS Fluidd', status: 'success' });
				rerender(
					<InstallProgressUI
						cmdSignal={cmdSignal}
						steps={steps}
						warnings={warnings}
						errors={errors}
						status="Installing Fluidd..."
						isLoading={true}
						stepText="Extracting fluidd.zip"
					/>,
				);
				await $$`unzip /tmp/fluidd.zip -d /home/${environment.USER}/fluidd`;
				await $$`rm /tmp/fluidd.zip`;
				steps.push({ name: 'Extract RatOS Fluidd', status: 'success' });
			} else {
				steps.push({
					name: 'Fluidd is already installed, download and extraction has been skipped.',
					status: 'warning',
				});
			}
			if (!existsSync(`/home/${environment.USER}/printer_data/config/.fluidd-theme`)) {
				// Clone RatOS fluidd theme
				rerender(
					<InstallProgressUI
						cmdSignal={cmdSignal}
						steps={steps}
						warnings={warnings}
						errors={errors}
						status="Installing Fluidd..."
						isLoading={true}
						stepText="Cloning RatOS fluidd theme"
					/>,
				);
				await $$`git clone https://github.com/Rat-OS/fluidd-theme /home/${environment.USER}/printer_data/config/.fluidd-theme`;
				steps.push({ name: 'Clone RatOS fluidd theme', status: 'success' });
			} else {
				steps.push({
					name: 'RatOS fluidd theme is already installed, git cloning has been skipped.',
					status: 'warning',
				});
			}

			// Handle Fluidd moonraker update manager entries
			const fluiddSection = findSection('update_manager Fluidd', moonrakerConfigContents);
			if (fluiddSection != null) {
				// Remove existing Fluidd update manager entries
				rerender(
					<InstallProgressUI
						cmdSignal={cmdSignal}
						steps={steps}
						warnings={warnings}
						errors={errors}
						status="Installing Fluidd..."
						isLoading={true}
						stepText="Removing existing Fluidd update manager entries"
					/>,
				);
				fluiddSection.forEach((section) => {
					// section.start - 1 to get the /n before the section
					moonrakerConfigContents =
						moonrakerConfigContents.slice(0, section.start - 1) + moonrakerConfigContents.slice(section.end);
				});
				steps.push({ name: 'Existing Fluidd update manager entries removed', status: 'warning' });
			}
			// Add new Fluidd update manager entry
			rerender(
				<InstallProgressUI
					cmdSignal={cmdSignal}
					steps={steps}
					warnings={warnings}
					errors={errors}
					status="Installing Fluidd..."
					isLoading={true}
					stepText="Adding moonraker entry for RatOS Fluidd fork"
				/>,
			);
			const fluiddUpdateSection = `\n[update_manager Fluidd]\ntype: web\nrepo: Rat-OS/fluidd\npath: ~/fluidd\n${channel === 'beta' ? 'channel: beta\n' : 'channel: stable\n'}`;
			moonrakerConfigContents += fluiddUpdateSection;
			steps.push({ name: `New Fluidd update manager entry added (channel: ${channel})`, status: 'success' });

			// Handle Fluidd Theme moonraker update manager entries
			const fluiddThemeSection = findSection('update_manager FluiddTheme', moonrakerConfigContents);

			if (fluiddThemeSection != null) {
				// Remove existing Fluidd Theme update manager entries
				rerender(
					<InstallProgressUI
						cmdSignal={cmdSignal}
						steps={steps}
						warnings={warnings}
						errors={errors}
						status="Installing Fluidd..."
						isLoading={true}
						stepText="Removing existing Fluidd Theme update manager entries"
					/>,
				);
				fluiddThemeSection.forEach((section) => {
					// section.start - 1 to get the /n before the section
					moonrakerConfigContents =
						moonrakerConfigContents.slice(0, section.start - 1) + moonrakerConfigContents.slice(section.end);
				});
				steps.push({ name: 'Existing Fluidd Theme update manager entries removed', status: 'warning' });
			}
			// Add new Fluidd Theme update manager entry
			rerender(
				<InstallProgressUI
					cmdSignal={cmdSignal}
					steps={steps}
					warnings={warnings}
					errors={errors}
					status="Installing Fluidd..."
					isLoading={true}
					stepText="Adding moonraker entry for RatOS Fluidd theme"
				/>,
			);
			const fluiddThemeUpdateSection = `\n[update_manager FluiddTheme]\ntype: git_repo\npath: ~/printer_data/config/.fluidd-theme\nprimary_branch: main\norigin: https://github.com/Rat-OS/fluidd-theme\nis_system_service: false\n`;
			moonrakerConfigContents += fluiddThemeUpdateSection;
			steps.push({ name: 'New Fluidd Theme update manager entry added', status: 'success' });

			// Handle nginx configuration
			if (!existsSync('/etc/nginx/sites-available/fluidd')) {
				rerender(
					<InstallProgressUI
						cmdSignal={cmdSignal}
						steps={steps}
						warnings={warnings}
						errors={errors}
						status="Installing Fluidd..."
						isLoading={true}
						stepText="Creating nginx fluidd configuration"
					/>,
				);
				if (existsSync('/etc/nginx/sites-enabled/fluidd')) {
					await $$`sudo rm /etc/nginx/sites-enabled/fluidd`;
					steps.push({ name: 'Old nginx fluidd configuration removed', status: 'success' });
				}
				await $$`sudo cp ${mainsailConfigFile} ${fluidConfigFile}`;
				await $$`sudo sed -i -e 's/mainsail/fluidd/g' ${fluidConfigFile}`;
				steps.push({ name: 'Nginx fluidd configuration created', status: 'success' });
			}

			rerender(
				<InstallProgressUI
					cmdSignal={cmdSignal}
					steps={steps}
					warnings={warnings}
					errors={errors}
					status="Installing Fluidd..."
					isLoading={true}
					stepText="Updating nginx configuration"
				/>,
			);
			await $$`sudo ln -s ${fluidConfigFile} /etc/nginx/sites-enabled/fluidd`;
			if (existsSync('/etc/nginx/sites-enabled/mainsail')) {
				await $$`sudo rm /etc/nginx/sites-enabled/mainsail`;
			}
			steps.push({ name: 'Nginx configuration updated', status: 'success' });

			rerender(
				<InstallProgressUI
					cmdSignal={cmdSignal}
					steps={steps}
					warnings={warnings}
					errors={errors}
					status="Installing Fluidd..."
					isLoading={true}
					stepText="Validating nginx config"
				/>,
			);
			const nginxValidation = await $$({ nothrow: true })`sudo nginx -t`;
			if (nginxValidation.exitCode !== 0) {
				// Nginx validation failed, restore mainsail configuration
				getLogger().error(
					{ stderr: nginxValidation.stderr, stdout: nginxValidation.stdout },
					'nginx validation failed during fluidd installation',
				);
				steps.push({ name: 'Nginx validation failed.', status: 'error' });
				if (nginxValidation.stderr.trim() != '') {
					warnings.push(nginxValidation.stderr);
				}
				if (nginxValidation.stdout.trim() != '') {
					warnings.push(nginxValidation.stdout);
				}
				rerender(
					<InstallProgressUI
						cmdSignal={cmdSignal}
						steps={steps}
						warnings={warnings}
						errors={errors}
						status="Fluidd installation failed."
						statusColor="red"
						stepText="Restoring previous mainsail configuration..."
					/>,
				);
				await $$`sudo ln -s ${mainsailConfigFile} /etc/nginx/sites-enabled/mainsail`;
				await $$`sudo rm /etc/nginx/sites-enabled/fluidd`;
				await $$`sudo systemctl reload nginx`;
				steps.push({ name: 'Restored previous mainsail configuration', status: 'success' });
				cmdSignal(null);
				rerender(
					<InstallProgressUI
						cmdSignal={cmdSignal}
						steps={steps}
						warnings={warnings}
						errors={errors}
						status="Fluidd installation failed."
						statusColor="red"
						stepText={`Fluidd installation failed, previous mainsail configuration has been restored. For debugging, download the debug zip at http://${hostname}.local/configure/api/debug-zip`}
						stepTextColor="white"
						stepTextBeforeSteps={true}
					/>,
				);
				// Return so we don't write the moonraker config.
				return;
			}

			// Reload nginx
			rerender(
				<InstallProgressUI
					cmdSignal={cmdSignal}
					steps={steps}
					warnings={warnings}
					errors={errors}
					status="Installing Fluidd..."
					isLoading={true}
					stepText="Reloading nginx"
				/>,
			);
			await $$`sudo systemctl reload nginx`;
			steps.push({ name: 'Nginx reloaded', status: 'success' });

			// Write moonraker configuration
			cmdSignal(null);
			rerender(
				<InstallProgressUI
					cmdSignal={cmdSignal}
					steps={steps}
					warnings={warnings}
					errors={errors}
					status="Installing Fluidd..."
					isLoading={true}
					stepText="Writing moonraker configuration.."
				/>,
			);
			await writeFile(moonrakerConfig, moonrakerConfigContents);
			steps.push({ name: 'Moonraker configuration written to disk', status: 'success' });

			// Restart moonraker
			rerender(
				<InstallProgressUI
					cmdSignal={cmdSignal}
					steps={steps}
					warnings={warnings}
					errors={errors}
					status="Installing Fluidd..."
					isLoading={true}
					stepText={`Restarting moonraker`}
				/>,
			);
			await $$`sudo systemctl restart moonraker`;
			cmdSignal(null);
			steps.push({ name: 'Moonraker restarted', status: 'success' });

			// Success!
			rerender(
				<InstallProgressUI
					cmdSignal={cmdSignal}
					steps={steps}
					warnings={warnings}
					errors={errors}
					status="Fluidd installed successfully!"
					statusColor="greenBright"
					stepTextColor="white"
					stepText={`Fluidd is now available at http://${hostname}.local/`}
					stepTextBeforeSteps={true}
				/>,
			);
		}
	});

frontend
	.command('mainsail')
	.addArgument(
		new commander.Argument('[channel]', 'Release channel to use for updates through moonraker')
			.default('stable')
			.choices(['stable', 'beta']),
	)
	.description('Use official mainsail')
	.action(async (channel) => {
		await ensureSudo();
		const cmdSignal = createSignal<string | null>();
		const $$ = $({
			quiet: true,
			log(entry) {
				entry.kind === 'cmd' && cmdSignal(entry.cmd);
			},
		});
		let warnings: string[] = [];
		let errors: string[] = [];
		const steps: InstallStep[] = [];

		const envFile = existsSync('./.env.local') ? await readFile('.env.local') : await readFile('.env');
		const environment = serverSchema.parse({ NODE_ENV: 'production', ...dotenv.parse(envFile) });
		const moonrakerConfig = environment.KLIPPER_CONFIG_PATH + '/moonraker.conf';
		let moonrakerConfigContents = await readFile(moonrakerConfig, 'utf-8');
		const mainsailOverrideSection = findSection('update_manager mainsail', moonrakerConfigContents);

		const hostname = (await $$`tr -d " \t\n\r" < /etc/hostname`).text();
		if (!existsSync(mainsailConfigFile)) {
			return renderError('Mainsail configuration file not found', { exitCode: 2 });
		}

		const { rerender } = render(
			<InstallProgressUI
				cmdSignal={cmdSignal}
				steps={steps}
				warnings={warnings}
				errors={errors}
				status="Switching to mainsail.."
			/>,
		);

		if (mainsailOverrideSection != null && mainsailOverrideSection[0].properties.channel !== channel) {
			// Remove existing mainsail update manager entries
			rerender(
				<InstallProgressUI
					cmdSignal={cmdSignal}
					steps={steps}
					warnings={warnings}
					errors={errors}
					status="Installing Mainsail..."
					isLoading={true}
					stepText="Removing existing mainsail update manager entries"
				/>,
			);
			mainsailOverrideSection.forEach((section) => {
				moonrakerConfigContents =
					moonrakerConfigContents.slice(0, section.start + 1) + moonrakerConfigContents.slice(section.end);
			});
			steps.push({ name: `Switched mainsail update manager to use ${channel} releases`, status: 'warning' });
		} else if (mainsailOverrideSection == null && channel !== 'stable') {
			// Add new mainsail update manager entry
			rerender(
				<InstallProgressUI
					cmdSignal={cmdSignal}
					steps={steps}
					warnings={warnings}
					errors={errors}
					status="Installing Mainsail..."
					isLoading={true}
					stepText="Adding moonraker entry for mainsail"
				/>,
			);
			const mainsailUpdateSection = `\n[update_manager mainsail]\nchannel: ${channel}`;
			moonrakerConfigContents += mainsailUpdateSection;
			steps.push({ name: `Mainsail update manager override added (channel: ${channel})`, status: 'success' });

			// Write moonraker configuration
			cmdSignal(null);
			rerender(
				<InstallProgressUI
					cmdSignal={cmdSignal}
					steps={steps}
					warnings={warnings}
					errors={errors}
					status="Installing Fluidd..."
					isLoading={true}
					stepText="Writing moonraker configuration.."
				/>,
			);
			await writeFile(moonrakerConfig, moonrakerConfigContents);
			cmdSignal(null);
			steps.push({ name: 'Moonraker configuration written to disk', status: 'success' });
			// Restart moonraker
			rerender(
				<InstallProgressUI
					cmdSignal={cmdSignal}
					steps={steps}
					warnings={warnings}
					errors={errors}
					status="Installing Fluidd..."
					isLoading={true}
					stepText={`Restarting moonraker`}
				/>,
			);
			await $$`sudo systemctl restart moonraker`;
			cmdSignal(null);
			steps.push({ name: 'Moonraker restarted', status: 'success' });
		}
		if (existsSync('/etc/nginx/sites-enabled/mainsail')) {
			cmdSignal(null);
			rerender(
				<InstallProgressUI
					cmdSignal={cmdSignal}
					steps={steps}
					warnings={warnings}
					errors={errors}
					status="Mainsail is enabled!"
					statusColor="greenBright"
					stepText={`Mainsail is available at http://${hostname}.local/.`}
					stepTextColor="white"
				/>,
			);
			return;
		}
		rerender(
			<InstallProgressUI
				cmdSignal={cmdSignal}
				steps={steps}
				warnings={warnings}
				errors={errors}
				status="Restoring mainsail.."
				isLoading={true}
				stepText="Restoring previous mainsail configuration..."
			/>,
		);
		await $$`sudo ln -s ${mainsailConfigFile} /etc/nginx/sites-enabled/mainsail`;
		steps.push({ name: 'Restored mainsail configuration', status: 'success' });
		if (existsSync('/etc/nginx/sites-enabled/fluidd')) {
			await $$`sudo rm /etc/nginx/sites-enabled/fluidd`;
			cmdSignal(null);
			steps.push({ name: 'Disabled fluidd configuration', status: 'success' });
		}
		const nginxValidation = await $$({ nothrow: true })`sudo nginx -t`;
		if (nginxValidation.exitCode !== 0) {
			if (nginxValidation.stderr.trim() != '') {
				// eslint-disable-next-line no-console
				getLogger().error(
					{ stderr: nginxValidation.stderr, stdout: nginxValidation.stdout },
					'nginx validation failed during fluidd installation',
				);
			}
			steps.push({ name: 'Nginx validation failed.', status: 'error' });
			if (nginxValidation.stderr.trim() != '') {
				warnings.push(nginxValidation.stderr);
			}
			if (nginxValidation.stdout.trim() != '') {
				warnings.push(nginxValidation.stdout);
			}
			rerender(
				<InstallProgressUI
					cmdSignal={cmdSignal}
					steps={steps}
					warnings={warnings}
					errors={errors}
					status="Restoring mainsail failed."
					statusColor="red"
					stepText="Restoring previous fluidd configuration..."
				/>,
			);
			await $$`sudo ln -s ${fluidConfigFile} /etc/nginx/sites-enabled/fluidd`;
			await $$`sudo rm /etc/nginx/sites-enabled/mainsail`;
			await $$`sudo systemctl reload nginx`;
			cmdSignal(null);
			steps.push({ name: 'Restored previous fluidd configuration', status: 'success' });
			rerender(
				<InstallProgressUI
					cmdSignal={cmdSignal}
					steps={steps}
					warnings={warnings}
					errors={errors}
					status="Restoring mainsail failed."
					statusColor="red"
					stepTextBeforeSteps={true}
					stepText={`Restoring mainsail failed, previous fluidd configuration has been restored. For debugging, download the debug zip at http://${hostname}.local/configure/api/debug-zip`}
					stepTextColor="white"
				/>,
			);
			return;
		}
		rerender(
			<InstallProgressUI
				cmdSignal={cmdSignal}
				steps={steps}
				warnings={warnings}
				errors={errors}
				status="Restoring mainsail..."
				isLoading={true}
				stepText="Reloading nginx"
			/>,
		);
		await $$`sudo systemctl reload nginx`;
		steps.push({ name: 'Nginx reloaded', status: 'success' });
		cmdSignal(null);
		rerender(
			<InstallProgressUI
				cmdSignal={cmdSignal}
				steps={steps}
				warnings={warnings}
				errors={errors}
				status="Mainsail restored!"
				statusColor="greenBright"
				stepTextBeforeSteps={true}
				stepText={`Mainsail is now available at http://${hostname}.local/`}
				stepTextColor="white"
			/>,
		);
		return;
	});

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
		const envFile = existsSync('./.env.local') ? await readFile('.env.local') : await readFile('.env');
		const logFile = serverSchema.parse({ NODE_ENV: 'production', ...dotenv.parse(envFile) }).LOG_FILE;
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
	.action(() => {
		ensureSudo();
		$({ verbose: true })`sudo `;
	});

await program.parseAsync();

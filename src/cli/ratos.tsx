import * as commander from 'commander';
import type { AppRouter } from '@/server/routers/index.js';
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import { getBaseUrl } from '@/utils/trpc.js';
import { realpath, stat, readFile } from 'fs/promises';
import path from 'path';
import React from 'react';
import { Box, Text, TextProps, render } from 'ink';
import { Container } from '@/cli/components/container.jsx';
import { APIResult, Status } from '@/cli/components/status.jsx';
import { readPackageUp } from 'read-package-up';
import { $ } from 'zx';
import { serverSchema } from '@/env/schema.mjs';
import dotenv from 'dotenv';
import { existsSync } from 'fs';
import { replaceInFileByLine } from '@/server/helpers/file-operations.js';
import { getLogger } from '@/cli/logger.js';

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

const FluiddInstallerUI: React.FC<{
	status: string;
	statusColor?: TextProps['color'];
	stepText?: string;
	stepTextColor?: TextProps['color'];
	warnings?: string[];
	errors?: string[];
}> = (props) => {
	return (
		<Container>
			<Box flexDirection="column" rowGap={0}>
				<Text color={props.statusColor ?? 'white'} dimColor={false} bold={true}>
					{['red', 'redBright'].includes(props.statusColor ?? 'white') && <Text bold={true}>✘ </Text>}
					{['green', 'greenBright'].includes(props.statusColor ?? 'white') && <Text bold={true}>✓ </Text>}
					{props.status}
				</Text>
				{props.warnings?.map((warning) => (
					<Text color="yellow" dimColor={true} key={warning} bold={false}>
						{warning}
					</Text>
				))}
				{props.errors?.map((error) => (
					<Text color="red" dimColor={true} key={error} bold={false}>
						{error}
					</Text>
				))}
				{props.stepText && (
					<Text color={props.stepTextColor ?? 'white'} dimColor={true} bold={false}>
						{props.stepText}
					</Text>
				)}
			</Box>
		</Container>
	);
};

const frontend = program.command('frontend').description('Switch between klipper frontend UIs');

frontend
	.command('fluidd-experimental')
	.description('Replaces Mainsail with the RatOS development fork of Fluidd')
	.action(async () => {
		const $$ = $({ quiet: true });
		const envFile = existsSync('./.env.local') ? await readFile('.env.local') : await readFile('.env');
		const environment = serverSchema.parse({ NODE_ENV: 'production', ...dotenv.parse(envFile) });
		let { rerender } = render(<FluiddInstallerUI status="Installing fluidd.." />);
		if (!existsSync('/etc/nginx/sites-available/mainsail')) {
			if (existsSync('/etc/nginx/sites-available/mainsail.bak') && existsSync('/etc/nginx/sites-enabled/fluidd')) {
				rerender(
					<FluiddInstallerUI
						status="Fluidd already installed"
						statusColor="greenBright"
						stepText="Fluidd is already installed, nothing to do. To restore mainsail, run `ratos frontend mainsail`"
					/>,
				);
			} else {
				rerender(
					<FluiddInstallerUI
						status="Fluidd installation failed"
						statusColor="red"
						stepText="Stock mainsail configuration file not found"
					/>,
				);
			}
		} else {
			// Download and unpack latest RatOS fluidd release
			const hostname = (await $`tr -d " \t\n\r" < /etc/hostname`).stdout;
			const warnings: string[] = [];
			const errors: string[] = [];
			if (!existsSync('/home/pi/fluidd')) {
				rerender(
					<FluiddInstallerUI
						warnings={warnings}
						status="Installing Fluidd..."
						stepText="Downloading latest RatOS Fluidd release"
					/>,
				);
				await $$`wget https://github.com/Rat-OS/fluidd/releases/latest/download/fluidd.zip -O /tmp/fluidd.zip`;
				rerender(
					<FluiddInstallerUI
						warnings={warnings}
						errors={errors}
						status="Installing Fluidd..."
						stepText="Extracting fluidd.zip"
					/>,
				);
				await $$`unzip /tmp/fluidd.zip -d /home/${environment.USER}/fluidd`;
				await $$`rm /tmp/fluidd.zip`;
			} else {
				warnings.push('Fluidd directory already exists, download and extraction has been skipped.');
			}
			rerender(
				<FluiddInstallerUI
					warnings={warnings}
					errors={errors}
					status="Installing Fluidd..."
					stepText="Backing up mainsail configuration"
				/>,
			);
			const fluidConfigFile = `/tmp/fluidd`;
			await $$`sudo cp /etc/nginx/sites-available/mainsail ${fluidConfigFile}`;
			rerender(
				<FluiddInstallerUI
					warnings={warnings}
					errors={errors}
					status="Installing Fluidd..."
					stepText="Updating nginx configuration"
				/>,
			);
			await $$`sudo sed -i -e 's/mainsail/fluidd/g' ${fluidConfigFile}`;
			await $$`sudo mv ${fluidConfigFile} /etc/nginx/sites-available/fluidd`;
			await $$`sudo ln -s /etc/nginx/sites-available/fluidd /etc/nginx/sites-enabled/fluidd`;
			await $$`sudo rm /etc/nginx/sites-enabled/mainsail`;
			rerender(
				<FluiddInstallerUI
					warnings={warnings}
					errors={errors}
					status="Installing Fluidd..."
					stepText="Validating nginx config"
				/>,
			);
			const nginxValidation = await $$`sudo nginx -t`;
			if (nginxValidation.stderr) {
				getLogger().error(
					{ stderr: nginxValidation.stderr, stdout: nginxValidation.stdout },
					'nginx validation failed during fluidd installation',
				);
			}
			if (nginxValidation.stdout.indexOf('configuration file /etc/nginx/nginx.conf test is successful') === -1) {
				errors.push('Error: nginx validation failed');
				warnings.push(nginxValidation.stderr);
				warnings.push(nginxValidation.stdout);
				rerender(
					<FluiddInstallerUI
						warnings={warnings}
						errors={errors}
						status="Fluidd installation failed."
						statusColor="red"
						stepText="Restoring previous mainsail configuration..."
					/>,
				);
				await $$`sudo ln -s /etc/nginx/sites-available/mainsail /etc/nginx/sites-enabled/mainsail`;
				await $$`sudo rm /etc/nginx/sites-enabled/fluidd`;
				await $$`sudo systemctl reload nginx`;
				rerender(
					<FluiddInstallerUI
						warnings={warnings}
						errors={errors}
						status="Fluidd installation failed."
						statusColor="red"
						stepText={`Fluidd installation failed, previous mainsail configuration has been restored. For debugging, download the debug zip at http://${hostname}.local/configure/api/debug-zip`}
						stepTextColor="white"
					/>,
				);
				return;
			}
			rerender(
				<FluiddInstallerUI
					warnings={warnings}
					errors={errors}
					status="Installing Fluidd..."
					stepText="Reloading nginx"
				/>,
			);
			await $$`sudo systemctl reload nginx`;
			rerender(
				<FluiddInstallerUI
					warnings={warnings}
					errors={errors}
					status="Fluidd installed successfully!"
					statusColor="greenBright"
					stepTextColor="white"
					stepText={`Fluidd is now available at http://${hostname}.local/`}
				/>,
			);
		}
	});

frontend
	.command('mainsail')
	.description('Restore the default mainsail nginx configuration')
	.action(async () => {
		const $$ = $({ quiet: true });
		const warnings: string[] = [];
		const errors: string[] = [];
		const { rerender } = render(
			<FluiddInstallerUI warnings={warnings} errors={errors} status="Restoring mainsail.." />,
		);
		const hostname = (await $$`tr -d " \t\n\r" < /etc/hostname`).stdout;
		if (!existsSync('/etc/nginx/sites-available/mainsail')) {
			return renderError('Mainsail configuration file not found', { exitCode: 2 });
		}
		if (existsSync('/etc/nginx/sites-enabled/mainsail')) {
			return rerender(
				<FluiddInstallerUI
					warnings={warnings}
					errors={errors}
					status="Mainsail is already configured"
					statusColor="greenBright"
					stepText={`Mainsail is already available at http://${hostname}.local/. Nothing to do.`}
					stepTextColor="white"
				/>,
			);
		}
		rerender(
			<FluiddInstallerUI
				warnings={warnings}
				errors={errors}
				status="Restoring mainsail.."
				stepText="Restoring previous mainsail configuration..."
			/>,
		);
		await $$`sudo ln -s /etc/nginx/sites-available/mainsail /etc/nginx/sites-enabled/mainsail`;
		if (existsSync('/etc/nginx/sites-enabled/fluidd')) {
			await $$`sudo rm /etc/nginx/sites-enabled/fluidd`;
		}
		const nginxValidation = await $$`sudo nginx -t`;
		if (nginxValidation.stderr) {
			getLogger().error(
				{ stderr: nginxValidation.stderr, stdout: nginxValidation.stdout },
				'nginx validation failed during fluidd installation',
			);
		}
		if (nginxValidation.stdout.indexOf('configuration file /etc/nginx/nginx.conf test is successful') === -1) {
			errors.push('Error: nginx validation failed');
			warnings.push(nginxValidation.stderr);
			warnings.push(nginxValidation.stdout);
			rerender(
				<FluiddInstallerUI
					warnings={warnings}
					errors={errors}
					status="Fluidd installation failed."
					statusColor="red"
					stepText="Restoring previous fluidd configuration..."
				/>,
			);
			await $$`sudo ln -s /etc/nginx/sites-available/fluidd /etc/nginx/sites-enabled/fluidd`;
			await $$`sudo rm /etc/nginx/sites-enabled/mainsail`;
			await $$`sudo systemctl reload nginx`;
			rerender(
				<FluiddInstallerUI
					warnings={warnings}
					errors={errors}
					status="Restoring mainsail failed."
					statusColor="red"
					stepText={`Restoring mainsail failed, previous fluidd configuration has been restored. For debugging, download the debug zip at http://${hostname}.local/configure/api/debug-zip`}
					stepTextColor="white"
				/>,
			);
			return;
		}
		rerender(
			<FluiddInstallerUI
				warnings={warnings}
				errors={errors}
				status="Installing Fluidd..."
				stepText="Reloading nginx"
			/>,
		);
		await $$`sudo systemctl reload nginx`;
		rerender(
			<FluiddInstallerUI
				warnings={warnings}
				errors={errors}
				status="Mainsail restored!"
				statusColor="greenBright"
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
		const flags = [];
		if (options.follow) {
			flags.push('-f');
		}
		if (options.lines) {
			flags.push(`-n${options.lines}`);
		}
		const envFile = existsSync('./.env.local') ? await readFile('.env.local') : await readFile('.env');
		const log = serverSchema.parse({ NODE_ENV: 'production', ...dotenv.parse(envFile) }).LOG_FILE;
		$`tail ${flags} ${log}`.pipe($`pino-pretty`);
	});

log
	.command('rotate')
	.description('force rotate the RatOS configurator log')
	.action(async () => {
		const log = '/etc/logrotate.d/ratos-configurator';
		$`logrotate -f ${log}`;
	});
await program.parseAsync();

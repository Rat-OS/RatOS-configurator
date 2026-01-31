import { createSignal } from '@/app/_helpers/signal';
import { serverSchema } from '@/env/schema.mjs';
import { findSection } from '@/server/helpers/config-parsing';
import { Command, Argument } from 'commander';
import { readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { render } from 'ink';
import { $ } from 'zx';
import { InstallProgressUI, InstallStep } from '@/cli/components/install-progress';
import { getLogger } from '@/cli/logger';
import { ensureSudo, renderError } from '@/cli/util';
import dotenv from 'dotenv';
import React from 'react';

export const frontend = (program: Command) => {
	const frontend = program.command('frontend').description('Switch between klipper frontend UIs');

	const fluidConfigFile = `/etc/nginx/sites-available/fluidd`;
	const mainsailConfigFile = `/etc/nginx/sites-available/mainsail`;

	frontend
		.command('fluidd-experimental')
		.addArgument(
			new Argument('[channel]', 'Release channel to use for updates through moonraker')
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
				const fluiddUpdateSection = `\n[update_manager Fluidd]\ntype: web\nrepo: Rat-OS/fluidd\npath: ~/fluidd\n${channel === 'beta' ? 'channel: beta\n' : 'channel: stable\n'}info_tags:\n\tdesc: Experimental: Fluidd Web Interface (RatOS Fork)`;
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
				const fluiddThemeUpdateSection = `\n[update_manager FluiddTheme]\ntype: git_repo\npath: ~/printer_data/config/.fluidd-theme\nprimary_branch: main\norigin: https://github.com/Rat-OS/fluidd-theme\nis_system_service: false\ninfo_tags:\n\tdesc: Experimental: RatOS Fluidd Theme`;
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
			new Argument('[channel]', 'Release channel to use for updates through moonraker')
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
};

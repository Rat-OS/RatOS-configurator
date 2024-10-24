import { Command } from 'commander';
import { Progress } from 'progress-stream';
import { processGCode } from '@/server/gcode-processor/gcode-processor.ts';
import { echo } from 'zx';
import { ProgressBar, StatusMessage } from '@inkjs/ui';
import { Box, render, Text } from 'ink';
import React from 'react';
import { Container } from '@/cli/components/container.tsx';
import { Duration, DurationLikeObject } from 'luxon';
import path from 'path';

const ProgressReportUI: React.FC<{
	report?: Progress;
	done?: boolean;
	fileName: string;
}> = ({ report, fileName, done }) => {
	const eta = report ? report.eta / 60 : 0;
	const percentage = report?.percentage ?? 0;
	const duration = Duration.fromObject({ minutes: report ? report.eta / 60 / 60 : 0 }, { locale: 'en-GB' })
		.normalize()
		.shiftTo(
			...([eta < 1 ? 'seconds' : 'minutes', eta > 60 ? 'hours' : null].filter(Boolean) as (keyof DurationLikeObject)[]),
		)
		.toHuman({ unitDisplay: 'short', listStyle: 'narrow', maximumFractionDigits: 0 });
	return (
		<Container>
			<Text>Processing {fileName}...</Text>
			<Box flexDirection="row" columnGap={1}>
				{report ? (
					<>
						<Text>{percentage.toFixed(2).padStart(6, ' ')}%</Text>
						<Box width={30}>
							<ProgressBar value={report?.percentage ?? 0} />
						</Box>
						<Text>{duration} remaining</Text>
					</>
				) : done ? (
					<StatusMessage variant="success">Done</StatusMessage>
				) : (
					<Text color="gray">Initializing post processor...</Text>
				)}
			</Box>
		</Container>
	);
};

export const postprocessor = (program: Command) => {
	program
		.command('postprocess')
		.description('Postprocess a gcode file for RatOS')
		.option('-r, --rmmu', 'Postprocess for a printer with an RMMU')
		.option('-i, --idex', 'Postprocess for an IDEX printer')
		.option('-o, --overwrite', 'Overwrite the output file if it exists')
		.argument('<input>', 'Path to the gcode file to postprocess')
		.argument('<output>', 'Path to the output gcode file')
		.action(async (inputFile, outputFile, args) => {
			let onProgress: ((report: Progress) => void) | undefined = undefined;
			let rerender: ((element: React.ReactNode) => void) | undefined = undefined;
			let lastProgressPercentage: number = 0;
			if (process.stdout.isTTY) {
				const { rerender: _rerender } = render(<ProgressReportUI fileName={path.basename(inputFile)} />);
				rerender = _rerender;
				onProgress = (report) => {
					_rerender(<ProgressReportUI fileName={path.basename(inputFile)} report={report} />);
				};
			} else {
				echo(`Processing ${path.basename(inputFile)}...`);
				onProgress = (report) => {
					const progressTens = Math.floor(report.percentage / 10) * 10;
					if (progressTens > lastProgressPercentage && report.percentage > 10) {
						lastProgressPercentage = progressTens;
						echo(`${lastProgressPercentage}%`);
					}
				};
			}
			await processGCode(inputFile, outputFile, {
				idex: args.idex,
				rmmu: args.rmmu,
				overwrite: args.overwrite,
				onProgress,
			});
			if (rerender) {
				rerender(<ProgressReportUI fileName={path.basename(inputFile)} done={true} />);
			}
		});
};

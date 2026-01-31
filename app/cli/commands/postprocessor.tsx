import { Command } from 'commander';
import { Progress } from 'progress-stream';
import {
	inspectGCode,
	processGCode,
	PROGRESS_STREAM_SPEED_STABILIZATION_TIME,
} from '@/server/gcode-processor/gcode-processor';
import { echo, fs, tmpfile } from 'zx';
import { ProgressBar, StatusMessage } from '@inkjs/ui';
import { Box, render, Text } from 'ink';
import React from 'react';
import { Container } from '@/cli/components/container';
import { Duration, DurationLikeObject } from 'luxon';
import path from 'path';
import { z, ZodError } from 'zod';
import { getLogger } from '@/cli/logger';
import { WarningCodes } from '@/server/gcode-processor/WarningCodes';
import { getRealPath, loadEnvironment } from '@/cli/util';
import {
	GCodeError,
	GCodeProcessorError,
	GeneratorIdentificationNotFound,
	SlicerNotSupported,
} from '@/server/gcode-processor/errors';
import { formatZodError } from '@schema-hub/zod-error-formatter';
import { Printability } from '@/server/gcode-processor/Printability';
import { promisify } from 'util';
import { stat } from 'fs/promises';

const ProgressReportUI: React.FC<{
	report?: Progress;
	done?: boolean;
	error?: string;
	fileName: string;
}> = ({ report, fileName, done, error }) => {
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
				) : error ? (
					<StatusMessage variant="error">{error}</StatusMessage>
				) : (
					<Text color="gray">Initializing post processor...</Text>
				)}
			</Box>
		</Container>
	);
};

const GcodeInfoZod = z.object({
	generator: z.string(),
	generatorVersion: z.string(),
	flavour: z.string(),
	generatorTimestamp: z.string(),
	ratosDialectVersion: z.string().optional(),
	postProcessorVersion: z.string().optional(),
	postProcessorTimestamp: z.string().optional(),
	processedForIdex: z.union([z.boolean(), z.literal('unknown')]).optional(),
	isProcessed: z.boolean(),
	wasAlreadyProcessed: z.boolean(),
	printability: z.nativeEnum(Printability),
	printabilityReasons: z.array(z.string()).optional(),
	canDeprocess: z.boolean().optional(),
	analysisResult: z
		.discriminatedUnion('kind', [
			z.object({
				kind: z.literal('full'),
				extruderTemps: z.array(z.string()).optional(),
				toolChangeCount: z.number(),
				firstMoveX: z.string().optional(),
				firstMoveY: z.string().optional(),
				minX: z.number(),
				maxX: z.number(),
				hasPurgeTower: z.boolean().optional(),
				configSection: z.record(z.string(), z.string()).optional(),
				usedTools: z.array(z.string()),
			}),

			z.object({
				kind: z.literal('quick'),
				extruderTemps: z.array(z.string()).optional(),
				firstMoveX: z.string().optional(),
				firstMoveY: z.string().optional(),
				hasPurgeTower: z.boolean().optional(),
			}),
		])
		.optional(),
});

const ErrorCodes = z.enum([
	'UNKNOWN_GCODE_GENERATOR',
	'UNSUPPORTED_SLICER_VERSION',
	'FILE_NOT_FOUND',
	'G_CODE_ERROR',
	'UNKNOWN_ERROR',
]);

export const PostProcessorCLIOutput = z.discriminatedUnion('result', [
	z.object({
		result: z.literal('error'),
		title: z.string().optional(),
		message: z.string(),
		code: ErrorCodes.default('UNKNOWN_ERROR'),
	}),
	z.object({
		result: z.literal('warning'),
		title: z.string().optional(),
		message: z.string(),
	}),
	z.object({
		result: z.literal('success'),
		payload: GcodeInfoZod,
	}),
	z.object({
		result: z.literal('progress'),
		payload: z.object({
			percentage: z.number(),
			eta: z.number(),
		}),
	}),
	z.object({
		result: z.literal('waiting'),
		payload: z.object({
			fileName: z.string(),
		}),
	}),
]);

export type PostProcessorCLIOutput = z.output<typeof PostProcessorCLIOutput>;
export type PostProcessorCLIInput = z.input<typeof PostProcessorCLIOutput>;

export const toPostProcessorCLIOutput = (obj: PostProcessorCLIInput): void => {
	try {
		echo(JSON.stringify(PostProcessorCLIOutput.parse(obj)));
	} catch (e) {
		getLogger().error(e, 'An error occurred while serializing postprocessor output');
		if (e instanceof ZodError) {
			getLogger().trace(obj, 'Invalid data passed to toPostProcessorCLIOutput');
			echo(
				JSON.stringify({
					result: 'error',
					title: 'An error occurred while serializing postprocessor output',
					code: 'UNKNOWN_ERROR',
					message: `This is likely caused by loading a gcode file that was processed by a legacy version of the RatOS postprocessor.\n\n${formatZodError(e, obj).message}`,
				} satisfies PostProcessorCLIOutput),
			);
		} else {
			throw e;
		}
	}
};

class FileStillBeingWrittenError extends Error {
	constructor(filePath: string, maxWaitTime: number) {
		super(`Input file ${filePath} appears to still be being written to after ${maxWaitTime}ms`);
	}
}

/**
 * Waits for a file to finish being written by monitoring its size changes.
 * This helps prevent processing incomplete files that are still being written by other programs.
 *
 * @param filePath - The path to the file to monitor
 * @param maxWaitTime - Maximum time to wait in milliseconds (default: 10000ms / 10 seconds)
 * @throws Error if the file is still being written after maxWaitTime
 *
 * The function works by:
 * 1. Checking the file size every 100ms
 * 2. If the size hasn't changed between checks, assumes writing is complete
 * 3. If the size is still changing after maxWaitTime, throws an error
 */
const waitForFileToBeWritten = async (filePath: string, maxWaitTime: number = 10000): Promise<void> => {
	// Check if file is being written to
	let lastSize = -1;
	let currentSize = 0;
	let attempts = 0;
	const maxAttempts = 10;
	const waitTime = 100; // 100ms

	while (attempts * waitTime < maxWaitTime) {
		const stats = await stat(filePath);
		currentSize = stats.size;

		if (currentSize === lastSize) {
			break; // File size hasn't changed, assume writing is complete
		}

		lastSize = currentSize;
		attempts++;

		if (attempts * waitTime < maxWaitTime) {
			await promisify(setTimeout)(waitTime);
		}
	}

	if (attempts === maxAttempts) {
		throw new FileStillBeingWrittenError(filePath, maxWaitTime);
	}
};

export const postprocessor = (program: Command) => {
	program
		.command('postprocess')
		.description('Postprocess a gcode file for RatOS')
		.option('--non-interactive', 'Output ndjson to stdout instead of rendering a UI')
		.option('-i, --idex', 'Postprocess for an IDEX printer')
		.option('-o, --overwrite', 'Overwrite the output file if it exists')
		.option('-O, --overwrite-input', 'Overwrite the input file')
		.option('-a, --allow-unsupported-slicer-versions', 'Allow unsupported slicer versions')
		.option(
			'-u, --allow-unknown-generator',
			'Allow gcode from generators that cannot be identified by the postprocessor',
		)
		.argument('<input>', 'Path to the gcode file to postprocess')
		.argument('[output]', 'Path to the output gcode file (omit [output] and --overwrite-input for inspection only)')
		.action(async (inputFile, outputFile, args) => {
			// resolve paths
			inputFile = await getRealPath(program, inputFile);
			if (outputFile) {
				outputFile = await getRealPath(program, outputFile);
			}

			try {
				await waitForFileToBeWritten(inputFile);
			} catch (e) {
				if (e instanceof FileStillBeingWrittenError) {
					toPostProcessorCLIOutput({
						result: 'error',
						title: 'Input file is still being written to',
						message: e.message,
					});
					process.exit(1);
				} else if (e instanceof Error && 'code' in e && e.code === 'ENOENT' && 'path' in e) {
					toPostProcessorCLIOutput({
						result: 'error',
						title: 'Input file not found',
						message: e.message,
					});
					process.exit(1);
				} else {
					toPostProcessorCLIOutput({
						result: 'error',
						title: 'An unexpected error occurred while waiting for the input file to be written',
						message: 'Please download a debug-zip and report this issue.',
					});
					throw e;
				}
			}

			// load env variables
			loadEnvironment();

			let onProgress: ((report: Progress) => void) | undefined = undefined;
			let rerender: ((element: React.ReactNode) => void) | undefined = undefined;
			let lastProgressPercentage: number = -1;
			const isInteractive = process.stdout.isTTY && !args.nonInteractive;
			if (isInteractive) {
				const { rerender: _rerender } = render(<ProgressReportUI fileName={path.basename(inputFile)} />);
				rerender = _rerender;
				onProgress = (report) => {
					_rerender(<ProgressReportUI fileName={path.basename(inputFile)} report={report} />);
				};
			} else {
				onProgress = (report) => {
					const progressTens = Math.floor(report.percentage / 10) * 10;
					// Don't report progress until progress is 1% or runtime is > PROGRESS_STREAM_SPEED_STABILIZATION_TIME where the speed should have stabilized and the ETA should be somewhat accurate.
					if (progressTens > lastProgressPercentage && report.runtime > PROGRESS_STREAM_SPEED_STABILIZATION_TIME) {
						lastProgressPercentage = progressTens;
						toPostProcessorCLIOutput({
							result: 'progress',
							payload: { percentage: progressTens, eta: isNaN(report.eta) ? 0 : report.eta ?? 0 },
						});
					}
				};
			}

			const opts = {
				idex: args.idex,
				overwrite: args.overwrite || args.overwriteInput,
				allowUnsupportedSlicerVersions: args.allowUnsupportedSlicerVersions,
				allowUnknownGenerator: args.allowUnknownGenerator,
				onProgress,
				onWarning: (code: string, message: string) => {
					getLogger().trace(code, 'Warning during processing: ' + message);
					switch (code) {
						case WarningCodes.UNSUPPORTED_SLICER_VERSION:
							toPostProcessorCLIOutput({
								result: 'warning',
								title: 'Unsupported slicer version',
								message: message,
							});
							break;
						case WarningCodes.HEURISTIC_SMELL:
							toPostProcessorCLIOutput({
								result: 'warning',
								title: 'Unexpected g-code sequence',
								message: message,
							});
							break;
						case WarningCodes.UNKNOWN_GCODE_GENERATOR:
							toPostProcessorCLIOutput({
								result: 'warning',
								title: 'Unknown g-code generator',
								message: message,
							});
							break;
						default:
							toPostProcessorCLIOutput({
								result: 'warning',
								title: 'Unexpected warning',
								message: message,
							});
							getLogger().warn(code, message);
							break;
					}
				},
			};

			getLogger().info(
				{ ...opts, inputFile, outputFile: outputFile ?? 'No output file specified' },
				'postprocessor options',
			);

			try {
				if (args.overwriteInput) {
					outputFile = tmpfile();
				}

				// TODO: At a later date, when the post-processor can deprocess a file,
				// we should check if the file was already processed by inspecting the file.
				// In case of `MUST_PROCESS`, we can immediately process the file,
				// in case of `READY`, we can skip processing the file, but should still run analysis to get the full file result.
				// In all other situations the consumer can then prompt the user based on the input file's printability.
				// NOTE by tg73: There's fuzzyness around the knowledge re non-idex not needing to be transformed.
				// My current opinion: rather overprocess than underprocess. Specific situations where skipping processing is OK
				// can be handled in fancy ways later - i need to see that it's worth the complexity first.

				// NOTE: processGCode is blind as to whether the input file requires transformation to be ready to print. Notably,
				// in the --overwrite-input and not --idex scenario, the processGCode call will not actually lead to transformation,
				// but only analysis. The fullAnalysis option applies only is this non-transformative scenario.
				const result =
					outputFile != null && outputFile.trim() !== ''
						? await processGCode(inputFile, outputFile, { ...opts, fullAnalysis: false })
						: await inspectGCode(inputFile, { ...opts, fullAnalysis: false });

				getLogger().info(result, 'postprocessor result');

				if (!result.wasAlreadyProcessed && args.overwriteInput && result.isProcessed) {
					getLogger().info({ outputFile, inputFile }, 'renaming output file to input file');
					fs.renameSync(outputFile, inputFile);
				}
				if (
					result.wasAlreadyProcessed &&
					result.printability === Printability.READY &&
					!args.overwriteInput &&
					outputFile != null &&
					outputFile.trim() !== ''
				) {
					getLogger().info(
						{ outputFile, inputFile },
						'Input file already processed. Copying input file to output file',
					);
					// If the file was already processed, output file is provided and the printability is READY, copy the file to the output location
					fs.copyFileSync(inputFile, outputFile);
				}
				if (rerender && isInteractive) {
					rerender(<ProgressReportUI fileName={path.basename(inputFile)} done={true} />);
				} else {
					toPostProcessorCLIOutput({
						result: 'success',
						payload: result,
					});
				}
			} catch (e) {
				let errorMessage =
					'An unexpected error occurred while processing the file, please download a debug-zip and report this issue.';
				let errorTitle = 'An unexpected error occurred during post-processing';
				let errorCode: z.input<typeof ErrorCodes> = 'UNKNOWN_ERROR';
				if (e instanceof GCodeProcessorError) {
					errorTitle = 'G-code could not be processed';
					errorMessage = e.message;
					if (e instanceof SlicerNotSupported) {
						errorTitle = 'Unsupported slicer version';
						errorCode = 'UNSUPPORTED_SLICER_VERSION';
					}
					if (e instanceof GCodeError && e.lineNumber) {
						errorTitle += ` (line ${e.lineNumber})`;
						errorMessage += `\n\nLine ${e.lineNumber}: ${e.line}`;
						errorCode = 'G_CODE_ERROR';
					}
					if (e instanceof GeneratorIdentificationNotFound) {
						errorCode = 'UNKNOWN_GCODE_GENERATOR';
					}
				} else if (e instanceof Error) {
					if ('code' in e && e.code === 'ENOENT' && 'path' in e) {
						errorTitle = 'File not found';
						errorMessage = `File ${e.path} not found`;
						errorCode = 'FILE_NOT_FOUND';
					} else {
						getLogger().error(e, 'Unexpected error while processing gcode file');
					}
				} else {
					getLogger().error(e, 'Unexpected error while processing gcode file');
				}
				if (rerender && isInteractive) {
					rerender(<ProgressReportUI fileName={path.basename(inputFile)} error={errorMessage} />);
				} else {
					toPostProcessorCLIOutput({
						result: 'error',
						message: errorMessage,
						title: errorTitle,
						code: errorCode,
					});
				}
				process.exit(1);
			}
		});
};

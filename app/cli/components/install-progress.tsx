import { Signal, useSignal } from '@/app/_helpers/signal';
import { TextProps, Static, Box, Text, Transform } from 'ink';
import Spinner from 'ink-spinner';
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { formatCmd, renderError } from '@/cli/util';
import { Container } from '@/cli/components/container';
import { ConfirmInput } from '@inkjs/ui';

export type InstallStep = {
	name: string;
	prompt?: string;
	status: 'success' | 'error' | 'pending' | 'running' | 'warning' | 'paused' | 'skipped';
};

export type StepResult = {
	newName: string;
	stepStatus: 'success' | 'error' | 'warning' | 'skipped';
};

export type InstallAction = SimplifyObject<
	Omit<InstallStep, 'status'> & {
		/**
		 * The action to run for the step.
		 * Note that the process will not halt on errors or promise rejection.
		 * You're responsible for handling subsequent steps if the abortSignal is aborted.
		 *
		 * @param abortSignal - The abort signal to abort the step
		 * @param helpers - The helpers to insert and append steps
		 * @returns The step result
		 */
		execute: (
			abortSignal: AbortSignal,
			helpers: {
				/**
				 * Insert a step after the current one.
				 * @param step - The step to insert
				 */
				insertStep: (step: InstallActionWithStatus) => void;
				/**
				 * Append a step to the end of the list of steps.
				 * @param step - The step to append
				 */
				appendStep: (step: InstallActionWithStatus) => void;
				/**
				 * Push a warning to the list of warnings.
				 * @param warning - The warning to push
				 */
				pushWarning: (warning: string) => void;
				/**
				 * Push an error to the list of errors.
				 * @param error - The error to push
				 */
				pushError: (error: string) => void;
				/**
				 * The command signal to log commands.
				 */
				cmdSignal: Signal<string | null>;
				stepName: string;
			},
		) => Promise<StepResult>;
	}
>;

export type InstallActionWithStatus = SimplifyObject<InstallStep & InstallAction>;

const actionsToSteps = (actions: InstallActionWithStatus[]): InstallStep[] => {
	return actions.map((action) => ({
		name: action.name,
		status: action.status,
		prompt: action.prompt,
	}));
};

const populateActionStatus = (actions: InstallAction[]): InstallActionWithStatus[] => {
	return actions.map((action) => ({
		...action,
		status: 'pending',
	}));
};

export const skipActionIfAborted = (execute: InstallAction['execute']): InstallAction['execute'] => {
	return async (...args: Parameters<InstallAction['execute']>) => {
		const abortSignal = args[0];
		if (abortSignal.aborted) {
			return { newName: `${args[1].stepName} (Aborted)`, stepStatus: 'error' };
		}
		return await execute(...args);
	};
};

export const InstallProgress: React.FC<{
	initialStatusText: string;
	initialStatusColor?: TextProps['color'];
	cmdSignal: Signal<string | null>;
	/**
	 * The steps to run. These cannot change after the first render.
	 */
	steps: InstallAction[];
}> = (props) => {
	const cmdSignalRef = useRef<Signal<string | null>>(props.cmdSignal);
	const isInitiated = useRef(false);
	const actions = useRef<InstallActionWithStatus[]>(populateActionStatus(props.steps));
	const [steps, setSteps] = useState<InstallStep[]>(actionsToSteps(actions.current));
	const [warnings, setWarnings] = useState<string[]>([]);
	const [errors, setErrors] = useState<string[]>([]);
	const [status, setStatus] = useState<string>(props.initialStatusText);
	const [statusColor, setStatusColor] = useState<TextProps['color']>(props.initialStatusColor ?? 'white');
	const [isPaused, setIsPaused] = useState(false);
	const onStepUnpaused = useCallback((confirmed: boolean, step: InstallStep) => {
		if (confirmed) {
			setIsPaused(false);
		} else {
			renderError(`Installation aborted at step "${step.name}"`);
		}
	}, []);

	useEffect(() => {
		if (isPaused) {
			isInitiated.current = false;
		}
		if (isInitiated.current) {
			return;
		}
		let abortController = new AbortController();
		let pausedInLoop = false;
		setSteps(actionsToSteps(actions.current));
		setStatus(props.initialStatusText);
		setStatusColor(props.initialStatusColor ?? 'white');
		setWarnings([]);
		setErrors([]);
		const runSteps = async () => {
			// NOTE: Actions are responsible for checking the abort signal and acting accordingly
			while (actions.current.some((step) => step.status === 'pending' || step.status === 'paused')) {
				const nextStep = actions.current.find((step) => step.status === 'pending' || step.status === 'paused');
				if (!nextStep) {
					setStatusColor('green');
					break;
				}
				const index = actions.current.indexOf(nextStep);
				const wasPaused = nextStep.status === 'paused';
				actions.current[index].status = nextStep.prompt && nextStep.status !== 'paused' ? 'paused' : 'running';
				setSteps(actionsToSteps(actions.current));
				if (nextStep.prompt && !wasPaused) {
					setIsPaused(true);
					pausedInLoop = true;
					isInitiated.current = false;
					setSteps(actionsToSteps(actions.current));
					break;
				}
				try {
					const result = await nextStep.execute(abortController.signal, {
						insertStep: (step) => {
							actions.current.splice(index + 1, 0, step);
							setSteps(actionsToSteps(actions.current));
						},
						appendStep: (step) => {
							actions.current.push(step);
							setSteps(actionsToSteps(actions.current));
						},
						pushWarning: (warning) => setWarnings((prev) => [...prev, warning]),
						pushError: (error) => setErrors((prev) => [...prev, error]),
						cmdSignal: cmdSignalRef.current,
						stepName: nextStep.name,
					});
					actions.current[index] = {
						...actions.current[index],
						status: result.stepStatus,
						name: result.newName ?? actions.current[index].name,
					};
					setSteps(actionsToSteps(actions.current));
				} catch (error) {
					setErrors((prev) => [
						...prev,
						error instanceof Error
							? `Error in step "${actions.current[index].name}":\n${error.message}`
							: `Unknown error occurred in step "${actions.current[index].name}"`,
					]);
					actions.current[index] = {
						...actions.current[index],
						status: 'error',
						name: actions.current[index].name,
					};
					abortController.abort();
					setSteps(actionsToSteps(actions.current));
					break;
				}
			}
		};
		if (!isPaused) {
			isInitiated.current = true;
			runSteps();
		}
		return () => {
			if (!pausedInLoop) {
				abortController.abort();
			}
		};
	}, [props.initialStatusText, props.initialStatusColor, isPaused]);

	return (
		<InstallProgressUI
			steps={steps}
			warnings={warnings}
			errors={errors}
			cmdSignal={cmdSignalRef.current}
			status={status}
			statusColor={statusColor}
			onStepUnpaused={onStepUnpaused}
		/>
	);
};

export const InstallProgressUI: React.FC<{
	cmdSignal: Signal<string | null>;
	status: string;
	statusColor?: TextProps['color'];
	stepTextBeforeSteps?: boolean;
	stepText?: string;
	stepTextColor?: TextProps['color'];
	onStepUnpaused?: (confirmed: boolean, step: InstallStep) => void;
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
	const pausedStep = props.steps?.find((step) => step.status === 'paused');
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
							<Text bold={true}>▶{'  '}</Text>
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
							{step.status === 'paused' && (
								<Text bold={true} color="yellow">
									⏸{'  '}
								</Text>
							)}
							{step.status === 'skipped' && (
								<Text bold={true} color="gray">
									⏭{'  '}
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
			{currentCmd && !pausedStep && (
				<Box marginTop={1} flexDirection="column">
					<Text color="white">
						Running: <Transform transform={formatCmd}>{currentCmd}</Transform>
					</Text>
				</Box>
			)}
			{pausedStep && (
				<Box marginTop={1} flexDirection="column">
					<Text color="yellowBright" bold>
						{pausedStep.prompt ?? 'Continue?'}{' '}
						<ConfirmInput
							defaultChoice="cancel"
							onConfirm={() => props.onStepUnpaused?.(true, pausedStep)}
							onCancel={() => props.onStepUnpaused?.(false, pausedStep)}
						/>
					</Text>
				</Box>
			)}
		</Container>
	);
};

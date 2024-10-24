import { Signal, useSignal } from '@/app/_helpers/signal.ts';
import { TextProps, Static, Box, Text, Transform } from 'ink';
import Spinner from 'ink-spinner';
import { useState, useCallback } from 'react';
import { formatCmd } from '@/cli/util.tsx';
import { Container } from '@/cli/components/container.tsx';

export type InstallStep = {
	name: string;
	status: 'success' | 'error' | 'pending' | 'running' | 'warning';
};

export const InstallProgressUI: React.FC<{
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

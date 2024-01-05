import { Box, Text } from 'ink';
import React from 'react';

export interface APIResult {
	result: 'success' | 'error' | 'warning' | 'info' | 'skip';
	message: string;
}

interface StatusProps {
	results: APIResult | APIResult[];
}

export const Status: React.FC<StatusProps> = (props) => {
	const hasError = Array.isArray(props.results)
		? props.results.some((result) => result.result === 'error')
		: props.results.result === 'error';
	const results = Array.isArray(props.results) ? props.results : [props.results];
	return (
		<Box flexDirection="column">
			{hasError ? <Text color="red">Error!</Text> : <Text color="green">Success!</Text>}
			{results.map(({ message, result }, i) => (
				<Box key={i}>
					{result === 'success' ? (
						<Text color="green" bold={true}>
							✓{' '}
						</Text>
					) : result === 'info' ? (
						<Text color="blue" bold={true}>
							ℹ{' '}
						</Text>
					) : result === 'warning' ? (
						<Text color="yellow" bold={true}>
							⚠{' '}
						</Text>
					) : result === 'skip' ? (
						<Text color="white" bold={true}>
							●{' '}
						</Text>
					) : (
						<Text color="red" bold={true}>
							✘{' '}
						</Text>
					)}
					<Text dimColor>{message}</Text>
				</Box>
			))}
		</Box>
	);
};

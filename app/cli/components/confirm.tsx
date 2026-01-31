import { Container } from '@/cli/components/container';
import { ConfirmInput } from '@inkjs/ui';
import { Box, render, Text } from 'ink';
import React from 'react';
export const Confirm: React.FC<{
	prompt: string;
	message?: string;
	default?: boolean;
	onConfirm: () => void;
	onCancel: () => void;
}> = ({ prompt, message, default: defaultConfirmation, onConfirm, onCancel }) => {
	return (
		<Container>
			<Box gap={1}>
				<Text bold>{prompt}</Text>
				<ConfirmInput
					onConfirm={onConfirm}
					onCancel={onCancel}
					defaultChoice={defaultConfirmation === false ? 'cancel' : 'confirm'}
				/>
			</Box>
			{message && (
				<Box gap={1}>
					<Text dimColor={true}>{message}</Text>
				</Box>
			)}
		</Container>
	);
};

export const confirm = async (prompt: string, message?: string, defaultConfirmation?: boolean) => {
	return new Promise<boolean>((resolve) => {
		render(
			<Confirm
				prompt={prompt}
				message={message}
				default={defaultConfirmation}
				onConfirm={() => {
					resolve(true);
				}}
				onCancel={() => {
					resolve(false);
				}}
			/>,
		);
	});
};

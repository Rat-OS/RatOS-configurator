import { Box } from 'ink';
import React from 'react';

export const Container: React.FC<React.PropsWithChildren> = (props) => {
	return (
		<Box padding={2} flexDirection="column">
			{props.children}
		</Box>
	);
};

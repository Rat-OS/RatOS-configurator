import { Box } from 'ink';
import React from 'react';

export const Container: React.FC<React.PropsWithChildren> = (props) => {
	return (
		<Box paddingTop={1} paddingBottom={1} paddingLeft={2} paddingRight={2} flexDirection="column">
			{props.children}
		</Box>
	);
};

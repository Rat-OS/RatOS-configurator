import React from 'react';

export const ExposureIcon = (props: { className?: string }) => (
	<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" className={props.className}>
		<path
			fill="currentColor"
			d="M456,40H56A16,16,0,0,0,40,56V456a16,16,0,0,0,16,16H456a16,16,0,0,0,16-16V56A16,16,0,0,0,456,40ZM72,72H417.373L72,417.373ZM440,440H94.627L440,94.627Z"
		/>
		<polygon
			fill="currentColor"
			points="336 368 336 408 368 408 368 368 408 368 408 336 368 336 368 296 336 296 336 336 296 336 296 368 336 368"
		/>
		<rect width="112" height="32" x="112" y="136" fill="currentColor" />
	</svg>
);

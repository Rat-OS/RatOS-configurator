import { ExclamationCircleIcon } from '@heroicons/react/24/solid';
import React from 'react';

interface WarningMessageProps {
	title?: string;
}

export const WarningMessage: React.FC<WarningMessageProps> = (props) => {
	return (
		<div className="rounded-md bg-amber-50 dark:bg-amber-800 p-4">
			<div className="flex">
				<div className="flex-shrink-0">
					<ExclamationCircleIcon className="h-5 w-5 text-amber-400" aria-hidden="true" />
				</div>
				<div className="ml-3">
					<h3 className="text-sm font-medium text-amber-800 dark:text-amber-100">{props.title ?? 'Info'}</h3>
					<div className="mt-2 text-sm text-amber-700 dark:text-amber-200">
						<p>{props.children}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

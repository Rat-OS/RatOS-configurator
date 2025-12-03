'use client';

import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Card } from '@/components/common/card';
import { Button } from '@/components/common/button';
import { ErrorMessage } from '@/components/common/error-message';
import { AlertTriangle, RefreshCw, Download } from 'lucide-react';
import { getLogger } from '@/app/_helpers/logger';

interface UpdateLogsErrorFallbackProps {
	error: Error;
	resetErrorBoundary: () => void;
}

const UpdateLogsErrorFallback: React.FC<UpdateLogsErrorFallbackProps> = ({ error, resetErrorBoundary }) => {
	const handleDownloadDebugInfo = () => {
		window.location.href = '/configure/api/debug-zip';
	};

	return (
		<div className="flex h-full flex-1 flex-col items-center justify-center space-y-8 p-8">
			<Card className="m-12 w-3/4 p-6">
				<div className="space-y-4 text-center">
					<AlertTriangle className="mx-auto h-12 w-12 text-red-500" />
					<div>
						<h2 className="mb-2 text-xl font-semibold text-red-400">Update Logs Error</h2>
						<ErrorMessage className="text-left" title="Failed to load update logs">
							{error.message}
						</ErrorMessage>
					</div>

					<div className="flex flex-col justify-center gap-3 sm:flex-row">
						<Button onClick={resetErrorBoundary} className="flex items-center gap-2">
							<RefreshCw className="h-4 w-4" />
							Try Again
						</Button>
						<Button variant="outline" onClick={handleDownloadDebugInfo} className="flex items-center gap-2">
							<Download className="h-4 w-4" />
							Download Debug Info
						</Button>
					</div>

					<div className="mx-auto max-w-md text-sm text-muted-foreground">
						<p>
							If this error persists, please download the debug information and share it on the RatOS support channel
							for assistance.
						</p>
					</div>
				</div>
			</Card>
		</div>
	);
};

interface UpdateLogsErrorBoundaryProps {
	children: React.ReactNode;
}

export const UpdateLogsErrorBoundary: React.FC<UpdateLogsErrorBoundaryProps> = ({ children }) => {
	const handleError = (error: Error, errorInfo: { componentStack: string }) => {
		// Log the error for debugging
		getLogger().error('Update logs error boundary caught an error', {
			error: error.message,
			stack: error.stack,
			componentStack: errorInfo.componentStack,
		});
	};

	return (
		<ErrorBoundary
			FallbackComponent={UpdateLogsErrorFallback}
			onError={handleError}
			onReset={() => {
				// Optionally clear any error state or refresh data
				window.location.reload();
			}}
		>
			{children}
		</ErrorBoundary>
	);
};

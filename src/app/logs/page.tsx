import { LogsViewer } from '@/app/logs/_components/logs-viewer';
import { LogsErrorBoundary } from '@/app/logs/_components/logs-error-boundary';

/**
 * Renders the logs viewer page with error boundary protection.
 *
 * Displays the `LogsViewer` component wrapped in a `LogsErrorBoundary` to handle and display errors that may occur during log viewing.
 */
export default function LogsPage() {
	return (
		<LogsErrorBoundary>
			<LogsViewer />
		</LogsErrorBoundary>
	);
}

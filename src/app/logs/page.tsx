import { LogsViewer } from '@/app/logs/_components/logs-viewer';
import { LogsErrorBoundary } from '@/app/logs/_components/logs-error-boundary';

export default function LogsPage() {
	return (
		<LogsErrorBoundary>
			<LogsViewer />
		</LogsErrorBoundary>
	);
}

import React, { Suspense } from 'react';
import { trpc } from '@/utils/trpc';
import { twMerge } from 'tailwind-merge';
import { Button } from '@/components/common/button';
import { Spinner } from '@/components/common/spinner';
import { Badge } from '@/components/common/badge';
import { Modal } from '@/components/common/modal';
import { AnimatedContainer } from '@/components/common/animated-container';
import {
	AlertCircle,
	CheckCircle,
	Clock,
	Download,
	RefreshCw,
	Trash2,
	FileText,
	FileClock,
	FileCode,
	FileJson,
} from 'lucide-react';
import { formatBytes } from '@/helpers/util';
import { LogSummary } from '@/app/logs/_components/types';

interface LogSummaryHeaderProps {
	isLoading: boolean;
	summary: LogSummary;
	onRefresh: () => void;
	onClear: () => void;
}

export const LogSummaryHeader: React.FC<LogSummaryHeaderProps> = ({ isLoading, summary, onRefresh, onClear }) => {
	const clearMutation = trpc.logs.clear.useMutation({
		onSuccess: () => {
			onClear();
		},
	});

	const generateMockDataMutation = trpc.logs.generateMockData.useMutation({
		onSuccess: () => {
			onRefresh();
		},
	});

	return (
		<header>
			{/* Heading */}
			<div className="border-t border-solid border-white/10 bg-zinc-700/15 backdrop-blur-sm">
				<div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-x-8 gap-y-4 px-4 py-4 @screen-sm:flex-row @screen-sm:items-center @screen-sm:px-6 @screen-lg:px-8">
					<div>
						<div className="flex items-center gap-x-3">
							<div
								className={twMerge(
									'inline flex-none rounded-full bg-green-400/10 p-1 text-zinc-400',
									(isLoading || !summary.logFileExists) && 'bg-zinc-400/10 text-zinc-400',
									!isLoading &&
										summary.logFileExists &&
										summary.lastUpdate &&
										!summary.success &&
										'bg-red-400/10 text-red-400',
									!isLoading &&
										summary.logFileExists &&
										summary.lastUpdate &&
										summary.success &&
										'bg-lime-400/10 text-lime-400',
									!isLoading && summary.logFileExists && !summary.lastUpdate && 'bg-blue-400/10 text-blue-400',
								)}
							>
								{isLoading ? <Spinner className="h-4 w-4" noMargin /> : <FileText className="h-4 w-4" />}
							</div>
							<h1 className="flex gap-x-3 text-base leading-7">
								<span className="font-semibold text-white">System Logs</span>
								<span className="text-zinc-600">/</span>
								<span className="font-semibold text-white">
									{!summary.logFileExists
										? 'No Log File Found'
										: !summary.lastUpdate
											? 'Ready'
											: summary.success
												? 'Last Update Success'
												: 'Last Update Failed'}
								</span>
							</h1>
						</div>
					</div>
					<div className="flex gap-2">
						<Button variant="outline" size="default" onClick={onRefresh}>
							<RefreshCw className="h-4 w-4" />
							Refresh
						</Button>
						{process.env.NODE_ENV === 'development' && (
							<Button
								variant="outline"
								size="default"
								onClick={() => generateMockDataMutation.mutate()}
								disabled={generateMockDataMutation.isLoading}
							>
								<FileText className="h-4 w-4" />
								Generate Test Data
							</Button>
						)}
						<Button
							variant="outline"
							size="default"
							onClick={() => clearMutation.mutate()}
							disabled={clearMutation.isLoading || !summary.logFileExists}
						>
							<Trash2 className="h-4 w-4" />
							Clear
						</Button>
					</div>
				</div>
			</div>

			{/* Stats */}
			{summary.logFileExists && (
				<div className="border-t border-solid border-white/5 bg-zinc-700/10 backdrop-blur-sm">
					<div className="mx-auto grid max-w-7xl grid-cols-1 @screen-sm:grid-cols-2 @screen-lg:grid-cols-4">
						{/* Status */}
						<div className="border-[1px] border-solid border-white/5 px-4 py-6 @screen-sm:px-6 @screen-lg:px-8">
							<p className="text-sm font-medium leading-6 text-white">Update Status</p>
							<div className="mt-2 flex items-center gap-2">
								{!summary.lastUpdate ? (
									<Clock className="h-5 w-5 text-blue-400" />
								) : summary.success ? (
									<CheckCircle className="h-5 w-5 text-green-400" />
								) : (
									<AlertCircle className="h-5 w-5 text-red-400" />
								)}
								<span className="text-lg font-semibold text-white">
									{!summary.lastUpdate ? 'Ready' : summary.success ? 'Success' : 'Failed'}
								</span>
							</div>
							<div className="mt-1 text-sm text-zinc-400">
								{summary.totalEntries} entries • {formatBytes(summary.logFileSize)}
							</div>
						</div>

						{/* Log Levels */}
						<div className="border-solid border-white/5 px-4 py-6 @screen-sm:border-l @screen-sm:px-6 @screen-lg:px-8">
							<p className="text-sm font-medium leading-6 text-white">Log Levels</p>
							<div className="mt-2 flex flex-wrap gap-1">
								{summary.errorCount > 0 && (
									<Badge color="red" size="sm">
										Errors: {summary.errorCount}
									</Badge>
								)}
								{summary.fatalCount > 0 && (
									<Badge color="purple" size="sm">
										Fatal: {summary.fatalCount}
									</Badge>
								)}
								{summary.warnCount > 0 && (
									<Badge color="yellow" size="sm">
										Warnings: {summary.warnCount}
									</Badge>
								)}
								<Badge color="sky" size="sm">
									Info: {summary.infoCount}
								</Badge>
							</div>
						</div>

						{/* Timing */}
						<div className="border-solid border-white/5 px-4 py-6 @screen-sm:px-6 @screen-lg:px-8 lg:border-l">
							<p className="text-sm font-medium leading-6 text-white">Last Update</p>
							<div className="mt-2">
								{summary.lastUpdate ? (
									<div className="flex items-center gap-1">
										<Clock className="h-4 w-4 text-zinc-400" />
										<span className="text-sm text-white">{new Date(summary.lastUpdate).toLocaleString()}</span>
									</div>
								) : (
									<span className="text-sm text-zinc-400">No updates performed yet</span>
								)}
								{summary.duration && <div className="mt-1 text-sm text-zinc-400">Duration: {summary.duration}</div>}
							</div>
						</div>

						{/* Actions */}
						<div className="border-solid border-white/5 px-4 py-6 @screen-sm:border-l @screen-sm:px-6 @screen-lg:px-8">
							<p className="text-sm font-medium leading-6 text-white">Actions</p>
							<div className="mt-2">
								<Modal
									onClick={() => (window.location.href = '/configure/api/debug-zip')}
									title="This archive may contain sensitive information"
									wide={true}
									body="Please inspect the contents of the zip before posting it publically. Make sure you use Moonraker Secrets if configuring moonraker for third party services."
									content={
										<AnimatedContainer>
											<h3 className="mb-1 font-medium tracking-tight">The following files will be zipped</h3>
											<ul className="grid gap-2 pb-2 text-muted-foreground">
												<Suspense fallback={<Spinner />}>
													{trpc.debugFileList.useSuspenseQuery()[0].map((file) => {
														return (
															<li key={file.path} className="flex items-center gap-2 text-sm">
																{(file.name.endsWith('.log') || file.name.split('.').slice(-2)[0] === 'log') && (
																	<FileClock className="h-4 w-4 flex-shrink-0 text-zinc-100/40" aria-hidden="true" />
																)}
																{file.name.endsWith('.cfg') && (
																	<FileCode className="h-4 w-4 flex-shrink-0 text-zinc-100/40" aria-hidden="true" />
																)}
																{file.name.endsWith('.json') && (
																	<FileJson className="h-4 w-4 flex-shrink-0 text-zinc-100/40" aria-hidden="true" />
																)}
																<span>
																	{file.orgPath.replace('/home/pi', '~')} ({formatBytes(file.size)})
																</span>
															</li>
														);
													})}
												</Suspense>
											</ul>
										</AnimatedContainer>
									}
									buttonLabel="I understand"
								>
									<Button variant="outline" size="sm">
										<Download className="mr-1 h-4 w-4" />
										Download Debug Info
									</Button>
								</Modal>
							</div>
						</div>
					</div>
				</div>
			)}

			{/* No file state */}
			{!summary.logFileExists && (
				<div className="border-t border-solid border-white/10 bg-zinc-700/10 backdrop-blur-sm">
					<div className="mx-auto max-w-7xl px-4 py-8 text-center @screen-sm:px-6 @screen-lg:px-8">
						<FileText className="mx-auto mb-4 h-12 w-12 text-blue-400 opacity-50" />
						<p className="text-white">System ready for updates</p>
						<p className="text-sm text-zinc-400">No update logs yet - run an update to generate logs</p>
					</div>
				</div>
			)}
		</header>
	);
};

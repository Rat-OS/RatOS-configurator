'use client';

import React, { useState, Suspense, useMemo, useEffect, useRef } from 'react';
import { trpc } from '@/utils/trpc';
import { twMerge } from 'tailwind-merge';
import { useWindowVirtualizer } from '@tanstack/react-virtual';
import { Button } from '@/components/common/button';
import { Spinner } from '@/components/common/spinner';
import { ErrorMessage } from '@/components/common/error-message';
import { Badge, badgeBorderColorStyle } from '@/components/common/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { Label } from '@/components/ui/label';

import {
	AlertCircle,
	CheckCircle,
	Clock,
	Download,
	RefreshCw,
	Trash2,
	FileText,
	Eye,
	EyeOff,
	FileClock,
	FileCode,
	FileJson,
} from 'lucide-react';
import { formatBytes } from '@/helpers/util';
import { Modal } from '@/components/common/modal';
import { AnimatedContainer } from '@/components/common/animated-container';

interface LogEntry {
	level: number;
	time: string;
	msg: string;
	source?: string;
	context?: string;
	errorCode?: string;
	pid?: number;
	hostname?: string;
}

interface LogSummary {
	totalEntries: number;
	errorCount: number;
	warnCount: number;
	infoCount: number;
	debugCount: number;
	traceCount: number;
	fatalCount: number;
	lastUpdate: string | null;
	duration: string | null;
	success: boolean;
	logFileSize: number;
	logFileExists: boolean;
}

const LOG_LEVELS: Record<number, { name: string; color: string; bgColor: string; badgeColor: string }> = {
	10: {
		name: 'TRACE',
		color: 'text-zinc-600 dark:text-zinc-400',
		bgColor: 'bg-zinc-50 dark:bg-zinc-400/10',
		badgeColor: 'gray',
	},
	20: {
		name: 'DEBUG',
		color: 'text-cyan-700 dark:text-cyan-400',
		bgColor: 'bg-cyan-50 dark:bg-cyan-400/10',
		badgeColor: 'sky',
	},
	30: {
		name: 'INFO',
		color: 'text-green-700 dark:text-green-400',
		bgColor: 'bg-green-50 dark:bg-green-400/10',
		badgeColor: 'green',
	},
	40: {
		name: 'WARN',
		color: 'text-yellow-800 dark:text-yellow-500',
		bgColor: 'bg-yellow-50 dark:bg-yellow-400/10',
		badgeColor: 'yellow',
	},
	50: {
		name: 'ERROR',
		color: 'text-red-700 dark:text-red-400',
		bgColor: 'bg-red-50 dark:bg-red-400/10',
		badgeColor: 'red',
	},
	60: {
		name: 'FATAL',
		color: 'text-purple-700 dark:text-purple-400',
		bgColor: 'bg-purple-50 dark:bg-purple-400/10',
		badgeColor: 'purple',
	},
};

const LogSummaryHeader: React.FC<{ summary: LogSummary; onRefresh: () => void; onClear: () => void }> = ({
	summary,
	onRefresh,
	onClear,
}) => {
	const clearMutation = trpc['update-logs'].clear.useMutation({
		onSuccess: () => {
			onClear();
		},
	});

	const generateMockDataMutation = trpc['update-logs'].generateMockData.useMutation({
		onSuccess: () => {
			onRefresh();
		},
	});

	return (
		<header>
			{/* Heading */}
			<div className="bg-zinc-700/15 backdrop-blur-sm">
				<div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-x-8 gap-y-4 px-4 py-4 @screen-sm:flex-row @screen-sm:items-center @screen-sm:px-6 @screen-lg:px-8">
					<div>
						<div className="flex items-center gap-x-3">
							<div
								className={twMerge(
									'flex-none rounded-full bg-green-400/10 p-1 text-zinc-400',
									!summary.logFileExists && 'bg-zinc-400/10 text-zinc-400',
									summary.logFileExists && summary.lastUpdate && !summary.success && 'bg-red-400/10 text-red-400',
									summary.logFileExists && summary.lastUpdate && summary.success && 'bg-green-400/10 text-green-400',
									summary.logFileExists && !summary.lastUpdate && 'bg-blue-400/10 text-blue-400',
								)}
							>
								<FileText className="h-4 w-4" />
							</div>
							<h1 className="flex gap-x-3 text-base leading-7">
								<span className="font-semibold text-white">Update Logs</span>
								<span className="text-zinc-600">/</span>
								<span className="font-semibold text-white">
									{!summary.logFileExists
										? 'No File'
										: !summary.lastUpdate
											? 'Ready'
											: summary.success
												? 'Success'
												: 'Failed'}
								</span>
							</h1>
						</div>
					</div>
					<div className="flex gap-2">
						<Button variant="outline" size="default" onClick={onRefresh}>
							<RefreshCw className="mr-1 h-4 w-4" />
							Refresh
						</Button>
						{process.env.NODE_ENV === 'development' && (
							<Button
								variant="outline"
								size="default"
								onClick={() => generateMockDataMutation.mutate()}
								disabled={generateMockDataMutation.isLoading}
							>
								<FileText className="mr-1 h-4 w-4" />
								Generate Test Data
							</Button>
						)}
						<Button
							variant="outline"
							size="default"
							onClick={() => clearMutation.mutate()}
							disabled={clearMutation.isLoading || !summary.logFileExists}
						>
							<Trash2 className="mr-1 h-4 w-4" />
							Clear
						</Button>
					</div>
				</div>
			</div>

			{/* Stats */}
			{summary.logFileExists && (
				<div className="border-t border-white/5 bg-zinc-700/10 backdrop-blur-sm">
					<div className="mx-auto grid max-w-7xl grid-cols-1 @screen-sm:grid-cols-2 @screen-lg:grid-cols-4">
						{/* Status */}
						<div className="border-white/5 px-4 py-6 @screen-sm:px-6 @screen-lg:px-8">
							<p className="text-sm font-medium leading-6 text-white">Status</p>
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
						<div className="border-white/5 px-4 py-6 @screen-sm:border-l @screen-sm:px-6 @screen-lg:px-8">
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
						<div className="border-white/5 px-4 py-6 @screen-sm:px-6 @screen-lg:px-8 lg:border-l">
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
						<div className="border-white/5 px-4 py-6 @screen-sm:border-l @screen-sm:px-6 @screen-lg:px-8">
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
				<div className="border-t border-white/5 bg-zinc-700/10 backdrop-blur-sm">
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

const LogEntryComponent: React.FC<{ entry: LogEntry; showDetails: boolean }> = ({ entry, showDetails }) => {
	const level = LOG_LEVELS[entry.level] || {
		name: 'UNKNOWN',
		color: 'text-zinc-600 dark:text-zinc-400',
		bgColor: 'bg-zinc-50 dark:bg-zinc-400/10',
		badgeColor: 'gray',
	};
	const timestamp = new Date(entry.time).toLocaleString();
	const borderStyle = badgeBorderColorStyle({ color: level.badgeColor as any });

	return (
		<div className={twMerge('min-h-[60px] rounded-lg border p-3', level.bgColor, borderStyle)}>
			<div className="flex items-start justify-between gap-2">
				<div className="min-w-0 flex-1">
					<div className="mb-1 flex items-center justify-between gap-2">
						<div className="flex items-center gap-2">
							<Badge color={level.badgeColor as any} size="sm">
								{level.name}
							</Badge>
							<span className="text-xs text-muted-foreground">{timestamp}</span>
						</div>
						{entry.context && showDetails && (
							<Badge color="gray" size="sm">
								{entry.context}
							</Badge>
						)}
					</div>
					<p className={`text-sm ${level.color} break-words`}>{entry.msg}</p>
					{showDetails && (
						<div className="mt-2 space-y-1 text-xs text-muted-foreground">
							{entry.errorCode && (
								<div>
									Error Code: <code className="rounded bg-muted px-1 text-muted-foreground">{entry.errorCode}</code>
								</div>
							)}
							{entry.pid && <div>PID: {entry.pid}</div>}
							{entry.hostname && <div>Host: {entry.hostname}</div>}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

// Virtualized log list component with infinite scrolling
interface VirtualizedLogListProps {
	entries: LogEntry[];
	isLoading: boolean;
	error: any;
	hasNextPage: boolean;
	isFetchingNextPage: boolean;
	fetchNextPage: () => void;
	showDetails: boolean;
	showOnlyErrors: boolean;
	logLevel: string;
	setLogLevel: (level: string) => void;
	selectedContext: string;
	setSelectedContext: (context: string) => void;
	setShowDetails: (show: boolean) => void;
	setShowOnlyErrors: (show: boolean) => void;
	sortDirection: 'desc' | 'asc';
	setSortDirection: (direction: 'desc' | 'asc') => void;
	contexts: string[];
}

const VirtualizedLogList: React.FC<VirtualizedLogListProps> = ({
	entries,
	isLoading,
	error,
	hasNextPage,
	isFetchingNextPage,
	fetchNextPage,
	showDetails,
	showOnlyErrors,
	logLevel,
	setLogLevel,
	selectedContext,
	setSelectedContext,
	setShowDetails,
	setShowOnlyErrors,
	sortDirection,
	setSortDirection,
	contexts,
}) => {
	// Create a ref for the container to calculate scroll margins
	const containerRef = useRef<HTMLDivElement>(null);

	const virtualizer = useWindowVirtualizer({
		count: hasNextPage ? entries.length + 1 : entries.length,
		estimateSize: () => (showDetails ? 120 : 80), // Dynamic estimation based on details visibility
		overscan: 5,
		scrollMargin: containerRef.current?.offsetTop ?? 0,
		paddingEnd: (containerRef.current?.offsetParent as HTMLElement)?.offsetTop ?? 0,
	});

	// Load more items when scrolling near the end
	const virtualItems = virtualizer.getVirtualItems();

	useEffect(() => {
		const [lastItem] = [...virtualItems].reverse();

		if (!lastItem) {
			return;
		}

		if (lastItem.index >= entries.length - 1 && hasNextPage && !isFetchingNextPage) {
			fetchNextPage();
		}
	}, [hasNextPage, fetchNextPage, entries.length, isFetchingNextPage, virtualItems]);

	return (
		<div className="px-4 @screen-sm:px-6 @screen-lg:px-8">
			<div className="mb-4 grid grid-cols-1 gap-4 rounded-lg border border-border bg-muted/20 p-4 md:grid-cols-2 lg:grid-cols-4">
				<div className="space-y-2">
					<Label htmlFor="log-level" className={showOnlyErrors ? 'text-muted-foreground' : ''}>
						Log Level
					</Label>
					<Select value={logLevel} onValueChange={setLogLevel} disabled={showOnlyErrors}>
						<SelectTrigger className={showOnlyErrors ? 'cursor-not-allowed opacity-50' : ''}>
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="trace">Trace</SelectItem>
							<SelectItem value="debug">Debug</SelectItem>
							<SelectItem value="info">Info</SelectItem>
							<SelectItem value="warn">Warning</SelectItem>
							<SelectItem value="error">Error</SelectItem>
							<SelectItem value="fatal">Fatal</SelectItem>
						</SelectContent>
					</Select>
				</div>

				<div className="space-y-2">
					<Label htmlFor="context" className={showOnlyErrors ? 'text-muted-foreground' : ''}>
						Context Filter
					</Label>
					<Select
						value={selectedContext || 'all'}
						onValueChange={(value) => setSelectedContext(value === 'all' ? '' : value)}
						disabled={showOnlyErrors}
					>
						<SelectTrigger className={showOnlyErrors ? 'cursor-not-allowed opacity-50' : ''}>
							<SelectValue placeholder="All contexts" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All contexts</SelectItem>
							{contexts.map((context) => (
								<SelectItem key={context} value={context}>
									{context}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>

				<div className="space-y-2">
					<Label htmlFor="sort-order">Sort Order</Label>
					<Select value={sortDirection} onValueChange={(value: 'desc' | 'asc') => setSortDirection(value)}>
						<SelectTrigger>
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="desc">Newest First</SelectItem>
							<SelectItem value="asc">Oldest First</SelectItem>
						</SelectContent>
					</Select>
				</div>

				<div className="space-y-2">
					<Label>View Options</Label>
					<div className="space-y-2">
						<Button
							variant={showOnlyErrors ? 'primary' : 'outline'}
							size="default"
							onClick={() => setShowOnlyErrors(!showOnlyErrors)}
							className="w-full justify-start"
						>
							{showOnlyErrors ? (
								<>
									<Eye className="mr-2 h-4 w-4" />
									Show All
								</>
							) : (
								<>
									<AlertCircle className="mr-2 h-4 w-4" />
									Errors Only
								</>
							)}
						</Button>
						<Button
							variant={showDetails ? 'primary' : 'outline'}
							size="default"
							onClick={() => setShowDetails(!showDetails)}
							className="w-full justify-start"
						>
							{showDetails ? (
								<>
									<EyeOff className="mr-2 h-4 w-4" />
									Hide Details
								</>
							) : (
								<>
									<Eye className="mr-2 h-4 w-4" />
									Show Details
								</>
							)}
						</Button>
					</div>
				</div>
			</div>

			{isLoading && entries.length === 0 ? (
				<div className="flex items-center justify-center p-8">
					<Spinner />
				</div>
			) : error ? (
				<ErrorMessage title="Failed to load log entries">{error.message}</ErrorMessage>
			) : entries.length === 0 ? (
				<div className="py-8 text-center text-muted-foreground">
					<FileText className="mx-auto mb-2 h-12 w-12 opacity-50" />
					<p>No log entries found</p>
					{showOnlyErrors && <p className="text-sm">No errors or warnings in the logs</p>}
				</div>
			) : (
				<>
					<div className="mb-2 text-sm text-muted-foreground">
						Showing {entries.length} entries
						{showOnlyErrors && ' (errors and warnings only)'}
						{hasNextPage && ' (scroll for more)'}
					</div>
					<div
						key={`virtualizer-${showDetails}`}
						ref={containerRef}
						style={{
							height: `${virtualizer.getTotalSize()}px`,
							width: '100%',
							position: 'relative',
						}}
					>
						{virtualizer.getVirtualItems().map((virtualItem) => {
							const isLoaderRow = virtualItem.index > entries.length - 1;
							const entry = entries[virtualItem.index];

							return (
								<div
									key={virtualItem.index}
									data-index={virtualItem.index}
									ref={virtualizer.measureElement}
									style={{
										position: 'absolute',
										top: 0,
										left: 0,
										width: '100%',
										transform: `translateY(${virtualItem.start - virtualizer.options.scrollMargin}px)`,
									}}
								>
									{isLoaderRow ? (
										hasNextPage ? (
											<div className="flex items-center justify-center p-4">
												<Spinner />
												<span className="ml-2 text-sm text-muted-foreground">Loading more entries...</span>
											</div>
										) : (
											<div className="flex items-center justify-center p-4 text-sm text-muted-foreground">
												No more entries to load
											</div>
										)
									) : (
										<div className="mb-2">
											<LogEntryComponent entry={entry} showDetails={showDetails} />
										</div>
									)}
								</div>
							);
						})}
					</div>
				</>
			)}
		</div>
	);
};

// Hook for managing infinite scroll data
const useInfiniteLogEntries = (
	showOnlyErrors: boolean,
	logLevel: string,
	selectedContext: string,
	showDetails: boolean,
	sortDirection: 'desc' | 'asc',
) => {
	const entriesQuery = trpc['update-logs'].entriesPaginated.useInfiniteQuery(
		{
			level: logLevel as any,
			context: selectedContext || undefined,
			showDetails,
			limit: 50,
			sortBy: 'time',
			sortDirection,
		},
		{
			enabled: !showOnlyErrors,
			getNextPageParam: (lastPage) => (lastPage.hasNextPage ? lastPage.nextCursor : undefined),
			retry: 3,
			retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
			staleTime: 10000, // 10 seconds
		},
	);

	const errorsQuery = trpc['update-logs'].errorsPaginated.useInfiniteQuery(
		{
			showDetails,
			limit: 50,
			sortBy: 'time',
			sortDirection,
		},
		{
			enabled: showOnlyErrors,
			getNextPageParam: (lastPage) => (lastPage.hasNextPage ? lastPage.nextCursor : undefined),
			retry: 3,
			retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
			staleTime: 10000, // 10 seconds
		},
	);

	const currentQuery = showOnlyErrors ? errorsQuery : entriesQuery;

	// Flatten all pages into a single array of entries - no client-side sorting needed
	const allEntries = useMemo(() => {
		return currentQuery.data?.pages.flatMap((page) => page.entries) ?? [];
	}, [currentQuery.data]);

	return {
		entries: allEntries,
		isLoading: currentQuery.isLoading,
		error: currentQuery.error,
		hasNextPage: currentQuery.hasNextPage,
		isFetchingNextPage: currentQuery.isFetchingNextPage,
		fetchNextPage: currentQuery.fetchNextPage,
		refetch: currentQuery.refetch,
	};
};

export const UpdateLogsViewer: React.FC = () => {
	const [logLevel, setLogLevel] = useState<string>('info');
	const [selectedContext, setSelectedContext] = useState<string>('');
	const [showDetails, setShowDetails] = useState<boolean>(false);
	const [showOnlyErrors, setShowOnlyErrors] = useState<boolean>(false);
	const [sortDirection, setSortDirection] = useState<'desc' | 'asc'>('desc'); // newest first by default

	const summaryQuery = trpc['update-logs'].summary.useQuery(undefined, {
		retry: 3,
		retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
		staleTime: 30000, // 30 seconds
	});

	const contextsQuery = trpc['update-logs'].contexts.useQuery(undefined, {
		retry: 2,
		staleTime: 60000, // 1 minute
	});

	const {
		entries,
		isLoading: entriesLoading,
		error: entriesError,
		hasNextPage,
		isFetchingNextPage,
		fetchNextPage,
		refetch: refetchEntries,
	} = useInfiniteLogEntries(showOnlyErrors, logLevel, selectedContext, showDetails, sortDirection);

	const handleRefresh = () => {
		summaryQuery.refetch();
		refetchEntries();
		contextsQuery.refetch();
	};

	const handleClear = () => {
		handleRefresh();
	};

	if (summaryQuery.isLoading) {
		return (
			<div className="flex items-center justify-center p-8">
				<Spinner />
			</div>
		);
	}

	if (summaryQuery.error) {
		return <ErrorMessage title="Failed to load update logs">{summaryQuery.error.message}</ErrorMessage>;
	}

	const summary = summaryQuery.data;
	const contexts = contextsQuery.data || [];

	return (
		<main className="@container">
			<LogSummaryHeader summary={summary} onRefresh={handleRefresh} onClear={handleClear} />

			{summary.logFileExists && (
				<div className="border-t border-white/10 pt-11">
					<div className="mx-auto max-w-7xl">
						<div className="mb-6 px-4 @screen-sm:px-6 @screen-lg:px-8">
							<h2 className="text-base font-semibold leading-7 text-white">Log Entries</h2>
						</div>

						<VirtualizedLogList
							entries={entries}
							isLoading={entriesLoading}
							error={entriesError}
							hasNextPage={hasNextPage ?? false}
							isFetchingNextPage={isFetchingNextPage ?? false}
							fetchNextPage={fetchNextPage}
							showDetails={showDetails}
							showOnlyErrors={showOnlyErrors}
							logLevel={logLevel}
							setLogLevel={setLogLevel}
							selectedContext={selectedContext}
							setSelectedContext={setSelectedContext}
							setShowDetails={setShowDetails}
							setShowOnlyErrors={setShowOnlyErrors}
							sortDirection={sortDirection}
							setSortDirection={setSortDirection}
							contexts={contexts}
						/>
					</div>
				</div>
			)}
		</main>
	);
};

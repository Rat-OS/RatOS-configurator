import React, { useRef, useEffect } from 'react';
import { useWindowVirtualizer } from '@tanstack/react-virtual';
import { Spinner } from '@/components/common/spinner';
import { ErrorMessage } from '@/components/common/error-message';
import { Label } from '@/components/ui/label';
import { FileText } from 'lucide-react';
import { LogEntry, LogSummary } from '@/app/logs/_components/types';
import { LogEntryComponent } from '@/app/logs/_components/log-entry-component';
import { LogFacetedFilter } from '@/app/logs/_components/log-faceted-filter';
import { EnhancedLogLevelSelector } from '@/app/logs/_components/enhanced-log-level-selector';

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
	selectedContexts: string[];
	setSelectedContexts: (contexts: string[]) => void;
	selectedSources: string[];
	setSelectedSources: (sources: string[]) => void;
	contexts: string[];
	sources: string[];
	summary?: LogSummary;
}

export const VirtualizedLogList: React.FC<VirtualizedLogListProps> = ({
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
	selectedContexts,
	setSelectedContexts,
	selectedSources,
	setSelectedSources,
	contexts,
	sources,
	summary,
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
			<div className="mb-4 grid grid-cols-1 gap-4 rounded-lg border border-border bg-muted/20 p-4 xl:grid-cols-3">
				<div className="space-y-2">
					<Label htmlFor="log-level" className={showOnlyErrors ? 'text-muted-foreground' : ''}>
						Log Level
					</Label>
					<div className={showOnlyErrors ? 'cursor-not-allowed opacity-50' : ''}>
						<EnhancedLogLevelSelector logLevel={logLevel} setLogLevel={setLogLevel} summary={summary} />
					</div>
				</div>

				<div className="space-y-2">
					<Label className={showOnlyErrors ? 'text-muted-foreground' : ''}>Context Filter</Label>
					<div className="@container">
						<LogFacetedFilter
							title="Context"
							options={contexts}
							selectedValues={selectedContexts}
							onSelectionChange={setSelectedContexts}
							disabled={showOnlyErrors}
						/>
					</div>
				</div>

				<div className="space-y-2">
					<Label className={showOnlyErrors ? 'text-muted-foreground' : ''}>Source Filter</Label>
					<div className="@container">
						<LogFacetedFilter
							title="Source"
							options={sources}
							selectedValues={selectedSources}
							onSelectionChange={setSelectedSources}
							disabled={showOnlyErrors}
						/>
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

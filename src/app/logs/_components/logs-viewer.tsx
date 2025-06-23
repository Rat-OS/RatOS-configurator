'use client';

import React, { useState } from 'react';
import { ErrorMessage } from '@/components/common/error-message';
import { Button } from '@/components/common/button';
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { AlertCircle, Eye } from 'lucide-react';
import { MixerHorizontalIcon } from '@radix-ui/react-icons';
import { LogSummaryHeader } from '@/app/logs/_components/log-summary-header';
import { VirtualizedLogList } from '@/app/logs/_components/virtualized-log-list';
import { useUnifiedLogData } from '@/app/logs/_components/use-unified-log-data';

export const LogsViewer: React.FC = () => {
	const [logLevel, setLogLevel] = useState<string>('info');
	const [selectedContexts, setSelectedContexts] = useState<string[]>([]);
	const [selectedSources, setSelectedSources] = useState<string[]>([]);
	const [showDetails, setShowDetails] = useState<boolean>(false);
	const [showOnlyErrors, setShowOnlyErrors] = useState<boolean>(false);
	const [sortDirection, setSortDirection] = useState<'desc' | 'asc'>('desc'); // newest first by default

	// Use the unified hook that fetches all data with a single log file parse
	const {
		summary,
		summaryLoading,
		summaryError,
		contexts,
		sources,
		filtersLoading,
		filtersError,
		entries,
		entriesLoading,
		entriesError,
		hasNextPage,
		isFetchingNextPage,
		fetchNextPage,
		refetch,
	} = useUnifiedLogData({
		showOnlyErrors,
		logLevel,
		selectedContexts,
		selectedSources,
		showDetails,
		sortDirection,
	});

	const handleRefresh = () => {
		refetch();
	};

	const handleClear = () => {
		handleRefresh();
	};

	if (summaryError) {
		return <ErrorMessage title="Failed to load system logs">{summaryError.message}</ErrorMessage>;
	}

	return (
		<main className="@container">
			{summary && (
				<LogSummaryHeader
					isLoading={summaryLoading}
					summary={summary}
					onRefresh={handleRefresh}
					onClear={handleClear}
				/>
			)}

			{summary?.logFileExists && (
				<div className="border-t border-white/10 pt-11">
					<div className="mx-auto max-w-7xl">
						<div className="mb-6 flex items-center justify-between px-4 @screen-sm:px-6 @screen-lg:px-8">
							<h2 className="text-base font-semibold leading-7 text-white">System Logs</h2>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button variant="outline" size="sm" className="h-8">
										<MixerHorizontalIcon className="mr-2 h-4 w-4" />
										View
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align="end">
									<DropdownMenuLabel>View Mode</DropdownMenuLabel>
									<DropdownMenuCheckboxItem checked={!showOnlyErrors} onCheckedChange={() => setShowOnlyErrors(false)}>
										<Eye className="mr-2 h-4 w-4" />
										Show All Entries
									</DropdownMenuCheckboxItem>
									<DropdownMenuCheckboxItem checked={showOnlyErrors} onCheckedChange={() => setShowOnlyErrors(true)}>
										<AlertCircle className="mr-2 h-4 w-4" />
										Errors Only
									</DropdownMenuCheckboxItem>
									<DropdownMenuSeparator />
									<DropdownMenuLabel>Sort Order</DropdownMenuLabel>
									<DropdownMenuCheckboxItem
										checked={sortDirection === 'desc'}
										onCheckedChange={() => setSortDirection('desc')}
									>
										Newest First
									</DropdownMenuCheckboxItem>
									<DropdownMenuCheckboxItem
										checked={sortDirection === 'asc'}
										onCheckedChange={() => setSortDirection('asc')}
									>
										Oldest First
									</DropdownMenuCheckboxItem>
									<DropdownMenuSeparator />
									<DropdownMenuLabel>Display Options</DropdownMenuLabel>
									<DropdownMenuCheckboxItem checked={showDetails} onCheckedChange={setShowDetails}>
										Show Details
									</DropdownMenuCheckboxItem>
								</DropdownMenuContent>
							</DropdownMenu>
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
							selectedContexts={selectedContexts}
							setSelectedContexts={setSelectedContexts}
							selectedSources={selectedSources}
							setSelectedSources={setSelectedSources}
							contexts={contexts}
							sources={sources}
							summary={summary}
						/>
					</div>
				</div>
			)}
		</main>
	);
};

import { useMemo } from 'react';
import { trpc } from '@/utils/trpc';
import { LogEntry, LogSummary } from './types';

interface UseUnifiedLogDataParams {
	showOnlyErrors: boolean;
	logLevel: string;
	selectedContexts: string[];
	selectedSources: string[];
	showDetails: boolean;
	sortDirection: 'desc' | 'asc';
	entriesLimit?: number;
	errorsLimit?: number;
}

interface UseUnifiedLogDataReturn {
	// Summary data
	summary?: LogSummary;
	summaryLoading: boolean;
	summaryError: any;

	// Filter options
	contexts: string[];
	sources: string[];
	filtersLoading: boolean;
	filtersError: any;

	// Entries data
	entries: LogEntry[];
	entriesLoading: boolean;
	entriesError: any;
	hasNextPage: boolean;
	isFetchingNextPage: boolean;
	fetchNextPage: () => void;

	// Unified refetch
	refetch: () => void;
}

export const useUnifiedLogData = ({
	showOnlyErrors,
	logLevel,
	selectedContexts,
	selectedSources,
	showDetails,
	sortDirection,
	entriesLimit = 50,
	errorsLimit = 50,
}: UseUnifiedLogDataParams): UseUnifiedLogDataReturn => {
	// Use infinite query for the unified endpoint
	const unifiedQuery = trpc['logs'].unified.useInfiniteQuery(
		{
			level: logLevel as any,
			context: selectedContexts.length > 0 ? selectedContexts : undefined,
			source: selectedSources.length > 0 ? selectedSources : undefined,
			showDetails,
			sortBy: 'time',
			sortDirection,
			entriesLimit: showOnlyErrors ? 0 : entriesLimit, // Don't fetch entries if showing only errors
			errorsLimit: showOnlyErrors ? errorsLimit : 0, // Don't fetch errors if showing all entries
			// Always include summary, contexts, and sources on first page
			includeSummary: true,
			includeContexts: true,
			includeSources: true,
			includeEntries: !showOnlyErrors,
			includeErrors: showOnlyErrors,
		},
		{
			getNextPageParam: (lastPage, allPages) => {
				if (showOnlyErrors) {
					return lastPage.errors?.hasNextPage ? lastPage.errors.nextCursor : undefined;
				} else {
					return lastPage.entries?.hasNextPage ? lastPage.entries.nextCursor : undefined;
				}
			},
			keepPreviousData: true,
			retry: 3,
			retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
			staleTime: 10000, // 10 seconds
		},
	);

	// Extract data from the first page (which contains summary, contexts, sources)
	const firstPage = unifiedQuery.data?.pages[0];

	// Flatten all entries from all pages
	const allEntries = useMemo(() => {
		if (!unifiedQuery.data?.pages) return [];

		return unifiedQuery.data.pages.flatMap((page) => {
			if (showOnlyErrors) {
				return page.errors?.data ?? [];
			} else {
				return page.entries?.data ?? [];
			}
		});
	}, [unifiedQuery.data, showOnlyErrors]);

	// Determine if there's a next page
	const hasNextPage = useMemo(() => {
		if (!unifiedQuery.data?.pages) return false;

		const lastPage = unifiedQuery.data.pages[unifiedQuery.data.pages.length - 1];
		if (showOnlyErrors) {
			return lastPage.errors?.hasNextPage ?? false;
		} else {
			return lastPage.entries?.hasNextPage ?? false;
		}
	}, [unifiedQuery.data, showOnlyErrors]);

	return {
		// Summary data (from first page)
		summary: firstPage?.summary,
		summaryLoading: unifiedQuery.isLoading,
		summaryError: unifiedQuery.error,

		// Filter options (from first page)
		contexts: firstPage?.contexts ?? [],
		sources: firstPage?.sources ?? [],
		filtersLoading: unifiedQuery.isLoading,
		filtersError: unifiedQuery.error,

		// Entries data (flattened from all pages)
		entries: allEntries,
		entriesLoading: unifiedQuery.isLoading,
		entriesError: unifiedQuery.error,
		hasNextPage,
		isFetchingNextPage: unifiedQuery.isFetchingNextPage,
		fetchNextPage: unifiedQuery.fetchNextPage,

		// Unified refetch
		refetch: unifiedQuery.refetch,
	};
};

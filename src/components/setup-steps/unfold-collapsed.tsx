import { getCollapsedLinesCountBetween, HunkData } from 'react-diff-view';
import Unfold from '@/components/setup-steps/unfold';

interface Props {
	previousHunk: HunkData;
	currentHunk?: HunkData;
	linesCount: number;
	onExpand: (start: number, end: number) => void;
}

const LINES_TO_EXPAND = 20;

export default function UnfoldCollapsed({ previousHunk, currentHunk, linesCount, onExpand }: Props) {
	if (!currentHunk) {
		const nextStart = previousHunk.oldStart + previousHunk.oldLines;
		const collapsedLines = linesCount - nextStart + 1;

		if (collapsedLines <= 0) {
			return null;
		}

		return (
			<Unfold
				direction="down"
				start={nextStart}
				end={collapsedLines > LINES_TO_EXPAND ? nextStart + LINES_TO_EXPAND : linesCount + 1}
				collapsedLines={collapsedLines}
				onExpand={onExpand}
			/>
		);
	}

	const collapsedLines = getCollapsedLinesCountBetween(previousHunk, currentHunk);

	if (!previousHunk) {
		if (!collapsedLines) {
			return null;
		}

		const start = Math.max(currentHunk.oldStart - LINES_TO_EXPAND, 1);

		return (
			<Unfold
				direction="up"
				start={collapsedLines > LINES_TO_EXPAND ? start : 1}
				end={currentHunk.oldStart}
				collapsedLines={collapsedLines}
				onExpand={onExpand}
			/>
		);
	}

	const collapsedStart = previousHunk.oldStart + previousHunk.oldLines;
	const collapsedEnd = currentHunk.oldStart;

	if (collapsedLines < LINES_TO_EXPAND) {
		return (
			<Unfold
				direction="none"
				start={collapsedStart}
				end={collapsedEnd}
				onExpand={onExpand}
				collapsedLines={collapsedLines}
			/>
		);
	}

	return (
		<>
			<Unfold
				direction="down"
				start={collapsedStart}
				end={collapsedStart + LINES_TO_EXPAND}
				onExpand={onExpand}
				collapsedLines={null}
			/>
			<Unfold
				direction="up"
				start={collapsedEnd - LINES_TO_EXPAND}
				end={collapsedEnd}
				onExpand={onExpand}
				floatUp={true}
				collapsedLines={collapsedLines}
			/>
		</>
	);
}

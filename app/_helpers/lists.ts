export const categorizeList = <T>(list: T[], categorizer: (item: T) => string): Record<string, T[]> => {
	const categorizedList: Record<string, T[]> = {};

	list.forEach((item) => {
		const category = categorizer(item);
		if (!categorizedList[category]) {
			categorizedList[category] = [];
		}
		categorizedList[category].push(item);
	});

	return categorizedList;
};

export type SectionProperties = { [property: string]: string };
export const findSection = (section: string, content: string) => {
	const regex = new RegExp(`(?<header>\\[${section}\\])\\n(?<body>(?:^(?:\\S| )+$(\\n?))+)`, 'gm');
	let match = null;
	const matches: {
		header: string;
		body: string;
		properties: SectionProperties;
		start: number;
		end: number;
		content: string;
	}[] = [];
	while ((match = regex.exec(content)) != null) {
		const header = match.groups?.header;
		const body = match.groups?.body;
		if (header == null || body == null) {
			continue;
		}
		const properties = body.split('\n').reduce((acc, line) => {
			if (line.trim() === '') {
				return acc;
			}
			const [property, ...valueFragments] = line.split(':');
			const value = valueFragments.join(':').trim();
			acc[property] = value;
			return acc;
		}, {} as SectionProperties);
		matches.push({ header, body, properties, start: match.index, end: regex.lastIndex, content: match[0] });
	}
	if (matches.length === 0) {
		return null;
	}
	return matches;
};

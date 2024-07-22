import { tokenize, markEdits, markWord } from 'react-diff-view';
import refractor from 'refractor/core';
import python from 'refractor/lang/python';
import properties from 'refractor/lang/properties';
refractor.register(python);
refractor.register(properties);

self.addEventListener('message', ({ data: { id, payload } }) => {
	const { hunks, oldSource, language, editsType } = payload;

	const enhancers = [editsType === 'none' ? null : markEdits(hunks, { type: editsType })];

	const options = {
		highlight: language !== 'text',
		refractor: refractor,
		language: language,
		oldSource: oldSource,
		enhancers: enhancers.filter(Boolean),
	};

	try {
		const tokens = tokenize(hunks, options);
		const payload = {
			success: true,
			tokens: tokens,
		};
		self.postMessage({ id, payload });
	} catch (ex) {
		const payload = {
			success: false,
			reason: ex instanceof Error ? ex.message : `${ex}`,
		};
		self.postMessage({ id, payload });
	}
});

/** @type {import("prettier").Config} */
import * as twplugin from 'prettier-plugin-tailwindcss';
const config = {
	useTabs: true,
	singleQuote: true,
	jsxSingleQuote: false,
	trailingComma: 'all',
	printWidth: 120,
	plugins: [twplugin],
	tailwindConfig: './tailwind.config.ts',
};

export default config;

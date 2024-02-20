const defaultTheme = require('tailwindcss/defaultTheme');
module.exports = {
	darkMode: 'class',
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
		'./helpers/**/*.{js,ts,jsx,tsx}',
		'./app/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ['var(--inter-font)', ...defaultTheme.fontFamily.sans],
			},
			keyframes: {
				ping: {
					'0%': {
						opacity: 100,
					},
					'75%, 100%': {
						transform: 'scale(2)',
						opacity: 0,
					},
				},
			},
			colors: {
				brand: {
					100: '#deffcc',
					200: '#bdff99',
					300: '#9cff66',
					400: '#7bff33',
					500: '#5aff00',
					600: '#48cc00',
					700: '#369900',
					800: '#246600',
					900: '#123300',
				},
			},
			fontSize: {
				'2xs': '0.6rem',
				s: '0.8125rem',
			},
			containers: {
				'screen-sm': '640px',
				'screen-md': '768px',
				'screen-lg': '1024px',
				'screen-xl': '1280px',
				'screen-2xl': '1536px',
			},
		},
	},
	plugins: [
		require('@tailwindcss/forms'),
		require('@tailwindcss/container-queries'),
		require('tailwind-scrollbar')({ nocompatible: true }),
	],
};

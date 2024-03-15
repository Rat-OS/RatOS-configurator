import defaultTheme from 'tailwindcss/defaultTheme';
import { Config } from 'tailwindcss/types/config';

import flattenColorPalette from 'tailwindcss/lib/util/flattenColorPalette';
import { parseColor, formatColor } from 'tailwindcss/lib/util/color';

export default {
	darkMode: 'class',
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
		'./helpers/**/*.{js,ts,jsx,tsx}',
		'./app/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px',
			},
		},
		extend: {
			fontFamily: {
				sans: ['var(--inter-font)', ...defaultTheme.fontFamily.sans],
			},
			keyframes: {
				ping: {
					'0%': {
						opacity: '100',
					},
					'75%, 100%': {
						transform: 'scale(2)',
						opacity: '0',
					},
				},
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' },
				},
			},
			animation: {
				'spin-fast': 'spin 0.5s linear infinite',
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
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
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'rgb(var(--zinc-900))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'rgb(var(--brand-400))',
					foreground: 'rgb(var(--brand-900))',
				},
				secondary: {
					DEFAULT: 'rgb(var(--pink-400))',
					foreground: 'rgb(var(--white))',
				},
				destructive: {
					DEFAULT: 'rgb(var(--rose-400))',
					foreground: 'rgb(var(--black))',
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))',
				},
				accent: {
					DEFAULT: 'rgb(var(--brand-700))',
					foreground: 'rgb(var(--white))',
				},
				popover: {
					DEFAULT: 'rgb(var(--zinc-900))',
					foreground: 'hsl(var(--popover-foreground))',
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
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
		require('tailwindcss-animate'),
		require('tailwind-scrollbar')({ nocompatible: true }),
		addVariablesForColors,
	],
} satisfies Config;

function addVariablesForColors({ addBase, theme }: any) {
	let allColors = flattenColorPalette(theme('colors'));
	let newVars = Object.fromEntries(
		Object.entries(allColors).map(([key, val]) => {
			const parsed = parseColor(val);
			return [
				`--${key}`,
				parsed ? `${parsed.color.join(', ')}${parsed.alpha != null ? `, ${parsed.alpha}` : ''}` : val,
			];
		}),
	);

	addBase({
		':root': newVars,
	});
}

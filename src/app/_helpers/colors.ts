import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '@/tailwind.config';
const fullConfig = resolveConfig(tailwindConfig);
type TWShade<T extends keyof typeof fullConfig.theme.colors> = {
	[Color in T]: ExplicitObject<typeof fullConfig.theme.colors>[Color] extends string | { DEFAULT: string }
		? never
		: Color;
}[T];
export type TWShadeableColorName = TWShade<keyof typeof fullConfig.theme.colors>;
export const twColors = fullConfig.theme.colors;

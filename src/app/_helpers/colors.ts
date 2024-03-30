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
export const isShadableColor = (color: string): color is TWShadeableColorName => {
	const twColor = twColors[color as keyof typeof twColors];
	return twColor != null && typeof twColor !== 'string' && !('DEFAULT' in twColor);
};
export const shadableTWColors = Object.fromEntries(
	Object.keys(twColors)
		.filter(isShadableColor)
		.map((c) => [c, twColors[c]]),
) as { [color in TWShadeableColorName]: (typeof twColors)[TWShadeableColorName] };

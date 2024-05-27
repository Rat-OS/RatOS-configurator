type Unpacked<T> = T extends Array<infer U> ? U : T extends ReadonlyArray<infer U> ? U : T;

declare const __nominal__type: unique symbol;
type Nominal<Type, Identifier> = Type & {
	readonly [__nominal__type]: Identifier;
};

type ExplicitObject<T> = {
	readonly [P in keyof T]: P extends keyof T ? T[P] : never;
};

type _NumbersBefore<N extends number, A extends number[] = []> = A['length'] extends N
	? A[number]
	: _NumbersBefore<N, [...A, A['length']]>;

type NumbersBefore<N extends number> = _NumbersBefore<N>;

type NumbersInRange<A extends number, B extends number> = Exclude<NumbersBefore<B>, NumbersBefore<A>>;

type DotPrefix<T extends string> = T extends '' ? '' : `.${T}`;
type DotNestedKeys<T> = T extends Date | Function | Array<any>
	? never
	: (
				T extends object
					? { [K in Exclude<keyof T, symbol>]: `${K}` | `${K}${DotPrefix<DotNestedKeys<T[K]>>}` }[Exclude<
							keyof T,
							symbol
						>]
					: never
		  ) extends infer D
		? Extract<D, string>
		: never;
type DotNestedKeyLeafs<T> = T extends Date | Function | Array<any> | { __leaf: true }
	? ''
	: (
				T extends object
					? { [K in Exclude<keyof T, symbol>]: `${K}${DotPrefix<DotNestedKeyLeafs<T[K]>>}` }[Exclude<keyof T, symbol>]
					: ''
		  ) extends infer D
		? Extract<D, string>
		: never;

type PropertyAccessor<ObjectType, Key extends keyof ObjectType> = Key extends string
	? ObjectType[Key] extends Record<string, unknown>
		? `${Key}.${PropertyAccessor<ObjectType[Key], keyof ObjectType[Key]>}` | Key
		: Key
	: never;

type NestedObjectType<T> = {
	[K in PropertyAccessor<T, keyof T>]: K extends `${infer Head}.${infer Rest}`
		? Head extends keyof T
			? Rest extends PropertyAccessor<T[Head], keyof T[Head]>
				? NestedObjectType<T[Head]>[Rest]
				: never
			: never
		: K extends keyof T
			? T[K]
			: never;
};

type GitVersion = `${number}.${number}.${number}${`-${number}` | ``}${`-${string}` | ``}`;

type GCode = Nominal<string, 'G-Code'>;

type ReactCallback<T extends Function> = ReturnType<typeof React.useCallback<T>>;

declare module 'tailwindcss/lib/util/flattenColorPalette' {
	export default function flattenColorPalette(
		colors: Record<string, string | Record<string, string>>,
	): Record<string, string>;
}

declare module 'tailwindcss/lib/util/color' {
	export const parseColor: (color: string) => {
		mode: 'hsl' | 'rgb' | 'hsla' | 'rgba';
		color: [number, number, number];
		alpha?: string;
	};
	export const formatColor: (color: {
		mode: 'hsl' | 'rgb' | 'hsla' | 'rgba';
		color: [number, number, number];
		alpha?: string;
	}) => string;
}

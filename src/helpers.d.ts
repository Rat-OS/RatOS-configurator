type Unpacked<T> = T extends Array<infer U> ? U : T extends ReadonlyArray<infer U> ? U : T;
declare const __nominal__type: unique symbol;
type Nominal<Type, Identifier> = Type & {
	readonly [__nominal__type]: Identifier;
};
type ExplicitObject<T> = {
	readonly [P in keyof T]: P extends keyof T ? T[P] : never;
};

type DotPrefix<T extends string> = T extends '' ? `` : `.${T}`;
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

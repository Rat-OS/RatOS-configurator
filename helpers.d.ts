type Unpacked<T> = T extends Array<infer U> ? U : T extends ReadonlyArray<infer U> ? U : T;
declare const __nominal__type: unique symbol;
type Nominal<Type, Identifier> = Type & {
	readonly [__nominal__type]: Identifier;
};
type ExplicitObject<T> = {
	readonly [P in keyof T]: P extends keyof T ? T[P] : never;
};

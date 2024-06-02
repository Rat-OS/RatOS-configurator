import { useCallback, useEffect, useRef } from 'react';

/**
 * Usage:
 *
 * const clickedSave = createSignal<Doc>();
 *
 * clickedSave(doc => {
 *   // do something to save the doc, or when the doc is saved
 * })
 *
 * clickedSave(doc);
 */
export interface SignalListener<T> {
	(event: T): void;
}
export interface SignalUnsubscriber {
	(): void;
}
export interface SignalSubscriber<T> {
	(listener: SignalListener<T>): SignalUnsubscriber;
}
export interface SignalDispatcher<T> {
	(event: T): void;
}
export type Signal<T> = SignalSubscriber<T> & SignalDispatcher<T>;
export type SignalReturn = SignalUnsubscriber & void;

export function useNewSignal<T = void>(): Signal<T> {
	const subscribers = useRef(new Set<SignalListener<T>>());
	return useCallback((eventOrListener: any): any => {
		if (typeof eventOrListener === 'function') {
			subscribers.current.add(eventOrListener);
			return () => {
				subscribers.current.delete(eventOrListener);
			};
		} else {
			subscribers.current.forEach((listener) => listener(eventOrListener));
		}
	}, []);
}

export function useSignal<T = void>(signal: Signal<T>, listener: ReactCallback<SignalListener<T>>): void {
	useEffect(() => {
		const unsubscribe = signal(listener);
		return unsubscribe;
	}, [signal, listener]);
}

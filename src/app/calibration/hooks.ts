import { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { CameraOption, parseOptions } from './helpers';
import { useNamespacedItemMutation, useNamespacedItemQuery } from '../../moonraker/hooks';
import { merge } from 'ts-deepmerge';

export const useCameraSettings = (url: string, isConnected: boolean = false) => {
	const [options, setOptions] = useState<CameraOption[]>([]);
	const saveSettings = useNamespacedItemMutation('RatOS', 'camera-stream-settings');
	const settings = useNamespacedItemQuery('RatOS', 'camera-stream-settings');
	const settingsRef = useRef(settings.data);
	settingsRef.current = settings.data;

	const mergedOptions = useMemo(() => {
		return options.map((opt) => {
			opt.value = settingsRef.current?.[opt.key]?.value ?? opt.value;
			return opt;
		});
	}, [options]);

	// 👍, return options with values from `settings` when available else whatever default.
	// todo, update settings keys when options change (delete old ones, add new ones).

	const compression = useCallback(
		async (val: NumbersBefore<101>) => {
			const res = await fetch(`${url}/option?compressionquality=${val}`);
			setOptions(parseOptions(await res.text()));
		},
		[url],
	);

	const setOption = useCallback(
		async (key: string, value: number | boolean) => {
			const opt = options.find((o) => o.key === key);
			if (opt == null) {
				throw new Error(`Invalid option ${key}`);
			}
			if (opt && 'toggle' in opt && typeof value !== 'boolean') {
				throw new Error(`Expect a boolean value for ${key}, got ${value}`);
			}
			if (opt && 'max' in opt && (typeof value !== 'number' || opt.min > value || opt.max < value)) {
				throw new Error(`Value ${value} is out of range for ${key}`);
			}
			try {
				const res = await fetch(`${url}/option?${key}=${value.toString()}`);
				console.log(res.ok, settings.isInitialLoading);
				if (res.ok && settings.isInitialLoading === false) {
					console.log(
						'saving',
						key,
						value,
						settingsRef.current,
						merge(settingsRef.current ?? {}, { [key]: { value } }),
					);
					await saveSettings.mutateAsync(merge(settingsRef.current ?? {}, { [key]: { value } }));
				}
				return res.ok;
			} catch (e) {
				return false;
			}
		},
		[options, saveSettings, url, settings],
	);

	useEffect(() => {
		if (isConnected) {
			compression(100);
		}
		if (isConnected && settings.isFetched && settingsRef.current != null) {
			for (const opt in settingsRef.current) {
				const val = settingsRef.current[opt]?.value;
				if (val) {
					fetch(`${url}/option?${opt}=${val.toString()}`);
				}
			}
		}
	}, [settings.isFetched, url, isConnected, compression]);

	return {
		options: mergedOptions,
		setOption,
	};
};

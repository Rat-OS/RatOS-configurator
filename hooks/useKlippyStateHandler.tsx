'use client';

import { useCallback, useEffect } from 'react';
import { atom, useSetRecoilState } from 'recoil';
import { useMoonraker } from '../moonraker/hooks';

export type KlippyReadyStates = 'ready' | 'error' | 'shutdown' | 'startup' | 'unknown';

export const KlippyStatusState = atom<KlippyReadyStates>({
	key: 'KlippyReadyState',
	default: 'unknown',
});

export const useKlippyStateHandler = () => {
	const { query, lastMessage } = useMoonraker();
	const setKlippyReadyState = useSetRecoilState(KlippyStatusState);

	const queryKlippyState = useCallback(async () => {
		if (query != null) {
			try {
				const serverInfo = await query('server.info');
				if (serverInfo?.klippy_state == null) return;
				const klippyState: KlippyReadyStates = serverInfo.klippy_state;
				setKlippyReadyState(klippyState);
				if (klippyState === 'startup') {
					// Query for server info in two seconds as instructed by the moonraker docs.
					// Seems unnecessary with globally published events?
					setTimeout(() => {
						queryKlippyState();
					}, 2000);
				}
			} catch (e) {
				setKlippyReadyState('unknown');
			}
		}
	}, [query, setKlippyReadyState]);

	useEffect(() => {
		if (query != null) {
			queryKlippyState();
		}
	}, [query, queryKlippyState]);

	useEffect(() => {
		if (lastMessage?.method === 'notify_klippy_ready') {
			setKlippyReadyState('ready');
		}
		if (lastMessage?.method === 'notify_klippy_shutdown') {
			setKlippyReadyState('shutdown');
		}
		if (lastMessage?.method === 'notify_klippy_disconnected') {
			setKlippyReadyState('unknown');
			queryKlippyState();
		}
	}, [lastMessage, queryKlippyState, setKlippyReadyState]);
};

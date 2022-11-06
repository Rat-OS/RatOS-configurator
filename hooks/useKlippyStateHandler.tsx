import { useCallback, useEffect } from 'react';
import { atom, useRecoilValue, useSetRecoilState } from 'recoil';
import {
	MoonrakerMessageState,
	MoonrakerQueryState,
	MoonrakerReadyState,
	MoonrakerStatusState,
} from '../hooks/useMoonraker';

type KlippyReadyStates = 'ready' | 'error' | 'shutdown' | 'startup' | 'unknown';

export const KlippyStatusState = atom<KlippyReadyStates>({
	key: 'KlippyReadyState',
	default: 'unknown',
});

export const useKlippyStateHandler = () => {
	const moonrakerQuery = useRecoilValue(MoonrakerQueryState);
	const moonrakerReadyState = useRecoilValue(MoonrakerReadyState);
	const moonrakerMessage = useRecoilValue(MoonrakerMessageState);
	const setMoonrakerStatus = useSetRecoilState(MoonrakerStatusState);
	const setKlippyReadyState = useSetRecoilState(KlippyStatusState);

	const queryKlippyState = useCallback(async () => {
		if (moonrakerReadyState === 1 && moonrakerQuery != null) {
			try {
				const serverInfo = await moonrakerQuery('server.info');
				if (serverInfo?.klippy_state == null) return;
				const klippyState: KlippyReadyStates = serverInfo.klippy_state;
				setKlippyReadyState(klippyState);
				if (klippyState === 'startup') {
					// Query for server info in to seconds as instructed by the moonraker docs.
					// Seems unnecessary with globally published events?
					setTimeout(() => {
						queryKlippyState();
					}, 2000);
				}
			} catch (e) {
				setMoonrakerStatus('not-running');
			}
		}
	}, [moonrakerQuery, moonrakerReadyState, setMoonrakerStatus, setKlippyReadyState]);

	useEffect(() => {
		if (moonrakerReadyState === 1 && moonrakerQuery != null) {
			queryKlippyState();
		}
	}, [moonrakerReadyState, moonrakerQuery, queryKlippyState]);

	useEffect(() => {
		if (moonrakerMessage?.method === 'notify_klippy_ready') {
			setKlippyReadyState('ready');
		}
		if (moonrakerMessage?.method === 'notify_klippy_shutdown') {
			setKlippyReadyState('shutdown');
		}
		if (moonrakerMessage?.method === 'notify_klippy_disconnected') {
			setKlippyReadyState('unknown');
			queryKlippyState();
		}
	}, [moonrakerMessage, queryKlippyState, setKlippyReadyState]);
};

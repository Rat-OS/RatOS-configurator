import { useCallback, useEffect, useRef, useState } from 'react';
import { getLogger } from '@/app/_helpers/logger';

interface WebRTCConfig {
	iceServers?: RTCIceServer[];
	sdpSemantics: 'unified-plan';
}

export function useWebRTC(url: string, onStreamStats?: (stats: RTCInboundRtpStreamStats) => void) {
	const videoElRef = useRef<HTMLVideoElement>(null);
	const audioElRef = useRef<HTMLVideoElement>(null);
	const peerConnection = useRef<RTCPeerConnection | null>(null);
	const urlRef = useRef<string>(url);
	const isConnecting = useRef<boolean>(false);
	const [connectionState, setConnectionState] = useState<RTCPeerConnectionState | null>(null);
	const remotePCId = useRef<string | null>(null);

	const onIceCandidate = useCallback((e: RTCPeerConnectionIceEvent) => {
		if (e.candidate) {
			return fetch(urlRef.current, {
				body: JSON.stringify({
					type: 'remote_candidate',
					id: remotePCId.current,
					candidates: [e.candidate],
				}),
				headers: {
					'Content-Type': 'application/json',
				},
				method: 'POST',
			}).catch(function (error) {
				window.console.error(error);
			});
		}
	}, []);

	const connect = useCallback(async () => {
		if (peerConnection.current) {
			peerConnection.current.close();
			peerConnection.current = null;
		}
		isConnecting.current = true;
		try {
			setConnectionState('new');
			var config: WebRTCConfig = {
				sdpSemantics: 'unified-plan',
			};

			if (document.getElementById('use-stun') && (document.getElementById('use-stun') as any).checked) {
				config.iceServers = [{ urls: ['stun:stun.l.google.com:19302'] }];
			}

			const urlSearchParams = new URLSearchParams(url);
			const params = Object.fromEntries(urlSearchParams.entries());

			const response = await fetch(url, {
				body: JSON.stringify({
					type: 'request',
					res: params.res,
				}),
				headers: {
					'Content-Type': 'application/json',
				},
				method: 'POST',
			});
			if (response.ok) {
				const parsedResponse = (await response.json()) as {
					id: string;
					sdp: string;
					type: RTCSdpType;
					iceServers?: RTCIceServer[];
				};
				if (parsedResponse.iceServers) {
					config.iceServers = parsedResponse.iceServers;
				}
				peerConnection.current = new RTCPeerConnection(config);
				peerConnection.current.addTransceiver('video', { direction: 'recvonly' });
				//peerConnection.current.addTransceiver('audio', {direction: 'recvonly'});
				peerConnection.current.addEventListener('track', function (evt) {
					if (evt.track.kind == 'video') {
						if (videoElRef.current) {
							videoElRef.current.srcObject = evt.streams[0];
						} else {
							throw new Error('No video ref to set src on');
						}
					} else {
						if (audioElRef.current) audioElRef.current.srcObject = evt.streams[0];
					}
				});
				peerConnection.current.addEventListener('connectionstatechange', () => {
					const conState = peerConnection.current?.connectionState;
					setConnectionState(conState ?? null);
				});

				remotePCId.current = parsedResponse.id;
				await peerConnection.current.setRemoteDescription(parsedResponse);
				const answer = await peerConnection.current.createAnswer();
				await peerConnection.current.setLocalDescription(answer);
				await new Promise(function (resolve) {
					if (peerConnection.current == null) {
						throw new Error('peerConnection.current is null');
					}
					if (peerConnection.current.iceGatheringState === 'complete') {
						resolve(null);
					} else {
						function checkState() {
							if (peerConnection.current == null) {
								throw new Error('peerConnection.current is null');
							}
							if (peerConnection.current.iceGatheringState === 'complete') {
								peerConnection.current.removeEventListener('icegatheringstatechange', checkState);
								resolve(null);
							}
						}
						peerConnection.current.addEventListener('icegatheringstatechange', checkState);
					}
				});
				peerConnection.current.addEventListener('icecandidate', onIceCandidate);
				var offer = peerConnection.current.localDescription;

				if (offer == null) {
					throw new Error('No offer from peerConnection');
				}

				await fetch(url, {
					body: JSON.stringify({
						type: offer.type,
						id: remotePCId.current,
						sdp: offer.sdp,
					}),
					headers: {
						'Content-Type': 'application/json',
					},
					method: 'POST',
				});
			} else {
				setConnectionState('failed');
			}
		} catch (e) {
			getLogger().error(e, "Couldn't connect to WebRTC");
			setConnectionState('failed');
		} finally {
			isConnecting.current = false;
		}
	}, [onIceCandidate, url]);

	// Get stream stats
	useEffect(() => {
		if (onStreamStats) {
			const interval = setInterval(async () => {
				if (peerConnection.current) {
					const stats = await peerConnection.current.getStats();
					stats.forEach((report) => {
						if (report.type === 'inbound-rtp' && report.kind === 'video') {
							const data = report as RTCInboundRtpStreamStats;
							onStreamStats?.(data);
						}
					});
				}
			}, 1000);
			return () => clearInterval(interval);
		}
	}, [onStreamStats]);

	useEffect(() => {
		if (url && isConnecting.current === false) {
			connect();
		} else if (peerConnection.current && isConnecting.current === false) {
			peerConnection.current.close();
		}
	}, [connect, url]);

	useEffect(() => {
		if (['failed', 'disconnected'].includes(connectionState ?? '')) {
			const reconnectTimeout = setTimeout(() => {
				connect();
			}, 5000);
			return () => clearTimeout(reconnectTimeout);
		}
	}, [connect, connectionState]);

	return {
		videoRef: videoElRef,
		audioRef: audioElRef,
		connectionState,
		close: useCallback(() => {
			peerConnection.current?.close();
		}, []),
	};
}

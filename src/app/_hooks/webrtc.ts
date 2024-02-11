import { useCallback, useEffect, useRef } from 'react';

interface WebRTCConfig {
	iceServers?: RTCIceServer[];
	sdpSemantics: 'unified-plan';
}

export function useWebRTC(url: string) {
	const videoElRef = useRef<HTMLVideoElement>(null);
	const audioElRef = useRef<HTMLVideoElement>(null);
	const peerConnection = useRef<RTCPeerConnection | null>(null);
	const isConnecting = useRef<boolean>(false);
	const remotePCId = useRef<string | null>(null);
	useEffect(() => {
		const connect = async () => {
			if (peerConnection.current) {
				peerConnection.current.close();
				peerConnection.current = null;
			}
			isConnecting.current = true;
			try {
				var config: WebRTCConfig = {
					sdpSemantics: 'unified-plan',
				};

				if (document.getElementById('use-stun') && (document.getElementById('use-stun') as any).checked) {
					config.iceServers = [{ urls: ['stun:stun.l.google.com:19302'] }];
				}

				const urlSearchParams = new URLSearchParams(url);
				const params = Object.fromEntries(urlSearchParams.entries());
				peerConnection.current = new RTCPeerConnection(config);
				peerConnection.current.addTransceiver('video', { direction: 'recvonly' });
				//peerConnection.current.addTransceiver('audio', {direction: 'recvonly'});
				peerConnection.current.addEventListener('track', function (evt) {
					console.log('track event ' + evt.track.kind, evt.streams);
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
					console.log('response is good');
					const parsedResponse = (await response.json()) as { id: string; sdp: string; type: RTCSdpType };

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
					var offer = peerConnection.current.localDescription;

					if (offer == null) {
						throw new Error('No offer from peerConnection');
					}

					const finalResponse = await fetch(url, {
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
					const finalResult = await finalResponse.json();
					console.log('final result', finalResult);
				} else {
					console.log('response is not good', response.status, response.statusText, response.url, response.body);
				}
			} finally {
				isConnecting.current = false;
			}
		};
		if (url && isConnecting.current === false) {
			connect();
		} else if (peerConnection.current && isConnecting.current === false) {
			peerConnection.current.close();
		}
	}, [url]);

	return {
		videoRef: videoElRef,
		audioRef: audioElRef,
		close: useCallback(() => {
			peerConnection.current?.close();
		}, []),
	};
}

'use client';

import { useWebRTC } from '@/app/_hooks/webrtc';
import React, { useCallback, useEffect } from 'react';
import { twJoin, twMerge } from 'tailwind-merge';
import { initialCameraSettings } from '@/app/calibration/vaoc-settings-dialog';
import { useMoonrakerState, usePrinterObjectSubscription } from '@/moonraker/hooks';
import { Spinner } from '@/components/common/spinner';
import { useGestures, useSpatialMapping, useUIState, useVideoState } from '@/app/calibration/hooks';
import { Toolbars } from '@/app/calibration/toolbars';
import { SafetyVisualization } from '@/app/calibration/safety-visualization';
import { CrossHair } from '@/app/calibration/crosshair';
import { FillVideoFrame, FillViewport } from '@/app/calibration/framing';
import screenfull from 'screenfull';

export const VAOC = () => {
	const videoState = useVideoState();
	const { videoRef, connectionState } = useWebRTC(videoState.url + '/webrtc', videoState.onStreamStats);
	const isConnected = connectionState === 'connected';

	const [settings, setSettings, settingsQuery] = useMoonrakerState('RatOS', 'camera-settings', initialCameraSettings);
	const uiState = useUIState();
	const spatialMapping = useSpatialMapping({
		settings,
		containerRef: uiState.containerRef,
		videoRef,
		windowSize: uiState.windowSize,
		zoom: uiState.zoom,
	});
	const gestureState = useGestures({
		setZoom: uiState.setZoom,
		canMove: uiState.canMove,
		gestureRef: videoRef,
		isConnected,
		toMillimeters: spatialMapping.toMillimeters,
		toScreen: spatialMapping.toScreen,
		zoom: uiState.zoom,
	});

	const videoScaleX = uiState.zoom * (settings?.flipHorizontal ? -1 : 1);
	const videoScaleY = uiState.zoom * (settings?.flipVertical ? -1 : 1);
	const videoTranslationX = gestureState.scaledDragOffset.x * (settings?.flipHorizontal ? -1 : 1);
	const videoTranslationY = gestureState.scaledDragOffset.y * (settings?.flipVertical ? -1 : 1);

	return (
		<div
			className={twJoin(
				uiState.isFullscreened ? 'h-full' : 'h-[calc(100vh_-_64px)]',
				'flex w-full select-none items-center',
			)}
			ref={uiState.rootRef}
		>
			<div
				className="relative mx-auto flex h-full max-h-full min-h-[50vh] min-w-[50vw] max-w-fit items-center overflow-hidden object-contain shadow-lg"
				ref={uiState.containerRef}
			>
				<video
					ref={videoRef}
					className={twMerge(
						'h-full max-h-full w-full min-w-full max-w-full transform-gpu touch-none',
						uiState.canMove && 'cursor-move',
						!gestureState.isDragging && 'transition-transform ease-in-out',
					)}
					style={{
						transform: `scale3d(${videoScaleX}, ${videoScaleY}, 1) translate3d(${videoTranslationX}px, ${videoTranslationY}px, 0)`,
					}}
					autoPlay
					muted
					playsInline
				/>
				<FillVideoFrame
					videoAspectRatio={videoState.aspectRatio ?? 0}
					containerAspectRatio={uiState.containerAspectRatio}
					zoom={uiState.zoom}
				>
					<SafetyVisualization gestureState={gestureState} />
				</FillVideoFrame>
				<CrossHair
					isConnected={isConnected && videoState.aspectRatio != null}
					isLockingCoordinates={uiState.isLockingCoordinates}
					settings={settings}
					toScreen={spatialMapping.toScreen}
					containerSize={spatialMapping.containerSize}
				/>
				<FillViewport>
					<h3
						className={twMerge(
							'absolute inset-0 flex items-center justify-center text-xl font-semibold text-rose-500 transition-all dark:text-rose-500',
							connectionState === 'failed' ? 'animate-pulse opacity-100' : 'opacity-0',
						)}
					>
						<div className="flex aspect-square h-[30svh] w-[30svh] items-center justify-center">
							Webcam stream not found
						</div>
					</h3>
					<Spinner
						noMargin={true}
						strokeWidth={1}
						className={twMerge(
							'h-[40svh] w-[40svh] animate-spin text-inherit transition-all',
							'text-lime-500 dark:text-lime-500',
							(connectionState === 'connected' || connectionState === 'failed') &&
								videoState.aspectRatio != null &&
								'opacity-0',
							connectionState === 'failed' && 'text-rose-500 dark:text-rose-500',
							connectionState === 'connecting' && 'text-brand-500 dark:text-brand-500',
							connectionState === 'closed' && 'text-yellow-500 dark:text-yellow-500',
							connectionState === 'disconnected' && 'text-amber-500 dark:text-amber-500',
							connectionState === 'new' && 'text-sky-500 dark:text-sky-500',
						)}
					/>
				</FillViewport>
				<FillVideoFrame
					videoAspectRatio={videoState.aspectRatio ?? 0}
					containerAspectRatio={uiState.containerAspectRatio}
					zoom={uiState.zoom}
					className={twJoin(videoState.aspectRatio != null ? 'opacity-100' : 'opacity-0')}
				>
					<Toolbars
						zoom={uiState.zoom}
						toggleFullscreen={screenfull.isEnabled ? uiState.toggleFullscreen : null}
						isFullscreened={uiState.isFullscreened}
						setZoom={uiState.setZoom}
						setIsLockingCoordinates={uiState.setIsLockingCoordinates}
						setCanMove={uiState.setCanMove}
						canMove={uiState.canMove}
						fps={videoState.fps ?? 0}
						isConnected={isConnected}
						isLockingCoordinates={uiState.isLockingCoordinates}
						url={videoState.url}
						setSettings={setSettings}
						settings={settings}
						isSettingsFetched={settingsQuery.isFetched}
					/>
				</FillVideoFrame>
			</div>
		</div>
	);
};

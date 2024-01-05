import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { ViewStyle, NativeSyntheticEvent } from 'react-native';
import type { Resolution } from './types';
import NativeApiVideoLiveStreamView, {
  Commands as NativeLiveStreamCommands,
  NativeLiveStreamViewType,
  NativeLiveStreamProps,
  NativeResolution,
  OnConnectionFailedEvent,
} from './NativeApiVideoLiveStreamView';

type ApiVideoLiveStreamProps = {
  style?: ViewStyle;
  camera?: 'front' | 'back';
  video?: {
    bitrate?: number;
    fps?: number;
    resolution?: Resolution;
    gopDuration?: number;
  };
  isMuted?: boolean;
  audio?: {
    bitrate?: number;
    sampleRate?: 5500 | 11025 | 22050 | 44100;
    isStereo?: boolean;
  };
  zoomRatio?: number;
  enablePinchedZoom: boolean;

  onConnectionSuccess?: () => void;
  onConnectionFailed?: (code: string) => void;
  onDisconnect?: () => void;
};

const LIVE_STREAM_PROPS_DEFAULTS: NativeLiveStreamProps = {
  style: {},
  camera: 'back',
  video: {
    bitrate: 2000000,
    fps: 30,
    resolution: '720p',
    gopDuration: 1,
  },
  isMuted: false,
  audio: {
    bitrate: 128000,
    sampleRate: 44100,
    isStereo: true,
  },
  zoomRatio: 1.0,
  enablePinchedZoom: true,
};

export type ApiVideoLiveStreamMethods = {
  startStreaming: (streamKey: string, url?: string) => Promise<boolean>;
  stopStreaming: () => void;
  setZoomRatio: (zoomRatio: number) => void;
};

const getDefaultBitrate = (resolution: NativeResolution): number => {
  switch (resolution) {
    case '240p':
      return 800000;
    case '360p':
      return 1000000;
    case '480p':
      return 1300000;
    case '720p':
      return 2000000;
    case '1080p':
      return 3500000;
  }
};

const ApiVideoLiveStreamView = forwardRef<
  ApiVideoLiveStreamMethods,
  ApiVideoLiveStreamProps
>((props, forwardedRef) => {
  const nativeResolution =
    props.video?.resolution || LIVE_STREAM_PROPS_DEFAULTS.video.resolution!;
  const nativeLiveStreamProps: NativeLiveStreamProps = {
    ...LIVE_STREAM_PROPS_DEFAULTS,
    ...props,
    video: {
      ...LIVE_STREAM_PROPS_DEFAULTS.video,
      bitrate: getDefaultBitrate(nativeResolution),
      ...props.video,
      resolution: props.video?.resolution!,
    },
    audio: {
      ...LIVE_STREAM_PROPS_DEFAULTS.audio,
      ...props.audio,
    },
    onConnectionSuccess: props.onConnectionSuccess
      ? () => {
          props.onConnectionSuccess?.();
        }
      : undefined,
    onConnectionFailed: props.onConnectionFailed
      ? (event: NativeSyntheticEvent<OnConnectionFailedEvent>) => {
          props.onConnectionFailed?.(event.nativeEvent.code);
        }
      : undefined,
    onDisconnect: props.onDisconnect
      ? () => {
          props.onDisconnect?.();
        }
      : undefined,
  };

  const nativeRef = useRef<React.ElementRef<NativeLiveStreamViewType> | null>(
    null
  );

  useImperativeHandle(forwardedRef, () => ({
    startStreaming: (streamKey: string, url?: string): Promise<boolean> => {
      if (nativeRef.current) {
        NativeLiveStreamCommands.startStreaming(
          nativeRef.current,
          streamKey,
          url
        );
        // TODO: find a way to return a promise from native startStreaming
        return new Promise((resolve, reject) => {
          resolve(true);
        });
      } else {
        return new Promise((resolve, reject) => {
          reject('Native component is not mounted');
        });
      }
    },
    stopStreaming: () =>
      nativeRef.current &&
      NativeLiveStreamCommands.stopStreaming(nativeRef.current),
    setZoomRatio: (zoomRatio: number) =>
      nativeRef.current &&
      NativeLiveStreamCommands.setZoomRatioCommand(
        nativeRef.current,
        zoomRatio
      ),
  }));

  return (
    <NativeApiVideoLiveStreamView
      style={nativeLiveStreamProps.style}
      camera={nativeLiveStreamProps.camera}
      video={nativeLiveStreamProps.video}
      isMuted={nativeLiveStreamProps.isMuted}
      audio={nativeLiveStreamProps.audio}
      zoomRatio={nativeLiveStreamProps.zoomRatio}
      enablePinchedZoom={nativeLiveStreamProps.enablePinchedZoom}
      onConnectionSuccess={nativeLiveStreamProps.onConnectionSuccess}
      onConnectionFailed={nativeLiveStreamProps.onConnectionFailed}
      onDisconnect={nativeLiveStreamProps.onDisconnect}
      ref={nativeRef as any}
    />
  );
});

export * from './types';
export { ApiVideoLiveStreamView };

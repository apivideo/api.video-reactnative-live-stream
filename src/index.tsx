import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import {
  findNodeHandle,
  NativeSyntheticEvent,
  UIManager,
  ViewStyle,
} from 'react-native';
import { NativeLiveStreamProps, NativeLiveStreamView } from './nativeComponent';
import type { Resolution } from './types';

type LiveStreamProps = {
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
    sampleRate?: 8000 | 16000 | 32000 | 44100 | 48000;
    isStereo?: boolean;
  };
  zoomRatio?: number;
  enablePinchedZoom: Boolean;
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

export type LiveStreamMethods = {
  startStreaming: (streamKey: string, url?: string) => Promise<any>;
  stopStreaming: () => void;
  setZoomRatio: (zoomRatio: number) => void;
};

const getDefaultBitrate = (resolution: Resolution): number => {
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

const LiveStreamView = forwardRef<LiveStreamMethods, LiveStreamProps>(
  (props, forwardedRef) => {
    const nativeLiveStreamProps: NativeLiveStreamProps = {
      ...LIVE_STREAM_PROPS_DEFAULTS,
      ...props,
      video: {
        ...LIVE_STREAM_PROPS_DEFAULTS.video,
        bitrate: getDefaultBitrate(
          props.video?.resolution ||
            LIVE_STREAM_PROPS_DEFAULTS.video?.resolution
        ),
        ...props.video,
      },
      audio: {
        ...LIVE_STREAM_PROPS_DEFAULTS.audio,
        ...props.audio,
      },
      onConnectionSuccess: props.onConnectionSuccess
        ? (event: NativeSyntheticEvent<{}>) => {
            const {} = event.nativeEvent;
            props.onConnectionSuccess?.();
          }
        : undefined,
      onConnectionFailed: props.onConnectionFailed
        ? (event: NativeSyntheticEvent<{ code: string }>) => {
            const { code } = event.nativeEvent;
            props.onConnectionFailed?.(code);
          }
        : undefined,
      onDisconnect: props.onDisconnect
        ? (event: NativeSyntheticEvent<{}>) => {
            const {} = event.nativeEvent;
            props.onDisconnect?.();
          }
        : undefined,
      onStartStreaming: (
        event: NativeSyntheticEvent<{
          requestId: number;
          result: boolean;
          error?: string;
        }>
      ) => {
        const { requestId, result, error } = event.nativeEvent;
        const promise = _requestMap.current.get(requestId);

        if (result) {
          promise?.resolve(result);
        } else {
          promise?.reject(error);
        }
        _requestMap.current.delete(requestId);
      },
    };

    const nativeRef = useRef<typeof NativeLiveStreamView | null>(null);
    let _nextRequestId = useRef<number>(1);
    const _requestMap = useRef<
      Map<
        number,
        { resolve: (result: boolean) => void; reject: (error?: string) => void }
      >
    >(new Map());

    useImperativeHandle(forwardedRef, () => ({
      startStreaming: (streamKey: string, url?: string): Promise<boolean> => {
        const requestId = _nextRequestId.current++;
        const requestMap = _requestMap;

        const promise = new Promise<boolean>((resolve, reject) => {
          requestMap.current.set(requestId, { resolve, reject });
        });

        UIManager.dispatchViewManagerCommand(
          findNodeHandle(nativeRef.current),
          UIManager.getViewManagerConfig('ReactNativeLiveStreamView').Commands
            .startStreamingFromManager,
          [requestId, streamKey, url]
        );

        return promise;
      },
      stopStreaming: () => {
        UIManager.dispatchViewManagerCommand(
          findNodeHandle(nativeRef.current),
          UIManager.getViewManagerConfig('ReactNativeLiveStreamView').Commands
            .stopStreamingFromManager,
          []
        );
      },
      setZoomRatio: (zoomRatio: number) => {
        UIManager.dispatchViewManagerCommand(
          findNodeHandle(nativeRef.current),
          UIManager.getViewManagerConfig('ReactNativeLiveStreamView').Commands
            .zoomRatioFromManager,
          [zoomRatio]
        );
      },
    }));

    return (
      <NativeLiveStreamView
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
        onStartStreaming={nativeLiveStreamProps.onStartStreaming}
        ref={nativeRef as any}
      />
    );
  }
);

export * from './types';
export { LiveStreamView };

import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import {
  requireNativeComponent,
  ViewStyle,
  UIManager,
  findNodeHandle,
  NativeSyntheticEvent,
} from 'react-native';

type LiveStreamProps = {
  style: ViewStyle;
  camera?: 'front' | 'back';
  video: {
    bitrate: number;
    fps: number;
    resolution: '240p' | '360p' | '480p' | '720p' | '1080p';
  };
  isMuted: boolean;
  audio: {
    bitrate: number;
    sampleRate: 8000 | 16000 | 32000 | 44100 | 48000;
    isStereo: boolean;
  };
  onConnectionSuccess?: () => void;
  onConnectionFailed?: (code: string) => void;
  onDisconnect?: () => void;
};

type NativeLiveStreamProps = {
  style: ViewStyle;
  camera?: 'front' | 'back';
  video: {
    bitrate: number;
    fps: number;
    resolution: '240p' | '360p' | '480p' | '720p' | '1080p';
  };
  isMuted: boolean;
  audio: {
    bitrate: number;
    sampleRate: 8000 | 16000 | 32000 | 44100 | 48000;
    isStereo: boolean;
  };
  onConnectionSuccess?: (event: NativeSyntheticEvent<{}>) => void;
  onConnectionFailed?: (event: NativeSyntheticEvent<{ code: string }>) => void;
  onDisconnect?: (event: NativeSyntheticEvent<{}>) => void;
  onStartStreaming?: (
    event: NativeSyntheticEvent<{
      requestId: number;
      result: boolean;
      error: string;
    }>
  ) => void;
};

export type LiveStreamMethods = {
  startStreaming: (streamKey: string, url?: string) => Promise<any>;
  stopStreaming: () => void;
};

export const NativeLiveStreamView =
  requireNativeComponent<NativeLiveStreamProps>('ReactNativeLiveStreamView');

const LiveStreamView = forwardRef<LiveStreamMethods, LiveStreamProps>(
  (
    {
      style,
      camera,
      video,
      isMuted,
      audio,
      onConnectionSuccess,
      onConnectionFailed,
      onDisconnect,
    },
    forwardedRef
  ) => {
    const nativeRef = useRef<typeof NativeLiveStreamView | null>(null);
    let _nextRequestId = useRef<number>(1);
    const _requestMap = useRef<
      Map<
        number,
        { resolve: (result: boolean) => void; reject: (error?: string) => void }
      >
    >(new Map());

    const onConnectionSuccessHandler = (event: NativeSyntheticEvent<{}>) => {
      const {} = event.nativeEvent;
      onConnectionSuccess?.();
    };

    const onConnectionFailedHandler = (
      event: NativeSyntheticEvent<{ code: string }>
    ) => {
      const { code } = event.nativeEvent;
      onConnectionFailed?.(code);
    };

    const onDisconnectHandler = (event: NativeSyntheticEvent<{}>) => {
      const {} = event.nativeEvent;
      onDisconnect?.();
    };

    const _onStartStreamingHandler = (
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
    };

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
    }));

    return (
      <NativeLiveStreamView
        style={style}
        camera={camera}
        video={video}
        isMuted={isMuted}
        audio={audio}
        onConnectionSuccess={onConnectionSuccessHandler}
        onConnectionFailed={onConnectionFailedHandler}
        onDisconnect={onDisconnectHandler}
        onStartStreaming={_onStartStreamingHandler}
        ref={nativeRef as any}
      />
    );
  }
);

export { LiveStreamView };

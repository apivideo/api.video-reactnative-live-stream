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
};

export type LiveStreamMethods = {
  startStreaming: (streamKey: string, url?: string) => void;
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

    useImperativeHandle(forwardedRef, () => ({
      startStreaming: (streamKey: string, url?: string) => {
        UIManager.dispatchViewManagerCommand(
          findNodeHandle(nativeRef.current),
          UIManager.getViewManagerConfig('ReactNativeLiveStreamView').Commands
            .startStreamingFromManager,
          [streamKey, url]
        );
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
        ref={nativeRef as any}
      />
    );
  }
);

export { LiveStreamView };

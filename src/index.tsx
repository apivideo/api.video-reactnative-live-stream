import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import {
  requireNativeComponent,
  ViewStyle,
  UIManager,
  findNodeHandle,
  NativeSyntheticEvent,
} from 'react-native';

type ReactNativeLivestreamProps = {
  style: ViewStyle;
  liveStreamKey: string;
  rtmpServerUrl?: string;
  video: {
    fps: number;
    resolution: '240p' | '360p' | '480p' | '720p' | '1080p' | '2160p';
    bitrate?: number;
    camera?: 'front' | 'back';
    orientation?: 'landscape' | 'portrait';
  };
  audio?: {
    muted?: boolean;
    bitrate?: number;
  };
  onConnectionSuccess?: () => void;
  onConnectionFailed?: (code: string) => void;
  onDisconnect?: () => void;
};

type ReactNativeLivestreamNativeProps = {
  style: ViewStyle;
  liveStreamKey: string;
  rtmpServerUrl?: string;
  videoFps: number;
  videoResolution: '240p' | '360p' | '480p' | '720p' | '1080p' | '2160p';
  videoBitrate?: number;
  videoCamera?: 'front' | 'back';
  videoOrientation?: 'landscape' | 'portrait';
  audioMuted?: boolean;
  audioBitrate?: number;
  onConnectionSuccess?: (event: NativeSyntheticEvent<{}>) => void;
  onConnectionFailed?: (event: NativeSyntheticEvent<{ code: string }>) => void;
  onDisconnect?: (event: NativeSyntheticEvent<{}>) => void;
};

export type ReactNativeLivestreamMethods = {
  startStreaming: () => void;
  stopStreaming: () => void;
  enableAudio: () => void;
  disableAudio: () => void;
};

export const ReactNativeLivestreamViewNative =
  requireNativeComponent<ReactNativeLivestreamNativeProps>(
    'ReactNativeLivestreamView'
  );

ReactNativeLivestreamViewNative.displayName = 'ReactNativeLivestreamViewNative';

const LivestreamView = forwardRef<
  ReactNativeLivestreamMethods,
  ReactNativeLivestreamProps
>(
  (
    {
      style,
      video,
      rtmpServerUrl,
      liveStreamKey,
      audio,
      onConnectionSuccess,
      onConnectionFailed,
      onDisconnect,
    },
    forwardedRef
  ) => {
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

    const nativeRef = useRef<typeof ReactNativeLivestreamViewNative | null>(
      null
    );

    useImperativeHandle(forwardedRef, () => ({
      startStreaming: () => {
        UIManager.dispatchViewManagerCommand(
          findNodeHandle(nativeRef.current),
          UIManager.getViewManagerConfig('ReactNativeLivestreamView').Commands
            .startStreamingFromManager,
          []
        );
      },
      stopStreaming: () => {
        UIManager.dispatchViewManagerCommand(
          findNodeHandle(nativeRef.current),
          UIManager.getViewManagerConfig('ReactNativeLivestreamView').Commands
            .stopStreamingFromManager,
          []
        );
      },
      enableAudio: () => {
        UIManager.dispatchViewManagerCommand(
          findNodeHandle(nativeRef.current),
          UIManager.getViewManagerConfig('ReactNativeLivestreamView').Commands
            .enableAudioFromManager,
          []
        );
      },
      disableAudio: () => {
        UIManager.dispatchViewManagerCommand(
          findNodeHandle(nativeRef.current),
          UIManager.getViewManagerConfig('ReactNativeLivestreamView').Commands
            .disableAudioFromManager,
          []
        );
      },
    }));

    return (
      <ReactNativeLivestreamViewNative
        style={style}
        videoCamera={video.camera}
        videoResolution={video.resolution}
        videoFps={video.fps}
        videoBitrate={video.bitrate}
        videoOrientation={video.orientation}
        audioMuted={audio?.muted}
        audioBitrate={audio?.bitrate}
        liveStreamKey={liveStreamKey}
        rtmpServerUrl={rtmpServerUrl}
        ref={nativeRef as any}
        onConnectionSuccess={onConnectionSuccessHandler}
        onConnectionFailed={onConnectionFailedHandler}
        onDisconnect={onDisconnectHandler}
      />
    );
  }
);

export { LivestreamView };

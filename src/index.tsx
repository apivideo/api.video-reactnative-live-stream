import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import {
  requireNativeComponent,
  ViewStyle,
  UIManager,
  findNodeHandle,
} from 'react-native';

type ReactNativeLivestreamProps = {
  style: ViewStyle;
  liveStreamKey: string;
  rtmpServerUrl?: string;
  video: {
    fps: number;
    resolution: '240p' | '360p' | '480p' | '720p' | '1080p' | '2160p';
    bitrate?: number;
    camera: 'front' | 'back';
  };
  audio?: {
    muted?: boolean;
    bitrate?: number;
  };
};

type ReactNativeLivestreamNativeProps = {
  style: ViewStyle;
  liveStreamKey: string;
  rtmpServerUrl?: string;
  videoFps: number;
  videoResolution: '240p' | '360p' | '480p' | '720p' | '1080p' | '2160p';
  videoBitrate?: number;
  videoCamera: 'front' | 'back';
  audioMuted?: boolean;
  audioBitrate?: number;
};

export type ReactNativeLivestreamMethods = {
  startStreaming: () => void;
  stopStreaming: () => void;
  enableAudio: () => void;
  disableAudio: () => void;
};

export const ReactNativeLivestreamViewNative = requireNativeComponent<ReactNativeLivestreamNativeProps>(
  'ReactNativeLivestreamView'
);

ReactNativeLivestreamViewNative.displayName = 'ReactNativeLivestreamViewNative';

const ReactNativeLiveStreamView = forwardRef<
  ReactNativeLivestreamMethods,
  ReactNativeLivestreamProps
>(({ style, video, rtmpServerUrl, liveStreamKey, audio }, forwardedRef) => {
  const nativeRef = useRef<typeof ReactNativeLivestreamViewNative | null>(null);

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
      audioMuted={audio?.muted}
      audioBitrate={audio?.bitrate}
      liveStreamKey={liveStreamKey}
      rtmpServerUrl={rtmpServerUrl}
      ref={nativeRef as any}
    />
  );
});

export default ReactNativeLiveStreamView;

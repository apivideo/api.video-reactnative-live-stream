import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import {
  HostComponent,
  requireNativeComponent,
  ViewStyle,
  UIManager,
  findNodeHandle,
} from 'react-native';

type ReactNativeLivestreamProps = {
  style: ViewStyle;
  quality: '360p' | '720p';
  fps: number;
  liveStreamKey: string;
};

export type ReactNativeLivestreamMethods = {
  startStreaming: () => void;
};

export const ReactNativeLivestreamViewManager = requireNativeComponent<ReactNativeLivestreamProps>(
  'ReactNativeLivestreamView'
) as HostComponent<ReactNativeLivestreamProps> & {
  startStreaming: () => void;
};

ReactNativeLivestreamViewManager.displayName =
  'ReactNativeLivestreamViewManager';

const ReactNativeLiveStreamView = forwardRef<
  ReactNativeLivestreamMethods,
  ReactNativeLivestreamProps
>(({ style, quality, fps, liveStreamKey }, forwardedRef) => {
  const nativeRef = useRef<typeof ReactNativeLivestreamViewManager | null>(
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
  }));

  return (
    <ReactNativeLivestreamViewManager
      style={style}
      quality={quality}
      fps={fps}
      liveStreamKey={liveStreamKey}
      ref={nativeRef}
    />
  );
});

export default ReactNativeLiveStreamView;

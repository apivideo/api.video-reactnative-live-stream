import { requireNativeComponent, ViewStyle } from 'react-native';

type ReactNativeLivestreamProps = {
  style: ViewStyle;
  quality: '360p' | '720p';
  fps: number;
  liveStreamKey: string;
};

export const ReactNativeLivestreamViewManager = requireNativeComponent<ReactNativeLivestreamProps>(
  'ReactNativeLivestreamView'
);

ReactNativeLivestreamViewManager.displayName =
  'ReactNativeLivestreamViewManager';

export default ReactNativeLivestreamViewManager;

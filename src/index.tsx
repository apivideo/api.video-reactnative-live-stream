import { requireNativeComponent, ViewStyle } from 'react-native';

type ReactNativeLivestreamProps = {
  color: string;
  style: ViewStyle;
};

export const ReactNativeLivestreamViewManager = requireNativeComponent<ReactNativeLivestreamProps>(
  'ReactNativeLivestreamView'
);

export default ReactNativeLivestreamViewManager;

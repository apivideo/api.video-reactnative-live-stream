import {
  NativeSyntheticEvent,
  requireNativeComponent,
  ViewStyle,
} from 'react-native';
import type { Resolution } from './types';

export type NativeLiveStreamProps = {
  style: ViewStyle;
  camera?: 'front' | 'back';
  video: {
    bitrate: number;
    fps: number;
    resolution: Resolution;
    gopDuration: number;
  };
  isMuted: boolean;
  audio: {
    bitrate: number;
    sampleRate: 8000 | 16000 | 32000 | 44100 | 48000;
    isStereo: boolean;
  };
  zoomRatio: number;
  enablePinchedZoom: Boolean;
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

export interface RefNativeView extends NativeLiveStreamProps {
  setNativeProps(nativeProps: Partial<NativeLiveStreamProps>): void;
}

export const NativeLiveStreamView =
  requireNativeComponent<NativeLiveStreamProps>('ReactNativeLiveStreamView');

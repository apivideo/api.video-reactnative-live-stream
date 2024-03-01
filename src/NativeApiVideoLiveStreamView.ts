import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
import type { HostComponent, ViewProps } from 'react-native';
import type {
  DirectEventHandler,
  Float,
  Int32,
  WithDefault,
} from 'react-native/Libraries/Types/CodegenTypes';
import codegenNativeCommands from 'react-native/Libraries/Utilities/codegenNativeCommands';

export type Camera = 'front' | 'back';

export type Resolution = Readonly<{
  width: Int32;
  height: Int32;
}>;

export type OnConnectionFailedEvent = Readonly<{
  code: string;
}>;

export type OnPermissionsDeniedEvent = Readonly<{
  permissions: string[];
}>;

export type OnStartStreamingEvent = Readonly<{
  requestId: Int32;
  result: boolean;
  error: string;
}>;

export interface NativeLiveStreamProps extends ViewProps {
  camera?: WithDefault<Camera, 'back'>;
  video: {
    bitrate: Int32;
    fps: Int32;
    resolution?: Resolution;
    gopDuration: Float;
  };
  isMuted: boolean;
  audio: {
    bitrate: Int32;
    sampleRate?: WithDefault<5500 | 11025 | 22050 | 44100, 44100>;
    isStereo: boolean;
  };
  zoomRatio: Float;
  enablePinchedZoom: boolean;

  onConnectionSuccess?: DirectEventHandler<null>;
  onConnectionFailed?: DirectEventHandler<OnConnectionFailedEvent>;
  onDisconnect?: DirectEventHandler<null>;

  onPermissionsDenied?: DirectEventHandler<OnPermissionsDeniedEvent>;

  // Internal use only
  onStartStreaming?: DirectEventHandler<OnStartStreamingEvent>;
}

export type NativeLiveStreamViewType = HostComponent<NativeLiveStreamProps>;

interface NativeCommands {
  startStreaming: (
    viewRef: React.ElementRef<NativeLiveStreamViewType>,
    requestId: Int32,
    streamKey: string,
    url?: string
  ) => void;
  stopStreaming: (viewRef: React.ElementRef<NativeLiveStreamViewType>) => void;
  setZoomRatioCommand: (
    viewRef: React.ElementRef<NativeLiveStreamViewType>,
    zoomRatio: Float
  ) => void;
}

export const Commands: NativeCommands = codegenNativeCommands<NativeCommands>({
  supportedCommands: ['startStreaming', 'stopStreaming', 'setZoomRatioCommand'],
});
export default codegenNativeComponent<NativeLiveStreamProps>(
  'ApiVideoLiveStreamView'
);

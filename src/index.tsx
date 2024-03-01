import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { ViewStyle, NativeSyntheticEvent } from 'react-native';
import NativeApiVideoLiveStreamView, {
  Commands as NativeLiveStreamCommands,
  NativeLiveStreamViewType,
  NativeLiveStreamProps,
  Resolution,
  OnConnectionFailedEvent,
  OnPermissionsDeniedEvent,
  OnStartStreamingEvent,
} from './NativeApiVideoLiveStreamView';

export type PredefinedResolution = '240p' | '360p' | '480p' | '720p' | '1080p';

type ApiVideoLiveStreamProps = {
  style?: ViewStyle;
  camera?: 'front' | 'back';
  video?: {
    bitrate?: number;
    fps?: number;
    resolution?: Resolution | PredefinedResolution;
    gopDuration?: number;
  };
  isMuted?: boolean;
  audio?: {
    bitrate?: number;
    sampleRate?: 5500 | 11025 | 22050 | 44100;
    isStereo?: boolean;
  };
  zoomRatio?: number;
  enablePinchedZoom?: boolean;

  onConnectionSuccess?: () => void;
  onConnectionFailed?: (code: string) => void;
  onDisconnect?: () => void;

  onPermissionsDenied?: (permissions: string[]) => void;
};

const LIVE_STREAM_PROPS_DEFAULTS: NativeLiveStreamProps = {
  style: {},
  camera: 'back',
  video: {
    bitrate: 2000000,
    fps: 30,
    resolution: { width: 1280, height: 720 },
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

export type ApiVideoLiveStreamMethods = {
  startStreaming: (streamKey: string, url?: string) => Promise<boolean>;
  stopStreaming: () => void;
  setZoomRatio: (zoomRatio: number) => void;
};

const getDefaultBitrate = (resolution: Resolution): number => {
  var numOfPixels = resolution.width * resolution.height;
  switch (true) {
    case numOfPixels <= 102240: // for 4/3 and 16/9 240p
      return 800000;
    case numOfPixels <= 230400: // for 16/9 360p
      return 1000000;
    case numOfPixels <= 409920: // for 4/3 and 16/9 480p
      return 1300000;
    case numOfPixels <= 921600: // for 4/3 600p, 4/3 768p and 16/9 720p
      return 2000000;
    default:
      return 3500000; // for 16/9 1080p
  }
};

function resolveResolution(
  resolution: Resolution | PredefinedResolution
): Resolution {
  const predefinedResolutions: Record<PredefinedResolution, Resolution> = {
    '1080p': { width: 1920, height: 1080 },
    '720p': { width: 1280, height: 720 },
    '480p': { width: 854, height: 480 },
    '360p': { width: 640, height: 360 },
    '240p': { width: 352, height: 240 },
  };

  if (typeof resolution === 'string') {
    const predefined = predefinedResolutions[resolution];
    if (!predefined) {
      throw new Error('Unknown resolution ' + resolution);
    }
    return predefined;
  }
  return {
    width: Math.max(resolution.height, resolution.width),
    height: Math.min(resolution.height, resolution.width),
  };
}

const ApiVideoLiveStreamView = forwardRef<
  ApiVideoLiveStreamMethods,
  ApiVideoLiveStreamProps
>((props, forwardedRef) => {
  const resolution = resolveResolution(props.video?.resolution || '720p');
  const nativeLiveStreamProps: NativeLiveStreamProps = {
    ...LIVE_STREAM_PROPS_DEFAULTS,
    ...props,
    video: {
      ...LIVE_STREAM_PROPS_DEFAULTS.video,
      bitrate: getDefaultBitrate(resolution),
      ...props.video,
      resolution,
    },
    audio: {
      ...LIVE_STREAM_PROPS_DEFAULTS.audio,
      ...props.audio,
    },
    onConnectionSuccess: props.onConnectionSuccess
      ? () => {
          props.onConnectionSuccess?.();
        }
      : undefined,
    onConnectionFailed: props.onConnectionFailed
      ? (event: NativeSyntheticEvent<OnConnectionFailedEvent>) => {
          props.onConnectionFailed?.(event.nativeEvent.code);
        }
      : undefined,
    onDisconnect: props.onDisconnect
      ? () => {
          props.onDisconnect?.();
        }
      : undefined,
    onPermissionsDenied: props.onPermissionsDenied
      ? (event: NativeSyntheticEvent<OnPermissionsDeniedEvent>) => {
          props.onPermissionsDenied?.(event.nativeEvent.permissions);
        }
      : undefined,
    onStartStreaming: (event: NativeSyntheticEvent<OnStartStreamingEvent>) => {
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

  const nativeRef = useRef<React.ElementRef<NativeLiveStreamViewType> | null>(
    null
  );
  let _nextRequestId = useRef<number>(1);
  const _requestMap = useRef<
    Map<
      number,
      { resolve: (result: boolean) => void; reject: (error?: string) => void }
    >
  >(new Map());

  useImperativeHandle(forwardedRef, () => ({
    startStreaming: (streamKey: string, url?: string): Promise<boolean> => {
      if (nativeRef.current) {
        const requestId = _nextRequestId.current++;
        const requestMap = _requestMap;

        const promise = new Promise<boolean>((resolve, reject) => {
          requestMap.current.set(requestId, { resolve, reject });
        });

        NativeLiveStreamCommands.startStreaming(
          nativeRef.current,
          requestId,
          streamKey,
          url
        );

        return promise;
      } else {
        return new Promise((resolve, reject) => {
          reject('Native component is not mounted');
        });
      }
    },
    stopStreaming: () =>
      nativeRef.current &&
      NativeLiveStreamCommands.stopStreaming(nativeRef.current),
    setZoomRatio: (zoomRatio: number) =>
      nativeRef.current &&
      NativeLiveStreamCommands.setZoomRatioCommand(
        nativeRef.current,
        zoomRatio
      ),
  }));

  return (
    <NativeApiVideoLiveStreamView
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
      onPermissionsDenied={nativeLiveStreamProps.onPermissionsDenied}
      onStartStreaming={nativeLiveStreamProps.onStartStreaming}
      ref={nativeRef as any}
    />
  );
});

export { ApiVideoLiveStreamView };
export type { Resolution } from './NativeApiVideoLiveStreamView';

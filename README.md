# @api.video/react-native-livestream
![npm](https://img.shields.io/npm/v/@api.video/react-native-livestream) ![ts](https://badgen.net/badge/-/TypeScript/blue?icon=typescript&label)

## Installation

```sh
npm install @api.video/react-native-livestream
```
or
```sh
yarn add @api.video/react-native-livestream
```
_Note: if you are on iOS, you will need two extra steps:_
1) Don't forget to install the native dependencies with Cocoapods
```sh
cd ios && pod install
```
2) This project contains swift code, and if it's your first dependency with swift code, you need to create an empty swift file in your project (with the bridging header) from XCode. [Find how to do that](docs/install_swift_dependency.md)

## Permissions
To be able to broadcast,

1) On Android you must ask for internet, camera and microphone permissions:

```java
  <uses-permission android:name="android.permission.INTERNET" />
  <uses-permission android:name="android.permission.RECORD_AUDIO" />
  <uses-permission android:name="android.permission.CAMERA" />
```

2) On iOS, you must update Info.plist with a usage description for camera and microphone

```xml
...
<key>NSCameraUsageDescription</key>
<string>Your own description of the purpose</string>

<key>NSMicrophoneUsageDescription</key>
<string>Your own description of the purpose</string>
...
	
```

## Usage

```jsx
import React, { useRef, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { LivestreamView } from '@api.video/react-native-livestream';

const App = () => {
  const ref = useRef(null);
  const [streaming, setStreaming] = useState(false);

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <LivestreamView
        style={{ flex: 1, backgroundColor: 'black', alignSelf: 'stretch' }}
        ref={ref}
        video={{
          fps: 30,
          resolution: '720p',
          camera: 'front',
          orientation: 'portrait',
        }}
        liveStreamKey="your-livestrem-key"
      />
      <View style={{ position: 'absolute', bottom: 40 }}>
        <TouchableOpacity
          style={{
            borderRadius: 50,
            backgroundColor: streaming ? 'red' : 'white',
            width: 50,
            height: 50,
          }}
          onPress={() => {
            if (streaming) {
              ref.current?.stopStreaming();
              setStreaming(false);
            } else {
              ref.current?.startStreaming();
              setStreaming(true);
            }
          }}
        />
      </View>
    </View>
  );
}

export default App;
```

## Props & Methods

```ts
type ReactNativeLivestreamProps = {
  // Styles for the view containing the preview
  style: ViewStyle;
  // Your Streaming key, we will append this to the rtmpServerUrl
  liveStreamKey: string;
  // RTMP server url, default: rtmp://broadcast.api.video/s
  rtmpServerUrl?: string;
  video: {
  // default: 30
    fps: number;
  // default: '720p'
    resolution: '240p' | '360p' | '480p' | '720p' | '1080p' | '2160p';
  // If omitted we will infer it from the resolution
    bitrate?: number;
  // default: 'back'
    camera?: 'front' | 'back';
  // default: 'landscape'
    orientation?: 'landscape' | 'portrait';
  };
  audio?: {
  // default: false
    muted?: boolean;
  // default: 128000
    bitrate?: number;
  };
};

type ReactNativeLivestreamMethods = {
  // Start the stream
  startStreaming: () => void;
  // Stops the stream
  stopStreaming: () => void;
};
```

## License

MIT

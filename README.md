<!--<documentation_excluded>-->
[![badge](https://img.shields.io/twitter/follow/api_video?style=social)](https://twitter.com/intent/follow?screen_name=api_video) &nbsp; [![badge](https://img.shields.io/github/stars/apivideo/api.video-reactnative-live-stream?style=social)](https://github.com/apivideo/api.video-reactnative-live-stream) &nbsp; [![badge](https://img.shields.io/discourse/topics?server=https%3A%2F%2Fcommunity.api.video)](https://community.api.video)
![](https://github.com/apivideo/.github/blob/main/assets/apivideo_banner.png)

![npm](https://img.shields.io/npm/v/@api.video/react-native-livestream)
![ts](https://badgen.net/badge/-/TypeScript/blue?icon=typescript&label)

<h1 align="center">React Native RTMP live stream client</h1>

[api.video](https://api.video) is the video infrastructure for product builders. Lightning fast video APIs for integrating, scaling, and managing on-demand & low latency live streaming features in your app.

## Table of contents

- [Table of contents](#table-of-contents)
- [Project description](#project-description)
- [Getting started](#getting-started)
  - [Installation](#installation)
  - [Permissions](#permissions)
    - [Android](#android)
    - [iOS](#ios)
  - [Code sample](#code-sample)
- [Documentation](#documentation)
  - [Props \& Methods](#props--methods)
- [Example App](#example-app)
  - [Setup](#setup)
    - [Android](#android-1)
    - [iOS](#ios-1)
- [Plugins](#plugins)
- [FAQ](#faq)

<!--</documentation_excluded>-->
<!--<documentation_only>
---
title: React Native live stream component
meta: 
  description: The official React Native live stream component for api.video. [api.video](https://api.video/) is the video infrastructure for product builders. Lightning fast video APIs for integrating, scaling, and managing on-demand & low latency live streaming features in your app.
---

# React Native Livestream Component

[api.video](https://api.video/) is the video infrastructure for product builders. Lightning fast video APIs for integrating, scaling, and managing on-demand & low latency live streaming features in your app.

</documentation_only>-->
## Project description

This module is made for broadcasting RTMP live stream from smartphone camera

## Getting started

### Installation

```sh
npm install @api.video/react-native-livestream
```

or

```sh
yarn add @api.video/react-native-livestream
```

### Permissions

#### Android

Permissions `android.permission.RECORD_AUDIO`, `android.permission.CAMERA` and `android.permission.INTERNET` are in the library manifest and will be requested by this library at runtime. You don't have to request them in your application.

For the PlayStore, your application might declare this in its `AndroidManifest.xml`

```xml

<manifest>
    <uses-feature android:name="android.hardware.camera" android:required="true" />
    <uses-feature android:name="android.hardware.camera.autofocus" android:required="false" />
</manifest>
```

#### iOS

Update `Info.plist` with a usage description for camera and microphone

```xml
<key>NSCameraUsageDescription</key>
<string>Your own description of the purpose</string>

<key>NSMicrophoneUsageDescription</key>
<string>Your own description of the purpose</string>
```

### Code sample

```jsx
import React, { useRef, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { ApiVideoLiveStreamView } from '@api.video/react-native-livestream';

const App = () => {
  const ref = useRef(null);
  const [streaming, setStreaming] = useState(false);

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <ApiVideoLiveStreamView
        style={{ flex: 1, backgroundColor: 'black', alignSelf: 'stretch' }}
        ref={ref}
        camera="back"
        enablePinchedZoom={true}
        video={{
          fps: 30,
          resolution: '720p', // Alternatively, you can specify the resolution in pixels: { width: 1280, height: 720 }
          bitrate: 2*1024*1024, // # 2 Mbps
          gopDuration: 1, // 1 second
        }}
        audio={{
          bitrate: 128000,
          sampleRate: 44100,
          isStereo: true,
        }}
        isMuted={false}
        onConnectionSuccess={() => {
          //do what you want
        }}
        onConnectionFailed={(e) => {
          //do what you want
        }}
        onDisconnect={() => {
          //do what you want
        }}
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
              ref.current?.startStreaming('YOUR_STREAM_KEY');
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

## Documentation

### Props & Methods

```ts
type ApiVideoLiveStreamProps = {
  // Styles for the view containing the preview
  style: ViewStyle;
  // camera facing orientation
  camera?: 'front' | 'back';
  video: {
    // frame rate
    fps: number;
    // resolution.
    resolution: Resolution | PredefinedResolution; 
    // video bitrate. depends on resolutions.
    bitrate: number;
    // duration between 2 key frames in seconds
    gopDuration: number;
  };
  audio: {
    // sample rate. Only for Android. Recommended: 44100
    sampleRate: 44100;
    // true for stereo, false for mono. Only for Android. Recommended: true
    isStereo: true;
    // audio bitrate. Recommended: 128000
    bitrate: number;
  };
  // Mute/unmute microphone
  isMuted: false;
  // Enables/disables the zoom gesture handled natively
  enablePinchedZoom?: boolean;
  // will be called when the connection is successful
  onConnectionSuccess?: () => void;
  // will be called when connection failed
  onConnectionFailed?: (code: string) => void;
  // will be called when the live-stream is stopped
  onDisconnect?: () => void;
};

type ApiVideoLiveStreamMethods = {
  // Start the stream
  // streamKey: your live stream RTMP key
  // url: RTMP server url, default: rtmp://broadcast.api.video/s
  startStreaming: (streamKey: string, url?: string) => void;
  // Stops the stream
  stopStreaming: () => void;
  // Sets the zoomRatio
  // Intended for use with React Native Gesture Handler, a slider or similar.
  setZoomRatio: (zoomRatio) => void;
};
```

## Example App

You can try our [example app](https://github.com/apivideo/api.video-reactnative-live-stream/tree/main/example), feel free to test it.

### Setup

Be sure to follow the [React Native installation steps](https://reactnative.dev/docs/environment-setup) before anything.

1. Open a new terminal
2. Clone the repository and go into it

```shell
git clone https://github.com/apivideo/api.video-reactnative-live-stream.git livestream_example_app && cd livestream_example_app
```

#### Android

Install the packages and launch the application

```shell
yarn && yarn example android
```

#### iOS

1. Sign your application

Open Xcode, click on "Open a project or file" and open the `Example.xcworkspace` file.
<br />You can find it in `YOUR_PROJECT_NAME/example/ios`.
<br />Click on Example, go in `Signin & Capabilities` tab, add your team and create a unique
bundle identifier.

2. Install the packages and launch the application

```shell
yarn && yarn example ios
```

## Plugins

api.video live stream library is using external native library for broadcasting

| Plugin     | README       |
| ---------- | ------------ |
| StreamPack | [StreamPack] |
| HaishinKit | [HaishinKit] |

## FAQ

If you have any questions, ask us here: https://community.api.video .
Or use [Issues].

[//]: # "These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax"
[streampack]: https://github.com/ThibaultBee/StreamPack
[haishinkit]: https://github.com/shogo4405/HaishinKit.swift
[issues]: https://github.com/apivideo/api.video-reactnative-live-stream/issues

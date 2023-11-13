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
  - [Code sample](#code-sample)
- [Documentation](#documentation)
  - [Props \& Methods](#props--methods)
- [Example App](#example-app)
  - [Setup](#setup)
    - [Android](#android)
    - [iOS](#ios)
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

This module is made for broadcasting rtmp live stream from smartphone camera

## Getting started

:warning: **The React Native Live Stream SDK is designed for 0.69.1 version of React Native. Using the SDK with >0.69.1 of React Native can cause unexpected behaviour**


### Installation

```sh
npm install @api.video/react-native-livestream
```

or

```sh
yarn add @api.video/react-native-livestream
```

_Note: if you are on iOS, you will need two extra steps:_

1. Don't forget to install the native dependencies with Cocoapods

```sh
cd ios && pod install
```

1. This project contains swift code, and if it's your first dependency with swift code, you need to create an empty swift file in your project (with the bridging header) from XCode. [Find how to do that](https://github.com/apivideo/api.video-reactnative-live-stream/blob/main/docs/install_swift_dependency.md)

### Permissions

To be able to broadcast, you must:

1. On Android: ask for internet, camera and microphone permissions:

```xml
<manifest>
  <uses-permission android:name="android.permission.INTERNET" />
  <uses-permission android:name="android.permission.RECORD_AUDIO" />
  <uses-permission android:name="android.permission.CAMERA" />
</manifest>
```

Your application must dynamically require android.permission.CAMERA and android.permission.RECORD_AUDIO.

2. On iOS: update Info.plist with a usage description for camera and microphone

```xml
<key>NSCameraUsageDescription</key>
<string>Your own description of the purpose</string>

<key>NSMicrophoneUsageDescription</key>
<string>Your own description of the purpose</string>
```

3. On react-native you must handle the permissions requests before starting your livestream. If permissions are not accepted you will not be able to broadcast.

### Code sample

```jsx
import React, { useRef, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { LiveStreamView } from '@api.video/react-native-livestream';

const App = () => {
  const ref = useRef(null);
  const [streaming, setStreaming] = useState(false);

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <LiveStreamView
        style={{ flex: 1, backgroundColor: 'black', alignSelf: 'stretch' }}
        ref={ref}
        camera="back"
        enablePinchedZoom={true}
        video={{
          fps: 30,
          resolution: '720p',
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
type LiveStreamProps = {
  // Styles for the view containing the preview
  style: ViewStyle;
  // camera facing orientation
  camera?: 'front' | 'back';
  video: {
    // frame rate
    fps: number;
    // resolution
    resolution: '240p' | '360p' | '480p' | '720p' | '1080p';
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

type LiveStreamMethods = {
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

1. Install the packages

```shell
yarn install
```

2. Go into `/example/ios` and install the Pods

```shell
cd /example/ios && pod install
```

3. Sign your application

Open Xcode, click on "Open a project or file" and open the `Example.xcworkspace` file.
<br />You can find it in `YOUR_PROJECT_NAME/example/ios`.
<br />Click on Example, go in `Signin & Capabilities` tab, add your team and create a unique
bundle identifier.

4. Launch the application, from the root of your project

```shell
yarn example ios
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

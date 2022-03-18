[![badge](https://img.shields.io/twitter/follow/api_video?style=social)](https://twitter.com/intent/follow?screen_name=api_video) &nbsp; [![badge](https://img.shields.io/github/stars/apivideo/api.video-reactnative-live-stream?style=social)](https://github.com/apivideo/api.video-reactnative-live-stream) &nbsp; [![badge](https://img.shields.io/discourse/topics?server=https%3A%2F%2Fcommunity.api.video)](https://community.api.video)
![](https://github.com/apivideo/API_OAS_file/blob/master/apivideo_banner.png)

![npm](https://img.shields.io/npm/v/@api.video/react-native-live-stream) 
![ts](https://badgen.net/badge/-/TypeScript/blue?icon=typescript&label)
<h1 align="center">React Native RTMP live stream client</h1>

[api.video](https://api.video) is the video infrastructure for product builders. Lightning fast video APIs for integrating, scaling, and managing on-demand & low latency live streaming features in your app.


# Table of contents

- [Table of contents](#table-of-contents)
- [Project description](#project-description)
- [Getting started](#getting-started)
  - [Installation](#installation)
  - [Permissions](#permissions)
  - [Code sample](#code-sample)
- [Documentation](#documentation)
  - [Props & Methods](#props--methods)
- [Plugins](#plugins)
- [FAQ](#faq)
- [Example App](#example-app)

# Project description

This module is made for broadcasting rtmp live stream from smartphone camera

# Getting started

## Installation

```sh
npm install @api.video/react-native-live-stream
```
or
```sh
yarn add @api.video/react-native-live-stream
```
_Note: if you are on iOS, you will need two extra steps:_
1) Don't forget to install the native dependencies with Cocoapods
```sh
cd ios && pod install
```
2) This project contains swift code, and if it's your first dependency with swift code, you need to create an empty swift file in your project (with the bridging header) from XCode. [Find how to do that](docs/install_swift_dependency.md)

## Permissions
To be able to broadcast, you must:

1) On Android: ask for internet, camera and microphone permissions:

```xml
<manifest>
  <uses-permission android:name="android.permission.INTERNET" />
  <uses-permission android:name="android.permission.RECORD_AUDIO" />
  <uses-permission android:name="android.permission.CAMERA" />
</manifest>
```
Your application must dynamically require android.permission.CAMERA and android.permission.RECORD_AUDIO.

2) On iOS: update Info.plist with a usage description for camera and microphone

```xml
<key>NSCameraUsageDescription</key>
<string>Your own description of the purpose</string>

<key>NSMicrophoneUsageDescription</key>
<string>Your own description of the purpose</string>
```

3) On react-native you must handle the permissions requests before starting your livestream. If permissions are not accepted you will not be able to broadcast.

## Code sample

```jsx
import React, { useRef, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { LiveStreamView } from '@api.video/react-native-live-stream';

const App = () => {
  const ref = useRef(null);
  const [streaming, setStreaming] = useState(false);

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <LiveStreamView
        style={{ flex: 1, backgroundColor: 'black', alignSelf: 'stretch' }}
        ref={ref}
        camera: 'back',
        video={{
          fps: 30,
          resolution: '720p',
          bitrate: '2*1024*1024', // # 2 Mbps
        }}
        audio={{
          bitrate: 128000,
          sampleRate: 44100,
          isStereo: true,
        }}
        isMuted: false
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

# Documentation

## Props & Methods

```ts
type ReactNativeLiveStreamProps = {
  // Styles for the view containing the preview
  style: ViewStyle;
  // default: 'back'
  camera?: 'front' | 'back';
  video: {
    // default: 30
    fps: number;
    // default: '720p'
    resolution: '240p' | '360p' | '480p' | '720p' | '1080p' | '2160p';
    // If omitted we will infer it from the resolution
    bitrate: number;
  };
  audio: {
    // sample rate. Only for Android. default: 44100
    sampleRate: 44100;
    // true for stereo, false for mono. Only for Android. default: true
    isStereo: true;
    // default: 128000
    bitrate?: number;
  };
  // Mute/unmute microphone
  isMuted: false;
  // will be called when the connection is successful
  onConnectionSuccess?: (event: NativeSyntheticEvent<{ }>) => void;
  // will be called on connection's error
  onConnectionFailed?: (event: NativeSyntheticEvent<{ code: string }>) => void;
  // will be called when the live-stream is stopped
  onDisconnect?: (event: NativeSyntheticEvent<{ }>) => void;
  
};

type ReactNativeLiveStreamMethods = {
  // Start the stream
  // streamKey: your live stream RTMP key
  // url: RTMP server url, default: rtmp://broadcast.api.video/s
  startStreaming: (streamKey: string, url?: string) => void;
  // Stops the stream
  stopStreaming: () => void;
};
```

# Example App
You can try our [example app](https://github.com/apivideo/api.video-reactnative-live-stream/tree/main/example), feel free to test it.

## Setup
Be sure to follow the [React Native installation steps](https://reactnative.dev/docs/environment-setup) before anything.

1) Open a new terminal
2) Clone the repository and go into it

```shell
git clone https://github.com/apivideo/api.video-reactnative-live-stream.git livestream_example_app && cd livestream_example_app
```

### Android

Install the packages and launch the application

```shell
yarn && yarn example android
```

### iOS

1) Install the packages

```shell
yarn install
```

2) Go into `/example/ios` and install the Pods

```shell
cd /example/ios && pod install
```

# Plugins

api.video live stream library is using external native library for broadcasting

| Plugin | README |
| ------ | ------ |
| rtmp-rtsp-stream-client-java | [rtmp-rtsp-stream-client-java] |
| HaishinKit | [HaishinKit] |

# FAQ

If you have any questions, ask us here:  https://community.api.video .
Or use [Issues].

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

   [rtmp-rtsp-stream-client-java]: <https://github.com/pedroSG94/rtmp-rtsp-stream-client-java>
   [HaishinKit]: <https://github.com/shogo4405/HaishinKit.swift>
   [Issues]: <https://github.com/apivideo/api.video-reactnative-live-stream/issues>

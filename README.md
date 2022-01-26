[![badge](https://img.shields.io/twitter/follow/api_video?style=social)](https://twitter.com/intent/follow?screen_name=api_video) &nbsp; [![badge](https://img.shields.io/github/stars/apivideo/api.video-reactnative-live-stream?style=social)](https://github.com/apivideo/api.video-reactnative-live-stream) &nbsp; [![badge](https://img.shields.io/discourse/topics?server=https%3A%2F%2Fcommunity.api.video)](https://community.api.video)
![](https://github.com/apivideo/API_OAS_file/blob/master/apivideo_banner.png)

![npm](https://img.shields.io/npm/v/@api.video/react-native-livestream) 
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

This module is made for broadcasting rtmp livestream from smartphone camera

# Getting started

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
3) On react-native you must handle the permissions requests before starting your livestream. If permissions are not accepted you will not be able to broadcast.

## Code sample

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

# Documentation

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
  // will be called when the connection is successful
  onConnectionSuccess?: (event: NativeSyntheticEvent<{ }>) => void;
  // will be called on connection's error
  onConnectionFailed?: (event: NativeSyntheticEvent<{ code: string }>) => void;
  // will be called when the live-stream is stopped
  onDisconnect?: (event: NativeSyntheticEvent<{ }>) => void;
  
};

type ReactNativeLivestreamMethods = {
  // Start the stream
  startStreaming: () => void;
  // Stops the stream
  stopStreaming: () => void;
};
```

# Plugins

API.Video LiveStream module is using external native library for broadcasting

| Plugin | README |
| ------ | ------ |
| rtmp-rtsp-stream-client-java | [rtmp-rtsp-stream-client-java] |
| HaishinKit | [HaishinKit] |

# FAQ
If you have any questions, ask us here:  https://community.api.video .
Or use [Issues].

# Example App
You can try our [example app](https://github.com/apivideo/api.video-reactnative-live-stream/tree/main/example), feel free to test it. 


[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

   [rtmp-rtsp-stream-client-java]: <https://github.com/pedroSG94/rtmp-rtsp-stream-client-java>
   [HaishinKit]: <https://github.com/shogo4405/HaishinKit.swift>
   [Issues]: <https://github.com/apivideo/api.video-reactnative-live-stream/issues>

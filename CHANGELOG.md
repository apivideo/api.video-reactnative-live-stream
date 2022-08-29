# Changelog
All changes to this project will be documented in this file.

## [1.2.0] - 2022-08-29
- Camera: add support for zoom on pinch (see [#9](https://github.com/apivideo/api.video-reactnative-live-stream/issues/9)). Thanks [BlueBazze](https://github.com/BlueBazze)

## [1.1.2] - 2022-08-08
- Android: multiple fixes on RTMP stream
- iOS: fix start up camera (see [#26](https://github.com/apivideo/api.video-reactnative-live-stream/issues/26))

## [1.1.1] - 2022-06-28
- Android: disconnect after a `stopStream`.
- Android: fix streams after a `stopPreview` call.
- Android: disconnect if `startStream` fails.

## [1.1.0] - 2022-05-10
- Fix connection callbacks on Android and iOS
- Add default parameters
- Add a way to set video bitrate during a live streaming
- iOS only: stop preview and streaming when going to background
- Move internal Android RTMP library to [StreamPack](https://github.com/ThibaultBee/StreamPack)

## [1.0.0] - 2022-03-22
- Update sample app
- Update README
- Update API / client / NPM package

## [0.2.1] - 2022-01-21
- Remove jcenter as a dependency repository
- Update dependencies (react-native)

## [0.2.0] - 2021-11-18
- Add events for live stream status
- Fix iOS issue on preview and live streaming

## [0.1.0] - 2021-05-17
- Release first version

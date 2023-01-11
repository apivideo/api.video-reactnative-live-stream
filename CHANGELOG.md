# Changelog
All changes to this project will be documented in this file.

## [1.2.2] - 2023-01-11
- Add a `gopDuration` API for the `video` object. Default value is 1.0 s. (see [#42](https://github.com/apivideo/api.video-reactnative-live-stream/issues/42))
- Android: fix audio and video packets order (see [#46](https://github.com/apivideo/api.video-reactnative-live-stream/issues/46))
- Android: fix crash when audio is muted on Pixel6 (see [#48](https://github.com/apivideo/api.video-reactnative-live-stream/issues/48))
- iOS: Speed up front camera start up (see [#44](https://github.com/apivideo/api.video-reactnative-live-stream/issues/44))

## [1.2.1] - 2022-10-12
- Fix multiple crashes on both iOS and Android (see [#38](https://github.com/apivideo/api.video-reactnative-live-stream/issues/38), [#33](https://github.com/apivideo/api.video-reactnative-live-stream/issues/33) and [#34](https://github.com/apivideo/api.video-reactnative-live-stream/issues/34))
- Stop camera capture when view is put to background (see [#23](https://github.com/apivideo/api.video-reactnative-live-stream/issues/23]))

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

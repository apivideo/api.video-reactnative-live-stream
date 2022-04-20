//
//  ReactNativeLiveStreamView.swift
//  api.video-reactnative-live-stream
//

import Foundation
import ApiVideoLiveStream
import AVFoundation


extension String {
    func toResolution() -> Resolution {
        switch self {
        case "240p":
            return Resolution.RESOLUTION_240
        case "360p":
            return Resolution.RESOLUTION_360
        case "480p":
            return Resolution.RESOLUTION_480
        case "720p":
            return Resolution.RESOLUTION_720
        case "1080p":
            return Resolution.RESOLUTION_1080
        default:
            return Resolution.RESOLUTION_720
        }
    }

    func toCaptureDevicePosition() -> AVCaptureDevice.Position {
        switch self {
        case "back":
            return AVCaptureDevice.Position.back
        case "front":
            return AVCaptureDevice.Position.front
        default:
            return AVCaptureDevice.Position.back
        }
    }
}

class ReactNativeLiveStreamView : UIView {
    private var liveStream: ApiVideoLiveStream?
    private var isStreaming: Bool = false

    override init(frame: CGRect) {
        super.init(frame: frame)
       // liveStream = ApiVideoLiveStream(preview: self)
    }

    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

    private func buildOrNull() -> ApiVideoLiveStream? {
        if let audioConfig = audioConfig,
           let videoConfig = videoConfig {
            do {
                let liveStream = try ApiVideoLiveStream(initialAudioConfig: audioConfig, initialVideoConfig: videoConfig, preview: self)
                liveStream.onConnectionSuccess = {() in
                    self.onConnectionSuccess?([:])
                }
                liveStream.onDisconnect = {() in
                    self.isStreaming = false
                    self.onDisconnect?([:])
                }
                liveStream.onConnectionFailed = {(code) in
                    self.isStreaming = false
                    self.onConnectionFailed?([
                        "code": code
                    ])
                }
                return liveStream
            } catch {
                fatalError("build(): Can't create a live stream instance")
            }
        }
        return nil
    }

    private var videoBitrate: Int? {
        didSet {
            if let liveStream = liveStream {
                liveStream.videoBitrate = videoBitrate
            }
        }
    }

    private var audioConfig: AudioConfig? {
        didSet {
            if let liveStream = liveStream {
                liveStream.audioConfig = audioConfig!
            } else {
                liveStream = buildOrNull()
            }
        }
    }

    private var videoConfig: VideoConfig? {
        didSet {
            if let liveStream = liveStream {
                liveStream.videoConfig = videoConfig!
            } else {
                liveStream = buildOrNull()
            }
        }
    }

    @objc var audio: NSDictionary = [:] {
        didSet {
            audioConfig = AudioConfig(bitrate: audio["bitrate"] as! Int)
        }
    }

    @objc var video: NSDictionary = [:] {
        didSet {
            if (isStreaming) {
                videoBitrate = video["bitrate"] as! Int
            } else {
                videoConfig = VideoConfig(bitrate: video["bitrate"] as! Int,
                                          resolution: (video["resolution"] as! String).toResolution(),
                                          fps: video["fps"] as! Int)
            }
        }
    }

    @objc var camera: String = "back" {
      didSet {
          if let apiVideo = liveStream {
              let value = camera.toCaptureDevicePosition()
              if(value == apiVideo.camera){
                  return
              }
              apiVideo.camera = camera.toCaptureDevicePosition()
          }
      }
    }

    @objc var isMuted: Bool = false {
      didSet {
          if let apiVideo = liveStream {
            if(isMuted == apiVideo.isMuted){
                return
            }
            apiVideo.isMuted = isMuted
        }
      }
    }

    @objc func startStreaming(requestId: Int, streamKey: String, url: String? = nil) {
        do {
            if let url = url {
                try liveStream!.startStreaming(streamKey: streamKey, url: url)
            } else {
                try liveStream!.startStreaming(streamKey: streamKey)
            }
            isStreaming = true
            self.onStartStreaming?([
                "requestId": requestId,
                "result": true
            ])
        } catch  LiveStreamError.IllegalArgumentError(let message) {
            self.onStartStreaming?([
                "requestId": requestId,
                "result": false,
                "error": message
            ])
        } catch {
            self.onStartStreaming?([
                "requestId": requestId,
                "result": false,
                "error": "Unknown error"
            ])
        }
    }

    @objc func stopStreaming() {
        isStreaming = false
        liveStream!.stopStreaming()
    }

    @objc var onStartStreaming: RCTDirectEventBlock? = nil

    @objc var onConnectionSuccess: RCTDirectEventBlock? = nil

    @objc var onConnectionFailed: RCTDirectEventBlock? = nil

    @objc var onDisconnect: RCTDirectEventBlock? = nil

    @objc override func didMoveToWindow() {
        super.didMoveToWindow()
    }
}

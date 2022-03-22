//
//  ReactNativeLiveStreamView.swift
//  api.video-reactnative-live-stream
//

import Foundation
import ApiVideoLiveStream
import AVFoundation


extension String {
    func toResolution() -> Resolutions {
        switch self {
        case "240p":
            return Resolutions.RESOLUTION_240
        case "360p":
            return Resolutions.RESOLUTION_360
        case "480p":
            return Resolutions.RESOLUTION_480
        case "720p":
            return Resolutions.RESOLUTION_720
        case "1080p":
            return Resolutions.RESOLUTION_1080
        case "2160p":
            return Resolutions.RESOLUTION_2160
        default:
            return Resolutions.RESOLUTION_720
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
            return try ApiVideoLiveStream(initialAudioConfig: audioConfig, initialVideoConfig: videoConfig, preview: self)
            } catch {
                fatalError("build(): Can't create a live stream instance")
            }
        }
        return nil
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
            videoConfig = VideoConfig(bitrate: video["bitrate"] as! Int,
                                      resolution: (video["resolution"] as! String).toResolution(),
                                      fps: video["fps"] as! Int)
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

    @objc func startStreaming(streamKey: String, url: String? = nil) {
        if let url = url {
            liveStream!.startStreaming(streamKey: streamKey, url: url)
        } else {
            liveStream!.startStreaming(streamKey: streamKey)
        }
    }

    @objc func stopStreaming() {
        liveStream!.stopStreaming()
    }
    
    @objc var onConnectionSuccess: RCTDirectEventBlock? = nil {
        didSet {
            liveStream?.onConnectionSuccess = {() in
                self.onConnectionSuccess?([:])
            }
        }
    }
    
    @objc var onConnectionFailed: RCTDirectEventBlock? = nil {
        didSet {
            liveStream?.onConnectionFailed = {(code) in
                self.onConnectionFailed?([
                    "code": code
                ])
            }
        }
    }
    
    @objc var onDisconnect: RCTDirectEventBlock? = nil {
        didSet {
            liveStream?.onDisconnect = {() in
                self.onDisconnect?([:])
            }
        }
    }

    @objc override func didMoveToWindow() {
        super.didMoveToWindow()
    }
}

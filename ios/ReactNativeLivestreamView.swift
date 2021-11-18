//
//  ReactNativeLivestreamView.swift
//  api-video-react-native-livestream
//
//  Created by Thibault Malbranche on 07/05/2021.
//

import Foundation
import LiveStreamIos
import AVFoundation

class ReactNativeLivestreamView : UIView {
    private var apiVideo: ApiVideoLiveStream?

    override init(frame: CGRect) {
        super.init(frame: frame)
        apiVideo = ApiVideoLiveStream(view: self)
    }

    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

    private func getResolutionFromString(resolutionString: String) -> ApiVideoLiveStream.Resolutions{
        switch resolutionString {
        case "240p":
            return ApiVideoLiveStream.Resolutions.RESOLUTION_240
        case "360p":
            return ApiVideoLiveStream.Resolutions.RESOLUTION_360
        case "480p":
            return ApiVideoLiveStream.Resolutions.RESOLUTION_480
        case "720p":
            return ApiVideoLiveStream.Resolutions.RESOLUTION_720
        case "1080p":
            return ApiVideoLiveStream.Resolutions.RESOLUTION_1080
        case "2160p":
            return ApiVideoLiveStream.Resolutions.RESOLUTION_2160
        default:
            return ApiVideoLiveStream.Resolutions.RESOLUTION_720
        }
    }

    
    @objc var onConnectionSuccess: RCTDirectEventBlock? = nil {
        didSet {
            apiVideo?.onConnectionSuccess = {() in
                self.onConnectionSuccess?([:])
            }
        }
    }
    
    @objc var onConnectionFailed: RCTDirectEventBlock? = nil {
        didSet {
            apiVideo?.onConnectionFailed = {(code) in
                self.onConnectionFailed?([
                    "code": code
                ])
            }
        }
    }
    
    @objc var onDisconnect: RCTDirectEventBlock? = nil {
        didSet {
            apiVideo?.onDisconnect = {() in
                self.onDisconnect?([:])
            }
        }
    }

    @objc override func didMoveToWindow() {
        super.didMoveToWindow()
    }

    @objc var liveStreamKey: String = "" {
      didSet {
      }
    }

    @objc var rtmpServerUrl: String? {
      didSet {
      }
    }

    @objc var videoFps: Double = 30 {
      didSet {
        if(videoFps == Double(apiVideo!.videoFps)){
            return
        }
        apiVideo?.videoFps = videoFps
      }
    }

    @objc var videoResolution: String = "720p" {
      didSet {
        let newResolution = getResolutionFromString(resolutionString: videoResolution)
        if(newResolution == apiVideo!.videoResolution){
            return
        }
        apiVideo?.videoResolution = newResolution
      }
    }

    @objc var videoBitrate: Double = -1  {
      didSet {
      }
    }

    @objc var videoCamera: String = "back" {
      didSet {
        var value : AVCaptureDevice.Position
        switch videoCamera {
        case "back":
            value = AVCaptureDevice.Position.back
        case "front":
            value = AVCaptureDevice.Position.front
        default:
            value = AVCaptureDevice.Position.back
        }
        if(value == apiVideo?.videoCamera){
            return
        }
        apiVideo?.videoCamera = value

      }
    }

    @objc var videoOrientation: String = "landscape" {
      didSet {
        var value : ApiVideoLiveStream.Orientation
        switch videoOrientation {
        case "landscape":
            value = ApiVideoLiveStream.Orientation.landscape
        case "portrait":
            value = ApiVideoLiveStream.Orientation.portrait
        default:
            value = ApiVideoLiveStream.Orientation.landscape
        }
        if(value == apiVideo?.videoOrientation){
            return
        }
        apiVideo?.videoOrientation = value

      }
    }

    @objc var audioMuted: Bool = false {
      didSet {
        if(audioMuted == apiVideo!.audioMuted){
            return
        }
        apiVideo?.audioMuted = audioMuted
      }
    }

    @objc var audioBitrate: Double = -1 {
      didSet {
      }
    }

    @objc func startStreaming() {
        apiVideo!.startLiveStreamFlux(liveStreamKey: self.liveStreamKey, rtmpServerUrl: self.rtmpServerUrl)
    }

    @objc func stopStreaming() {
        apiVideo!.stopLiveStreamFlux()
    }
}

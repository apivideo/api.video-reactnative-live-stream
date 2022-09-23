//
//  ReactNativeLiveStreamView.swift
//  api.video-reactnative-live-stream
//

import ApiVideoLiveStream
import AVFoundation
import CoreGraphics
import Foundation

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

extension AVCaptureDevice.Position {
    func toCameraPositionName() -> String {
        switch self {
        case AVCaptureDevice.Position.back:
            return "back"
        case AVCaptureDevice.Position.front:
            return "front"
        default:
            return "back"
        }
    }
}

class ReactNativeLiveStreamView: UIView {
    private var liveStream: ApiVideoLiveStream!
    private var isStreaming: Bool = false

    private lazy var zoomGesture: UIPinchGestureRecognizer = .init(target: self, action: #selector(zoom(sender:)))
    private let pinchZoomMultiplier: CGFloat = 2.2

    override init(frame: CGRect) {
        super.init(frame: frame)

        do {
            liveStream = try ApiVideoLiveStream(initialAudioConfig: nil, initialVideoConfig: nil, preview: self)
        } catch {
            fatalError("build(): Can't create a live stream instance")
        }

        liveStream.onConnectionSuccess = { () in
            self.onConnectionSuccess?([:])
        }
        liveStream.onDisconnect = { () in
            self.isStreaming = false
            self.onDisconnect?([:])
        }
        liveStream.onConnectionFailed = { code in
            self.isStreaming = false
            self.onConnectionFailed?([
                "code": code,
            ])
        }

        addGestureRecognizer(zoomGesture)
    }

    @available(*, unavailable)
    required init?(coder _: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

    private var videoBitrate: Int {
        get {
            return liveStream.videoBitrate
        }
        set {
            liveStream.videoBitrate = newValue
        }
    }

    private var audioConfig: AudioConfig {
        get {
            liveStream.audioConfig
        }
        set {
            liveStream.audioConfig = newValue
        }
    }

    private var videoConfig: VideoConfig {
        get {
            liveStream.videoConfig
        }
        set {
            liveStream.videoConfig = newValue
        }
    }

    @objc var audio: NSDictionary = [:] {
        didSet {
            audioConfig = AudioConfig(bitrate: audio["bitrate"] as! Int)
        }
    }

    @objc var video: NSDictionary = [:] {
        didSet {
            if isStreaming {
                videoBitrate = video["bitrate"] as! Int
            } else {
                videoConfig = VideoConfig(bitrate: video["bitrate"] as! Int,
                                          resolution: (video["resolution"] as! String).toResolution(),
                                          fps: video["fps"] as! Int)
            }
        }
    }

    @objc var camera: String {
        get {
            return liveStream.camera.toCameraPositionName()
        }
        set {
            let value = newValue.toCaptureDevicePosition()
            if value == liveStream.camera {
                return
            }
            liveStream.camera = value
        }
    }

    @objc var isMuted: Bool {
        get {
            return liveStream.isMuted
        }
        set {
            if newValue == liveStream.isMuted {
                return
            }
            liveStream.isMuted = newValue
        }
    }

    @objc var zoomRatio: Double {
        get {
            return Double(liveStream.zoomRatio)
        }
        set {
            liveStream.zoomRatio = CGFloat(newValue)
        }
    }

    @objc var enablePinchedZoom: Bool {
        get {
            return zoomGesture.isEnabled
        }
        set {
            zoomGesture.isEnabled = newValue
        }
    }

    @objc func startStreaming(requestId: Int, streamKey: String, url: String? = nil) {
        do {
            if let url = url {
                try liveStream.startStreaming(streamKey: streamKey, url: url)
            } else {
                try liveStream.startStreaming(streamKey: streamKey)
            }
            isStreaming = true
            onStartStreaming?([
                "requestId": requestId,
                "result": true,
            ])
        } catch let LiveStreamError.IllegalArgumentError(message) {
            self.onStartStreaming?([
                "requestId": requestId,
                "result": false,
                "error": message,
            ])
        } catch {
            onStartStreaming?([
                "requestId": requestId,
                "result": false,
                "error": "Unknown error",
            ])
        }
    }

    @objc func stopStreaming() {
        isStreaming = false
        liveStream.stopStreaming()
    }

    @objc func setZoomRatio(zoomRatio: CGFloat) {
        if let liveStream = liveStream {
            liveStream.zoomRatio = zoomRatio
        }
    }

    @objc
    private func zoom(sender: UIPinchGestureRecognizer) {
        if sender.state == .changed {
            liveStream.zoomRatio = liveStream.zoomRatio + (sender.scale - 1) * pinchZoomMultiplier
            sender.scale = 1
        }
    }

    @objc var onStartStreaming: RCTDirectEventBlock?

    @objc var onConnectionSuccess: RCTDirectEventBlock?

    @objc var onConnectionFailed: RCTDirectEventBlock?

    @objc var onDisconnect: RCTDirectEventBlock?

    @objc override func didMoveToWindow() {
        super.didMoveToWindow()
    }
}

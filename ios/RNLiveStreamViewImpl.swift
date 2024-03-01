//
//  RNLiveStreamViewImpl.swift
//  api.video-reactnative-live-stream
//

import ApiVideoLiveStream
import AVFoundation
import CoreGraphics
import Foundation

extension String {
    func toCaptureDevicePosition() -> AVCaptureDevice.Position {
        switch self {
        case "back":
            return AVCaptureDevice.Position.back
        case "front":
            return AVCaptureDevice.Position.front
        default:
            return AVCaptureDevice.Position.unspecified
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
            return "unspecified"
        }
    }
}

@objc(RNLiveStreamViewImpl)
public class RNLiveStreamViewImpl: UIView {
    private var liveStream: ApiVideoLiveStream!
    private var isStreaming: Bool = false

    private lazy var zoomGesture: UIPinchGestureRecognizer = .init(target: self, action: #selector(zoom(sender:)))
    private let pinchZoomMultiplier: CGFloat = 2.2

    override init(frame: CGRect) {
        super.init(frame: frame)

        do {
            liveStream = try ApiVideoLiveStream(preview: self, initialAudioConfig: nil, initialVideoConfig: nil, initialCamera: nil)
            liveStream.delegate = self
        } catch {
            fatalError("build(): Can't create a live stream instance")
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

    @objc public var audio: NSDictionary = [:] {
        didSet {
            audioConfig = AudioConfig(bitrate: audio["bitrate"] as! Int)
        }
    }

    @objc public var video: NSDictionary = [:] {
        didSet {
            if isStreaming {
                videoBitrate = video["bitrate"] as! Int
            } else {
                let resolution = video["resolution"] as! Dictionary<String, Int>
                videoConfig = VideoConfig(bitrate: video["bitrate"] as! Int,
                                          resolution: CGSize(width: resolution["width"]!, height: resolution["height"]!),
                                          fps: video["fps"] as! Float64,
                                          gopDuration: video["gopDuration"] as! Float64)
            }
        }
    }

    @objc public var camera: String {
        get {
            return liveStream.cameraPosition.toCameraPositionName()
        }
        set {
            let value = newValue.toCaptureDevicePosition()
            if value == liveStream.cameraPosition {
                return
            }
            liveStream.cameraPosition = value
        }
    }

    @objc public var isMuted: Bool {
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

    @objc public var zoomRatio: Float {
        get {
            return Float(liveStream.zoomRatio)
        }
        set {
            liveStream.zoomRatio = CGFloat(newValue)
        }
    }

    @objc public var enablePinchedZoom: Bool {
        get {
            return zoomGesture.isEnabled
        }
        set {
            zoomGesture.isEnabled = newValue
        }
    }

    @objc public func startStreaming(requestId: Int, streamKey: String, url: String?) {
        do {
           if let url = url {
               try liveStream.startStreaming(streamKey: streamKey, url: url)
           } else {
               try liveStream.startStreaming(streamKey: streamKey)
           }
           isStreaming = true
           onStartStreaming([
               "requestId": requestId,
               "result": true,
           ])
       } catch let LiveStreamError.IllegalArgumentError(message) {
           self.onStartStreaming([
               "requestId": requestId,
               "result": false,
               "error": message,
           ])
       } catch {
           onStartStreaming([
               "requestId": requestId,
               "result": false,
               "error": error.localizedDescription,
           ])
       }
    }

    @objc public func stopStreaming() {
        isStreaming = false
        liveStream.stopStreaming()
    }

    @objc public func setZoomRatio(zoomRatio: CGFloat) {
        liveStream.zoomRatio = zoomRatio
    }

    @objc
    private func zoom(sender: UIPinchGestureRecognizer) {
        if sender.state == .changed {
            liveStream.zoomRatio = liveStream.zoomRatio + (sender.scale - 1) * pinchZoomMultiplier
            sender.scale = 1
        }
    }

    @objc public var onConnectionSuccess: (_ dictionnary: [String: Any]) -> Void = { _ in }

    @objc public var onConnectionFailed: (_ dictionnary: [String: Any]) -> Void = { _ in }

    @objc public var onDisconnect: (_ dictionnary: [String: Any]) -> Void = { _ in }

    @objc public var onStartStreaming: (_ dictionnary: [String: Any]) -> Void = { _ in }
    
    @objc override public func removeFromSuperview() {
        super.removeFromSuperview()
        liveStream.stopPreview()
    }
}

extension RNLiveStreamViewImpl: ApiVideoLiveStreamDelegate {
    /// Called when the connection to the rtmp server is successful
    public func connectionSuccess() {
        onConnectionSuccess([:])
    }

    /// Called when the connection to the rtmp server failed
    public func connectionFailed(_ code: String) {
        isStreaming = false
        onConnectionFailed(["code": code])
    }

    /// Called when the connection to the rtmp server is closed
    public func disconnection() {
        isStreaming = false
        onDisconnect([:])
    }

    /// Called if an error happened during the audio configuration
    public func audioError(_: Error) {}

    /// Called if an error happened during the video configuration
    public func videoError(_: Error) {}
}

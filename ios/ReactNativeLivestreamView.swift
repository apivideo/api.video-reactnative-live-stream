//
//  ReactNativeLivestreamView.swift
//  api-video-react-native-livestream
//
//  Created by Thibault Malbranche on 07/05/2021.
//

import Foundation
import LiveStreamIos

class ReactNativeLivestreamView : UIView {
    private var apiVideo: ApiVideoLiveStream?
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        apiVideo = ApiVideoLiveStream(videoResolution: self.videoResolution, videoFps: self.videoFps, view: self)
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
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
      }
    }
    
    @objc var videoResolution: String = "720p" {
      didSet {
      }
    }
    
    @objc var videoBitrate: Double = -1  {
      didSet {
      }
    }
    
    @objc var videoCamera: String = "back" {
      didSet {
      }
    }
    
    @objc var audioMuted: Bool = false {
      didSet {
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

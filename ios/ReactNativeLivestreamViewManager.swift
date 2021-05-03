import LiveStreamIos

@objc(ReactNativeLivestreamViewManager)
class ReactNativeLivestreamViewManager: RCTViewManager {

  override func view() -> (ReactNativeLivestreamView) {
    return ReactNativeLivestreamView()
  }
}

class ReactNativeLivestreamView : UIView {
    @objc override func didMoveToWindow() {
        let apiVideo = ApiVideoLiveStream()
        apiVideo.startLiveStreamFlux(liveStreamKey: liveStreamKey, captureQuality: quality, streamQuality: quality, fps: fps, view: self)
    }
    
    @objc static func requiresMainQueueSetup() -> Bool {
        return true
    }
    
    @objc var liveStreamKey: String = "" {
      didSet {
      }
    }
    
    @objc var quality: String = "" {
      didSet {
      }
    }

    @objc var fps: Double = 30 {
      didSet {
      }
    }
}

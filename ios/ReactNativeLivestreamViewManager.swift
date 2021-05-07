import LiveStreamIos

@objc(ReactNativeLivestreamViewManager)
class ReactNativeLivestreamViewManager: RCTViewManager {
  override static func requiresMainQueueSetup() -> Bool {
    return true
  }
    
  override func view() -> (ReactNativeLivestreamView) {
    return ReactNativeLivestreamView()
  }

  @objc func callItNowPleaseFromManager(_ node: NSNumber) {
    
    DispatchQueue.main.async {                              
      let component = self.bridge.uiManager.view(            
        forReactTag: node                                     
      ) as! ReactNativeLivestreamView
      component.callItNowPlease()
    }
  }

}

class ReactNativeLivestreamView : UIView {
    private var apiVideo = ApiVideoLiveStream()
    
    override init(frame: CGRect) {
        super.init(frame: frame)
       
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
    
    @objc var quality: String = "" {
      didSet {
      }
    }

    @objc var fps: Double = 30 {
      didSet {
      }
    }
    
    @objc func callItNowPlease() {
      print("Button Press")
      
        apiVideo.startLiveStreamFlux(liveStreamKey: self.liveStreamKey, captureQuality: self.quality, streamQuality: self.quality, fps: self.fps, view: self)
    }
}

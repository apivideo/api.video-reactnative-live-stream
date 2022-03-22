@objc(ReactNativeLiveStreamViewManager)
class ReactNativeLiveStreamViewManager: RCTViewManager {
  override static func requiresMainQueueSetup() -> Bool {
    return true
  }
    
  override func view() -> (ReactNativeLiveStreamView) {
    return ReactNativeLiveStreamView()
  }

    @objc func startStreamingFromManager(_ node: NSNumber, withStreamKey streamKey: String, withUrl url: String?) {
    DispatchQueue.main.async {                              
      let component = self.bridge.uiManager.view(            
        forReactTag: node                                     
      ) as! ReactNativeLiveStreamView
        component.startStreaming(streamKey: streamKey, url: url)
    }
  }
    
    @objc func stopStreamingFromManager(_ node: NSNumber) {
      DispatchQueue.main.async {
        let component = self.bridge.uiManager.view(
          forReactTag: node
        ) as! ReactNativeLiveStreamView
        component.stopStreaming()
      }
    }
}

@objc(ReactNativeLivestreamViewManager)
class ReactNativeLivestreamViewManager: RCTViewManager {
  override static func requiresMainQueueSetup() -> Bool {
    return true
  }
    
  override func view() -> (ReactNativeLivestreamView) {
    return ReactNativeLivestreamView()
  }

  @objc func startStreamingFromManager(_ node: NSNumber) {
    DispatchQueue.main.async {                              
      let component = self.bridge.uiManager.view(            
        forReactTag: node                                     
      ) as! ReactNativeLivestreamView
      component.startStreaming()
    }
  }
    
    @objc func stopStreamingFromManager(_ node: NSNumber) {
      DispatchQueue.main.async {
        let component = self.bridge.uiManager.view(
          forReactTag: node
        ) as! ReactNativeLivestreamView
        component.stopStreaming()
      }
    }
}

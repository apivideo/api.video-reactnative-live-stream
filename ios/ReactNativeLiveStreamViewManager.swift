import ApiVideoLiveStream

@objc(ReactNativeLiveStreamViewManager)
class ReactNativeLiveStreamViewManager: RCTViewManager {
  override static func requiresMainQueueSetup() -> Bool {
    return true
  }
    
  override func view() -> (ReactNativeLiveStreamView) {
    return ReactNativeLiveStreamView()
  }

    @objc func startStreamingFromManager(_ node: NSNumber, withStreamKey streamKey: String, withUrl url: String?, resolver resolve:  @escaping RCTPromiseResolveBlock, rejecter reject: @escaping  RCTPromiseRejectBlock) -> Void {
    DispatchQueue.main.async {                              
      let component = self.bridge.uiManager.view(            
        forReactTag: node                                     
      ) as! ReactNativeLiveStreamView
        do {
            try component.startStreaming(streamKey: streamKey, url: url)
            resolve(true)
        } catch LiveStreamError.IllegalArgumentError(let message) {
            reject("IllegalArgumentError", message, nil)
        } catch {
            reject("UnknownError", nil, error)
        }
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

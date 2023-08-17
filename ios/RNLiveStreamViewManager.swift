import ApiVideoLiveStream
import CoreGraphics
import Foundation

@objc(RNLiveStreamViewManager)
class RNLiveStreamViewManager: RCTViewManager {
    override static func requiresMainQueueSetup() -> Bool {
        return true
    }

    override func view() -> (RNLiveStreamViewImpl) {
        return RNLiveStreamViewImpl()
    }

    @objc(startStreaming:withStreamKey:withUrl:) // resolve:reject:)
    func startStreaming(_ reactTag: NSNumber, streamKey: String, url: String? /* , resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock */ ) {
        bridge!.uiManager.addUIBlock { (_: RCTUIManager?, viewRegistry: [NSNumber: UIView]?) in
            let view: RNLiveStreamViewImpl = (viewRegistry![reactTag] as? RNLiveStreamViewImpl)!
            do {
                try view.startStreaming(streamKey, url: url)
                // resolve(true)
            } catch {
                // TODO: reject
                // reject("Failed_to_start_streaming", "Could not start streaming", error)
            }
        }
    }

    @objc(stopStreaming:)
    func stopStreaming(_ reactTag: NSNumber) {
        bridge!.uiManager.addUIBlock { (_: RCTUIManager?, viewRegistry: [NSNumber: UIView]?) in
            let view: RNLiveStreamViewImpl = (viewRegistry![reactTag] as? RNLiveStreamViewImpl)!
            view.stopStreaming()
        }
    }

    @objc(setZoomRatioCommand:withZoomRatio:)
    func setZoomRatioCommand(_ reactTag: NSNumber, zoomRatio: NSNumber) {
        bridge!.uiManager.addUIBlock { (_: RCTUIManager?, viewRegistry: [NSNumber: UIView]?) in
            let view: RNLiveStreamViewImpl = (viewRegistry![reactTag] as? RNLiveStreamViewImpl)!
            view.zoomRatio = zoomRatio.floatValue
        }
    }
}

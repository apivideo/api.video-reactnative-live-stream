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

    @objc(startStreaming:withRequestId:withStreamKey:withUrl:)
    func startStreaming(_ reactTag: NSNumber, withRequestId requestId: NSNumber, streamKey: String, url: String?) {
        bridge!.uiManager.addUIBlock { (_: RCTUIManager?, viewRegistry: [NSNumber: UIView]?) in
            let view: RNLiveStreamViewImpl = (viewRegistry![reactTag] as? RNLiveStreamViewImpl)!
            view.startStreaming(requestId: Int(truncating: requestId), streamKey: streamKey, url: url)
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

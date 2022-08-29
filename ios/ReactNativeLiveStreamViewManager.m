#import "React/RCTViewManager.h"

@interface RCT_EXTERN_MODULE(ReactNativeLiveStreamViewManager, RCTViewManager)

RCT_EXPORT_VIEW_PROPERTY(audio, NSDictionary)
RCT_EXPORT_VIEW_PROPERTY(video, NSDictionary)
RCT_EXPORT_VIEW_PROPERTY(camera, NSString)
RCT_EXPORT_VIEW_PROPERTY(isMuted, BOOL)
RCT_EXPORT_VIEW_PROPERTY(enablePinchedZoom, BOOL)
RCT_EXPORT_VIEW_PROPERTY(zoomRatio, double)

RCT_EXPORT_VIEW_PROPERTY(onConnectionSuccess, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onConnectionFailed, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onDisconnect, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onStartStreaming, RCTDirectEventBlock)

RCT_EXTERN_METHOD(
                  startStreamingFromManager:(nonnull NSNumber *)node withRequestId:(nonnull NSNumber)requestId withStreamKey:(nonnull NSString)streamKey withUrl:(NSString)url
)
RCT_EXTERN_METHOD(
    stopStreamingFromManager:(nonnull NSNumber *)node
)
RCT_EXTERN_METHOD(
                  zoomRatioFromManager:(nonnull NSNumber *)node withZoomRatio:(nonnull NSNumber)zoomRatio
)

@end

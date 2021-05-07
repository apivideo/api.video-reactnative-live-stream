#import "React/RCTViewManager.h"

@interface RCT_EXTERN_MODULE(ReactNativeLivestreamViewManager, RCTViewManager)

RCT_EXPORT_VIEW_PROPERTY(liveStreamKey, NSString)
RCT_EXPORT_VIEW_PROPERTY(rtmpServerUrl, NSString)
RCT_EXPORT_VIEW_PROPERTY(videoFps, double)
RCT_EXPORT_VIEW_PROPERTY(videoResolution, NSString)
RCT_EXPORT_VIEW_PROPERTY(videoBitrate, double)
RCT_EXPORT_VIEW_PROPERTY(videoCamera, NSString)
RCT_EXPORT_VIEW_PROPERTY(audioMuted, bool)
RCT_EXPORT_VIEW_PROPERTY(audioBitrate, double)

RCT_EXTERN_METHOD(
    startStreamingFromManager:(nonnull NSNumber *)node
)

@end

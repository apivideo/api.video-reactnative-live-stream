#import "React/RCTViewManager.h"

@interface RCT_EXTERN_MODULE(ReactNativeLivestreamViewManager, RCTViewManager)

RCT_EXPORT_VIEW_PROPERTY(liveStreamKey, NSString)
RCT_EXPORT_VIEW_PROPERTY(quality, NSString)
RCT_EXPORT_VIEW_PROPERTY(fps, double)

RCT_EXTERN_METHOD(
    startStreamingFromManager:(nonnull NSNumber *)node
)

@end

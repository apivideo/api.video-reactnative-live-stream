#import "React/RCTViewManager.h"

@interface RCT_EXTERN_MODULE(ReactNativeLiveStreamViewManager, RCTViewManager)

RCT_EXPORT_VIEW_PROPERTY(audio, NSDictionary)
RCT_EXPORT_VIEW_PROPERTY(video, NSDictionary)
RCT_EXPORT_VIEW_PROPERTY(camera, NSString)
RCT_EXPORT_VIEW_PROPERTY(isMuted, BOOL)

RCT_EXPORT_VIEW_PROPERTY(onConnectionSuccess, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onConnectionFailed, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onDisconnect, RCTDirectEventBlock)

RCT_EXTERN_METHOD(
    startStreamingFromManager:(nonnull NSNumber *)node withStreamKey:(nonnull NSString)streamKey withUrl:(NSString)url
)
RCT_EXTERN_METHOD(
    stopStreamingFromManager:(nonnull NSNumber *)node
)

@end

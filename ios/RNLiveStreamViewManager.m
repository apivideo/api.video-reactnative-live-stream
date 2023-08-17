#import "React/RCTViewManager.h"

#ifdef RCT_NEW_ARCH_ENABLED
#import "ApiVideoLiveStreamViewSpec/ApiVideoLiveStreamViewSpec.h"
#endif

@interface RCT_EXTERN_REMAP_MODULE(ApiVideoLiveStreamView, RNLiveStreamViewManager, RCTViewManager)

RCT_EXPORT_VIEW_PROPERTY(audio, NSDictionary)
RCT_EXPORT_VIEW_PROPERTY(video, NSDictionary)
RCT_EXPORT_VIEW_PROPERTY(camera, NSString)
RCT_EXPORT_VIEW_PROPERTY(isMuted, BOOL)
RCT_EXPORT_VIEW_PROPERTY(enablePinchedZoom, BOOL)
RCT_EXPORT_VIEW_PROPERTY(zoomRatio, double)

RCT_EXPORT_VIEW_PROPERTY(onConnectionSuccess, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onConnectionFailed, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onDisconnect, RCTDirectEventBlock)

RCT_EXTERN_METHOD(startStreaming:
                  (nonnull NSNumber *)reactTag
                  withStreamKey:(nonnull NSString)streamKey
                  withUrl:(NSString)url)
                 // resolve:(RCTPromiseResolveBlock)resolve
                 // reject:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(stopStreaming:(nonnull NSNumber *)reactTag)
RCT_EXTERN_METHOD(setZoomRatioCommand:
                  (nonnull NSNumber *)reactTag
                  withZoomRatio:(nonnull NSNumber *)zoomRatio)

// Thanks to this guard, we won't compile this code when we build for the old architecture.
#ifdef RCT_NEW_ARCH_ENABLED
- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeApiVideoLiveStreamViewSpecJSI>(params);
}
#endif

@end

// This guard prevent this file to be compiled in the old architecture.
#ifdef RCT_NEW_ARCH_ENABLED
#import <React/RCTViewComponentView.h>
#import <React/RCTConversions.h>
#import <WebKit/WKDataDetectorTypes.h>
#import <UIKit/UIKit.h>
#import <react/renderer/components/ApiVideoLiveStreamView/Props.h>

#ifndef RNLiveStreamView_h
#define RNLiveStreamView_h

NS_ASSUME_NONNULL_BEGIN

@interface RNLiveStreamView : RCTViewComponentView
@end

NS_ASSUME_NONNULL_END

#endif /* RNLiveStreamView_h */
#endif /* RCT_NEW_ARCH_ENABLED */

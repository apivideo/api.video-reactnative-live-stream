// This guard prevent the code from being compiled in the old architecture
#if RCT_NEW_ARCH_ENABLED

    import Foundation

    @objc class RNLiveStreamView: RCTViewComponentView {
        init(frame: CGRect) {
            super.init(frame: frame)
            view = RNLiveStreamViewImpl()
        }

        static func componentDescriptorProvider() -> Any! {}

        static func supplementalComponentDescriptorProviders() -> Any! {}

        func mountChildComponentView(_: UIView & RCTComponentViewProtocol, index _: Int) {}

        func unmountChildComponentView(_: UIView & RCTComponentViewProtocol, index _: Int) {}

        @objc func updateProps(_: Int32, oldProps _: Int32) {}

        func updateState(_: Int32, oldState _: Int32) {}

        func updateEventEmitter(_ eventEmitter: Int32) {
            super.updateEventEmitter(eventEmitter)
        }

        func updateLayoutMetrics(_: Int32, oldLayoutMetrics _: Int32) {}

        func handleCommand(_: String, args _: [Any]) {}

        func finalizeUpdates(_: Any!) {}

        func prepareForRecycle() {}

        func props() -> Any! {}

        func isJSResponder() -> Bool {}

        func setIsJSResponder(_: Bool) {}

        func setPropKeysManagedByAnimated_DO_NOT_USE_THIS_IS_BROKEN(_: Set<String>?) {}

        func propKeysManagedByAnimated_DO_NOT_USE_THIS_IS_BROKEN() -> Set<String>? {}

        @objc
        func startStreaming(_ streamKey: String, url: String) {
            do {
                try view.startStreaming(streamKey, url: url)
            } catch {
                // TODO: return error
                print(error)
            }
        }

        @objc
        func stopStreaming() {
            view.stopStreaming()
        }

        @objc
        func setZoomRatioCommand(_ zoomRatio: Float) {
            view.setZoomRatio(zoomRatio: CGFloat(zoomRatio))
        }
    }

#endif

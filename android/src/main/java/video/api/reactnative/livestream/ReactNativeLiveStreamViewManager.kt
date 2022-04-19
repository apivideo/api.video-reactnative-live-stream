package video.api.reactnative.livestream

import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp
import video.api.reactnative.livestream.utils.getCameraFacing
import video.api.reactnative.livestream.utils.toAudioConfig
import video.api.reactnative.livestream.utils.toVideoConfig


class ReactNativeLiveStreamViewManager : SimpleViewManager<ReactNativeLiveStreamView>() {
  override fun getName() = "ReactNativeLiveStreamView"

  override fun createViewInstance(reactContext: ThemedReactContext): ReactNativeLiveStreamView {
    return ReactNativeLiveStreamView(reactContext)
  }

  override fun receiveCommand(
    view: ReactNativeLiveStreamView,
    commandId: Int,
    args: ReadableArray?
  ) {
    super.receiveCommand(view, commandId, args)

    when (commandId) {
      ViewProps.Commands.START_STREAMING.ordinal -> {
        val requestId = args!!.getInt(0)
        val streamKey = args.getString(1)
        val url = try {
          args.getString(2)
        } catch (e: Exception) {
          null
        }
        view.startStreaming(requestId, streamKey, url)
      }
      ViewProps.Commands.STOP_STREAMING.ordinal -> view.stopStreaming()
      else -> {
        throw IllegalArgumentException("Unsupported command %d received by %s. $commandId")
      }
    }
  }

  override fun getCommandsMap(): Map<String, Int> {
    return ViewProps.Commands.toCommandsMap()
  }

  override fun getExportedCustomBubblingEventTypeConstants(): Map<String, *> {
    return ViewProps.Events.toEventsMap()
  }

  @ReactProp(name = ViewProps.VIDEO_CONFIG)
  fun setVideoConfig(view: ReactNativeLiveStreamView, videoMap: ReadableMap) {
    view.videoConfig = videoMap.toVideoConfig()
  }

  @ReactProp(name = ViewProps.AUDIO_CONFIG)
  fun setAudioConfig(view: ReactNativeLiveStreamView, audioMap: ReadableMap) {
    view.audioConfig = audioMap.toAudioConfig()
  }

  @ReactProp(name = ViewProps.CAMERA)
  fun setCamera(view: ReactNativeLiveStreamView, newVideoCameraString: String) {
    view.camera = newVideoCameraString.getCameraFacing()
  }

  @ReactProp(name = ViewProps.IS_MUTED)
  fun isMuted(view: ReactNativeLiveStreamView, isMuted: Boolean) {
    view.isMuted = isMuted
  }
}

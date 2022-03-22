package video.api.reactnative.livestream

import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp
import video.api.livestream.models.AudioConfig
import video.api.livestream.models.VideoConfig
import video.api.reactnative.livestream.utils.getCameraFacing
import video.api.reactnative.livestream.utils.getResolution


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
        val url = try {
          args!!.getString(1)
        } catch (e: Exception) {
          null
        }
        view.startStreaming(args!!.getString(0), url)
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
    view.videoConfig = VideoConfig(
      bitrate = videoMap.getInt(ViewProps.BITRATE),
      resolution = videoMap.getString(ViewProps.RESOLUTION)?.getResolution()!!,
      fps = videoMap.getInt(ViewProps.FPS)
    )
  }

  @ReactProp(name = ViewProps.AUDIO_CONFIG)
  fun setAudioConfig(view: ReactNativeLiveStreamView, audioMap: ReadableMap) {
    view.audioConfig = AudioConfig(
      bitrate = audioMap.getInt(ViewProps.BITRATE),
      sampleRate = audioMap.getInt(ViewProps.SAMPLE_RATE),
      stereo = audioMap.getBoolean(ViewProps.IS_STEREO),
      echoCanceler = true,
      noiseSuppressor = true
    )
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

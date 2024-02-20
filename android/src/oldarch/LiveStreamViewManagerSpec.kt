package video.api.reactnative.livestream

import android.view.View
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.uimanager.SimpleViewManager

abstract class LiveStreamViewManagerSpec<T : View> : SimpleViewManager<T>() {
  abstract fun setCamera(view: T, value: String?)
  abstract fun setVideo(view: T, value: ReadableMap?)
  abstract fun setIsMuted(view: T, value: Boolean)
  abstract fun setAudio(view: T, value: ReadableMap?)
  abstract fun setZoomRatio(view: T, value: Float)
  abstract fun setEnablePinchedZoom(view: T, value: Boolean)

  abstract fun startStreaming(view: T, requestId: Int, streamKey: String, url: String?)
  abstract fun stopStreaming(view: T)
  abstract fun setZoomRatioCommand(view: T, zoomRatio: Float)

  override fun receiveCommand(root: T, commandId: String, args: ReadableArray?) {
    when (commandId) {
      ViewProps.Commands.START_STREAMING.action -> {
        val requestId = args?.getInt(0) ?: return
        val streamKey = args.getString(1)
        val url = args.getString(2)
        startStreaming(root, requestId, streamKey, url)
      }

      ViewProps.Commands.STOP_STREAMING.action -> {
        stopStreaming(root)
      }

      ViewProps.Commands.ZOOM_RATIO.action -> {
        val zoomRatio = args?.getDouble(0)?.toFloat() ?: return
        setZoomRatioCommand(root, zoomRatio)
      }

      else -> throw IllegalArgumentException("Unsupported command: $commandId")
    }
  }
}

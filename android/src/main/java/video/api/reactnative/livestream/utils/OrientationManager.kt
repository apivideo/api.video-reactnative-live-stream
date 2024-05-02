package video.api.reactnative.livestream.utils

import android.content.Context
import android.view.OrientationEventListener
import java.io.Closeable

class OrientationManager(context: Context) : Closeable {
  private val orientationEventListener = object : OrientationEventListener(context) {
    override fun onOrientationChanged(orientation: Int) {
      currentOrientation = (orientation + 45) / 90 * 90 % 360
    }
  }.apply {
    enable()
  }

  private var currentOrientation: Int = OrientationEventListener.ORIENTATION_UNKNOWN
    set(value) {
      if (field != value) {
        if (field == OrientationEventListener.ORIENTATION_UNKNOWN) {
          // First time we get an orientation value, don't consider it as a change
          field = value
          return
        } else {
          field = value
          _orientationHasChanged = true
        }
      }
    }


  private var _orientationHasChanged: Boolean = false

  val orientationHasChanged: Boolean
    get() {
      if (!orientationEventListener.canDetectOrientation()) {
        // Assume orientation has changed if we can't detect it
        return true
      }

      val orientationHasChanged = _orientationHasChanged
      _orientationHasChanged = false
      return orientationHasChanged
    }

  override fun close() {
    orientationEventListener.disable()
  }
}

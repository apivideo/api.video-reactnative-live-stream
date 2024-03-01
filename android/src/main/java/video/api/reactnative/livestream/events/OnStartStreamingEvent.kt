package video.api.reactnative.livestream.events

import com.facebook.react.bridge.Arguments
import com.facebook.react.uimanager.events.Event
import com.facebook.react.uimanager.events.RCTEventEmitter
import video.api.reactnative.livestream.ViewProps

class OnStartStreamingEvent(
  private val viewTag: Int,
  private val requestId: Int,
  private val result: Boolean,
  private val error: String? = null
) :
  Event<OnStartStreamingEvent>(viewTag) {
  private val params = Arguments.createMap().apply {
    putInt("requestId", requestId)
    putBoolean("result", result)
    error?.let { putString("error", it) }
  }

  override fun getEventName() = ViewProps.Events.START_STREAMING.eventName

  override fun dispatch(rctEventEmitter: RCTEventEmitter) {
    rctEventEmitter.receiveEvent(viewTag, eventName, params)
  }
}

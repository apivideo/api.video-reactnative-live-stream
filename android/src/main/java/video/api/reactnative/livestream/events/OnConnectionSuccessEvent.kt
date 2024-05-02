package video.api.reactnative.livestream.events

import com.facebook.react.uimanager.events.Event
import com.facebook.react.uimanager.events.RCTEventEmitter
import video.api.reactnative.livestream.ViewProps

class OnConnectionSuccessEvent(private val viewTag: Int): Event<OnConnectionSuccessEvent>(viewTag) {
  override fun getEventName() = ViewProps.Events.CONNECTION_SUCCESS.eventName

  override fun dispatch(rctEventEmitter: RCTEventEmitter) {
    rctEventEmitter.receiveEvent(viewTag, eventName, null)
  }
}

package video.api.reactnative.livestream.events

import com.facebook.react.uimanager.events.Event
import com.facebook.react.uimanager.events.RCTEventEmitter
import video.api.reactnative.livestream.ViewProps

class OnDisconnectEvent(private val viewTag: Int) :
  Event<OnDisconnectEvent>(viewTag) {
  override fun getEventName() = ViewProps.Events.DISCONNECTED.eventName

  override fun dispatch(rctEventEmitter: RCTEventEmitter) {
    rctEventEmitter.receiveEvent(viewTag, eventName, null)
  }
}

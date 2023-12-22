package video.api.reactnative.livestream.events

import com.facebook.react.bridge.Arguments
import com.facebook.react.uimanager.events.Event
import com.facebook.react.uimanager.events.RCTEventEmitter
import video.api.reactnative.livestream.ViewProps

class OnPermissionsDeniedEvent(private val viewTag: Int, private val permissions: List<String>) :
  Event<OnPermissionsDeniedEvent>(viewTag) {
  private val params = Arguments.createMap().apply {
    putArray("permissions", Arguments.fromList(permissions))
  }

  override fun getEventName() = ViewProps.Events.PERMISSIONS_DENIED.eventName

  override fun dispatch(rctEventEmitter: RCTEventEmitter) {
    rctEventEmitter.receiveEvent(viewTag, eventName, params)
  }
}

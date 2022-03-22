package video.api.reactnative.livestream

import android.Manifest
import android.content.Context
import android.content.pm.PackageManager
import android.util.Log
import androidx.constraintlayout.widget.ConstraintLayout
import androidx.core.app.ActivityCompat
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactContext
import com.facebook.react.uimanager.events.RCTEventEmitter
import video.api.livestream.ApiVideoLiveStream
import video.api.livestream.enums.CameraFacingDirection
import video.api.livestream.interfaces.IConnectionChecker
import video.api.livestream.models.AudioConfig
import video.api.livestream.models.VideoConfig


class ReactNativeLiveStreamView(context: Context) : ConstraintLayout(context), IConnectionChecker {
  companion object {
    private const val TAG = "RNLiveStreamView"
  }

  private var apiVideoLiveStream: ApiVideoLiveStream? = null

  init {
    inflate(context, R.layout.react_native_livestream, this)
  }

  var videoConfig: VideoConfig? = null
    set(value) {
      field = value
      if (apiVideoLiveStream == null) {
        apiVideoLiveStream = buildOrNull()
      } else {
        apiVideoLiveStream?.videoConfig = value!!
      }
    }

  var audioConfig: AudioConfig? = null
    set(value) {
      field = value
      if (apiVideoLiveStream == null) {
        apiVideoLiveStream = buildOrNull()
      } else {
        apiVideoLiveStream?.audioConfig = audioConfig!!
      }
    }

  private fun buildOrNull(): ApiVideoLiveStream? {
    if (ActivityCompat.checkSelfPermission(
        context,
        Manifest.permission.CAMERA
      ) != PackageManager.PERMISSION_GRANTED || ActivityCompat.checkSelfPermission(
        context,
        Manifest.permission.RECORD_AUDIO
      ) != PackageManager.PERMISSION_GRANTED
    ) {
      Log.e(
        TAG,
        "Missing permissions Manifest.permission.CAMERA or/and Manifest.permission.RECORD_AUDIO"
      )
    }

    return if ((audioConfig != null) && (videoConfig != null)) {
      ApiVideoLiveStream(
        context = context,
        connectionChecker = this,
        initialAudioConfig = audioConfig!!,
        initialVideoConfig = videoConfig!!,
        initialCamera = camera,
        apiVideoView = findViewById(R.id.apivideo_view)
      )
    } else {
      null
    }
  }

  var camera: CameraFacingDirection = CameraFacingDirection.BACK
    get() = apiVideoLiveStream?.camera ?: field
    set(value) {
      apiVideoLiveStream?.camera = value
      field = value
    }

  var isMuted: Boolean = false
    get() = apiVideoLiveStream?.isMuted ?: field
    set(value) {
      apiVideoLiveStream?.isMuted = value
      field = value
    }

  internal fun startStreaming(streamKey: String, url: String?) {
    url?.let { apiVideoLiveStream?.startStreaming(streamKey, it) }
      ?: apiVideoLiveStream?.startStreaming(streamKey)
  }

  internal fun stopStreaming() {
    apiVideoLiveStream?.stopStreaming()
  }

  override fun onConnectionSuccess() {
    Log.i(this::class.simpleName, "Connection success")
    onConnectionSuccessEvent()
  }

  override fun onConnectionFailed(reason: String) {
    Log.e(this::class.simpleName, "Connection failed due to $reason")
    onConnectionFailedEvent(reason)
  }

  override fun onConnectionStarted(url: String) {
    Log.w(this::class.simpleName, "Connection started")
  }

  override fun onDisconnect() {
    Log.w(this::class.simpleName, "Disconnected")
    onDisconnectEvent()
  }

  override fun onAuthError() {
    Log.e(this::class.simpleName, "Authentication failed")
  }

  override fun onAuthSuccess() {
    Log.i(this::class.simpleName, "Authentication is successful")
  }

  private fun onConnectionSuccessEvent() {
    val reactContext = context as ReactContext
    reactContext.getJSModule(RCTEventEmitter::class.java)
      .receiveEvent(id, ViewProps.Events.CONNECTION_SUCCESS.type, null)
  }

  private fun onConnectionFailedEvent(reason: String?) {
    val reactContext = context as ReactContext
    val payload = Arguments.createMap()
    payload.putString("reason", reason)
    reactContext.getJSModule(RCTEventEmitter::class.java)
      .receiveEvent(id, ViewProps.Events.CONNECTION_FAILED.type, payload)
  }

  private fun onDisconnectEvent() {
    val reactContext = context as ReactContext
    reactContext.getJSModule(RCTEventEmitter::class.java)
      .receiveEvent(id, ViewProps.Events.DISCONNECT.type, null)
  }
}

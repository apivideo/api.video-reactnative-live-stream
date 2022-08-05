package video.api.reactnative.livestream

import android.Manifest
import android.annotation.SuppressLint
import android.content.Context
import android.content.pm.PackageManager
import android.util.Log
import androidx.constraintlayout.widget.ConstraintLayout
import androidx.core.app.ActivityCompat
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.WritableMap
import com.facebook.react.uimanager.events.RCTEventEmitter
import video.api.livestream.ApiVideoLiveStream
import video.api.livestream.enums.CameraFacingDirection
import video.api.livestream.interfaces.IConnectionChecker
import video.api.livestream.models.AudioConfig
import video.api.livestream.models.VideoConfig


@SuppressLint("MissingPermission")
class ReactNativeLiveStreamView(context: Context) : ConstraintLayout(context), IConnectionChecker {
  companion object {
    private const val TAG = "RNLiveStreamView"
  }

  private val apiVideoLiveStream: ApiVideoLiveStream

  init {
    inflate(context, R.layout.react_native_livestream, this)
    apiVideoLiveStream = ApiVideoLiveStream(
      context = context,
      connectionChecker = this,
      apiVideoView = findViewById(R.id.apivideo_view)
    )
  }

  var videoBitrate: Int
    get() = apiVideoLiveStream.videoBitrate
    set(value) {
      apiVideoLiveStream.videoBitrate = value
    }

  var videoConfig: VideoConfig?
    get() = apiVideoLiveStream.videoConfig
    set(value) {
      if (ActivityCompat.checkSelfPermission(
          context,
          Manifest.permission.CAMERA
        ) != PackageManager.PERMISSION_GRANTED
      ) {
        Log.e(TAG, "Missing permissions Manifest.permission.CAMERA")
        throw UnsupportedOperationException("Missing permissions Manifest.permission.CAMERA")
      }

      apiVideoLiveStream.videoConfig = value
    }


  var audioConfig: AudioConfig?
    get() = apiVideoLiveStream.audioConfig
    set(value) {
      if (ActivityCompat.checkSelfPermission(
          context,
          Manifest.permission.RECORD_AUDIO
        ) != PackageManager.PERMISSION_GRANTED
      ) {
        Log.e(TAG, "Missing permissions Manifest.permission.RECORD_AUDIO")
        throw UnsupportedOperationException("Missing permissions Manifest.permission.RECORD_AUDIO")
      }

      apiVideoLiveStream.audioConfig = value
    }

  val isStreaming: Boolean
    get() = apiVideoLiveStream.isStreaming

  var camera: CameraFacingDirection = CameraFacingDirection.BACK
    get() = apiVideoLiveStream.camera
    set(value) {
      apiVideoLiveStream.camera = value
      field = value
    }

  var isMuted: Boolean = false
    get() = apiVideoLiveStream.isMuted
    set(value) {
      apiVideoLiveStream.isMuted = value
      field = value
    }

  internal fun startStreaming(requestId: Int, streamKey: String, url: String?) {
    try {
      url?.let { apiVideoLiveStream.startStreaming(streamKey, it) }
        ?: apiVideoLiveStream.startStreaming(streamKey)
      onStartStreamingEvent(requestId, true)
    } catch (e: Exception) {
      Log.w(this::class.simpleName, "startStreaming failed", e)
      onStartStreamingEvent(requestId, false, e.message)
    }
  }

  internal fun stopStreaming() {
    apiVideoLiveStream.stopStreaming()
  }

  override fun onConnectionSuccess() {
    Log.i(this::class.simpleName, "Connection success")
    onConnectionSuccessEvent()
  }

  override fun onConnectionFailed(reason: String) {
    Log.e(this::class.simpleName, "Connection failed due to $reason")
    onConnectionFailedEvent(reason)
  }

  override fun onDisconnect() {
    Log.w(this::class.simpleName, "Disconnected")
    onDisconnectedEvent()
  }

  private fun onStartStreamingEvent(requestId: Int, result: Boolean, error: String? = null) {
    val payload = Arguments.createMap().apply {
      putInt("requestId", requestId)
      putBoolean("result", result)
      error?.let { putString("error", error) }
    }
    sendEvent(context as ReactContext, ViewProps.Events.ON_START_STREAMING.type, payload)
  }

  private fun onConnectionSuccessEvent() {
    sendEvent(context as ReactContext, ViewProps.Events.CONNECTION_SUCCESS.type)
  }

  private fun onConnectionFailedEvent(reason: String?) {
    val payload = Arguments.createMap().apply {
      putString("code", reason)
    }
    sendEvent(context as ReactContext, ViewProps.Events.CONNECTION_FAILED.type, payload)
  }

  private fun onDisconnectedEvent() {
    sendEvent(context as ReactContext, ViewProps.Events.DISCONNECTED.type)
  }

  private fun sendEvent(
    reactContext: ReactContext,
    eventName: String,
    params: WritableMap? = null
  ) {
    reactContext
      .getJSModule(RCTEventEmitter::class.java)
      .receiveEvent(id, eventName, params)
  }
}

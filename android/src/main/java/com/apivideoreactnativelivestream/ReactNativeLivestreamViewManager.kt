package com.apivideoreactnativelivestream

import android.util.Log
import android.view.View
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.common.MapBuilder
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp
import com.pedro.encoder.input.video.CameraHelper
import net.ossrs.rtmp.ConnectCheckerRtmp
import video.api.livestream_module.ApiVideoLiveStream
import video.api.livestream_module.Resolution
import com.facebook.react.modules.core.DeviceEventManagerModule.RCTDeviceEventEmitter
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactContext
import com.facebook.react.uimanager.events.RCTEventEmitter


private fun getResolutionFromResolutionString(resolutionString: String?): Resolution {
  return when (resolutionString) {
    "240p" -> Resolution.RESOLUTION_240
    "360p" -> Resolution.RESOLUTION_360
    "480p" -> Resolution.RESOLUTION_480
    "720p" -> Resolution.RESOLUTION_720
    "1080p" -> Resolution.RESOLUTION_1080
    "2160p" -> Resolution.RESOLUTION_2160
    "240p" -> Resolution.RESOLUTION_240
    else -> Resolution.RESOLUTION_720
  }
}
private fun getFacingFromCameraString(resolutionString: String?): CameraHelper.Facing {
  return when (resolutionString) {
    "front" -> CameraHelper.Facing.FRONT
    "back" -> CameraHelper.Facing.BACK
    else -> CameraHelper.Facing.BACK
  }
}

enum class Events(private val mName: String) {
  CONNECTION_SUCCESS("onConnectionSuccess"),
  CONNECTION_FAILED("onConnectionFailed"),
  DISCONNECT("onDisconnect");

  override fun toString(): String {
    return mName
  }
}


class ReactNativeLivestreamViewManager : SimpleViewManager<View>(), ConnectCheckerRtmp {
  override fun getName() = "ReactNativeLivestreamView"

  private val COMMAND_START_LIVE = 1
  private val COMMAND_STOP_LIVE = 2
  private val ENABLE_AUDIO = 3
  private val DISABLE_AUDIO = 4

  private var liveStreamKey: String? = null
  private var rtmpServerUrl: String? = null

  private lateinit var context: ThemedReactContext
  private lateinit var view: ReactNativeLivestreamView

  private lateinit var apiVideo: ApiVideoLiveStream

  private var code: String? = null

  override fun getExportedCustomDirectEventTypeConstants(): MutableMap<String, Map<String, String>>? {
    val builder: MapBuilder.Builder<String, Map<String, String>> = MapBuilder.builder<String, Map<String, String>>()
    for (event in Events.values()) {
      builder.put(event.toString(), MapBuilder.of("registrationName", event.toString()))
    }
    return builder.build()
  }

  override fun createViewInstance(reactContext: ThemedReactContext): View {
    context = reactContext
    view = ReactNativeLivestreamView(reactContext)
    apiVideo = ApiVideoLiveStream(context, this, view.findViewById(R.id.opengl_view), null)

    return view
  }

  override fun receiveCommand(root: View, commandId: Int, args: ReadableArray?) {
    super.receiveCommand(root, commandId, args)
    when (commandId) {
      COMMAND_START_LIVE -> startStreaming()
      COMMAND_STOP_LIVE -> stopStreaming()
      ENABLE_AUDIO -> enableAudio()
      DISABLE_AUDIO -> disableAudio()
      else -> {
        throw IllegalArgumentException("Unsupported command %d received by %s. $commandId")
      }
    }
  }

  override fun getCommandsMap(): MutableMap<String, Int> {
    return MapBuilder.of(
      "startStreamingFromManager", COMMAND_START_LIVE,
      "stopStreamingFromManager", COMMAND_STOP_LIVE,
      "enableAudioFromManager", ENABLE_AUDIO,
      "disableAudioFromManager", DISABLE_AUDIO
    )
  }

  private fun sendConnectionSuccessEvent() {
    val reactContext = context as ReactContext
    val payload = Arguments.createMap()
    reactContext.getJSModule(RCTEventEmitter::class.java).receiveEvent(view.id, Events.CONNECTION_SUCCESS.toString(), payload)
  }

  private fun sendConnectionFailedEvent(reason: String?) {
    val reactContext = context as ReactContext
    val payload = Arguments.createMap()
    payload.putString("reason", reason)
    reactContext.getJSModule(RCTEventEmitter::class.java).receiveEvent(view.id, Events.CONNECTION_FAILED.toString(), payload)
  }

  private fun sendDisconnectEvent() {
    val reactContext = context as ReactContext
    val payload = Arguments.createMap()
    reactContext.getJSModule(RCTEventEmitter::class.java).receiveEvent(view.id, Events.DISCONNECT.toString(), payload)
  }

  @ReactProp(name = "liveStreamKey")
  fun setLiveStreamKey(view: View, newLiveStreamKey: String) {
    if (newLiveStreamKey == liveStreamKey) return
    liveStreamKey = newLiveStreamKey
  }

  @ReactProp(name = "rtmpServerUrl")
  fun setRtmpServerUrl(view: View, newRtmpServerUrl: String) {
    if (newRtmpServerUrl == rtmpServerUrl) return
    rtmpServerUrl = newRtmpServerUrl
  }

  @ReactProp(name = "videoFps")
  fun setVideoFps(view: View, newVideoFps: Double) {
    if (newVideoFps.toInt() == apiVideo.videoFps) return
    apiVideo.videoFps = newVideoFps.toInt()
  }

  @ReactProp(name = "videoResolution")
  fun setVideoResolution(view: View, newVideoResolutionString: String) {
    val newVideoResolution = getResolutionFromResolutionString(newVideoResolutionString)
    if (newVideoResolution == apiVideo.videoResolution) return
    apiVideo.videoResolution = newVideoResolution
  }

  @ReactProp(name = "videoBitrate")
  fun setVideoBitrate(view: View, newVideoBitrate: Double) {
    if (newVideoBitrate.toInt() == apiVideo.videoBitrate) return
    apiVideo.videoBitrate = newVideoBitrate.toInt()
  }

  @ReactProp(name = "videoCamera")
  fun setVideoCamera(view: View, newVideoCameraString: String) {
    val newVideoCamera = getFacingFromCameraString(newVideoCameraString)
    if (newVideoCamera == apiVideo.videoCamera) return
    apiVideo.videoCamera = newVideoCamera
  }

  @ReactProp(name = "audioMuted")
  fun setVideoCamera(view: View, newAudioMuted: Boolean) {
    if (newAudioMuted == apiVideo.audioMuted) return
    apiVideo.audioMuted = newAudioMuted
  }

  @ReactProp(name = "audioBitrate")
  fun setVideoCamera(view: View, newAudioBitrate: Double) {
    if (newAudioBitrate.toInt() == apiVideo.audioBitrate) return
    apiVideo.audioBitrate = newAudioBitrate.toInt()
  }

  private fun startStreaming(){
    apiVideo.startStreaming(this.liveStreamKey!!, this.rtmpServerUrl)
  }

  private fun stopStreaming() {
    apiVideo.stopStreaming()
  }

  private fun disableAudio() {
    apiVideo.audioMuted = true
  }

  private fun enableAudio() {
    apiVideo.audioMuted = false
  }

  override fun onConnectionSuccessRtmp() {
    Log.e("connection rtmp", "success")
    sendConnectionSuccessEvent()
  }

  override fun onConnectionFailedRtmp(reason: String) {
    Log.e("connection rtmp", "error")
    sendConnectionFailedEvent(reason)
  }

  override fun onNewBitrateRtmp(bitrate: Long) {
    Log.e("new bitrate rtmp", bitrate.toString())
  }

  override fun onDisconnectRtmp() {
    Log.e("disconnect rtmp", "success")
    sendDisconnectEvent()
  }

  override fun onAuthErrorRtmp() {
    Log.e("auth", "error")
  }

  override fun onAuthSuccessRtmp() {
    Log.e("auth", "success")
  }

}

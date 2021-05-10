package com.apivideoreactnativelivestream

import android.util.Log
import android.view.SurfaceView
import android.view.View
import androidx.constraintlayout.widget.ConstraintSet
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.common.MapBuilder
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp
import net.ossrs.rtmp.ConnectCheckerRtmp
import video.api.livestream_module.ApiVideoLiveStream

class ReactNativeLivestreamViewManager : SimpleViewManager<View>(), ConnectCheckerRtmp {
  override fun getName() = "ReactNativeLivestreamView"

  private val COMMAND_START_LIVE = 1

  private var liveStreamKey: String? = null
  private var rtmpServerUrl: String? = null

  private var videoResolution: String? = "720p";
  private var videoCamera: String? = "back";
  private var videoBitrate: Double? = null;
  private var videoFps: Double = 30.0

  private var audioMuted: Boolean? = false
  private var audioBitrate: Double? = null

  private lateinit var context: ThemedReactContext
  private lateinit var view: ReactNativeLivestreamView

  override fun createViewInstance(reactContext: ThemedReactContext): View {
    context = reactContext
    view = ReactNativeLivestreamView(reactContext)
    return view
  }

  override fun receiveCommand(root: View, commandId: Int, args: ReadableArray?) {
    super.receiveCommand(root, commandId, args)
    Log.e("clicked","receiveCommand")
    when (commandId) {
      COMMAND_START_LIVE -> startStreaming()
      else -> {
        throw IllegalArgumentException("Unsupported command %d received by %s. $commandId")
      }
    }
  }

  override fun getCommandsMap(): MutableMap<String, Int> {
    return MapBuilder.of(
      "startStreamingFromManager", COMMAND_START_LIVE
    )
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
    if (newVideoFps == videoFps) return
    videoFps = newVideoFps
  }

  @ReactProp(name = "videoResolution")
  fun setVideoResolution(view: View, newVideoResolution: String) {
    if (newVideoResolution == videoResolution) return
    videoResolution = newVideoResolution
  }

  @ReactProp(name = "videoBitrate")
  fun setVideoBitrate(view: View, newVideoBitrate: Double) {
    if (newVideoBitrate == videoBitrate) return
    videoBitrate = newVideoBitrate
  }

  @ReactProp(name = "videoCamera")
  fun setVideoCamera(view: View, newVideoCamera: String) {
    if (newVideoCamera == videoCamera) return
    videoCamera = newVideoCamera
  }

  @ReactProp(name = "audioMuted")
  fun setVideoCamera(view: View, newAudioMuted: Boolean) {
    if (newAudioMuted == audioMuted) return
    audioMuted = newAudioMuted
  }

  @ReactProp(name = "audioBitrate")
  fun setVideoCamera(view: View, newAudioBitrate: Double) {
    if (newAudioBitrate == audioBitrate) return
    audioBitrate = newAudioBitrate
  }

  private fun startStreaming(){
    ApiVideoLiveStream(
      ApiVideoLiveStream.Config.Builder()
        .videoQuality(ApiVideoLiveStream.Config.Quality.QUALITY_720)
        .videoFps(this.videoFps.toInt())
        .build()
    )
      .start(this.liveStreamKey!!, null, null, view.findViewById(R.id.opengl_view),this.context, this)
  }

  override fun onConnectionSuccessRtmp() {
    Log.e("connection rtmp", "success")
  }

  override fun onConnectionFailedRtmp(reason: String) {
    Log.e("connection rtmp", "error")
  }

  override fun onNewBitrateRtmp(bitrate: Long) {
    Log.e("new bitrate rtmp", bitrate.toString())
  }

  override fun onDisconnectRtmp() {
    Log.e("disconnect rtmp", "success")
  }

  override fun onAuthErrorRtmp() {
    Log.e("auth", "error")
  }

  override fun onAuthSuccessRtmp() {
    Log.e("auth", "success")
  }

}

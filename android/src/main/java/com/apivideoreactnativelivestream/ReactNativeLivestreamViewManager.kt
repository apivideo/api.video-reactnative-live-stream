package com.apivideoreactnativelivestream

import android.util.Log
import android.view.SurfaceView
import android.view.View
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp
import net.ossrs.rtmp.ConnectCheckerRtmp
import video.api.livestream_module.ApiVideoLiveStream

class ReactNativeLivestreamViewManager : SimpleViewManager<View>(), ConnectCheckerRtmp {
  override fun getName() = "ReactNativeLivestreamView"
  private var liveStreamKey: String? = null
  private var quality: String? = null
  private var fps: Double = 30.0
  private lateinit var context: ThemedReactContext
  private lateinit var surfaceView: View

  override fun createViewInstance(reactContext: ThemedReactContext): View {
    context = reactContext
    surfaceView = View(reactContext)
    return surfaceView
  }


  @ReactProp(name = "fps")
  fun setFps(view: View, newFps: Double) {
    if (newFps == fps) return
    fps = newFps
  }
  @ReactProp(name = "liveStreamKey")
  fun setLiveStreamKey(view: View, newLiveStreamKey: String) {
    if (newLiveStreamKey == liveStreamKey) return
    liveStreamKey = newLiveStreamKey
  }
  @ReactProp(name = "quality")
  fun setQuality(view: View, newQuality: String) {
    if (newQuality == quality) return
    quality = newQuality
  }

  @ReactMethod
  fun callItNowPlease(){
    Log.e("Btn click", "true")

    ApiVideoLiveStream(
      ApiVideoLiveStream.Config.Builder()
        .videoQuality(ApiVideoLiveStream.Config.Quality.QUALITY_720)
        .videoFps(30)
        .build()
    )
      //.start(this.liveStreamKey!!, surfaceView, this.context,this)
      .start(this.liveStreamKey!!, null, this.context,this)

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

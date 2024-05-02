package video.api.reactnative.livestream.utils

import android.util.Size
import com.facebook.react.bridge.ReadableMap
import video.api.livestream.enums.CameraFacingDirection
import video.api.livestream.models.AudioConfig
import video.api.livestream.models.VideoConfig
import video.api.reactnative.livestream.ViewProps
import java.security.InvalidParameterException

fun String.getCameraFacing(): CameraFacingDirection {
  return when (this) {
    "front" -> CameraFacingDirection.FRONT
    "back" -> CameraFacingDirection.BACK
    else -> {
      throw InvalidParameterException("Unknown camera facing direction $this")
    }
  }
}

fun ReadableMap.toAudioConfig(): AudioConfig {
  return AudioConfig(
    bitrate = this.getInt(ViewProps.BITRATE),
    sampleRate = this.getInt(ViewProps.SAMPLE_RATE),
    stereo = this.getBoolean(ViewProps.IS_STEREO),
    echoCanceler = true,
    noiseSuppressor = true
  )
}

fun ReadableMap.toVideoConfig(): VideoConfig {
  val resolutionMap = this.getMap(ViewProps.RESOLUTION)!!
  return VideoConfig(
    bitrate = this.getInt(ViewProps.BITRATE),
    resolution = Size(
      resolutionMap.getInt(ViewProps.WIDTH),
      resolutionMap.getInt(ViewProps.HEIGHT)
    ),
    fps = this.getInt(ViewProps.FPS),
    gopDuration = this.getDouble(ViewProps.GOP_DURATION).toFloat()
  )
}


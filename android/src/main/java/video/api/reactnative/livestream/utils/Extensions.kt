package video.api.reactnative.livestream.utils

import com.facebook.react.bridge.ReadableMap
import video.api.livestream.enums.CameraFacingDirection
import video.api.livestream.enums.Resolution
import video.api.livestream.models.AudioConfig
import video.api.livestream.models.VideoConfig
import video.api.reactnative.livestream.ViewProps
import java.security.InvalidParameterException

fun String.getResolution(): Resolution {
  return when (this) {
    "240p" -> Resolution.RESOLUTION_240
    "360p" -> Resolution.RESOLUTION_360
    "480p" -> Resolution.RESOLUTION_480
    "720p" -> Resolution.RESOLUTION_720
    "1080p" -> Resolution.RESOLUTION_1080
    else -> {
      throw InvalidParameterException("Unknown resolution $this")
    }
  }
}

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
  return VideoConfig(
    bitrate = this.getInt(ViewProps.BITRATE),
    resolution = this.getString(ViewProps.RESOLUTION)?.getResolution()!!,
    fps = this.getInt(ViewProps.FPS),
    gopDuration = this.getDouble(ViewProps.GOP_DURATION).toFloat()
  )
}


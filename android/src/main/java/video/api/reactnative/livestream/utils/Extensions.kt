package video.api.reactnative.livestream.utils

import android.util.Log

import video.api.livestream.enums.Resolution
import video.api.livestream.enums.CameraFacingDirection

fun String.getResolution(): Resolution {
  return when (this) {
    "240p" -> Resolution.RESOLUTION_240
    "360p" -> Resolution.RESOLUTION_360
    "480p" -> Resolution.RESOLUTION_480
    "720p" -> Resolution.RESOLUTION_720
    "1080p" -> Resolution.RESOLUTION_1080
    "2160p" -> Resolution.RESOLUTION_2160
    else -> {
      Log.w("", "Unknown resolution $this, fallback to 720p")
      Resolution.RESOLUTION_720
    }
  }
}

fun String.getCameraFacing(): CameraFacingDirection {
  return when (this) {
    "front" -> CameraFacingDirection.FRONT
    "back" -> CameraFacingDirection.BACK
    else -> {
      Log.w("", "Unknown camera facing direction $this, fallback to back camera")
      CameraFacingDirection.BACK
    }
  }
}


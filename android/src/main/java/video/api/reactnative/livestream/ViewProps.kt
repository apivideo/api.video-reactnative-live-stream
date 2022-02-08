package video.api.reactnative.livestream

import com.facebook.react.common.MapBuilder

object ViewProps {
  // React props
  const val AUDIO_CONFIG = "audio"
  const val VIDEO_CONFIG = "video"
  const val IS_MUTED = "isMuted"
  const val CAMERA = "camera"

  // Audio and video configurations
  const val BITRATE = "bitrate"
  const val RESOLUTION = "resolution"
  const val FPS = "fps"
  const val SAMPLE_RATE = "sampleRate"
  const val IS_STEREO = "isStereo"

  enum class Commands(val action: String) {
    START_STREAMING("startStreamingFromManager"),
    STOP_STREAMING("stopStreamingFromManager");

    companion object {
      fun toCommandsMap(): Map<String, Int> {
        return values().associate { it.action to it.ordinal }
      }
    }
  }

  enum class Events(val type: String) {
    CONNECTION_SUCCESS("onConnectionSuccess"),
    CONNECTION_FAILED("onConnectionFailed"),
    DISCONNECT("onDisconnect");

    companion object {
      fun toEventsMap(): Map<String, *> {
        val builder: MapBuilder.Builder<String, Map<String, String>> = MapBuilder.builder()
        values().forEach {
          builder.put(it.type, MapBuilder.of("registrationName", it.type))
        }
        return builder.build()
      }
    }
  }
}

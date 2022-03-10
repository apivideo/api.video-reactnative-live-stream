/* eslint-disable react-native/no-inline-styles */
import * as React from 'react'
import {
  View,
  TouchableOpacity,
  Platform,
  Text,
  StatusBar
} from 'react-native'
import {
  LiveStreamView,
  LiveStreamMethods,
} from '@api.video/react-native-live-stream'
import Icon from 'react-native-vector-icons/Ionicons'
import styles, { button } from './style'
import Settings from './components/settings'
import assets from './assets'

export default function App() {
  // LOCAL STATE
  // Stream view
  const [streaming, setStreaming] = React.useState(false)
  const [audioMuted, setAudioMuted] = React.useState(false)
  const [camera, setCamera] = React.useState<'front' | 'back'>('back')
  const [settingsOpen, setSettingsOpen] = React.useState<boolean>(false)
  const [warning, setWarning] = React.useState<{ display: Boolean, message: string }>({
    display: false,
    message: ''
  })
  // Settings
  const [resolution, setResolution] = React.useState<string>('640x340')
  const [framerate, setFramerate] = React.useState<number>(30)
  const [audioBitrate, setAudioBitrate] = React.useState<number>(64000)
  const [videoBitrate, setVideoBitrate] = React.useState<number>(assets.sections.video.Bitrate.min)
  const [rtmpEndpoint, setRtmpEndpoint] = React.useState<string>(assets.sections.endpoint['RTMP endpoint'].value)
  const [streamKey, setStreamKey] = React.useState<string>(assets.sections.endpoint['Stream key'].value)

  
  // CONSTANTS
  const ref = React.useRef<LiveStreamMethods | null>(null)
  const isAndroid = Platform.OS === 'android'
  const style = styles(streaming, isAndroid)


  // HANDLERS
  const handleStreaming = (): void => {
    // Reset warning
    setWarning({ display: false, message: '' })
    // No RTMP
    if (rtmpEndpoint.trim().length === 0) {
      setWarning({
        display: true,
        message: 'Be sure to enter a valid RTMP endpoint in settings'
      })
      resetWarning()
      return
    }
    // No stream key
    if (streamKey.trim().length === 0) {
      setWarning({
        display: true,
        message: 'Be sure to enter a valid stream key in settings'
      })
      resetWarning()
      return
    }

    if (streaming) {
      ref.current?.stopStreaming()
      setStreaming(false)
    } else {
      ref.current?.startStreaming(
        isAndroid
          ? '833ae9df-d228-4ff3-b15a-b4ac53280b80'
          : 'd08c582e-e251-4f9e-9894-8c8d69755d45'
      )
      setStreaming(true)
    }
  }

  const handleCamera = (): void =>  {
    if (camera === 'back') setCamera('front')
    else setCamera('back')
  }

  const handleChangeTextInput = (
    value: string,
    input: 'RTMP endpoint' | 'Stream key'
  ): void => {
    input === 'RTMP endpoint' && setRtmpEndpoint(value)
    input === 'Stream key' && setStreamKey(value)
  }

  const handleChangeSettingItem = (
    value: string | number,
    key: string
  ): void => {
    if (key === 'Resolution') {
      setResolution(value as string)
      return
    }
    if (key === 'Framerate') {
      setFramerate(value as number)
      return
    }
    if (key === 'Bitrate') {
      setAudioBitrate(value as number)
      switch (value) {
        case '24Kbps':
          setAudioBitrate(24000)
          break

        case '64Kbps':
          setAudioBitrate(64000)
          break

        case '128Kbps':
          setAudioBitrate(128000)
          break
      
        default:
          setAudioBitrate(192000)
          break
      }
    }
  }

  const resetWarning = () => {
    setTimeout(() => {
      setWarning({ display: false, message: '' })
    }, 3000);
  }


  // RETURN
  return (
    <View style={style.container}>

      <StatusBar 
        animated={true}
        barStyle='light-content'
      />

      <LiveStreamView
        style={style.livestreamView}
        ref={ref}
        camera={camera}
        video={{
          bitrate: videoBitrate,
          fps: framerate,
          resolution
        }}
        audio={{
          bitrate: audioBitrate,
          sampleRate: 44100,
          isStereo: true,
        }}
        isMuted={audioMuted}
        onConnectionSuccess={() => {
          console.log('Received onConnectionSuccess')
        }}
        onConnectionFailed={(e) => {
          console.log('Received onConnectionFailed', e)
        }}
        onDisconnect={() => {
          console.log('Received onDisconnect')
        }}
      />

      <View style={button({ bottom: isAndroid ? 20 : 40 }).container}>
        <TouchableOpacity
          style={style.streamButton}
          onPress={handleStreaming}
        >
          {streaming ? (
            <Icon 
              name="stop-circle-outline" 
              size={50} 
              color="#FF0001" 
            />
          ) : (
            <Text style={style.streamText}>
              Start streaming
            </Text>
          )}
        </TouchableOpacity>
      </View>

      <View style={button({ bottom: isAndroid ? 20 : 40, left: 20 }).container}>
        <TouchableOpacity
          style={style.audioButton}
          onPress={() => setAudioMuted(_prev => !_prev)}
        >
          <Icon 
            name={audioMuted ? 'mic-off-outline' : 'mic-outline'}
            size={30} 
            color="#FA5B30"  
          />
        </TouchableOpacity>
      </View>

      <View style={button({ bottom: isAndroid ? 20 : 40, right: 20 }).container}>
        <TouchableOpacity
          style={style.cameraButton}
          onPress={handleCamera}
        >
          <Icon 
            name="camera-reverse-outline" 
            size={30} 
            color="#FA5B30" 
          />
        </TouchableOpacity>
      </View>

      <View
        style={style.settingsButton}
      >
        {warning.display && (
          <View style={style.warningContainer}>
          <Text style={style.warning}>
            {warning.message}
          </Text>
          </View>
        )}
        <TouchableOpacity
          onPress={() => setSettingsOpen(_prev => !_prev)}
        >
          <Icon
            name='settings-outline'
            size={30} 
            color="#FA5B30" 
          />
        </TouchableOpacity>
      </View>

      {settingsOpen && (
        <Settings 
          closeSettings={() => setSettingsOpen(false)}
          setVideoBitrate={setVideoBitrate}
          handleChangeTextInput={handleChangeTextInput}
          handleChangeSettingItem={handleChangeSettingItem}
          settings={{
            resolution,
            framerate,
            videoBitrate,
            audioBitrate,
            rtmpEndpoint,
            streamKey
          }}
        />
      )}
    </View>
  )
}

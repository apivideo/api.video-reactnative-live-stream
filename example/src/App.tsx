/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';

import {
  View,
  TouchableOpacity,
  Platform,
  Text,
} from 'react-native';
import {
  LiveStreamView,
  LiveStreamMethods,
} from '@api.video/react-native-live-stream';
import Icon from 'react-native-vector-icons/Ionicons';
import styles, { button } from './style';

export default function App() {
  // LOCAL STATE
  const [streaming, setStreaming] = React.useState(false);
  const [audioMuted, setAudioMuted] = React.useState(false);
  const [res, setRes] = React.useState<'360p' | '720p'>('360p');
  const [camera, setCamera] = React.useState<'front' | 'back'>('back');
  
  // CONSTANTS
  const ref = React.useRef<LiveStreamMethods | null>(null);
  const style = styles(streaming)

  // RETURN
  return (
    <View style={style.container}>

      <LiveStreamView
        style={style.livestreamView}
        ref={ref}
        camera={camera}
        video={{
          bitrate: 3000000,
          fps: 30,
          resolution: res,
        }}
        audio={{
          bitrate: 128000,
          sampleRate: 44100,
          isStereo: true,
        }}
        isMuted={audioMuted}
        onConnectionSuccess={() => {
          console.log('Received onConnectionSuccess');
        }}
        onConnectionFailed={(e) => {
          console.log('Received onConnectionFailed', e);
        }}
        onDisconnect={() => {
          console.log('Received onDisconnect');
        }}
      />

      <View style={button({ bottom: 40 }).container}>
        <TouchableOpacity
          style={style.streamButton}
          onPress={() => {
            if (streaming) {
              ref.current?.stopStreaming();
              setStreaming(false);
            } else {
              ref.current?.startStreaming(
                Platform.OS === 'android'
                  ? '833ae9df-d228-4ff3-b15a-b4ac53280b80'
                  : 'd08c582e-e251-4f9e-9894-8c8d69755d45'
              );
              setStreaming(true);
            }
          }}
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

      <View style={button({ top: 40, left: 20 }).container}>
        <TouchableOpacity
          style={style.resolutionButton}
          onPress={() => {
            if (res === '360p') {
              setRes('720p');
            } else {
              setRes('360p');
            }
          }}
        />
      </View>

      <View style={button({ bottom: 40, left: 20 }).container}>
        <TouchableOpacity
          style={style.audioButton}
          onPress={() => {
            setAudioMuted(!audioMuted);
          }}
        >
          <Icon 
            name={audioMuted ? 'mic-off-outline' : 'mic-outline'}
            size={30} 
            color="#FA5B30"  
          />
        </TouchableOpacity>
      </View>

      <View style={button({ bottom: 40, right: 20 }).container}>
        <TouchableOpacity
          style={style.cameraButton}
          onPress={() => {
            if (camera === 'back') {
              setCamera('front');
            } else {
              setCamera('back');
            }
          }}
        >
          <Icon 
            name="camera-reverse-outline" 
            size={30} 
            color="#FA5B30" 
          />
        </TouchableOpacity>
      </View>

      <View
        style={{
          position: 'absolute',
          top: 40,
          right: 20,
          padding: 8,
          backgroundColor: '#00000050',
        }}
      >
        <Text style={{ color: 'white' }}>{`Current Settings:`}</Text>
        <Text style={{ color: 'white' }}>{`Camera: ${camera}`}</Text>
        <Text style={{ color: 'white' }}>{`Muted: ${audioMuted}`}</Text>
        <Text style={{ color: 'white' }}>{`Resolution: ${res}`}</Text>
      </View>

    </View>
  );
}

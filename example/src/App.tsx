/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';

import { StyleSheet, View, TouchableOpacity, Platform } from 'react-native';
import StreamView, {
  ReactNativeLivestreamMethods,
} from '@api.video/react-native-livestream';

export default function App() {
  const ref = React.useRef<ReactNativeLivestreamMethods | null>(null);
  const [streaming, setStreaming] = React.useState(false);
  const [audioMuted, setAudioMuted] = React.useState(false);
  const [res, setRes] = React.useState<'360p' | '720p'>('360p');
  const [camera, setCamera] = React.useState<'front' | 'back'>('back');

  return (
    <View style={styles.container}>
      <StreamView
        style={{ flex: 1, backgroundColor: 'red', alignSelf: 'stretch' }}
        ref={ref}
        video={{
          fps: 30,
          resolution: res,
          camera,
        }}
        liveStreamKey={
          Platform.OS === 'android'
            ? '833ae9df-d228-4ff3-b15a-b4ac53280b80'
            : 'd08c582e-e251-4f9e-9894-8c8d69755d45'
        }
        audio={{
          muted: audioMuted,
        }}
      />
      <View style={{ position: 'absolute', bottom: 40 }}>
        <TouchableOpacity
          style={{
            borderRadius: 50,
            backgroundColor: streaming ? 'red' : 'white',
            width: 50,
            height: 50,
          }}
          onPress={() => {
            if (streaming) {
              ref.current?.stopStreaming();
              setStreaming(false);
            } else {
              ref.current?.startStreaming();
              setStreaming(true);
            }
          }}
        />
      </View>
      <View style={{ position: 'absolute', bottom: 40, right: 20 }}>
        <TouchableOpacity
          style={{
            borderRadius: 50,
            backgroundColor: 'blue',
            width: 50,
            height: 50,
          }}
          onPress={() => {
            if (audioMuted) {
              setAudioMuted(false);
            } else {
              setAudioMuted(true);
            }
          }}
        />
      </View>
      <View style={{ position: 'absolute', bottom: 40, left: 20 }}>
        <TouchableOpacity
          style={{
            borderRadius: 50,
            backgroundColor: 'yellow',
            width: 50,
            height: 50,
          }}
          onPress={() => {
            if (res === '360p') {
              setRes('720p');
            } else {
              setRes('360p');
            }
          }}
        />
      </View>
      <View style={{ position: 'absolute', bottom: 110 }}>
        <TouchableOpacity
          style={{
            borderRadius: 50,
            backgroundColor: 'green',
            width: 50,
            height: 50,
          }}
          onPress={() => {
            if (camera === 'back') {
              setCamera('front');
            } else {
              setCamera('back');
            }
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'pink',
  },
  box: {
    flex: 1,
    backgroundColor: 'green',
  },
});

/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';

import { StyleSheet, View, TouchableOpacity, Platform } from 'react-native';
import StreamView, {
  ReactNativeLivestreamMethods,
} from '@api.video/react-native-livestream';

export default function App() {
  const ref = React.useRef<ReactNativeLivestreamMethods | null>(null);
  const [streaming, setStreaming] = React.useState(false);

  return (
    <View style={styles.container}>
      <StreamView
        style={{ flex: 1, backgroundColor: 'red', alignSelf: 'stretch' }}
        ref={ref}
        video={{
          fps: 30,
          resolution: '720p',
          camera: 'back',
        }}
        liveStreamKey={
          Platform.OS === 'android'
            ? '833ae9df-d228-4ff3-b15a-b4ac53280b80'
            : 'd08c582e-e251-4f9e-9894-8c8d69755d45'
        }
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

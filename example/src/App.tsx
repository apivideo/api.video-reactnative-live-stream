import * as React from 'react';

import { StyleSheet, View } from 'react-native';
import StreamView from '@api.video/react-native-livestream';

export default function App() {
  return (
    <View style={styles.container}>
      <StreamView
        fps={30}
        liveStreamKey="d08c582e-e251-4f9e-9894-8c8d69755d45"
        quality="360p"
        style={styles.box}
      />
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
    width: 200,
    height: 200,
    marginVertical: 20,
    backgroundColor: 'green',
  },
});

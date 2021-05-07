import * as React from 'react';

import {
  Button,
  StyleSheet,
  View,
  Animated,
  TouchableOpacity,
  Platform,
} from 'react-native';
import StreamView, {
  ReactNativeLivestreamMethods,
} from '@api.video/react-native-livestream';

const onButtonPress = (ref: ReactNativeLivestreamMethods | null) => {
  ref?.startStreaming();
};

export default function App() {
  const ref = React.useRef<ReactNativeLivestreamMethods | null>(null);
  const animatedValue = React.useRef(new Animated.Value(200));

  React.useEffect(() => {
    const interval = setInterval(() => {
      Animated.spring(animatedValue.current, {
        toValue: 200 + Math.random() * 100,
        useNativeDriver: false,
      }).start();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <StreamView
        style={{ height: 100, backgroundColor: 'red', alignSelf: 'stretch' }}
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
      <View style={[styles.box, { alignSelf: 'stretch' }]} />
      <View style={{ position: 'absolute', bottom: 40 }}>
        <TouchableOpacity
          style={{
            borderRadius: 50,
            backgroundColor: 'white',
            width: 50,
            height: 50,
          }}
          onPress={() => {
            onButtonPress(ref.current);
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

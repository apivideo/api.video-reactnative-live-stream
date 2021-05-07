import * as React from 'react';

import { Button, StyleSheet, View, Animated } from 'react-native';
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
      <Animated.View style={[styles.box]}>
        <StreamView
          style={{ flex: 1 }}
          ref={ref}
          fps={30}
          liveStreamKey="d08c582e-e251-4f9e-9894-8c8d69755d45"
          quality="720p"
        />
      </Animated.View>
      <Button
        title="Connect to stream"
        onPress={() => {
          onButtonPress(ref.current);
        }}
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

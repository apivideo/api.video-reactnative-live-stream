## Zoom

There are a native zoom feature built into this package. Just ensure to set the prop `enablePinchedZoom` to true.
You can however implement this yourself using the `setZoomRatio` method on the LiveStreamView ref.
\
\
If you are experiencing that the native zoom is not working. You are most likely drawing another view over. In this case you can set the prop `pointerEvents="none"` on the view that is drawn over the preview. This makes it so the view can be clicked through.
\
\
If you however still are experiencing issues with zooming. Create a reproduction app, where you reproduce your error, confirm it still persists, the only thing you should be rendering in that reproduction is the LiveStreamView. Nothing else.

## Custom implementation

If you are using React Native Gesture to define your zoom gesture, it is vital that you dont store your values in a state. As this can cause react to rerender. And if this happends on every gesture tick you will experience very poor performance.
\
\
Here is an example of how you can implement it.

```jsx
import React, { useRef, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { LiveStreamView } from '@api.video/react-native-livestream';

const App = () => {
    const ref = useRef(null);
    const [streaming, setStreaming] = useState(false);

    const baseScale = new Animated.Value(1);
    const pinchScale = new Animated.Value(1);
    var lastScale = 1;

    const _onPinchHandlerStateChange = (
        event: HandlerStateChangeEvent<PinchGestureHandlerEventPayload>
    ) => {
        if (
            event.nativeEvent.oldState === State.ACTIVE &&
            event.nativeEvent.numberOfPointers === 2
        ) {
            lastScale *= event.nativeEvent.scale;
            lastScale < 1 && (_lastScale = 1);
            lastScale > 3 && (_lastScale = 3);
            baseScale.setValue(_lastScale);
            pinchScale.setValue(1);
        }
    };

    return (
        <GestureHandlerRootView style={{ flex: 1, alignItems: 'center' }}>
            <PinchGestureHandler
                onGestureEvent={(event) => {
                ref.current?.setZoomRatio(lastScale * event.nativeEvent.scale);
                }}
                onHandlerStateChange={_onPinchHandlerStateChange}
            >
                <LiveStreamView
                    style={{ flex: 1, backgroundColor: 'black', alignSelf: 'stretch' }}
                    ref={ref}
                    camera: 'back',
                    video={{
                    fps: 30,
                    resolution: '720p',
                    bitrate: '2*1024*1024', // # 2 Mbps
                    }}
                    audio={{
                    bitrate: 128000,
                    sampleRate: 44100,
                    isStereo: true,
                    }}
                    isMuted={false}
                />
            </PinchGestureHandler>
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
                        ref.current?.startStreaming('YOUR_STREAM_KEY');
                        setStreaming(true);
                    }
                }}
                />
            </View>
      </GestureHandlerRootView>
    );
}

export default App;
```

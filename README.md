# @api.video/react-native-livestream

todo

## Installation

```sh
npm install @api.video/react-native-livestream
```

### Usage

```js
import StreamView, { ReactNativeLivestreamMethods,} from '@api.video/react-native-livestream';

// ...

```

##### Permissions
To be able to broadcast,

1) On Android you must ask for internet, camera and microphone permissions:

```java
  <uses-permission android:name="android.permission.INTERNET" />
  <uses-permission android:name="android.permission.RECORD_AUDIO" />
  <uses-permission android:name="android.permission.CAMERA" />
```

2) On iOS, you must update Info.plist with a usage description for camera and microphone

```xml
...
<key>NSCameraUsageDescription</key>
<string>Your own description of the purpose</string>

<key>NSMicrophoneUsageDescription</key>
<string>Your own description of the purpose</string>
...
	
```

```tsx
const ref = React.useRef<ReactNativeLivestreamMethods | null>(null);
const [streaming, setStreaming] = React.useState(false);
const [audioMuted, setAudioMuted] = React.useState(false);
const [res, setRes] = React.useState<'360p' | '720p'>('360p');
const [camera, setCamera] = React.useState<'front' | 'back'>('back');
const [orientation, setOrientation] = React.useState<'landscape' | 'portrait'>('landscape');
  
return (
    <View style={styles.container}>
      <StreamView
        style={{ flex: 1, backgroundColor: 'red', alignSelf: 'stretch' }}
        ref={ref}
        video={{
          fps: 30,
          resolution: res,
          camera,
          orientation,
        }}
        liveStreamKey={
          'your-livestrem-key'
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
    </View>
  );
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

import React from 'react';
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Slider from '@ptomasroos/react-native-multi-slider';

const isAndroid = Platform.OS === 'android';

interface IZoomPicker {
  setZoomRatio: (zoomRatio: number) => void;
  zoomRange: { min: number; max: number };
}
export function ZoomPicker(props: IZoomPicker) {
  const [sliderShown, setModalShown] = React.useState<boolean>(false);

  return (
    <View style={styles.zoomButton}>
      <TouchableOpacity onPress={() => setModalShown((oldValue) => !oldValue)}>
        <Icon name="search-plus" size={30} color="#FFFFFF" />
      </TouchableOpacity>
      {sliderShown && (
        <Slider
          vertical
          sliderLength={200}
          onValuesChange={(v) => props.setZoomRatio(v[0])}
          selectedStyle={{ backgroundColor: '#FA5B30' }}
          markerStyle={{ backgroundColor: '#FA5B30', height: 25, width: 25 }}
          containerStyle={{ top: 100 }}
          step={0.1}
          min={props.zoomRange.min}
          max={props.zoomRange.max}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  zoomButton: {
    position: 'absolute',
    display: 'flex',
    maxWidth: 58,
    flexDirection: 'column',
    alignItems: 'center',
    top: isAndroid ? 20 : 60,
    left: 15,
    minHeight: 50,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
});

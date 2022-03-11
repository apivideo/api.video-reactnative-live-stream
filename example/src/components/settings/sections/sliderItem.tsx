import React from 'react';
import Slider from '@ptomasroos/react-native-multi-slider';
import { Text, View } from 'react-native';
import styles from './style';

interface ISectionSliderProps {
  subSectionName: string;
  subSection: { type: 'slider'; min: number; max: number };
  videoBitrate: number;
  setVideoBitrate: (bitrate: number) => void;
}

const SectionSliderItem: React.FC<ISectionSliderProps> = ({
  subSectionName,
  subSection,
  videoBitrate,
  setVideoBitrate,
}): JSX.Element => (
  <View style={styles.subSection}>
    <Text style={styles.subTitle}>{subSectionName}</Text>
    <Slider
      sliderLength={200}
      values={[videoBitrate]}
      onValuesChange={(v) => setVideoBitrate(v[0])}
      selectedStyle={{ backgroundColor: '#FA5B30' }}
      markerStyle={{ backgroundColor: '#FA5B30', height: 25, width: 25 }}
      min={subSection.min}
      max={subSection.max}
    />
    <Text style={styles.sliderItemLabel}>{videoBitrate}</Text>
  </View>
);

export default SectionSliderItem;

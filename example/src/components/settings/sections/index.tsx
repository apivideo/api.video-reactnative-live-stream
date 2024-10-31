import React from 'react';
import { Text, View } from 'react-native';
import styles from './style';
import assets from '../../../assets';
import type { Opensection } from '..';
import SectionListItem from './listItem';
import SectionSliderItem from './sliderItem';
import SectionInputItem from './inputItem';

export interface ISectionProps {
  sectionName: string;
  openSection: Opensection;
  setOpenSection: (section: Opensection) => void;
  setVideoBitrate: (bitrate: number) => void;
  handleChangeTextInput: (
    value: string,
    input: 'RTMP endpoint' | 'Stream key'
  ) => void;
  handleChangeSettingItem: (value: string | number, key: string) => void;
  settings: {
    resolution: string;
    framerate: number;
    videoBitrate: number;
    audioBitrate: number;
    rtmpEndpoint: string;
    streamKey: string;
  };
}

const Section: React.FC<ISectionProps> = ({
  sectionName,
  openSection,
  setOpenSection,
  setVideoBitrate,
  handleChangeTextInput,
  handleChangeSettingItem,
  settings,
}): JSX.Element => {
  const { videoBitrate, rtmpEndpoint, streamKey } = settings;

  return (
    <View style={styles.subSectionsContainer}>
      <Text style={styles.title}>{sectionName.toUpperCase()}</Text>

      {Object.keys((assets.sections as any)[sectionName]).map(
        (subSectionName, i) => {
          const currentSubSection = (assets.sections as any)[sectionName][
            subSectionName
          ];

          if (currentSubSection.type === 'list') {
            return (
              <SectionListItem
                key={i}
                openSection={openSection}
                setOpenSection={setOpenSection}
                subSectionName={subSectionName}
                subSection={currentSubSection}
                handleChangeSettingItem={handleChangeSettingItem}
                settings={settings}
              />
            );
          }

          if (currentSubSection.type === 'slider') {
            return (
              <SectionSliderItem
                key={i}
                subSectionName={subSectionName}
                subSection={currentSubSection}
                videoBitrate={videoBitrate}
                setVideoBitrate={setVideoBitrate}
              />
            );
          }

          const isRtmpEndpoint = subSectionName === 'RTMP endpoint';
          const value = isRtmpEndpoint ? rtmpEndpoint : streamKey;
          const placeholder = `Enter a valid ${
            isRtmpEndpoint ? 'RTMP endpoint' : 'stream key'
          }`;
          return (
            <SectionInputItem
              key={i}
              subSectionName={subSectionName as 'RTMP endpoint' | 'Stream key'}
              handleChangeTextInput={handleChangeTextInput}
              value={value}
              placeholder={placeholder}
            />
          );
        }
      )}
    </View>
  );
};

export default Section;

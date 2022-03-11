import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from './style';
import Icon from 'react-native-vector-icons/Ionicons';
import type { Opensection } from '..';

interface ISectionListProps {
  openSection: Opensection;
  setOpenSection: (section: Opensection) => void;
  subSectionName: string;
  subSection: { type: 'list'; data: Array<string | number> };
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

const SectionListItem: React.FC<ISectionListProps> = ({
  setOpenSection,
  openSection,
  subSectionName,
  subSection,
  handleChangeSettingItem,
  settings,
}): JSX.Element => {
  const iconName =
    openSection === subSectionName.toLowerCase()
      ? 'chevron-up-outline'
      : 'chevron-down-outline';
  let settingValue =
    settings[
      subSectionName === 'Resolution'
        ? 'resolution'
        : subSectionName === 'Framerate'
        ? 'framerate'
        : 'audioBitrate'
    ];

  if (subSectionName === 'Bitrate') {
    switch (settingValue) {
      case 24000:
        settingValue = '24Kbps';
        break;

      case 64000:
        settingValue = '64Kbps';
        break;

      case 128000:
        settingValue = '128Kbps';
        break;

      default:
        settingValue = '192Kbps';
        break;
    }
  }

  const handlePress = (): void => {
    setOpenSection(
      openSection === (subSectionName.toLowerCase() as Opensection)
        ? null
        : (subSectionName.toLowerCase() as Opensection)
    );
  };

  return (
    <>
      <TouchableOpacity style={styles.subSection} onPress={handlePress}>
        <Text style={styles.subTitle}>{subSectionName}</Text>
        <View style={styles.settingValueContainer}>
          <Text style={styles.settingValue}>{settingValue}</Text>
          <Icon name={iconName} size={25} color="#42474f" />
        </View>
      </TouchableOpacity>

      {openSection === subSectionName.toLowerCase() && (
        <View style={styles.dropdown}>
          {subSection.data.map((item) => (
            <TouchableOpacity
              key={item}
              style={styles.dropdownItem}
              onPress={() => handleChangeSettingItem(item, subSectionName)}
            >
              <Text style={styles.dropdownItemTitle}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </>
  );
};

export default SectionListItem;

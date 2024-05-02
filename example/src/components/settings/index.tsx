import React from 'react';
import {
  Modal,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Section from './sections';
import styles from './style';
import assets from '../../assets';
import type { ISettingsState } from 'example/src/App';
import type { PredefinedResolution } from '@api.video/react-native-livestream';

interface ISettingsProps {
  closeSettings: () => void;
  settings: ISettingsState;
  setSettings: (settings: ISettingsState) => void;
}

export type Opensection = 'resolution' | 'framerate' | 'bitrateAudio' | null;

const Settings: React.FC<ISettingsProps> = ({
  closeSettings,
  settings,
  setSettings,
}): JSX.Element => {
  // LOCAL STATE
  const [openSection, setOpenSection] = React.useState<Opensection>(null);
  const [settingsState, setSettingsState] =
    React.useState<ISettingsState>(settings);

  // HANDLERS
  const handleChangeTextInput = (
    value: string,
    input: 'RTMP endpoint' | 'Stream key'
  ): void => {
    input === 'RTMP endpoint' &&
      setSettingsState((_prev) => ({ ..._prev, rtmpEndpoint: value }));
    input === 'Stream key' &&
      setSettingsState((_prev) => ({ ..._prev, streamKey: value }));
  };

  const handleChangeSettingItem = (
    value: string | number,
    key: string
  ): void => {
    if (key === 'Resolution') {
      setSettingsState((_prev) => ({
        ..._prev,
        resolution: value as PredefinedResolution,
      }));
      return;
    }
    if (key === 'Framerate') {
      setSettingsState((_prev) => ({ ..._prev, framerate: value as number }));
      return;
    }
    if (key === 'Bitrate') {
      switch (value) {
        case '24Kbps':
          setSettingsState((_prev) => ({ ..._prev, audioBitrate: 24000 }));
          break;

        case '64Kbps':
          setSettingsState((_prev) => ({ ..._prev, audioBitrate: 64000 }));
          break;

        case '128Kbps':
          setSettingsState((_prev) => ({ ..._prev, audioBitrate: 128000 }));
          break;

        default:
          setSettingsState((_prev) => ({ ..._prev, audioBitrate: 192000 }));
          break;
      }
    }
  };

  const handleChangeVideoBitrate = (videoBitrate: number) => {
    setSettingsState((_prev) => ({ ..._prev, videoBitrate }));
  };

  const handleCloseSettings = () => {
    setSettings(settingsState);
    closeSettings();
  };

  // RETURN
  return (
    <Modal animationType="slide" visible>
      <SafeAreaView style={styles.modalView}>
        <View style={styles.settingsHeader}>
          <Text style={styles.settingsTitle}>Settings</Text>

          <TouchableOpacity
            style={styles.closeButton}
            onPress={handleCloseSettings}
          >
            <Icon name="close-outline" size={30} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {Object.keys(assets.sections).map((sectionName) => (
          <Section
            key={sectionName}
            sectionName={sectionName}
            openSection={openSection}
            setOpenSection={setOpenSection}
            setVideoBitrate={handleChangeVideoBitrate}
            handleChangeTextInput={handleChangeTextInput}
            handleChangeSettingItem={handleChangeSettingItem}
            settings={settingsState}
          />
        ))}
      </SafeAreaView>
    </Modal>
  );
};

export default Settings;

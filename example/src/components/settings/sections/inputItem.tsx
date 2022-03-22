import React from 'react';
import { Text, TextInput, View } from 'react-native';
import styles from './style';

interface ISectionInputProps {
  subSectionName: 'RTMP endpoint' | 'Stream key';
  handleChangeTextInput: (
    value: string,
    input: 'RTMP endpoint' | 'Stream key'
  ) => void;
  value: string;
  placeholder: string;
}

const SectionInputItem: React.FC<ISectionInputProps> = ({
  subSectionName,
  handleChangeTextInput,
  value,
  placeholder,
}): JSX.Element => (
  <View style={styles.subSection}>
    <Text style={styles.subTitle}>{subSectionName}</Text>
    <TextInput
      style={styles.inputItemField}
      value={value}
      onChangeText={(v) => handleChangeTextInput(v, subSectionName)}
      placeholder={placeholder}
      placeholderTextColor="#42474f"
    />
  </View>
);

export default SectionInputItem;

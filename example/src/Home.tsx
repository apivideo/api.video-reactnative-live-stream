import * as React from 'react';
import { Button } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <Button
      title="Go to live stream view"
      onPress={() => {
        console.log('PRESS');
        navigation.navigate('LSView');
      }}
    />
  );
};

export default HomeScreen;

import React from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, View } from 'react-native';
import Broadcaster from './App';

const Stack = createNativeStackNavigator();

const HomeScreen: React.FC<{}> = () => {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button
        onPress={() => {
          //Navigate to broadcaster
          console.log('YEET');
          navigation.navigate('Broadcaster');
        }}
        title="Go to Broadcaster"
      />
    </View>
  );
};

export function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Broadcaster" component={Broadcaster} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

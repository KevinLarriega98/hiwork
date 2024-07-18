import 'react-native-gesture-handler';
import React from 'react';
import {Text, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { LoginStackNavigation } from './src/routes/LoginStackNavigation';

const App = () => {
  return (
    <NavigationContainer>
      <View style={{flex:1}}>
        <LoginStackNavigation />
      </View>
    </NavigationContainer>
  );
};

export default App
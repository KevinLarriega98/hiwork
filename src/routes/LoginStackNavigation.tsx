import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import {LoginScreen} from '../screens/profile';
import { RegisterTopNavigation } from './RegisterTopNavigation';
import { TabsBottomNavigation } from './TabsBottomNavigation';

export type RootStackParams = {
    navigate(arg0: string): void;
    LoginScreen: undefined,
    RegisterScreen: undefined,
    TabsScreen: undefined
}

const Stack = createStackNavigator<RootStackParams>()

export const LoginStackNavigation = () => {
  return (
    <Stack.Navigator
      
      screenOptions={{
        headerShown: false,
        
      }}
    >
        <Stack.Screen name='LoginScreen' component={LoginScreen} />
        <Stack.Screen name='RegisterScreen' component={RegisterTopNavigation} />
        <Stack.Screen name='TabsScreen' component={TabsBottomNavigation} />
    </Stack.Navigator>
  );
};

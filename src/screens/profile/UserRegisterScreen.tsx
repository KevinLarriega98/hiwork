import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {Pressable, Text, View} from 'react-native';

export const UserRegisterScreen = () => {
  const navigation = useNavigation()
  return (
    <View style={{flex:1}}>
      <Text> UserRegisterScreen</Text>
      <Pressable
        onPress={() => navigation.goBack()}
      >
        <Text>Iniciar session</Text>
      </Pressable>
    </View>
  );
};

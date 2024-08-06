import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {Pressable, Text, View} from 'react-native';
import { RegisterInput } from '../../components/inputs';

export const UserRegisterScreen = () => {
  const navigation = useNavigation()
  const [name, setName] = useState("")
  const [lastName, setLastName] = useState("")

  
  return (
    <View style={{flex:1}}>
      

      <RegisterInput 
        placeHolder='Nombre'
        label='Nombre'
        onChange={setName}
        value={name}
      />

      <RegisterInput 
        placeHolder='Apellido'
        label='Apellido'
        onChange={setLastName}
        value={lastName}
      />

      <RegisterInput 
        placeHolder='Email'
        label='Correo Electrónico'
        onChange={setLastName}
        value={lastName}
      />

      
      <Pressable
        onPress={() => navigation.goBack()}
      >
        <Text>Iniciar session</Text>
      </Pressable>
    </View>
  );
};

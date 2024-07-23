import React, { useEffect, useState } from 'react';
import {Pressable, Text, View} from 'react-native';
import { maybeCompleteAuthSession } from 'expo-web-browser';
import { useAuthRequest } from 'expo-auth-session/build/providers/Google';
import AsyncStorage from '@react-native-async-storage/async-storage';

const data = maybeCompleteAuthSession()

export const GoogleButtonAcces = () => {
    const [userInfo, setUserInfo] = useState()
    const [request, response, prompAsync] = useAuthRequest({
        iosClientId:'495057191093-sa9s8e5gkr1icbijbcfvrlebqo75g6uk.apps.googleusercontent.com',
        androidClientId: '495057191093-eki42m7v5r42hsmm0gfb658l8spj4dqc.apps.googleusercontent.com',
        webClientId:'495057191093-e5uebg5ib8c9oej99u73kfdru5bm7p2f.apps.googleusercontent.com',
    })

    useEffect( () => {
        handleSignWithGoogle()
    },[response])

    const handleSignWithGoogle = async () => {
        const user = getLocalUser()
        if (!user) {
            if(response?.type === "success") {
                response.authentication
                getUserInfo(response.authentication?.accessToken)
            }
        }else{
            setUserInfo(await user)
        }
    }

    const getLocalUser = async () => {
        const data = await AsyncStorage.getItem("@user")
        if(!data) return null
        return JSON.parse(data)
    }

    const getUserInfo = async (token?: string ) => {
        if (!token) return
        try {
            const response = fetch("https://www.googleapis.com/auth/cloud-platform",{
                headers: { Autorization: `Bearer ${token}`}
            })
            const user = await (await response).json()
            await AsyncStorage.setItem("@user", JSON.stringify(user))
            setUserInfo(user)
        } catch (error) {
            
        }
        
    }
    console.log(data)
  return (
    <Pressable
        onPress={() => prompAsync()}
    >
      <Text>Login with Google</Text>
    </Pressable>
  );
};

import React from 'react'
import auth from '@react-native-firebase/auth'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '../../../routes/LoginStackNavigation'
import { getUserDataFromFirestore } from '../authService'
import { User } from 'firebase/auth'
import { useAuthState } from '../../../context/globalAuthState'

export const withProvider = async (idToken: string | null) => {
  //const navigation = useNavigation<NavigationProp<RootStackParamList>>()

  const setIsRegister = useAuthState.getState().setIsRegister
  const setNameProvider = useAuthState.getState().setNameProvider
  const setEmailProvider = useAuthState.getState().setEmailProvider
  if (idToken != null) {
   
    const userAuth = auth()?.currentUser as unknown as User
    console.log(" line 18 doc authProvider", userAuth)
    const userData = await getUserDataFromFirestore(userAuth);
    console.log(" line 20 doc authProvider",userData)
    setNameProvider(userAuth.displayName)
    setEmailProvider(userAuth.email)
    if (userData) {
      //navigation.navigate("TabsBottom")
      setIsRegister(false)
      console.log("se ejecuta")
      return false
    } else {
      setIsRegister(true)
      return true
      //navigation.navigate("RegisterTypeUser") 
    }
  }
}



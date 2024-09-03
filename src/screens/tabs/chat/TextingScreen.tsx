import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import {Text, View, StyleSheet, TextInput, Pressable, FlatList} from 'react-native';
import { RootStackParamList } from '../../../routes/LoginStackNavigation';
import { getNewMessage } from '../../../service/api/messages/onSnapShot';
import { useChatDataStore } from '../../../context/useChatDataStore';
import { serverTimestamp } from 'firebase/firestore';
import { setNewMessage } from '../../../service/api/messages/setNewMessage';
import { sendNewMessage } from '../../../service/api/messages/sendNewMessage';
import { setLastMessage } from '../../../service/api/messages/lastMessage';
import { cleanWriting, setWriting } from '../../../service/api/messages/isWriting';
import { createNoRead, updateIsRead } from '../../../service/api/messages/readMessage';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { ChatHeader } from './components/ChatHeader';

export const TextingScreen = () => {
  const {profileType, chatId, reciveData} = useRoute<RouteProp<RootStackParamList, "TextingScreen">>().params
  const {userId, rollName} = useChatDataStore()
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()
  const flatListRef = useRef<FlatList>(null);

  const [messages, setMessages] = useState([])
  const [text, setText] = useState("")

  // useEffect(() => {
  //   navigation.setOptions({
  //     headerShown: true,
  //     title: reciveData?.name
  //   })
  // },[])

  useEffect(() => {

    if (rollName && userId && chatId) {
      const unsub = getNewMessage(setMessages, rollName, userId, chatId) 
    return unsub 
    }   
    
  },[])

  useEffect(() => {

    if (messages.length > 0) {
      flatListRef.current?.scrollToIndex({
        animated: true,
        index: 0
      });
    }
    if (rollName && userId && reciveData && chatId) updateIsRead(rollName, userId, chatId)
  }, [messages]);

  return (
    <>
    <ChatHeader
      profileImage={"https://image.api.playstation.com/vulcan/img/rnd/202011/0714/Cu9fyu6DM41JPekXLf1neF9r.png"}
      username={reciveData?.name}
      status={"online"}
    />
      <View style={styles().chatContainer}>
        <FlatList
          ref={flatListRef}
          data={messages}
          inverted={true}
          renderItem={({item}) =>  (
            <View>
              <Text style={styles(item.sender === userId).cloudStyle}>{item.message}</Text>
            </View>
          )}
        />
      </View>
      <View style={styles().writeBox}>
        <Pressable 
          onPress={() => {
            // Acciones para el botón de agregar (+)
          }}
          style={styles().addButton}
        >
          <AntDesign name="plus" size={24} color="black" />
        </Pressable>
        
        <TextInput
          style={styles().input}
          placeholder="Text Message"  // Coloca un placeholder similar al texto en la imagen
          onChangeText={(e) => {
            setText(e);
            if (rollName && userId && reciveData && chatId)
              setWriting(reciveData?.profileType, reciveData?.id, chatId);
          }}
          value={text}
        />
      
        <Pressable 
          style={styles().sendButton}
          onPress={() => {
            const sms = {
              message: text,
              date: serverTimestamp(),
              sender: userId,
            };
            if (rollName && userId && reciveData && chatId) {
              setNewMessage(rollName, userId, chatId, sms);
              setLastMessage(rollName, userId, chatId, text);
              sendNewMessage(reciveData?.profileType, reciveData?.id, chatId, sms);
              setLastMessage(reciveData?.profileType, reciveData?.id, chatId, text);
              cleanWriting(reciveData?.profileType, reciveData?.id, chatId);
              createNoRead(reciveData?.profileType, reciveData?.id, chatId);
              setText(""); 
            }
          }}
        >
          <MaterialIcons name="send" size={24} color="black" />
        </Pressable>
    </View>
    </>
  );
};

const styles = (isUser?: boolean) => (
  StyleSheet.create({
    chatContainer: {
      display: 'flex',
      flex: 1,
      flexDirection: 'column-reverse',
      justifyContent: 'flex-start',
      alignContent: 'flex-end',
    },
     writeBox: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: 'black',
      borderRadius: 20,
      paddingVertical: 5,
      paddingHorizontal: 10,
      marginHorizontal: 10,
      marginVertical: 8,
    },
    addButton: {
      padding: 5,
    },
    cloudStyle: {
      alignSelf: isUser ? 'flex-end' : 'flex-start',
      paddingVertical: 5,
      paddingHorizontal: 8,
      maxWidth: 450,
      backgroundColor: isUser ? '#f49230' : '#D9D9D9',
      color: 'black',
      marginHorizontal: 5,
      marginVertical: 5,
      borderRadius: 5,
    },
    input: {
      flex: 1,
      height: 40,
      borderRadius: 20,
      backgroundColor: '#fff',
      borderColor: '#f1f1f1',
      borderWidth: 1,
      paddingHorizontal: 10,
      marginHorizontal: 10,
    },
    sendButton: {
      padding: 5,
    },
  })
);
import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getUserData } from '../getUserData'
import { ConversationData } from '../createConversation'

interface Props {
  conversation: ConversationData;
}

export const ChatRoom = ({conversation}: Props) =>  {

  const [reciver, setReciver] = useState<Record<string, string>>({})
  
  useEffect(() => {
    getUserData(conversation.reciver).then(setReciver)
    console.log(reciver)
  },[])
  return (
    <View>
      <Text>{reciver.name}</Text>
    </View>
  )
}
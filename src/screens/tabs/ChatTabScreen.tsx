import { View, Text, Pressable, FlatList, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { createConversation } from "../../service/api/messages/createConversation";
import { getAllConversation } from "../../service/api/messages/ChatList";
import { ChatRoom } from "./chat/components/ChatRoom";
import { useChatDataStore } from "../../context/useChatDataStore";

const ChatTabScreen = () => {

    const [conversation, setConversation] = useState<any>([])
    const {userId, rollName} = useChatDataStore((state) => ({
        userId: state.userId,
        rollName: state.rollName
    }))

    const chatdesc = {
        sender: {id: "string", rollNameCollection: "string"},
        reciver: [{id: "string", rollNameCollection: "string"}],
        idConversation: "string",
        isWriting: false,
        whoIsWriting: "string",
        date: "string",
        lastMessage: "string",
        isRead: true,
        countNoRead: 0,
    }
    const userData = [{
        id: "EyByTFRNtehec0yB9e82dFSL2gN2",
        rollNameCollection: "ONGs"
    },
    {
        id: "RJewboPFqvgjIwOIsy6BrFY8Q9M2",
        rollNameCollection: "Voluntarios"
    }]

    
    useEffect(() => {
        
        try {
            if (rollName && userId) {
            getAllConversation(rollName, userId).then(setConversation)
        }else{
            throw new Error("No se ha podido obtener las conversaciones")
        }
        } catch (error) {
            console.log(error)
        }
        console.log("1 ejecucion")
        
    }, [])

    return (
        <View>
            <Pressable
                onPress={ () => createConversation(userData,chatdesc)}
            >
                <Text>Enviar Mensaje</Text>
            </Pressable>
            
            <FlatList
                data={conversation}
                renderItem={({item}) => <ChatRoom conversation={item} />}
            />
        </View>
    );
};

export default ChatTabScreen;

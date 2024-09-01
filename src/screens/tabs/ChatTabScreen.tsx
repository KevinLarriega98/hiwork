import { View, Text, Pressable, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { createConversation } from "../../service/api/messages/createConversation";
import { getAllConversation } from "../../service/api/messages/ChatList";
import { ChatRoom } from "../../service/api/messages/components/ChatRoom";

const ChatTabScreen = () => {

    const [conversation, setConversation] = useState<any>([])

    const chatdesc = {
        sender: {id: "string", rollNameCollection: "string"},
        reciver: [{id: "string", rollNameCollection: "string"}],
        idConversation: "string",
        isWriting: false,
        whoIsWriting: "string",
        date: "string",
    }
    const userData = [{
        id: "H80MGm4A14R7m1BKDAxwNnAutVh1",
        rollNameCollection: "Voluntarios"
    },
    {
        id: "EyByTFRNtehec0yB9e82dFSL2gN2",
        rollNameCollection: "Voluntarios"
    }]


    useEffect(() => {
        getAllConversation(userData[1].rollNameCollection, userData[1].id).then(setConversation)
    })
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

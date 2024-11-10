import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TextInput,
    FlatList,
    ImageBackground,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import {
    subscribeToChatMessages,
    sendMessage,
} from "../../service/api/chatService";
import useAuthStore from "../../stores/useAuthStore";
import withSafeArea from "../../util/withSafeArea";

const ChatScreen = ({ route }: any) => {
    const backgroundImg = require("../../assets/backgroundVolu.png");
    const { projectId } = route.params;
    const { currentUser } = useAuthStore();
    const [messages, setMessages] = useState<any[]>([]);
    const [newMessage, setNewMessage] = useState("");

    useEffect(() => {
        const unsubscribe = subscribeToChatMessages(projectId, setMessages);

        return () => unsubscribe();
    }, [projectId]);

    const handleSendMessage = async () => {
        if (newMessage.trim()) {
            try {
                await sendMessage(
                    projectId,
                    currentUser?.uid!,
                    newMessage,
                    currentUser?.name!
                );
                setNewMessage("");
            } catch (error) {
                console.error("Error sending message:", error);
            }
        }
    };

    const renderItem = ({ item }: { item: any }) => {
        return (
            <View className="mb-2 mx-2 bg-naranja_claro rounded-xl self-start p-2">
                <Text className=" py-2 pr-2 ">
                    {item.name}: {item.text}
                </Text>
            </View>
        );
    };

    return (
        <ImageBackground className="flex-1" source={backgroundImg}>
            <View className="flex-1 justify-between">
                <FlatList
                    data={messages}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    contentContainerStyle={styles.messageList}
                    inverted
                />
                <View className="flex-row p-2 border-t border-gray-300">
                    <TextInput
                        className="flex-1 border border-gray-300 rounded p-2 bg-white focus:border-lila_oscuro"
                        value={newMessage}
                        onChangeText={setNewMessage}
                        placeholder="Escribe un mensaje..."
                    />
                    <TouchableOpacity
                        onPress={handleSendMessage}
                        className="bg-rosa  px-3 py-2 rounded-lg ml-2 items-center justify-center"
                    >
                        <Text className=" text-lila_oscuro font-semibold">
                            Enviar
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    messageList: {
        maxHeight: 300,
    },
});

export default withSafeArea(ChatScreen);

import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TextInput,
    Button,
    FlatList,
    ImageBackground,
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
                await sendMessage(projectId, currentUser?.id, newMessage);
                setNewMessage("");
            } catch (error) {
                console.error("Error sending message:", error);
            }
        }
    };

    const renderItem = ({ item }: { item: any }) => (
        <View style={styles.messageContainer}>
            <Text>
                {item.senderId}: {item.text}
            </Text>
        </View>
    );

    return (
        <ImageBackground className="flex-1" source={backgroundImg}>
            <View style={styles.container}>
                <FlatList
                    data={messages}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    contentContainerStyle={styles.messageList}
                    inverted // Esto invierte la lista para mostrar el último mensaje en la parte inferior
                />
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        value={newMessage}
                        onChangeText={setNewMessage}
                        placeholder="Escribe un mensaje..."
                    />
                    <Button title="Enviar" onPress={handleSendMessage} />
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
    },
    messageList: {
        padding: 10,
    },
    messageContainer: {
        marginBottom: 10,
        padding: 10,
        backgroundColor: "#ffffff",
        borderRadius: 5,
    },
    inputContainer: {
        flexDirection: "row",
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: "#ccc",
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
    },
});

export default withSafeArea(ChatScreen);

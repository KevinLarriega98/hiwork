import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    ImageBackground,
    Image,
} from "react-native";
import { getProjectsByOngId } from "../../service/api/projectService";
import useAuthStore from "../../stores/useAuthStore";
import withSafeArea from "../../util/withSafeArea";
import { ProjectState } from "../../types/project";
import { BlurView } from "expo-blur";
import { getUserDataFromFirestore } from "../../service/api/authService";
import { subscribeToChatMessages } from "../../service/api/chatService";
import moment from "moment";

const ChatTabScreen = ({ navigation }: any) => {
    const backgroundImg = require("../../assets/backgroundVolu.png");
    const { currentUser } = useAuthStore();
    const [projects, setProjects] = useState<ProjectState[]>([]);
    const [ong, setOng] = useState<any>();

    useEffect(() => {
        const fetchProjects = async () => {
            if (currentUser?.id) {
                const data = await getProjectsByOngId(currentUser.id);
                console.log(data);
                setProjects(data);
            }
        };

        const fetchOngById = async () => {
            const data = await getUserDataFromFirestore(currentUser?.id);
            setOng(data);
        };

        {
            currentUser?.profileType === "ONG" && fetchOngById();
            fetchProjects();
        }
    }, [currentUser?.id]);

    const handleChatPress = (projectId: string) => {
        navigation.navigate("ChatScreen", { projectId });
    };

    const ProjectItem = ({ item }: { item: ProjectState }) => {
        const [messages, setMessages] = useState<any[]>([]);

        useEffect(() => {
            const unsubscribe = subscribeToChatMessages(item.id!, setMessages);
            return () => unsubscribe();
        }, [item.id]);

        const lastMessage = messages[messages.length - 1];

        const lastMessageText = lastMessage
            ? lastMessage.text
            : "No hay mensajes";
        const lastMessageDate =
            lastMessage && lastMessage.createdAt
                ? moment(lastMessage.createdAt.toDate()).fromNow()
                : "";

        // Contar los mensajes no leídos
        const unreadMessages = messages.filter(
            (msg) => !msg.read && msg.senderId !== currentUser?.id
        ).length;

        return (
            <TouchableOpacity
                onPress={() => handleChatPress(item.id!)}
                className="mb-4 rounded-lg"
            >
                <BlurView
                    intensity={15}
                    tint="dark"
                    className="rounded-lg overflow-hidden"
                >
                    <View className="p-4 flex flex-row items-center">
                        <Image
                            source={{
                                uri: ong?.image,
                            }}
                            className="w-12 h-12 rounded-full border-2 border-white mr-3"
                        />
                        <View className="flex-1">
                            <Text className="text-lg font-medium">
                                {item.title}
                            </Text>
                            <Text className="text-sm text-gray-500">
                                {lastMessageText}
                            </Text>
                            <Text className="text-xs text-gray-400">
                                {lastMessageDate}
                            </Text>
                        </View>
                        {unreadMessages > 0 && (
                            <View className="w-5 h-5 bg-red-500 rounded-full justify-center items-center">
                                <Text className="text-white text-xs">
                                    {unreadMessages}
                                </Text>
                            </View>
                        )}
                    </View>
                </BlurView>
            </TouchableOpacity>
        );
    };

    return (
        <ImageBackground className="flex-1" source={backgroundImg}>
            <View className="flex-1 p-5 justify-center">
                <Text className="text-xl font-bold text-[#1E1E1E] mb-4 text-center">
                    Chat
                </Text>
                <FlatList
                    data={projects}
                    keyExtractor={(item) => item.id!}
                    renderItem={({ item }) => <ProjectItem item={item} />}
                />
            </View>
        </ImageBackground>
    );
};

export default withSafeArea(ChatTabScreen);

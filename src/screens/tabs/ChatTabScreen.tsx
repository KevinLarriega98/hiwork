import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    ImageBackground,
    Image,
    ActivityIndicator,
} from "react-native";
import { getProjects } from "../../service/api/projectService";
import useAuthStore from "../../stores/useAuthStore";
import withSafeArea from "../../util/withSafeArea";
import { BlurView } from "expo-blur";
import {
    getUserDataFromFirestore,
    getUserImage,
} from "../../service/api/authService"; // Asegúrate de tener esta función para obtener la imagen de la ONG
import { subscribeToChatMessages } from "../../service/api/chatService";
import moment from "moment";
import { Project } from "../../types/Project";

const ChatTabScreen = ({ navigation }: any) => {
    const backgroundImg = require("../../assets/backgroundVolu.png");
    const { currentUser } = useAuthStore();
    const [projects, setProjects] = useState<Project[]>([]);
    const [ongImages, setOngImages] = useState<{ [key: string]: string }>({});
    const [loading, setLoading] = useState<boolean>(false);
    const [messages, setMessages] = useState<{ [key: string]: any[] }>({});

    // Cargar proyectos y la información de la ONG
    useEffect(() => {
        const fetchProjectsAndOng = async () => {
            if (currentUser?.uid) {
                setLoading(true);

                // Obtener la información del usuario (ONG o voluntario)
                const userData = await getUserDataFromFirestore(
                    currentUser.uid
                );

                // Si es una ONG, obtenemos los proyectos que ha creado
                if (userData.profileType === "ONG") {
                    const unsubscribe = getProjects((projects) => {
                        const ongProjects = projects.filter(
                            (proj) => proj.ongID === currentUser.uid
                        );
                        setProjects(ongProjects);
                        setLoading(false);

                        // Obtener imágenes de las ONGs de los proyectos
                        ongProjects.forEach((project) => {
                            getUserImage(project.ongID).then((imageUrl) => {
                                setOngImages((prevImages) => ({
                                    ...prevImages,
                                    [project.ongID]: imageUrl || "", // Evitar null, usar cadena vacía
                                }));
                            });
                        });
                    });

                    return () => unsubscribe(); // Limpiar la suscripción
                }

                // Si es un voluntario, obtenemos los proyectos en los que ha aplicado
                if (userData.profileType === "Voluntario") {
                    const unsubscribe = getProjects((projects) => {
                        const volunteerProjects = projects.filter((proj) =>
                            proj.applications.some(
                                (app) => app.volunteerID === currentUser.uid
                            )
                        );
                        setProjects(volunteerProjects);
                        setLoading(false);

                        // Obtener imágenes de las ONGs de los proyectos
                        volunteerProjects.forEach((project) => {
                            getUserImage(project.ongID).then((imageUrl) => {
                                setOngImages((prevImages) => ({
                                    ...prevImages,
                                    [project.ongID]: imageUrl || "", // Evitar null, usar cadena vacía
                                }));
                            });
                        });
                    });

                    return () => unsubscribe(); // Limpiar la suscripción
                }

                setLoading(false);
            }
        };

        fetchProjectsAndOng();
    }, [currentUser?.uid]);

    // Suscribirse a los mensajes de todos los proyectos
    useEffect(() => {
        if (projects.length > 0) {
            const unsubscribeMessages = projects.map((project) =>
                subscribeToChatMessages(project.id, (newMessages) => {
                    setMessages((prevMessages) => ({
                        ...prevMessages,
                        [project.id]: newMessages,
                    }));
                })
            );

            // Limpiar suscripciones al salir
            return () => {
                unsubscribeMessages.forEach((unsubscribe) => unsubscribe());
            };
        }
    }, [projects]);

    // Navegar al chat correspondiente
    const handleChatPress = (projectId: string) => {
        navigation.navigate("ChatScreen", { projectId });
    };

    // Componente para mostrar cada proyecto
    const ProjectItem = ({ item }: { item: Project }) => {
        const projectMessages = messages[item.id] || [];
        const lastMessage = projectMessages[projectMessages.length - 1];
        const lastMessageText = lastMessage
            ? lastMessage.text
            : "No hay mensajes";
        const lastMessageDate =
            lastMessage && lastMessage.createdAt
                ? moment(lastMessage.createdAt.toDate()).fromNow()
                : "Fecha no disponible";

        const unreadMessages = projectMessages.filter(
            (msg) => !msg.read && msg.senderId !== currentUser?.uid
        ).length;

        const ongImage = ongImages[item.ongID] || "";

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
                        {ongImage ? (
                            <Image
                                source={{
                                    uri: ongImage,
                                }}
                                className="w-12 h-12 rounded-full border-2 border-white mr-3"
                            />
                        ) : (
                            <View className="w-12 h-12 rounded-full border-2 border-white bg-gray-300 mr-3" />
                        )}
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
                {loading ? (
                    <View className="flex-1 justify-center items-center">
                        <ActivityIndicator size="large" color="#1E1E1E" />
                    </View>
                ) : (
                    <FlatList
                        data={projects}
                        keyExtractor={(item) => item.id!}
                        renderItem={({ item }) => <ProjectItem item={item} />}
                    />
                )}
            </View>
        </ImageBackground>
    );
};

export default withSafeArea(ChatTabScreen);

import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    FlatList,
    ActivityIndicator,
    Alert,
    Pressable,
} from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../../routes/LoginStackNavigation";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import useAuthStore from "../../../context/useAuthStore";
import { getApplications } from "../../../service/api/projectService";

type ProjectScreenRouteProp = RouteProp<RootStackParamList, "Project">;

const ProjectInfoScreen = () => {
    const { userType, currentUser, user } = useAuthStore();
    const [applications, setApplications] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const route = useRoute<ProjectScreenRouteProp>();
    const { project } = route.params;

    const createdAtDate = project.createdAt ? project.createdAt.toDate() : null;
    const updatedAtDate = project.updatedAt ? project.updatedAt.toDate() : null;

    useEffect(() => {
        if (
            userType === "ONG" &&
            currentUser?.uid === project.ongID &&
            project.id
        ) {
            try {
                return getApplications(project.id, (apps) => {
                    setApplications(apps);
                });
            } catch (error) {
                Alert.alert("Error", "No se pudieron cargar las aplicaciones.");
            } finally {
                setLoading(false);
            }
        } else {
            setLoading(false);
        }
    }, [project.id, userType, currentUser?.uid, project.ongID]);

    return (
        <View className="flex-1 px-6 bg-white mt-6 justify-between">
            <View>
                <View className="flex flex-row items-center gap-2">
                    <MaterialCommunityIcons
                        name="checkbox-blank-circle"
                        size={43}
                    />
                    <View className=" flex-col gap-0 mb-3">
                        <Text className="font-bold text-xl ">
                            {project.title}
                        </Text>
                        <Text className="font-semibold text-base">
                            ONG: {project.ongName}
                        </Text>
                    </View>
                </View>

                <Text className="text-base mb-2">{project.description}</Text>
                <Text className="text-[#666] text-base">
                    Created At:{" "}
                    {createdAtDate ? createdAtDate.toLocaleDateString() : "N/A"}
                </Text>
                <Text className="text-[#666] text-base">
                    Updated At:{" "}
                    {updatedAtDate ? updatedAtDate.toLocaleDateString() : "N/A"}
                </Text>
            </View>

            {userType === "ONG" && currentUser?.uid === project.ongID && (
                <View>
                    {loading ? (
                        <ActivityIndicator size="large" color="#808080" />
                    ) : (
                        <FlatList
                            data={applications}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <View className="p-4 border-b border-gray-200">
                                    <Text className="font-bold">
                                        {item.volunteerName}
                                    </Text>
                                    <Text>Email: {item.volunteerEmail}</Text>
                                    <Text>
                                        Carta de Presentación:{" "}
                                        {item.coverLetter}
                                    </Text>
                                    <View className="flex-row mt-2 justify-between">
                                        <Text>Status: {item.status}</Text>

                                        <Pressable
                                            className="bg-primary items-center mr-2 px-2 rounded-xl"
                                            onPress={() =>
                                                // handleAccept(item.id)
                                                console.log("qwe")
                                            }
                                        >
                                            <Text className="text-white text-base font-bold">
                                                Aceptar
                                            </Text>
                                        </Pressable>
                                        <Pressable
                                            className="bg-primary rounded-xl items-center mr-2 px-2"
                                            onPress={() =>
                                                // handleAccept(item.id)
                                                console.log("qwe")
                                            }
                                        >
                                            <Text className="text-white text-base font-bold">
                                                Rechazar
                                            </Text>
                                        </Pressable>
                                    </View>
                                </View>
                            )}
                        />
                    )}
                </View>
            )}
        </View>
    );
};

export default ProjectInfoScreen;

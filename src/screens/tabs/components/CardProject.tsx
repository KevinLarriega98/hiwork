import { View, Text, TouchableOpacity, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import {
    getApplications,
    saveProjectUser,
    getUserApplications,
} from "../../../service/api/projectService";
import { ProjectState } from "../../../types/project";
import { calculateWeeksRange } from "../../../util/calculateWeeksRange";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import useAuthStore from "../../../stores/useAuthStore";
import loader from "../../../util/loader";

const CardProject = ({ item }: { item: ProjectState }) => {
    const navigation = useNavigation<any>();
    const { currentUser } = useAuthStore();

    const [applicators, setApplicators] = useState<any[]>([]);
    const [userApplicationStatus, setUserApplicationStatus] = useState<
        string | null
    >(null);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchApplications = async () => {
        if (currentUser?.id) {
            try {
                return getApplications(item.id!, (apps) =>
                    setApplicators(apps)
                );
            } catch (error) {
                Alert.alert("Error", "No se pudieron cargar las aplicaciones.");
            } finally {
                setLoading(false);
            }
        } else {
            setLoading(false);
        }
    };

    const fetchUserApplicationStatus = async () => {
        if (currentUser?.id) {
            try {
                return getUserApplications(
                    currentUser.id,
                    (appliedProjects) => {
                        const userApplication = appliedProjects.find(
                            (project: any) => project.projectID === item.id
                        );
                        setUserApplicationStatus(
                            userApplication?.status || null
                        );
                    }
                );
            } catch (error) {
                console.error(
                    "Error al obtener el estado de la aplicación del usuario:",
                    error
                );
            }
        }
    };

    useEffect(() => {
        fetchApplications();
        fetchUserApplicationStatus();
    }, [currentUser?.id]);

    const handleProjectPress = (project: ProjectState) => {
        navigation.navigate("Project", { project });
    };

    const weeksRange = item.objectiveTimeline
        ? calculateWeeksRange(item.objectiveTimeline)
        : "No dates available";

    return (
        <TouchableOpacity
            className="bg-gray_1 p-4 rounded-2xl mb-4 w-full "
            onPress={() => handleProjectPress(item)}
        >
            <View className="flex flex-row justify-between items-start mb-2 ">
                <View className="flex-1 flex flex-row gap-1 flex-wrap">
                    {item.roles.map((role, index) => (
                        <View
                            key={index}
                            className="px-2 py-1 bg-gray_2 rounded-full justify-center items-center"
                        >
                            <Text className="text-gray_1 text-xs font-normal leading-none">
                                {role.role}
                            </Text>
                        </View>
                    ))}
                </View>

                <TouchableOpacity
                    className="flex flex-row gap-1 items-center z-30"
                    onPress={() =>
                        saveProjectUser(
                            item.id!,
                            currentUser?.id,
                            currentUser?.savedProjects
                        )
                    }
                >
                    {currentUser?.savedProjects &&
                    currentUser.savedProjects.includes(item.id!) ? (
                        <MaterialCommunityIcons
                            name="bookmark"
                            color={"black"}
                            size={24}
                        />
                    ) : (
                        <MaterialCommunityIcons
                            name="bookmark-outline"
                            color={"black"}
                            size={24}
                        />
                    )}
                </TouchableOpacity>
            </View>

            <Text className="text-xl font-medium mb-1 text-text_black">
                {item.title}
            </Text>

            <View className="flex flex-row justify-between items-center">
                <View>
                    <View className="flex flex-row gap-1 mb-1">
                        <MaterialCommunityIcons
                            name="checkbox-blank-circle"
                            color={"black"}
                            size={18}
                        />
                        <Text className="text-text_black">{item.ongName}</Text>
                    </View>
                    <View className="flex flex-col items-start mb-1">
                        <View className="flex flex-row items-center mb-1">
                            <MaterialCommunityIcons
                                name="square-rounded"
                                color={"#7f7f7f"}
                                size={18}
                            />
                            <Text className="text-text_black mr-2">
                                {weeksRange}
                            </Text>
                        </View>
                    </View>
                </View>
                {}
                {loading ? (
                    loader("Cargando...")
                ) : (
                    <View>
                        {userApplicationStatus !== null && (
                            <Text>
                                Status: {userApplicationStatus || "No aplicado"}
                            </Text>
                        )}
                    </View>
                )}
            </View>
        </TouchableOpacity>
    );
};

export default CardProject;

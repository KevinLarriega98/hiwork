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

    const totalCount = item.roles.reduce((sum, item) => sum + item.count, 0);
    const uniqueRoles = [...new Set(item.roles.map((item) => item.role))];

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
            <View className="flex flex-row justify-between items-start ">
                <View className="flex flex-row gap-2 mb-1 items-center">
                    <MaterialCommunityIcons
                        name="checkbox-blank-circle"
                        color={"red"}
                        size={18}
                    />
                    <Text className="text-text_black text-xl">
                        {item.ongName}
                    </Text>
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

            <Text className="text-2xl font-medium mb-1 text-text_black">
                {item.title}
            </Text>
            <View className="flex flex-row justify-between items-center">
                <View>
                    <View className="flex flex-row items-start mb-1">
                        <View className="flex flex-row items-center mb-1">
                            <MaterialCommunityIcons
                                name="calendar-text-outline"
                                color={"#7f7f7f"}
                                size={18}
                            />
                            <Text className="text-text_black mr-2">
                                {weeksRange}
                            </Text>
                        </View>
                        <View className="flex flex-row items-center mb-1">
                            <MaterialCommunityIcons
                                name="account-outline"
                                color={"#7f7f7f"}
                                size={18}
                            />
                            <Text className="text-text_black mr-2">
                                {totalCount}
                                {totalCount <= 1
                                    ? " voluntario"
                                    : " voluntarios"}
                            </Text>
                        </View>
                    </View>
                </View>
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
            <View className="flex-1 flex flex-row gap-1 flex-wrap">
                <Text className=" text-verde_oscuro font-semibold">
                    {uniqueRoles.join(" - ")}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

export default CardProject;

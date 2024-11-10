import { View, Text, TouchableOpacity, Alert } from "react-native";
import React, { useEffect, useState } from "react";

import { calculateWeeksRange } from "../../../util/calculateWeeksRange";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import useAuthStore from "../../../stores/useAuthStore";
import { Project } from "../../../types/Project";
import { saveProjectUser } from "../../../service/api/projectService";

const CardProject = ({ item }: { item: Project }) => {
    const navigation = useNavigation<any>();
    const { currentUser } = useAuthStore();

    const [applicators, setApplicators] = useState<any[]>(item.applications);
    const [userApplicationStatus, setUserApplicationStatus] = useState<
        string | null
    >(null);

    useEffect(() => {
        const applicatorStatus = applicators.find(
            (app) => app.volunteerID === currentUser?.uid
        );

        if (applicatorStatus) {
            setUserApplicationStatus(applicatorStatus.status);
        }
    }, [currentUser?.proyectosAplicados]);

    const totalCount = item.roles.reduce((sum, item) => sum + item.quantity, 0);
    const uniqueRoles = [...new Set(item.roles.map((item) => item.role))];

    const handleProjectPress = (project: Project) => {
        navigation.navigate("Project", { project });
    };

    const weeksRange = item.objectiveTimeline
        ? calculateWeeksRange(item.objectiveTimeline)
        : "No dates available";

    return (
        <TouchableOpacity
            className="bg-gray_1 p-4 rounded-2xl mb-4 w-full"
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
                            currentUser?.uid!,
                            currentUser?.savedProjects!
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
            <View className="flex flex-col justify-between items-center">
                <View className="flex flex-row justify-between items-center w-full">
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
                <View className=" flex flex-row w-full">
                    <View className="flex-1 flex flex-row gap-1 flex-wrap">
                        <Text className=" text-verde_oscuro font-semibold">
                            {uniqueRoles.join(" - ")}
                        </Text>
                    </View>
                    <View>
                        {userApplicationStatus !== null && (
                            <Text>
                                Status: {userApplicationStatus || "No aplicado"}
                            </Text>
                        )}
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default CardProject;

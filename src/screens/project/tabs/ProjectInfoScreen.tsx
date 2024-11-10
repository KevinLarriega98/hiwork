import React, { useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import useAuthStore from "../../../stores/useAuthStore";
import { calculateWeeksRange } from "../../../util/calculateWeeksRange";
import ApplyToProjectButton from "../components/ApplyToProjectButton";
import { RootStackParamList } from "../../../types/Navigation";
import { Timestamp } from "firebase/firestore";

type ProjectScreenRouteProp = RouteProp<RootStackParamList, "Project">;

const ProjectInfoScreen = () => {
    const { currentUser } = useAuthStore();
    const route = useRoute<ProjectScreenRouteProp>();
    const { project } = route.params;

    const createdAtDate = (project.createdAt as Timestamp)?.toDate() ?? null;
    const updatedAtDate = (project.updatedAt as Timestamp)?.toDate() ?? null;

    const weekRange = calculateWeeksRange(project.objectiveTimeline);
    const countOfRoles = project.roles.map((role) => role.role);
    const countOfPersons = project.roles.reduce(
        (acc, role) => acc + role.quantity,
        0
    );

    const [expanded, setExpanded] = useState(false);
    const [showSeeMore, setShowSeeMore] = useState(false);

    const handleTextLayout = (e: { nativeEvent: { lines: any } }) => {
        const { lines } = e.nativeEvent;
        if (lines.length > 16) {
            setShowSeeMore(true);
        }
    };

    return (
        <View className="flex-1 p-6 bg-white">
            <View className="flex-1 justify-between">
                <View className="flex">
                    <View className="flex flex-row items-center">
                        <Image
                            source={{
                                uri: currentUser?.image
                                    ? currentUser?.image
                                    : "",
                            }}
                            className="w-10 h-10 rounded-full"
                        />
                        <View className="flex-col px-2">
                            <Text className="font-bold text-xl">
                                {project.title}
                            </Text>
                            <Text className="font-semibold text-base">
                                ONG: {project.ongName}
                            </Text>
                        </View>
                    </View>
                    <View className="flex flex-row mt-2">
                        <View className="flex flex-row items-center">
                            <MaterialCommunityIcons
                                name="calendar-multiselect"
                                color={"#1E1E1E"}
                                size={18}
                            />
                            <Text>{weekRange}</Text>
                        </View>

                        <View className="flex flex-row items-center ml-3">
                            <MaterialCommunityIcons
                                name="account-outline"
                                color={"#1E1E1E"}
                                size={18}
                            />
                            <Text>{countOfPersons}</Text>
                        </View>
                    </View>
                    <View className="flex flex-row mt-2">
                        <Text className="text-lila_oscuro">
                            {countOfRoles.join(" / ")}
                        </Text>
                    </View>
                </View>

                <View className="flex-1 mt-3 rounded-lg justify-between">
                    <View>
                        <Text className="text-lg font-bold">
                            Descripción del proyecto
                        </Text>
                        <ScrollView className="max-h-[90%]">
                            <Text
                                className="text-base mb-2"
                                numberOfLines={expanded ? undefined : 10}
                                onTextLayout={handleTextLayout}
                            >
                                {project.description}
                            </Text>

                            {showSeeMore && !expanded && (
                                <TouchableOpacity
                                    onPress={() => setExpanded(true)}
                                >
                                    <Text
                                        style={{ color: "blue", marginTop: 5 }}
                                    >
                                        Ver más
                                    </Text>
                                </TouchableOpacity>
                            )}
                        </ScrollView>
                    </View>

                    {currentUser?.profileType === "Voluntario" && (
                        <ApplyToProjectButton projectID={project.id!} />
                    )}

                    <View className="flex-row items-center justify-between">
                        <Text className="text-[#666] text-sm">
                            Created At:{" "}
                            {createdAtDate
                                ? createdAtDate.toLocaleDateString()
                                : "N/A"}
                        </Text>
                        <Text className="text-[#666] text-sm">
                            Updated At:{" "}
                            {updatedAtDate
                                ? updatedAtDate.toLocaleDateString()
                                : "N/A"}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default ProjectInfoScreen;

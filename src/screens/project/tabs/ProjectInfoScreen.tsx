import React from "react";
import { View, Text, Image } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import useAuthStore from "../../../stores/useAuthStore";
import { RootStackParamList } from "../../../types/navigation";
import { calculateWeeksRange } from "../../../util/calculateWeeksRange";
import ApplyToProjectButton from "../components/ApplyToProjectButton";

type ProjectScreenRouteProp = RouteProp<RootStackParamList, "Project">;

const ProjectInfoScreen = () => {
    const { currentUser } = useAuthStore();
    const route = useRoute<ProjectScreenRouteProp>();
    const { project } = route.params;

    const createdAtDate = project.createdAt ? project.createdAt.toDate() : null;
    const updatedAtDate = project.updatedAt ? project.updatedAt.toDate() : null;

    let updatedAtFormatted = "";

    const weekRange = calculateWeeksRange(project.objectiveTimeline);

    return (
        <View className="flex-1 p-6 bg-white">
            <View className="flex-1 bg-[#D9D9D9] rounded-lg p-2 justify-between">
                <View className="flex">
                    <View className="flex flex-row">
                        <Image
                            source={{
                                uri: currentUser?.image
                                    ? currentUser?.image
                                    : "",
                            }}
                            className="w-10 h-10 rounded-full"
                        />
                        <View className=" flex-col gap-0 px-2">
                            <Text className="font-bold text-xl ">
                                {project.title}
                            </Text>
                            <Text className="font-semibold text-base">
                                ONG: {project.ongName}
                            </Text>
                        </View>
                    </View>
                    <Text className="text-[15px] px-2 pt-1">
                        {currentUser?.description}
                    </Text>
                </View>

                <View className=" bg-[#F9F9FA] flex-1 mt-3 rounded-lg p-2 justify-between">
                    <View>
                        <Text className=" text-lg font-bold">
                            Descripción del proyecto
                        </Text>
                        <Text className="text-base mb-2" numberOfLines={13}>
                            {project.description}
                        </Text>

                        <Text className=" text-lg font-bold">
                            Duración del proyecto
                        </Text>
                        <View className=" flex">
                            <View className="flex flex-row items-center">
                                <MaterialCommunityIcons
                                    name="square-rounded"
                                    color={"#7f7f7f"}
                                    size={18}
                                />
                                <Text>{weekRange}</Text>
                            </View>
                        </View>
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
                            {updatedAtFormatted ? updatedAtFormatted : "N/A"}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default ProjectInfoScreen;

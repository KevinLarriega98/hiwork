import { View, Text } from "react-native";
import React from "react";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../../routes/LoginStackNavigation";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

type ProjectScreenRouteProp = RouteProp<RootStackParamList, "Project">;

const ProjectInfoScreen = () => {
    const route = useRoute<ProjectScreenRouteProp>();
    const { project } = route.params;

    const createdAtDate = project.createdAt ? project.createdAt.toDate() : null;
    const updatedAtDate = project.updatedAt ? project.updatedAt.toDate() : null;

    return (
        // TODO mirar porque al hacer un margin se pone el color este que no me gusta se que se puede arreglar haciendo un padding pero quiero saber de donde viene
        <View className="flex-1 px-6 bg-white mt-6">
            <View className="flex flex-row items-center gap-2">
                <MaterialCommunityIcons
                    name="checkbox-blank-circle"
                    size={43}
                />
                <View className=" flex-col gap-0">
                    <Text className="font-bold text-xl ">{project.title}</Text>
                    <Text className="font-semibold text-base">
                        ONG: {project.ongName}
                    </Text>
                </View>
            </View>

            {/* <Text className="font-semibold text-base mb-[5px]">
                Objective Timeline: {project.objectiveTimeline}
            </Text>
            <Text className="font-semibold text-base mb-[5px]">
                Remote: {project.remote ? "Yes" : "No"}
            </Text> */}
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
    );
};

export default ProjectInfoScreen;

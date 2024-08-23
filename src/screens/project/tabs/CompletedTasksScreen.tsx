import { View, Text } from "react-native";
import React from "react";
import { ProjectState } from "../../../types/project";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../../routes/LoginStackNavigation";

type ProjectScreenRouteProp = RouteProp<RootStackParamList, "Project">;

const CompletedTasksScreen = () => {
    const route = useRoute<ProjectScreenRouteProp>();
    const { project } = route.params;

    return (
        <View className="flex-1 bg-white px-6">
            <Text>{project.title}</Text>
        </View>
    );
};

export default CompletedTasksScreen;

import { View, Text } from "react-native";
import React from "react";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../../types/navigation";

type ProjectScreenRouteProp = RouteProp<RootStackParamList, "Project">;

const CompletedTasksScreen = () => {
    const route = useRoute<ProjectScreenRouteProp>();
    const { project } = route.params;

    return (
        <View className="flex-1 p-6 bg-white">
            <Text>{project.title}</Text>
            
        </View>
    );
};

export default CompletedTasksScreen;

import { View, Text } from "react-native";
import React from "react";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../../types/navigation";

type ProjectScreenRouteProp = RouteProp<RootStackParamList, "Project">;

const CompletedTasksScreen = () => {
    const route = useRoute<ProjectScreenRouteProp>();
    const { project } = route.params;

    console.log(project.objectiveTimeline);

    return (
        <View className="flex-1 p-6 bg-white">
            {project.objectiveTimeline.map((item, index) => (
                <View
                    key={index}
                    className="flex-row justify-between items-center  bg-gray_5 mb-3 p-2 rounded-lg"
                >
                    <View>
                        <Text className=" mb-1 text-base">{item.date}</Text>
                        <Text className="font-semibold text-lg">
                            {item.data}
                        </Text>
                    </View>
                    <View>
                        <Text>qweqwe</Text>
                    </View>
                </View>
            ))}
        </View>
    );
};

export default CompletedTasksScreen;

import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../../types/navigation";
import { CalendarEvent } from "../../../types/project";

type ProjectScreenRouteProp = RouteProp<RootStackParamList, "Project">;

const CompletedTasksScreen = () => {
    const route = useRoute<ProjectScreenRouteProp>();
    const { project } = route.params;
    const [localProject, setLocalProject] = useState(project);

    return (
        <View className="flex-1 pt-5 px-6 bg-white ">
            <ScrollView>
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
            </ScrollView>
        </View>
    );
};

export default CompletedTasksScreen;

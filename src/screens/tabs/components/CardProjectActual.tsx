import { View, Text, TouchableOpacity, Alert, Image } from "react-native";
import React, { useEffect, useState } from "react";
import {
    getApplications,
    saveProjectUser,
    getUserApplications,
} from "../../../service/api/projectService";
import { ProjectState, CalendarEvent } from "../../../types/project";
import { calculateWeeksRange } from "../../../util/calculateWeeksRange";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import useAuthStore from "../../../stores/useAuthStore";
import loader from "../../../util/loader";
import { BlurView } from "expo-blur";
import ProjectDurationCard from "../../project/components/ProjectDurationCard";
import ProjectDateActual from "./ProjectDateActual";

const CardProjectActual = ({ item }: { item: ProjectState }) => {
    const navigation = useNavigation<any>();
    const { currentUser } = useAuthStore();

    const now = Date.now();
    console.log("this is item ", item.objectiveTimeline);

    const findClosestEvent = (events: CalendarEvent[]) => {
        const eventWithTimestamps = events.map((event) => ({
            ...event,
            timestamp: new Date(event.date).getTime(),
        }));

        eventWithTimestamps.sort(
            (a, b) => Math.abs(a.timestamp - now) - Math.abs(b.timestamp - now)
        );

        return eventWithTimestamps.length > 0 ? eventWithTimestamps[0] : null;
    };

    const closestEvent = findClosestEvent(item.objectiveTimeline);

    console.log(closestEvent);

    const roles = item.roles.map((role) => role.role);

    const handleProjectPress = (project: ProjectState) => {
        navigation.navigate("Project", { project });
    };

    const weeksRange = item.objectiveTimeline
        ? calculateWeeksRange(item.objectiveTimeline)
        : "No dates available";

    return (
        <TouchableOpacity
            className="mb-4 w-full rounded-2xl overflow-hidden "
            onPress={() => handleProjectPress(item)}
        >
            <BlurView intensity={15} tint="dark" className="p-4 rounded-2xl">
                <View className="flex flex-row items-center mb-1 ">
                    <Image
                        source={{
                            uri:
                                currentUser?.image ||
                                "https://placekitten.com/100/100",
                        }}
                        className="w-12 h-12 rounded-full border-2 border-white"
                    />
                    <View className="ml-4">
                        <Text className="text-2xl font-bold text-verde_oscuro">
                            {item.ongName}: {item.title}
                        </Text>
                    </View>
                </View>
                <Text className="text-base text-lila_oscuro ml-1">
                    {roles.join(" / ")}
                </Text>

                <View className=" mt-2">
                    {closestEvent && <ProjectDateActual item={closestEvent} />}
                </View>
            </BlurView>
        </TouchableOpacity>
    );
};

export default CardProjectActual;

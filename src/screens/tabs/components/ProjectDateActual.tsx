import { View, Text } from "react-native";
import React from "react";
import { CalendarEvent } from "../../../types/project";

const ProjectDateActual = ({ item }: { item: CalendarEvent }) => {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("es-ES", {
            day: "2-digit",
            month: "short",
        });
    };

    const startDateFormatted = formatDate(item.date);

    return (
        <View className="bg-verde_claro rounded-2xl p-3 mb-1 flex-row items-center">
            <View className="mr-4 bg-verde_oscuro py-1 px-4 rounded-xl">
                <Text className="text-3xl font-bold text-verde_claro">
                    {startDateFormatted.split(" ")[0]}
                </Text>
                <Text className="text-lg text-verde_claro  text-center">
                    {startDateFormatted.split(" ")[1]}
                </Text>
            </View>
            <View className="flex-1">
                <Text className="text-lg font-bold mb-1 text-verde_oscuro">
                    {item.name}
                </Text>
                <Text className=" text-base text-verde_oscuro">
                    {item.data}
                </Text>
            </View>
        </View>
    );
};

export default ProjectDateActual;

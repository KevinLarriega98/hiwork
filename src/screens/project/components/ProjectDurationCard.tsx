import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { CalendarEvent } from "../../../types/Project";

interface ProjectDurationCardProps {
    item: CalendarEvent | any;
    handleDayPress: (item: CalendarEvent) => void;
}

const ProjectDurationCard: React.FC<ProjectDurationCardProps> = ({
    item,
    handleDayPress,
}) => {
    const { date, data, name } = item;

    const formatDate = (dateString: string): string => {
        return new Date(dateString).toLocaleDateString("es-ES", {
            day: "2-digit",
            month: "short",
        });
    };

    const startDateFormatted = formatDate(date);

    return (
        <TouchableOpacity
            className="bg-verde_oscuro rounded-2xl p-2 mb-1 flex-row items-center"
            onPress={() => handleDayPress(item)}
        >
            <View className="mr-4 bg-verde_claro py-1 px-3 rounded-xl">
                <Text className="text-3xl font-bold text-verde_oscuro">
                    {startDateFormatted.split(" ")[0]}
                </Text>
                <Text className="text-lg text-verde_oscuro text-center">
                    {startDateFormatted.split(" ")[1]}
                </Text>
            </View>
            <View className="flex-1">
                <Text className="text-lg font-bold mb-1 text-verde_claro">
                    {name}
                </Text>
                <Text className="text-base text-white">{data}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default ProjectDurationCard;

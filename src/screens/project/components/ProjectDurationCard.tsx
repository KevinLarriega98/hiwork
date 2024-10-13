// ProjectDurationCard.js
import React from "react";
import { View, Text } from "react-native";

const ProjectDurationCard = ({
    startDate,
    endDate,
    description,
}: {
    startDate: string;
    endDate: string;
    description: string;
}) => {
    const formatDate = (dateString: string) => {
        const options = { day: "2-digit", month: "short" };
        return new Date(dateString).toLocaleDateString("es-ES", options);
    };

    const startDateFormatted = formatDate(startDate);
    const endDateFormatted = formatDate(endDate);

    return (
        <View className="bg-gray-200 rounded-lg p-4 mb-4 flex-row">
            <View className="mr-4">
                <Text className="text-3xl font-bold text-gray-500">
                    {startDateFormatted.split(" ")[0]}
                </Text>
                <Text className="text-lg text-gray-500">
                    {startDateFormatted.split(" ")[1]}
                </Text>
            </View>
            <View className="flex-1">
                <Text className="text-lg font-bold">Inicio del proyecto</Text>
                <Text className="text-md text-gray-700">{description}</Text>
            </View>
        </View>
    );
};

export default ProjectDurationCard;

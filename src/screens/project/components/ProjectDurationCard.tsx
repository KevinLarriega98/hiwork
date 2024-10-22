import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const ProjectDurationCard = ({
    item,
    length,
    newProjectData,
    handleDayPress,
    setNewProjectData,
}: {
    handleDayPress: Function;
    item: any;
    length: number;
    newProjectData: any;
    setNewProjectData: any;
}) => {
    const { date, data } = item.item;

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("es-ES", {
            day: "2-digit",
            month: "short",
        });
    };

    console.log(item);

    const startDateFormatted = formatDate(date);

    console.log("thi is date qweqwe", date);
    console.log("thi is date qweqwe", data);

    return (
        <TouchableOpacity
            className="bg-gray-200 rounded-2xl p-4 mb-1 flex-row "
            onPress={() => handleDayPress(date)}
        >
            <View className="mr-4 ">
                <Text className="text-3xl font-bold text-gray-500">
                    {startDateFormatted.split(" ")[0]}
                </Text>
                <Text className="text-lg text-gray-500  text-center">
                    {startDateFormatted.split(" ")[1]}
                </Text>
            </View>
            <View className="flex-1">
                <Text className="text-lg font-bold">
                    {date.index === 0
                        ? "Inicio del proyecto"
                        : date.index + 1 === length
                        ? "Fin del proyecto"
                        : `Dia ${startDateFormatted.split(" ")[0]}`}
                </Text>
                <Text className="text-md text-gray-700">{data}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default ProjectDurationCard;

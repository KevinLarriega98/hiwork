import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const ProjectDurationCard = ({
    item,
    length,
    handleDayPress,
}: {
    handleDayPress: Function;
    item: any;
    length: number;
}) => {
    const { date, data } = item.item;

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("es-ES", {
            day: "2-digit",
            month: "short",
        });
    };

    const startDateFormatted = formatDate(date);

    return (
        <TouchableOpacity
            className=" bg-verde_oscuro rounded-2xl p-2 mb-1 flex-row items-center"
            onPress={() => handleDayPress(date)}
        >
            <View className="mr-4 bg-verde_claro py-1 px-3 rounded-xl">
                <Text className="text-3xl font-bold text-verde_oscuro">
                    {startDateFormatted.split(" ")[0]}
                </Text>
                <Text className="text-lg text-verde_oscuro  text-center">
                    {startDateFormatted.split(" ")[1]}
                </Text>
            </View>
            <View className="flex-1">
                <Text className="text-lg font-bold mb-1 text-verde_claro">
                    {date.index === 0
                        ? "Inicio del proyecto"
                        : date.index + 1 === length
                        ? "Fin del proyecto"
                        : `Dia ${startDateFormatted.split(" ")[0]}`}
                </Text>
                <Text className=" text-base text-white">{data}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default ProjectDurationCard;

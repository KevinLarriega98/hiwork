import { View, Text, FlatList } from "react-native";
import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import BookMarkSVG from "../../components/Projects/svg/BookMarkSVG";
import InfoSVG from "../../components/Projects/svg/InfoSVG";
import BellComponent from "../../components/Projects/BellComponent";

const data = [
    {
        id: "1",
        title: "JOB 1",
        org: "ONG HELDSN",
        duration: "2-4 weeks",
        type: "Virtual",
    },
    {
        id: "2",
        title: "JOB 2",
        org: "ONG HELDSN",
        duration: "2-4 weeks",
        type: "Virtual",
    },
    {
        id: "3",
        title: "JOB 3",
        org: "ONG HELDSN",
        duration: "2-4 weeks",
        type: "Virtual",
    },
    {
        id: "4",
        title: "JOB 4",
        org: "ONG HELDSN",
        duration: "2-4 weeks",
        type: "Virtual",
    },
    // Puedes agregar más elementos aquí
];

const ProyectosTabScreen = () => {
    const renderItem = ({ item, index }: { item: any; index: number }) => {
        const isFullWidth = (index + 1) % 3 === 0;

        return (
            <View
                className={`bg-[#d9d9d9] p-4 rounded-lg mb-4 ${
                    isFullWidth ? "w-full" : "w-[48%]"
                }`}
            >
                <View className="flex flex-row justify-between items-center mb-2">
                    <View className="px-2 py-1 bg-[#747474] rounded-full justify-center items-center">
                        <Text className="text-[#d9d9d9] text-xs font-normal leading-none">
                            Design ux/ui
                        </Text>
                    </View>
                    <BookMarkSVG />
                </View>
                <Text className="text-xl font-bold mb-1">{item.title}</Text>
                <View className="flex flex-row gap-1 items-center mb-2">
                    <MaterialCommunityIcons
                        name="set-none"
                        color={"black"}
                        size={26}
                    />
                    <Text className="text-gray-500">{item.org}</Text>
                </View>
                <View className="flex flex-col items-start mb-2">
                    <Text className="text-gray-500 mr-2">{item.duration}</Text>
                    <Text className="text-gray-500">{item.type}</Text>
                </View>
                {isFullWidth && (
                    <Text className="text-gray-500">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry.
                    </Text>
                )}
            </View>
        );
    };

    return (
        <View className="flex-1 bg-white">
            <BellComponent />
            <View className="p-4">
                <Text className="text-xl font-bold mb-4">Hola, hiDoer!</Text>
                <View className="bg-gray-200 p-4 rounded-lg mb-4 flex flex-row items-center justify-evenly">
                    <InfoSVG />
                    <Text className="text-gray-600 text-center text-base">
                        No tienes ningún proyecto activo
                    </Text>
                </View>
                <Text className="text-lg font-semibold mb-4">
                    Aquí tienes algunos proyectos que creemos que te podrían
                    interesar...
                </Text>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    columnWrapperStyle={{ justifyContent: "space-between" }}
                />
            </View>
        </View>
    );
};

export default ProyectosTabScreen;

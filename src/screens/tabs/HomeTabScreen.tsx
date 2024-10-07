import { View, Text } from "react-native";
import React from "react";
import BellComponent from "../../components/Projects/BellComponent";

const HomeTabScreen = () => {
    return (
        <View className="flex-1 bg-white">
            <BellComponent />
            <View className="px-4 flex-1">
                <Text>VOLUNTARIO</Text>
            </View>
        </View>
    );
};

export default HomeTabScreen;

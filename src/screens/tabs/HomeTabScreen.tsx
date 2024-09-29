import { View, Text } from "react-native";
import React from "react";
import useAuthStore from "../../stores/useAuthStore";
import BellComponent from "../../components/Projects/BellComponent";

const HomeTabScreen = () => {
    const { userType } = useAuthStore();

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

import { View, Text } from "react-native";
import React from "react";
import useAuthStore from "../../stores/useAuthStore";
import BellComponent from "../../components/Projects/BellComponent";
import NewProjectONG from "../../components/createProjectONG/NewProjectONG";

const HomeTabScreen = () => {
    const { userType } = useAuthStore();

    return (
        <View className="flex-1 bg-white">
            <BellComponent />
            <View className="px-4 flex-1">
                {userType === "Voluntario" ? (
                    <Text>VOLUNTARIO</Text>
                ) : (
                    <NewProjectONG />
                )}
            </View>
        </View>
    );
};

export default HomeTabScreen;

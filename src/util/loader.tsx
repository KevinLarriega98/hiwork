import { View, Text, ActivityIndicator } from "react-native";
import React from "react";

const loader = (text: string) => {
    return (
        <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" color="#000" />
            <Text className="text-gray-600 text-center text-base mt-2">
                {text}
            </Text>
        </View>
    );
};

export default loader;

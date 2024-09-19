import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { TabBarProps, Route } from "react-native-tab-view";

const TabBarCustomProfile: React.FC<TabBarProps<Route>> = React.memo(
    ({ navigationState, jumpTo }) => {
        const { index, routes } = navigationState;

        return (
            <View className="bg-white w-full flex items-center px-6 py-2">
                <View className="flex-row bg-[#e0e0e0] rounded-full w-full">
                    {routes.map(({ key, title }, i: number) => {
                        const isFocused = i === index;

                        const buttonStyle = [
                            "flex-1 py-1  rounded-full justify-center items-center",
                            isFocused && "bg-gray_3",
                        ].join(" ");
                        const textStyle = [
                            "text-center text-base font-medium",
                            isFocused ? "text-white" : "text-gray_3",
                        ].join(" ");

                        return (
                            <TouchableOpacity
                                key={key}
                                className={buttonStyle}
                                onPress={() => !isFocused && jumpTo(key)}
                            >
                                <Text className={textStyle}>{title}</Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </View>
        );
    }
);

export default TabBarCustomProfile;

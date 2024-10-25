import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { TabBarProps, Route } from "react-native-tab-view";

const TabBarCustomProfile: React.FC<TabBarProps<Route>> = React.memo(
    ({ navigationState, jumpTo }) => {
        const { index, routes } = navigationState;

        return (
            <View className=" w-full flex items-center px-6 py-2">
                <View className="flex-row bg-verde_claro rounded-full w-full">
                    {routes.map(({ key, title }, i: number) => {
                        const isFocused = i === index;

                        const buttonStyle = [
                            "flex-1 py-2  rounded-full justify-center items-center",
                            isFocused && "bg-verde_oscuro",
                        ].join(" ");
                        const textStyle = [
                            "text-center text-base font-medium",
                            isFocused
                                ? "text-verde_claro"
                                : "text-verde_oscuro",
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

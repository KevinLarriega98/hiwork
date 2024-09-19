import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialTopTabBarProps } from "@react-navigation/material-top-tabs";

const CustomTabBar: React.FC<MaterialTopTabBarProps> = (props) => {
    const { state, descriptors, navigation } = props;
    const { index } = state;
    const { routes } = state;

    return (
        <View className=" bg-white w-screen flex  items-center px-6">
            <View className=" flex-row bg-[#cccccc] rounded-xl">
                {routes.map((route, i) => {
                    const isFocused = i === index;
                    const { options } = descriptors[route.key];
                    const title =
                        options.title !== undefined
                            ? options.title
                            : route.name;

                    return (
                        <TouchableOpacity
                            key={i}
                            className={`flex-1 p-1  rounded-xl ${
                                isFocused ? "bg-gray_3" : "bg-[#cccccc]"
                            }`}
                            onPress={() => navigation.navigate(route.name)}
                        >
                            <Text
                                className={`text-center ${
                                    isFocused ? "text-white " : "text-gray-600"
                                }`}
                            >
                                {title}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
};

export default CustomTabBar;

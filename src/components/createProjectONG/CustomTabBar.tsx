import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialTopTabBarProps } from "@react-navigation/material-top-tabs";

const CustomTabBar: React.FC<MaterialTopTabBarProps> = (props) => {
    const { state, descriptors, navigation } = props;
    const { index } = state;
    const { routes } = state;

    return (
        <View className=" bg-white w-screen flex  items-center px-6">
            <View className=" flex-row bg-verde_claro rounded-full ">
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
                            className={`flex-1 p-1  rounded-full py-2  ${
                                isFocused ? "bg-verde_oscuro " : "bg-verde_claro"
                            }`}
                            onPress={() => navigation.navigate(route.name)}
                        >
                            <Text
                                className={`text-center ${
                                    isFocused ? "text-verde_claro " : "text-verde_oscuro"
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

import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../types/navigation";
import { AnimatedCircularProgress } from "react-native-circular-progress";

type WelcomeTypeUserScreenNavigationProp = NavigationProp<
    RootStackParamList,
    "Welcome"
>;

export default function WelcomeScreen() {
    const navigation = useNavigation<WelcomeTypeUserScreenNavigationProp>();

    return (
        <View className="flex-1 bg-white items-center justify-center">
            <AnimatedCircularProgress
                size={300}
                width={10}
                fill={100}
                duration={1500}
                tintColor="#004932"
                backgroundColor="#e0e0e0"
                onAnimationComplete={() => navigation.navigate("Login")}
            >
                {() => (
                    <View>
                        <Text className="text-center text-2xl font-bold text-[#004932]">
                            ¡Bienvenido!
                        </Text>
                        <Text className="text-center text-lg font-bold text-gray_2 mt-2">
                            ¿Preparado para cambiar el mundo?
                        </Text>
                    </View>
                )}
            </AnimatedCircularProgress>
        </View>
    );
}

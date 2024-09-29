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
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const progressInterval = setInterval(() => {
            setProgress((prevProgress) => {
                const newProgress = prevProgress + 100 / 20;
                if (newProgress >= 100) clearInterval(progressInterval);
                return newProgress;
            });
        }, 100);

        const timeout = setTimeout(() => {
            navigation.navigate("Login");
        }, 3000);

        return () => {
            clearInterval(progressInterval);
            clearTimeout(timeout);
        };
    }, []);

    return (
        <View className="flex-1 bg-white items-center justify-center">
            <AnimatedCircularProgress
                size={300}
                width={10}
                fill={progress}
                tintColor="#004932"
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

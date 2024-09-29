import React, { useEffect } from "react";
import { View, StyleSheet, Animated } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../types/navigation";

type WelcomeTypeUserScreenNavigationProp = NavigationProp<
    RootStackParamList,
    "Welcome"
>;

export default function WelcomeScreen() {
    const navigation = useNavigation<WelcomeTypeUserScreenNavigationProp>();
    const fadeAnim = new Animated.Value(0);

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
        }).start();

        const timeout = setTimeout(() => {
            navigation.navigate("Home");
        }, 3000);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <View style={styles.container}>
            <Animated.Text style={[styles.welcomeText, { opacity: fadeAnim }]}>
                Bienvenido
            </Animated.Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#004932",
    },
    welcomeText: {
        fontSize: 32,
        color: "#ffffff",
        fontWeight: "bold",
    },
});

import "react-native-gesture-handler";
import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import LoginStackNavigation from "./src/routes/LoginStackNavigation";
import useAuthStore from "./src/context/useAuthStore";

const App = () => {
    const initializeAuth = useAuthStore((state) => state.initializeAuth);

    useEffect(() => {
        initializeAuth();
    }, [initializeAuth]);

    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <View style={{ flex: 1 }}>
                    <LoginStackNavigation />
                </View>
            </NavigationContainer>
        </SafeAreaProvider>
    );
};

export default App;

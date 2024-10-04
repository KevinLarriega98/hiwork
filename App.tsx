import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import LoginStackNavigation from "./src/routes/LoginStackNavigation";
import useAuthStore from "./src/stores/useAuthStore";
import { AppNavigation } from "./src/routes/AppNavigation";

import { RootStackParamList } from "./src/types/navigation";

const App = () => {
    const { isAuthenticated, initializeAuth } = useAuthStore();

    useEffect(() => {
        initializeAuth();
    }, [initializeAuth]);

    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <View style={{ flex: 1, backgroundColor: "white" }}>
                    {isAuthenticated ? (
                        <AppNavigation />
                    ) : (
                        <LoginStackNavigation />
                    )}
                </View>
            </NavigationContainer>
        </SafeAreaProvider>
    );
};

export default App;

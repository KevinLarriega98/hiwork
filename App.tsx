import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import LoginStackNavigation from "./src/routes/LoginStackNavigation";
import useAuthStore from "./src/stores/useAuthStore";
import { AppNavigation } from "./src/routes/AppNavigation";
import { auth } from "./src/service/api/firebase";

const App = () => {
    const { initializeAuth } = useAuthStore();

    useEffect(() => {
        initializeAuth();
    }, [initializeAuth]);

    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <View style={{ flex: 1, backgroundColor: "white" }}>
                    {auth.currentUser ? (
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

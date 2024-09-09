import "react-native-gesture-handler";
import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import LoginStackNavigation from "./src/routes/LoginStackNavigation";
import useAuthStore from "./src/context/useAuthStore";
import { TabsBottomNavigation } from "./src/routes/TabsBottomNavigation";

const App = () => {
    const { initializeAuth, currentUser } = useAuthStore();

    useEffect(() => {
        initializeAuth();
    }, [initializeAuth]);

    console.log(currentUser);

    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <View style={{ flex: 1, backgroundColor: "white" }}>
                    {currentUser === null ? (
                        <LoginStackNavigation />
                    ) : (
                        <TabsBottomNavigation />
                    )}
                </View>
            </NavigationContainer>
        </SafeAreaProvider>
    );
};

export default App;

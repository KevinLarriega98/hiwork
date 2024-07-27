import "react-native-gesture-handler";
import React from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import LoginStackNavigation from "./src/routes/LoginStackNavigation";

const App = () => {
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

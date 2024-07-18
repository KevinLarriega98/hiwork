import { Stack } from "expo-router";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
    return (
        <SafeAreaProvider>
            <Stack
            // screenOptions={{
            //     headerStyle: {
            //         backgroundColor: "#f4511e",
            //     },
            //     headerTintColor: "#fff",
            //     headerTitleStyle: {
            //         fontWeight: "bold",
            //     },
            // }}
            >
                {/* <Stack.Screen name="index" /> */}
                {/* <Stack.Screen name="details" /> */}
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
        </SafeAreaProvider>
    );
}

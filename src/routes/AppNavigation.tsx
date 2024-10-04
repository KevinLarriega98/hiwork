import { createStackNavigator } from "@react-navigation/stack";
import CreateNewProject from "../screens/project/CreateNewProject";
import { TabsBottomNavigation } from "./TabsBottomNavigation";
import React, { useEffect, useState } from "react";
import { RootStackParamList } from "../types/navigation";
import useAuthStore from "../stores/useAuthStore";

const Stack = createStackNavigator<any>();

export const AppNavigation = () => {
    const [initialRoute, setInitialRoute] =
        useState<keyof RootStackParamList>("Tabs");

    return (
        <Stack.Navigator initialRouteName={initialRoute}>
            <Stack.Screen
                name="Tabs"
                component={TabsBottomNavigation}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="CreateNewProject"
                component={CreateNewProject}
                options={{
                    headerShown: true,
                    title: "Nuevo Proyecto",
                }}
            />
        </Stack.Navigator>
    );
};

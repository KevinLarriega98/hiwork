import { createStackNavigator } from "@react-navigation/stack";
import CreateNewProject from "../screens/project/CreateNewProject";
import { TabsBottomNavigation } from "./TabsBottomNavigation";
import React, { useState } from "react";
import { RootStackParamList } from "../types/navigation";

const Stack = createStackNavigator<any>();

export const AppNavigation = () => {
    const [initialRoute] = useState<keyof RootStackParamList>("Tabs");

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
                    headerTitleAlign: "center",
                }}
            />
        </Stack.Navigator>
    );
};

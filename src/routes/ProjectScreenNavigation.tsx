import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProyectosTabScreen from "../screens/tabs/ProyectosTabScreen";
import Project from "../screens/project/Project";

const Stack = createStackNavigator();

export const ProjectScreenNavigation = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Projects" component={ProyectosTabScreen} />
            <Stack.Screen name="Project" component={Project} />
        </Stack.Navigator>
    );
};

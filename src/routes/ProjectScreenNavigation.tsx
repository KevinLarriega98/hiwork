import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProyectosTabScreen from "../screens/tabs/ProyectosTabScreen";
import Project from "../screens/project/Project";
import withSafeArea from "../util/withSafeArea";
import { ProjectState } from "../types/project";

const Stack = createStackNavigator();

const ProyectosTabScreenWithSafeArea = withSafeArea(ProyectosTabScreen);

export const ProjectScreenNavigation = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Projects"
                component={ProyectosTabScreenWithSafeArea}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="Project"
                component={Project}
                // se tiene que poner bien el tipo de la ruta
                options={({ route }: { route: any }) => ({
                    title:
                        route.params?.project.title || "Detalles del Proyecto",
                })}
            />
        </Stack.Navigator>
    );
};

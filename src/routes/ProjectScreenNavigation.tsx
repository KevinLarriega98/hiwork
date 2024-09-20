import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProyectosTabScreen from "../screens/tabs/ProyectosTabScreen";
import Project from "../screens/project/Project";
import withSafeArea from "../util/withSafeArea";
import ApplicatorProfile from "../screens/project/ApplicatorProfile";
import CreateNewProject from "../screens/project/CreateNewProject";

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
                options={({ route }: { route: any }) => ({
                    title:
                        route.params?.project.title || "Detalles del Proyecto",
                })}
            />
            <Stack.Screen
                name="ApplicatorProfile"
                component={ApplicatorProfile}
                options={({ route }: { route: any }) => ({
                    title:
                        "Applicator " + route.params?.item.volunteerName ||
                        "Detalles del applicator",
                })}
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

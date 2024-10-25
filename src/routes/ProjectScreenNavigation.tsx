import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Project from "../screens/project/Project";
import ApplicatorProfile from "../screens/project/ApplicatorProfile";
import ProyectosTabScreen from "../screens/tabs/ProyectosTabScreen";
import ProyectosONGTabScreen from "../screens/tabs/ProyectosONGTabScreen";
import useAuthStore from "../stores/useAuthStore";

const Stack = createStackNavigator();

const ProjectScreenNavigation = () => {
    const { currentUser } = useAuthStore();

    return (
        <Stack.Navigator>
            {currentUser?.profileType === "ONG" ? (
                <Stack.Screen
                    name="ONGHome"
                    component={ProyectosONGTabScreen}
                    options={{
                        headerShown: false,
                    }}
                />
            ) : (
                <Stack.Screen
                    name="HomeTab"
                    component={ProyectosTabScreen}
                    options={{
                        headerShown: false,
                    }}
                />
            )}

            <Stack.Screen
                name="Project"
                component={Project}
                options={({ route }: { route: any }) => ({
                    headerTitleAlign: "center",
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
        </Stack.Navigator>
    );
};

export default ProjectScreenNavigation;

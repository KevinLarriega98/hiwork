import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Project from "../screens/project/Project";
import ApplicatorProfile from "../screens/project/ApplicatorProfile";
import HomeTabScreen from "../screens/tabs/HomeTabScreen";

const Stack = createStackNavigator();

const HomeScreenNavigation = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="HomeTab"
                component={HomeTabScreen}
                options={{
                    headerShown: false,
                }}
            />
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

export default HomeScreenNavigation;

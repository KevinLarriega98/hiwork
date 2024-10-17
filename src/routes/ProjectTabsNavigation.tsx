import React, { useState } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ProjectInfoScreen from "../screens/project/tabs/ProjectInfoScreen";
import CalendarScreen from "../screens/project/tabs/CalendarScreen";
import CompletedTasksScreen from "../screens/project/tabs/CompletedTasksScreen";
import CustomTabBar from "../components/createProjectONG/CustomTabBar";
import { ProjectState } from "../types/project";
import { View } from "react-native";
import useAuthStore from "../stores/useAuthStore";
import ApplicatorsTab from "../screens/project/tabs/ApplicatorsTab";

const Tab = createMaterialTopTabNavigator();

const ProjectTabsNavigation = ({ project }: { project: ProjectState }) => {
    const { currentUser } = useAuthStore();

    return (
        <View style={{ flex: 1 }}>
            <Tab.Navigator
                tabBar={(props) => <CustomTabBar {...props} />}
                screenOptions={{
                    tabBarStyle: {
                        elevation: 0,
                        borderWidth: 0,
                    },
                }}
            >
                <Tab.Screen
                    name="Info"
                    component={ProjectInfoScreen}
                    initialParams={{ project }}
                    options={{
                        title: "Proyecto",
                    }}
                />
                <Tab.Screen
                    name="Calendar"
                    component={CalendarScreen}
                    initialParams={{ project }}
                    options={{ title: "Calendario" }}
                />
                <Tab.Screen
                    name="Completed"
                    component={CompletedTasksScreen}
                    initialParams={{ project }}
                    options={{ title: "Hecho" }}
                />
                {currentUser?.id === project.ongID && (
                    <Tab.Screen
                        name="Applicators"
                        component={ApplicatorsTab}
                        initialParams={{ project }}
                        options={{ title: "Applicators" }}
                    />
                )}
            </Tab.Navigator>
        </View>
    );
};

export default ProjectTabsNavigation;

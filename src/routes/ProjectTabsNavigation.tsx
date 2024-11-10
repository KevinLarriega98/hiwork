import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ProjectInfoScreen from "../screens/project/tabs/ProjectInfoScreen";
import CalendarScreen from "../screens/project/tabs/CalendarScreen";
import CompletedTasksScreen from "../screens/project/tabs/CompletedTasksScreen";
import CustomTabBar from "../components/createProjectONG/CustomTabBar";
import { View } from "react-native";
import useAuthStore from "../stores/useAuthStore";
import ApplicatorsTab from "../screens/project/tabs/ApplicatorsTab";
import { Project } from "../types/Project";

const Tab = createMaterialTopTabNavigator();

const ProjectTabsNavigation = ({ project }: { project: Project }) => {
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
                    lazy: true,
                }}
            >
                <Tab.Screen
                    name="Info"
                    component={ProjectInfoScreen}
                    initialParams={{ project }}
                    options={{
                        title: "Descripción",
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
                {currentUser?.uid === project.ongID && (
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

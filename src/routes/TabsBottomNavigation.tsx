import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import HomeTabScreen from "../screens/tabs/HomeTabScreen";
import BusquedaTabScreen from "../screens/tabs/BusquedaTabScreen";
import ChatTabScreen from "../screens/tabs/ChatTabScreen";
import PerfilTabScreen from "../screens/tabs/PerfilTabScreen";
import withSafeArea from "../util/withSafeArea";
import { ProjectScreenNavigation } from "./ProjectScreenNavigation";

const Tab = createMaterialBottomTabNavigator();

export const TabsBottomNavigation = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Home"
                component={withSafeArea(HomeTabScreen)}
                options={{
                    tabBarLabel: "Home",
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons
                            name="home"
                            color={color}
                            size={26}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Búsqueda"
                component={withSafeArea(BusquedaTabScreen)}
                options={{
                    tabBarLabel: "Búsqueda",
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons
                            name="magnify"
                            color={color}
                            size={26}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Mis Proyectos"
                component={ProjectScreenNavigation}
                options={{
                    tabBarLabel: "Proyectos",
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons
                            name="rabbit"
                            color={color}
                            size={26}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Chat"
                component={withSafeArea(ChatTabScreen)}
                options={{
                    tabBarLabel: "Chat",
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons
                            name="chat"
                            color={color}
                            size={26}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Perfil"
                component={withSafeArea(PerfilTabScreen)}
                options={{
                    tabBarLabel: "Perfil",
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons
                            name="account"
                            color={color}
                            size={26}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

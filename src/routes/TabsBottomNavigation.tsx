import React from "react";
import { Text, View } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import HomeTabScreen from "../screens/tabs/HomeTabScreen";
import BusquedaTabScreen from "../screens/tabs/BusquedaTabScreen";
import ProyectosTabScreen from "../screens/tabs/ProyectosTabScreen";
import ChatTabScreen from "../screens/tabs/ChatTabScreen";
import PerfilTabScreen from "../screens/tabs/PerfilTabScreen";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import withSafeArea from "../util/withSafeArea";

const Tab = createMaterialBottomTabNavigator();

export const TabsBottomNavigation = () => {
    const insets = useSafeAreaInsets();
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
                component={withSafeArea(ProyectosTabScreen)}
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

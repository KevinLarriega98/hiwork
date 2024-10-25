import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import BusquedaTabScreen from "../screens/tabs/BusquedaTabScreen";
import ChatTabScreen from "../screens/tabs/ChatTabScreen";
import PerfilTabScreen from "../screens/tabs/PerfilTabScreen";
import usePruebaHideStore from "../stores/pruebaHide";
import ProyectosTabScreen from "../screens/tabs/ProyectosTabScreen";
import CenterIcon from "../screens/tabs/components/Icons/CenterIcons/CenterIcon";
import CenterIconFocused from "../screens/tabs/components/Icons/CenterIcons/CenterIconFocused";
import HomeIcon from "../screens/tabs/components/Icons/CenterIcons/HomeIcon";
import HomeIconFocused from "../screens/tabs/components/Icons/CenterIcons/HomeIconFocused";
import ChatIconFocused from "../screens/tabs/components/Icons/ChatIcons/ChatIconFocused";
import ChatIcon from "../screens/tabs/components/Icons/ChatIcons/ChatIcon";
import ChatIconFocusedNotification from "../screens/tabs/components/Icons/ChatIcons/ChatIconFocusedNotification";
import ChatIconNotification from "../screens/tabs/components/Icons/ChatIcons/ChatIconNotification";
import ProfileIconFocused from "../screens/tabs/components/Icons/Profile/ProfileIconFocused";
import ProfileIcon from "../screens/tabs/components/Icons/Profile/ProfileIcon";
import SearchIcon from "../screens/tabs/components/Icons/Search/SearchIcon";
import SearchIconFocused from "../screens/tabs/components/Icons/Search/SearchIconFocused";
import { useTheme } from "react-native-paper";
import ProjectScreenNavigation from "./ProjectScreenNavigation";
import HomeScreenNavigation from "./HomeScreenNavigation";
import ChatScreenNavigation from "./ChatScreenNavigation";

const Tab = createMaterialBottomTabNavigator();

export const TabsBottomNavigation = () => {
    const { hide } = usePruebaHideStore();

    const notification = false;

    const theme = useTheme();

    theme.colors.secondaryContainer = "transparent";

    return (
        <Tab.Navigator
            labeled={false}
            barStyle={{
                display: hide ? "none" : "flex",
                backgroundColor: "rgb(255, 255, 255)",
                height: 75,
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreenNavigation}
                options={{
                    tabBarLabel: "Home",
                    tabBarIcon: ({ focused }) =>
                        focused ? <HomeIconFocused /> : <HomeIcon />,
                }}
            />
            <Tab.Screen
                name="Búsqueda"
                component={BusquedaTabScreen}
                options={{
                    tabBarLabel: "Búsqueda",
                    tabBarIcon: ({ focused }) =>
                        focused ? <SearchIconFocused /> : <SearchIcon />,
                }}
            />
            <Tab.Screen
                name="Proyectos"
                component={ProjectScreenNavigation}
                options={{
                    tabBarLabel: "Proyectos",
                    tabBarIcon: ({ focused }) =>
                        focused ? <CenterIconFocused /> : <CenterIcon />,
                }}
            />
            <Tab.Screen
                name="Chat"
                component={ChatScreenNavigation}
                options={{
                    tabBarLabel: "Chat",
                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            notification ? (
                                <ChatIconFocusedNotification />
                            ) : (
                                <ChatIconFocused />
                            )
                        ) : notification ? (
                            <ChatIconNotification />
                        ) : (
                            <ChatIcon />
                        ),
                }}
            />
            <Tab.Screen
                name="Perfil"
                component={PerfilTabScreen}
                options={{
                    tabBarLabel: "Perfil",
                    tabBarIcon: ({ focused }) =>
                        focused ? <ProfileIconFocused /> : <ProfileIcon />,
                }}
            />
        </Tab.Navigator>
    );
};

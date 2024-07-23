import React from "react";
import { Text, View } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import HomeTabScreen from "../screens/tabs/HomeTabScreen";
import BusquedaTabScreen from "../screens/tabs/BusquedaTabScreen";
import ProyectosTabScreen from "../screens/tabs/ProyectosTabScreen";
import ChatTabScreen from "../screens/tabs/ChatTabScreen";
import PerfilTabScreen from "../screens/tabs/PerfilTabScreen";

const Tab = createMaterialBottomTabNavigator();

export const TabsBottomNavigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeTabScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Búsqueda"
        component={BusquedaTabScreen}
        options={{
          tabBarLabel: "Búsqueda",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="search-web" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Mis Proyectos"
        component={ProyectosTabScreen}
        options={{
          tabBarLabel: "Proyectos",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="rabbit" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatTabScreen}
        options={{
          tabBarLabel: "Chat",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="chat" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={PerfilTabScreen}
        options={{
          tabBarLabel: "Perfil",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

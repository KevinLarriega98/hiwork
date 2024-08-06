import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { OngRegisterScreen, UserRegisterScreen } from "../screens/profile";

const Tab = createMaterialTopTabNavigator();

export const RegisterTopNavigation = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Volunter" component={UserRegisterScreen} />
            <Tab.Screen name="ONG" component={OngRegisterScreen} />
        </Tab.Navigator>
    );
};

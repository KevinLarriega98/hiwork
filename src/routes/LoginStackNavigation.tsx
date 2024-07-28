import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import HomeScreen from "../screens/signIn-LogIn/HomeScreen";
import LoginScreen from "../screens/signIn-LogIn/LoginScreen";
import RegisterScreen from "../screens/signIn-LogIn/RegisterScreen";
import withSafeArea from "../util/withSafeArea";
import { TabsBottomNavigation } from "./TabsBottomNavigation";
import RegisterUserScreens from "../screens/signIn-LogIn/RegisterUserScreens";

export type RootStackParamList = {
    Home: undefined;
    Login: undefined;
    Register: undefined;
    TabsBottom: undefined;
    RegisterUserScreens: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const LoginStackNavigation = () => {
    return (
        <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerShown: false,
            }}
        >
            {/* <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen
                name="RegisterScreen"
                component={RegisterTopNavigation}
            />
            <Stack.Screen name="TabsScreen" component={TabsBottomNavigation} /> */}
            <Stack.Screen name="Home" component={withSafeArea(HomeScreen)} />
            <Stack.Screen name="Login" component={withSafeArea(LoginScreen)} />
            <Stack.Screen
                name="Register"
                component={withSafeArea(RegisterScreen)}
            />
            <Stack.Screen
                name="RegisterUserScreens"
                component={withSafeArea(RegisterUserScreens)}
            />
            <Stack.Screen name="TabsBottom" component={TabsBottomNavigation} />
        </Stack.Navigator>
    );
};

export default LoginStackNavigation;

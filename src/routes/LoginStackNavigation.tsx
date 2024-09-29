import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import HomeScreen from "../screens/signIn-LogIn/HomeScreen";
import LoginScreen from "../screens/signIn-LogIn/LoginScreen";
import RegisterScreen from "../screens/signIn-LogIn/RegisterScreen";
import withSafeArea from "../util/withSafeArea";
import RegisterUserScreens from "../screens/signIn-LogIn/RegisterUserScreens";
import RegisterTypeUser from "../screens/signIn-LogIn/RegisterTypeUser";
import useAuthStore from "../stores/useAuthStore";
import { RootStackParamList } from "../types/navigation";
import WelcomeScreen from "../screens/welcome/WelcomeScreen";

// Apply withSafeArea outside of the function
const SafeHomeScreen = withSafeArea(HomeScreen);
const SafeLoginScreen = withSafeArea(LoginScreen);
const SafeRegisterScreen = withSafeArea(RegisterScreen);
const SafeRegisterTypeUser = withSafeArea(RegisterTypeUser);
const SafeRegisterUserScreens = withSafeArea(RegisterUserScreens);

const Stack = createStackNavigator<RootStackParamList>();

const LoginStackNavigation = () => {
    const { isAuthenticated, initializeAuth } = useAuthStore((state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        initializeAuth: state.initializeAuth,
    }));
    const [initialRoute, setInitialRoute] =
        useState<keyof RootStackParamList>("Welcome");

    useEffect(() => {
        initializeAuth();
    }, [initializeAuth]);

    useEffect(() => {
        if (isAuthenticated) {
            setInitialRoute(initialRoute);
        } else {
            setInitialRoute("Welcome");
        }
    }, [isAuthenticated]);

    return (
        <Stack.Navigator
            initialRouteName={"TabsBottom"}
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Home" component={SafeHomeScreen} />
            <Stack.Screen name="Login" component={SafeLoginScreen} />
            <Stack.Screen name="Register" component={SafeRegisterScreen} />
            <Stack.Screen
                name="RegisterTypeUser"
                component={SafeRegisterTypeUser}
            />
            <Stack.Screen
                name="RegisterUserScreens"
                component={SafeRegisterUserScreens}
            />
        </Stack.Navigator>
    );
};

export default LoginStackNavigation;

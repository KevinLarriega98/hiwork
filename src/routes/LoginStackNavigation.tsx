import { createStackNavigator } from "@react-navigation/stack";
import React, { lazy, useEffect, useState } from "react";
import HomeScreen from "../screens/signIn-LogIn/HomeScreen";
import LoginScreen from "../screens/signIn-LogIn/LoginScreen";
import RegisterScreen from "../screens/signIn-LogIn/RegisterScreen";
import withSafeArea from "../util/withSafeArea";
import { TabsBottomNavigation } from "./TabsBottomNavigation";
import RegisterUserScreens from "../screens/signIn-LogIn/RegisterUserScreens";
import RegisterTypeUser from "../screens/signIn-LogIn/RegisterTypeUser";
import useAuthStore from "../context/useAuthStore";
import { TextingScreen } from "../screens/tabs/chat/TextingScreen";

export type RootStackParamList = {
    Home: undefined;
    Login: undefined;
    Register: undefined;
    RegisterUserScreens: { profileType: "Voluntario" | "ONG" };
    RegisterTypeUser: undefined;
    TabsBottom: undefined;
    TextingScreen: {profileType: string | null, chatId?: string, reciveData: Record<string, string> | null}
};

const Stack = createStackNavigator<RootStackParamList>();

const LoginStackNavigation = () => {
    const { isAuthenticated, initializeAuth } = useAuthStore((state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        initializeAuth: state.initializeAuth,
    }));
    const [initialRoute, setInitialRoute] =
        useState<keyof RootStackParamList>("Home");

    //esto es un bucle, si el useEffect se dispara por el cambio de la funccion que se ejecuta dentro, entonces lo hara constante
    useEffect(() => {
        initializeAuth();
    }, [/** initializeAuth **/]);

    useEffect(() => {
        if (isAuthenticated) {
            setInitialRoute("TabsBottom");
        } else {
            setInitialRoute("Home");
        }
    }, [isAuthenticated]);

    return (
        <Stack.Navigator
            initialRouteName={initialRoute}
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="Home" component={withSafeArea(HomeScreen)} />
            <Stack.Screen name="Login" component={withSafeArea(LoginScreen)} />
            <Stack.Screen
                name="Register"
                component={withSafeArea(RegisterScreen)}
            />
            <Stack.Screen
                name="RegisterTypeUser"
                component={withSafeArea(RegisterTypeUser)}
            />  
            <Stack.Screen
                name="RegisterUserScreens"
                component={withSafeArea(RegisterUserScreens)}
            />
            {isAuthenticated && (
                <Stack.Screen
                    name="TabsBottom"
                    component={TabsBottomNavigation}
                />
            )}
            <Stack.Screen
                name="TextingScreen"
                component={withSafeArea(TextingScreen)}
            />
        </Stack.Navigator>
    );
};

export default LoginStackNavigation;

import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import HomeScreen from "../screens/signIn-LogIn/HomeScreen";
import LoginScreen from "../screens/signIn-LogIn/LoginScreen";
import RegisterScreen from "../screens/signIn-LogIn/RegisterScreen";
import withSafeArea from "../util/withSafeArea";
import { TabsBottomNavigation } from "./TabsBottomNavigation";
import RegisterUserScreens from "../screens/signIn-LogIn/RegisterUserScreens";
import RegisterTypeUser from "../screens/signIn-LogIn/RegisterTypeUser";
import useAuthStore from "../context/useAuthStore";
import { ProjectState } from "../types/project";
import Project from "../screens/project/Project";

export type RootStackParamList = {
    Home: undefined;
    Login: undefined;
    Register: undefined;
    RegisterUserScreens: { profileType: "Voluntario" | "ONG" };
    RegisterTypeUser: undefined;
    TabsBottom: undefined;
    Project: { project: ProjectState };
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

    useEffect(() => {
        initializeAuth();
    }, [initializeAuth]);

    useEffect(() => {
        if (isAuthenticated) {
            setInitialRoute(initialRoute);
        } else {
            setInitialRoute("Home");
        }
    }, [isAuthenticated]);

    return (
        <Stack.Navigator
            initialRouteName={"TabsBottom"}
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
            <Stack.Screen
                name="Project"
                component={Project}
                options={({ route }) => ({
                    title: route.params?.project?.title || "Project Details",
                    headerShown: true,
                })}
            />
            <Stack.Screen name="TabsBottom" component={TabsBottomNavigation} />
            {/* {isAuthenticated && (
                
            )} */}
        </Stack.Navigator>
    );
};

export default LoginStackNavigation;

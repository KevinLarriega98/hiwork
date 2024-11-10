import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import HomeScreen from "../screens/signIn-LogIn/HomeScreen";
import LoginScreen from "../screens/signIn-LogIn/LoginScreen";
import RegisterScreen from "../screens/signIn-LogIn/RegisterScreen";
import withSafeArea from "../util/withSafeArea";
import RegisterUserScreens from "../screens/signIn-LogIn/RegisterUserScreens";
import RegisterTypeUser from "../screens/signIn-LogIn/RegisterTypeUser";
import WelcomeScreen from "../screens/welcome/WelcomeScreen";
import { RootStackParamList } from "../types/Navigation";

const SafeHomeScreen = withSafeArea(HomeScreen);
const SafeLoginScreen = withSafeArea(LoginScreen);
const SafeRegisterScreen = withSafeArea(RegisterScreen);
const SafeRegisterTypeUser = withSafeArea(RegisterTypeUser);
const SafeRegisterUserScreens = withSafeArea(RegisterUserScreens);

const Stack = createStackNavigator<RootStackParamList>();

const LoginStackNavigation = () => {
    return (
        <Stack.Navigator
            initialRouteName={"Welcome"}
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

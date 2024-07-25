import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import HomeScreen from "../screens/signIn-LogIn/HomeScreen";
import LoginScreen from "../screens/signIn-LogIn/LoginScreen";
import RegisterScreen from "../screens/signIn-LogIn/RegisterScreen";
import withSafeArea from "../util/withSafeArea";
import RegisterNameScreen from "../screens/signIn-LogIn/RegisterNameScreen";
import RegisterProfileTypeScreen from "../screens/signIn-LogIn/RegisterProfileTypeScreen";
import RegisterExpertiseScreen from "../screens/signIn-LogIn/RegisterExpertiseScreen";

export type RootStackParamList = {
    Home: undefined;
    Login: undefined;
    Register: undefined;
    RegisterName: undefined;
    RegisterProfileType: undefined;
    RegisterExpertise: undefined;
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
            <Stack.Screen name="RegisterName" component={RegisterNameScreen} />
            <Stack.Screen
                name="RegisterProfileType"
                component={RegisterProfileTypeScreen}
            />
            <Stack.Screen
                name="RegisterExpertise"
                component={RegisterExpertiseScreen}
            />
            <Stack.Screen
                name="Register"
                component={withSafeArea(RegisterScreen)}
            />
        </Stack.Navigator>
    );
};

export default LoginStackNavigation;

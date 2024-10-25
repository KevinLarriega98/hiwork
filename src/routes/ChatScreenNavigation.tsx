import React from "react";
import ChatTabScreen from "../screens/tabs/ChatTabScreen";
import { createStackNavigator } from "@react-navigation/stack";
import ChatScreen from "../screens/tabs/ChatScreen";

const Stack = createStackNavigator();

export default function ChatScreenNavigation() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="ChatList"
                component={ChatTabScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="ChatScreen"
                component={ChatScreen}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    );
}

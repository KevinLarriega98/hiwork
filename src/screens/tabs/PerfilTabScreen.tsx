import { View, Text, Button, ScrollView } from "react-native";
import React from "react";
import useAuthStore from "../../context/useAuthStore";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../routes/LoginStackNavigation";

type HomeScreenNavigationProp = NavigationProp<RootStackParamList, "Home">;

const PerfilTabScreen = () => {
    const { user } = useAuthStore();
    const logOut = useAuthStore((state) => state.logout);

    const navigation = useNavigation<HomeScreenNavigationProp>();

    const navigateToHome = () => {
        navigation.navigate("Home");
    };

    return (
        <ScrollView className="flex-1 bg-white">
            <Text>Perfil</Text>
            <Text>{user && user.uid}</Text>
            <Text>{JSON.stringify(user)}</Text>
            <Button title="LogOut" onPress={() => logOut(navigateToHome)} />
        </ScrollView>
    );
};

export default PerfilTabScreen;

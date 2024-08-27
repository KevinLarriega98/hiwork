import { View, Text, Button, ScrollView } from "react-native";
import React from "react";
import useAuthStore from "../../context/useAuthStore";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../routes/LoginStackNavigation";
import BellComponent from "../../components/Projects/BellComponent";

type HomeScreenNavigationProp = NavigationProp<RootStackParamList, "Home">;

const PerfilTabScreen = () => {
    const { user, currentUser } = useAuthStore();
    const logOut = useAuthStore((state) => state.logout);

    const navigation = useNavigation<HomeScreenNavigationProp>();

    const navigateToHome = () => {
        navigation.navigate("Home");
    };
    console.log(user)

    return (
        <ScrollView className="flex-1 bg-white">
            <BellComponent />
            <View className="px-4 flex-1">
                <Text className="text-xl font-bold mb-4 text-center">
                    {currentUser?.name}
                </Text>

                <Text>{user && user.uid}</Text>
                <Text>{JSON.stringify(user)}</Text>
                <Button title="LogOut" onPress={() => logOut(navigateToHome)} />
            </View>
        </ScrollView>
    );
};

export default PerfilTabScreen;

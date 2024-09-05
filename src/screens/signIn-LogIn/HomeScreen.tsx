import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../routes/LoginStackNavigation";
import { logout } from "../../service/api/authService";

type HomeScreenNavigationProp = NavigationProp<RootStackParamList, "Home">;

const HomeScreen: React.FC = () => {
    const navigation = useNavigation<HomeScreenNavigationProp>();

    return (
        <View className="flex-1 justify-center items-center bg-white px-6">
            <Text className=" text-3xl font-bold mb-4 text-center">
                Encuentra tu oportunidad de voluntariado perfecta.
            </Text>
            <Text className="text-center mb-8 text-base p-1">
                Descubre todos los roles de voluntariado existentes según tus
                intereses y tu especialidad de estudio.
            </Text>
            <View className="flex-row gap-2">
                <TouchableOpacity
                    className="bg-gray-700 py-2 px-4 rounded mr-2"
                    onPress={() => navigation.navigate("Login")}
                >
                    <Text className="text-white">Iniciar sesión</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className="border border-gray-700 py-2 px-4 rounded"
                    onPress={() => navigation.navigate("Register")}
                >
                    <Text className="text-gray-700">Registrarse</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default HomeScreen;

import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { RootStackParamList } from "../../routes/LoginStackNavigation";

type RegisterScreenNavigationProp = NavigationProp<
    RootStackParamList,
    "Register"
>;

const RegisterScreen: React.FC = () => {
    const navigation = useNavigation<RegisterScreenNavigationProp>();

    return (
        <View className="flex-1 justify-center items-center bg-white px-6">
            <Text className="text-2xl font-bold mb-2">Crea tu cuenta</Text>
            <Text className="text-base text-gray-600 mb-6">
                Crea una cuenta para que puedas explorar todos los proyectos
                existentes
            </Text>
            <TextInput
                className="w-full border border-gray-300 rounded p-2 mb-4 focus:border-gray-700"
                placeholder="Correo electrónico"
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                className="w-full border border-gray-300 rounded p-2 mb-4 focus:border-gray-700"
                placeholder="Contraseña"
                secureTextEntry
                autoCapitalize="none"
            />
            <TextInput
                className="w-full border border-gray-300 rounded p-2 mb-6 focus:border-gray-700"
                placeholder="Confirmar contraseña"
                secureTextEntry
                autoCapitalize="none"
            />
            <TouchableOpacity
                className="bg-gray-700 w-full py-3 rounded mb-6"
                onPress={() => navigation.navigate("RegisterName")}
            >
                <Text className="text-center text-white font-bold">
                    Registrarse
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text className="text-center text-gray-700 mb-6">
                    Ya tengo una cuenta
                </Text>
            </TouchableOpacity>
            <Text className="text-gray-600 mb-6">O continuar con</Text>
            <View className="flex-row justify-center space-x-4">
                <TouchableOpacity className="bg-gray-200 p-3 rounded-full">
                    <FontAwesome name="google" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity className="bg-gray-200 p-3 rounded-full">
                    <FontAwesome name="facebook" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity className="bg-gray-200 p-3 rounded-full">
                    <FontAwesome name="apple" size={24} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default RegisterScreen;

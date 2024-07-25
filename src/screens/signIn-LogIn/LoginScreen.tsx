import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../routes/LoginStackNavigation";
import { FontAwesome } from "@expo/vector-icons";

type LoginScreenNavigationProp = NavigationProp<RootStackParamList, "Login">;

const LoginScreen: React.FC = () => {
    const navigation = useNavigation<LoginScreenNavigationProp>();

    return (
        <View className="flex-1 justify-center items-center bg-white px-6">
            <Text className="text-2xl font-bold mb-2">Inicia sesión</Text>
            <Text className="text-base text-gray-600 mb-6">
                ¡Bienvenido de vuelta, te hemos extrañado!
            </Text>

            <TextInput
                className="w-full border border-gray-300 rounded p-2 mb-4 focus:border-gray-700"
                placeholder="Correo electrónico"
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                className="w-full border border-gray-300 rounded p-2 mb-2 focus:border-gray-700"
                placeholder="Contraseña"
                secureTextEntry
                autoCapitalize="none"
            />

            <TouchableOpacity>
                <Text className="text-sm text-gray-600 mb-6">
                    ¿Olvidaste tu contraseña?
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                className="bg-gray-700 w-full py-3 rounded mb-6"
                onPress={() => {
                    /* Handle login action */
                }}
            >
                <Text className="text-center text-white font-bold">
                    Iniciar sesión
                </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                <Text className="text-center text-gray-700 mb-6">
                    No tengo cuenta
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

export default LoginScreen;

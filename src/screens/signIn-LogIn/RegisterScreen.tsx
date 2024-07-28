import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../routes/LoginStackNavigation";
import { FontAwesome } from "@expo/vector-icons";

type LoginScreenNavigationProp = NavigationProp<RootStackParamList, "Login">;

const LoginScreen: React.FC = () => {
    const navigation = useNavigation<LoginScreenNavigationProp>();

    return (
        <View className="flex-1 bg-white justify-between px-6 py-11">
            <View className=" justify-center items-center">
                <Text className="text-2xl font-bold mb-4">Crea tu cuenta</Text>
                <Text className="text-base text-gray-600 text-center">
                    Crea una cuenta para que puedas explorar todos los proyectos
                    existentes
                </Text>
            </View>

            <View className="justify-center items-center flex-col">
                <TextInput
                    className="w-full border border-gray-300 rounded p-2 focus:border-gray-700 mb-7"
                    placeholder="Correo electrónico"
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                <TextInput
                    className="w-full border border-gray-300 rounded p-2 focus:border-gray-700 mb-7"
                    placeholder="Contraseña"
                    secureTextEntry
                    autoCapitalize="none"
                />
                <TextInput
                    className="w-full border border-gray-300 rounded p-2 focus:border-gray-700  mb-8"
                    placeholder="Confirmar contraseña"
                    secureTextEntry
                    autoCapitalize="none"
                />

                <TouchableOpacity
                    className="bg-[#666666] w-full py-3 rounded mb-4"
                    onPress={() => {
                        /* Handle login action */
                        navigation.navigate("RegisterUserScreens");
                    }}
                >
                    <Text className="text-center text-white font-bold">
                        Registrarse
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                    <Text className="text-center text-gray-700 font-bold">
                        Ya tengo cuenta
                    </Text>
                </TouchableOpacity>
            </View>

            <View className="justify-center items-center">
                <Text className="text-gray-600 mb-4">O continuar con</Text>
                <View className="flex-row justify-center space-x-4">
                    <TouchableOpacity className="bg-gray-200 p-3 rounded-[10px]">
                        <FontAwesome name="google" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity className="bg-gray-200 p-3 rounded-[10px]">
                        <FontAwesome name="facebook" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity className="bg-gray-200 p-3 rounded-[10px]">
                        <FontAwesome name="apple" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default LoginScreen;

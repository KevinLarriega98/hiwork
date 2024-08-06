import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../routes/LoginStackNavigation";
import { FontAwesome } from "@expo/vector-icons";
import useUserStore from "../../context/useRegisterStore";

type RegisterScreenNavigationProp = NavigationProp<
    RootStackParamList,
    "Register"
>;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const RegisterScreen: React.FC = () => {
    const navigation = useNavigation<RegisterScreenNavigationProp>();
    const { setEmail, setPassword } = useUserStore();

    const [email, setEmailState] = useState("");
    const [password, setPasswordState] = useState("");
    const [confirmPassword, setConfirmPasswordState] = useState("");
    const [error, setError] = useState<string | null>(null);

    const handleRegister = () => {
        let errorMsg = "";

        if (!emailRegex.test(email)) {
            errorMsg = "El correo electrónico no es válido";
        } else if (password.trim() === "" || confirmPassword.trim() === "") {
            errorMsg = "Las contraseñas no pueden estar vacías";
        } else if (password.length < 6) {
            errorMsg = "La contraseña debe tener al menos 6 caracteres";
        } else if (password !== confirmPassword) {
            errorMsg = "Las contraseñas no coinciden";
        }

        if (errorMsg) {
            setError(errorMsg);
            setTimeout(() => {
                setError(null);
            }, 3000);
        } else {
            setEmail(email);
            setPassword(password);
            navigation.navigate("RegisterTypeUser");
        }
    };

    return (
        <View className="flex-1 bg-white justify-between px-6 py-11">
            <View className="justify-center items-center">
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
                    onChangeText={setEmailState}
                />

                <TextInput
                    className="w-full border border-gray-300 rounded p-2 focus:border-gray-700 mb-7"
                    placeholder="Contraseña"
                    secureTextEntry
                    autoCapitalize="none"
                    onChangeText={setPasswordState}
                />
                <TextInput
                    className="w-full border border-gray-300 rounded p-2 focus:border-gray-700 mb-3"
                    placeholder="Confirmar contraseña"
                    secureTextEntry
                    autoCapitalize="none"
                    onChangeText={setConfirmPasswordState}
                />

                <Text
                    className={`text-red-500 text-sm text-left w-full mb-1 ${
                        error && "invisible"
                    }`}
                >
                    {error}
                </Text>

                <TouchableOpacity
                    className="bg-[#666666] w-full py-3 rounded mb-4"
                    onPress={handleRegister}
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

export default RegisterScreen;

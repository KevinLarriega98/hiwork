import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
} from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../routes/LoginStackNavigation";
import { FontAwesome } from "@expo/vector-icons";
import useAuthStore from "../../stores/useAuthStore";
import { sendPasswordResetEmailAuth } from "../../service/api/authService";

type LoginScreenNavigationProp = NavigationProp<RootStackParamList, "Login">;

const LoginScreen: React.FC = () => {
    const login = useAuthStore((state) => state.login);
    const navigation = useNavigation<LoginScreenNavigationProp>();

    const [user, setUser] = useState({ email: "", password: "" });
    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        setLoading(true);
        const savedUser = await login(user.email, user.password);
        if (!savedUser) {
            setError("Usuario o contraseña incorrectos");
            Alert.alert("Error", "Usuario o contraseña incorrectos");
        }
        setLoading(false);

        setTimeout(() => {
            setError("");
        }, 3000);
    };

    const handleResetPassword = async () => {
        try {
            const email = user.email;
            sendPasswordResetEmailAuth(email);
            Alert.alert(
                "Email enviado",
                "Se ha enviado un email para resetear la contraseña"
            );
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View className="flex-1 bg-white justify-between px-6 py-11">
            <View className=" justify-center items-center">
                <Text className="text-2xl font-bold mb-4">Inicia sesión</Text>
                <Text className="text-base text-gray-600 text-center">
                    ¡Bienvenido de vuelta, te hemos extrañado!
                </Text>
            </View>

            <View className="justify-center items-center flex-col">
                <TextInput
                    className="w-full border border-gray-300 rounded p-2 focus:border-gray-700 mb-7"
                    placeholder="Correo electrónico"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    onChange={(e) =>
                        setUser({ ...user, email: e.nativeEvent.text })
                    }
                />

                <TextInput
                    className="w-full border border-gray-300 rounded p-2 focus:border-gray-700 mb-1"
                    placeholder="Contraseña"
                    secureTextEntry
                    autoCapitalize="none"
                    onChange={(e) =>
                        setUser({ ...user, password: e.nativeEvent.text })
                    }
                />

                <TouchableOpacity
                    className="w-full mb-8"
                    onPress={() => handleResetPassword()}
                >
                    <Text className="text-sm text-[#000]">
                        ¿Olvidaste tu contraseña?
                    </Text>
                </TouchableOpacity>
                {error && <Text className="text-red-500 text-sm">{error}</Text>}
                <TouchableOpacity
                    className="bg-[#666666] w-full py-3 rounded mb-4"
                    onPress={() => {
                        handleLogin();
                    }}
                >
                    <Text className="text-center text-white font-bold">
                        Iniciar sesión
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.navigate("Register")}
                >
                    <Text className="text-center text-gray-700 font-bold">
                        No tengo cuenta
                    </Text>
                </TouchableOpacity>
            </View>

            {loading && (
                <ActivityIndicator
                    size="large"
                    color="#666"
                    className=" absolute top-[40%] left-1/2"
                />
            )}

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

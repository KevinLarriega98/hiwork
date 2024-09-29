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
import { FontAwesome } from "@expo/vector-icons";
import useAuthStore from "../../stores/useAuthStore";
import { sendPasswordResetEmailAuth } from "../../service/api/authService";
import { RootStackParamList } from "../../types/navigation";
import ButtonCustom from "../../components/buttons/ButtonCustom";

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
                <Text className="text-lg text-gray_2 text-center">
                    Conecta con nuestra comunidad
                </Text>
            </View>

            <View className="justify-center items-center flex-col">
                <TextInput
                    className="w-full border border-gray-300 rounded-md p-2 focus:border-gray-700 mb-5"
                    placeholder="Correo electrónico"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    onChange={(e) =>
                        setUser({ ...user, email: e.nativeEvent.text })
                    }
                />

                <TextInput
                    className="w-full border border-gray-300 rounded-md p-2 focus:border-gray-700 mb-1"
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
                    <Text className="text-sm text-gray_2">
                        ¿Olvidaste tu contraseña?
                    </Text>
                </TouchableOpacity>
                {error && <Text className="text-red-500 text-sm">{error}</Text>}

                <View className=" w-full flex justify-center">
                    <ButtonCustom
                        functionDirection={() => {
                            handleLogin();
                        }}
                        text="Iniciar sesión"
                        haveBackground={true}
                        customStyle="mb-4"
                    />

                    <ButtonCustom
                        functionDirection={() =>
                            navigation.navigate("Register")
                        }
                        text="No tengo cuenta"
                        haveBackground={false}
                    />
                </View>
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

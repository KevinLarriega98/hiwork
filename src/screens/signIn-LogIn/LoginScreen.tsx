import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../routes/LoginStackNavigation";
import { FontAwesome } from "@expo/vector-icons";
import useAuthStore from "../../context/useAuthStore";
import { GoogleSignin, User } from "@react-native-google-signin/google-signin";
import { LoginManager, AccessToken } from "react-native-fbsdk-next";
//import { auth } from "../../service/api/firebase";
import auth, { type FirebaseAuthTypes } from "@react-native-firebase/auth";
import { withProvider } from "../../service/api/auth/authProviders";
import { logout } from "../../service/api/authService";
import { useAuthState } from "../../context/globalAuthState";

type LoginScreenNavigationProp = NavigationProp<RootStackParamList, "Login">;

const LoginScreen: React.FC = () => {
    const login = useAuthStore((state) => state.login);
    //cambio de estado para acceder al tabsbottom
    const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);
    //-----------------------------------------------
    const {setIsRegister, isRegister, setIdToken} = useAuthState((state) => ({
            setIsRegister: state.setIsRegister, 
            isRegister: state.isRegister,
            setIdToken: state.setIdToken,
        }))

    const navigation = useNavigation<LoginScreenNavigationProp>();

    const [user, setUser] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [dataUser, setDataUser] = useState<string | null>(null)

    useEffect(() => {
        GoogleSignin.configure({
            webClientId: '645110135985-c3lnku3vs01djj28130p3chl8gv4kpft.apps.googleusercontent.com'
        })
    },[])


    const handleLogin = async (isProvider?: boolean) => {
        const savedUser = await login(user.email, user.password, isProvider);
        if (savedUser) {
            navigation.navigate("TabsBottom");
        } else {
            setError("Usuario o contraseña incorrectos");
            Alert.alert("Error", "Usuario o contraseña incorrectos");
        }

        setTimeout(() => {
            setError("");
        }, 3000);
    };

    // AÑADIR ESTAS LINEAS EN UN NUEVO DOCUMENTO


        const registrationControl = (needRegister: any) => {
            if (!needRegister) {
                    setIsRegister(false)
                    handleLogin(true)
                    navigation.navigate("TabsBottom")
                } else {
                    setIsRegister(true)
                    navigation.navigate("RegisterTypeUser")
                }
        }

         const signIn = async () => {
            try {
                await GoogleSignin.hasPlayServices()
                const {idToken} = await GoogleSignin.signIn()
                setIdToken(idToken)
                const googleCredential = auth.GoogleAuthProvider.credential(idToken)
                const userAuth = await auth().signInWithCredential(googleCredential)
                
                
                const needRegister = await withProvider(idToken)
                registrationControl(needRegister)
            } catch (e) {
                setError(e as string)
            }
        }

        const onFacebookButtonPress = async () => {
            const result = await LoginManager.logInWithPermissions(['public_profile']);

            if (result.isCancelled) {
                throw 'User cancelled the login process';
            }

            const data = await AccessToken.getCurrentAccessToken();

            if (!data) {
                throw 'Something went wrong obtaining access token';
            }
            auth.FacebookAuthProvider.credential(data.accessToken);
            const needRegister = await withProvider(data.accessToken)
            console.log(needRegister)
            registrationControl(needRegister)
        }

        // NOTA CON MAS DE UNA FORMA DE LOGEARSE ES IMPORTANTE MANEJAR EL ERROR QUE PUEDE ARROJAR SI EL USUARIO CON EL MISMO CORREO INTENTA LOGEARSE POR LOS DIFERENTES PROVIDERS este error lanza el codigo ***14*** 

        
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
                    //onChangeText captura el evento del texto, es mas eficiente
                    onChange={(e) =>
                        setUser({ ...user, email: e.nativeEvent.text })
                    }
                />

                <TextInput
                    className="w-full border border-gray-300 rounded p-2 focus:border-gray-700 mb-1"
                    placeholder="Contraseña"
                    secureTextEntry
                    autoCapitalize="none"
                    //onChangeText captura el evento del texto, es mas eficiente
                    onChange={(e) =>
                        setUser({ ...user, password: e.nativeEvent.text })
                    }
                />

                <TouchableOpacity className="w-full mb-8">
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

            <View className="justify-center items-center">
                <Text className="text-gray-600 mb-4">O continuar con</Text>
                <View className="flex-row justify-center space-x-4">
                    <TouchableOpacity 
                        className="bg-gray-200 p-3 rounded-[10px]"
                        onPress={signIn}
                    >
                        <FontAwesome name="google" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity className="bg-gray-200 p-3 rounded-[10px]"
                        onPress={onFacebookButtonPress}
                    >
                        <FontAwesome name="facebook" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity className="bg-gray-200 p-3 rounded-[10px]"
                        onPress={logout}
                    >
                        <FontAwesome name="apple" size={24} color="black" />
                    </TouchableOpacity>
                    
                </View>
            </View>
        </View>
    );
};

export default LoginScreen;

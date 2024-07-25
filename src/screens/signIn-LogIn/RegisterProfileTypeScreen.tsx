import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../routes/LoginStackNavigation";
import { MaterialIcons } from "@expo/vector-icons";
import StepIndicator from "../../components/logIn-signIn/StepIndicator";

type RegisterProfileTypeScreenNavigationProp = NavigationProp<
    RootStackParamList,
    "RegisterProfileType"
>;

const RegisterProfileTypeScreen: React.FC = () => {
    const navigation = useNavigation<RegisterProfileTypeScreenNavigationProp>();

    return (
        <View className="flex-1 justify-center items-center bg-white px-6">
            <Text className="text-2xl font-bold mb-2">Tu perfil</Text>
            <Text className="text-base text-gray-600 mb-6">
                ¡Queremos saber de ti!
            </Text>
            <Text className="text-lg mb-4">¿Qué perfil eres?</Text>
            <TouchableOpacity
                className="bg-black w-full py-3 rounded mb-4"
                onPress={() => {
                    /* Handle Voluntariado selection */
                }}
            >
                <Text className="text-center text-white font-bold">
                    Voluntariado
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                className="bg-black w-full py-3 rounded mb-6"
                onPress={() => {
                    /* Handle Organización selection */
                }}
            >
                <Text className="text-center text-white font-bold">
                    Organización
                </Text>
            </TouchableOpacity>

            {/* este boton es provisional ya que depende de que tipo de usuario se registre vamos a otra screen */}
            <TouchableOpacity
                className="bg-gray-700 w-10 h-10 rounded-full justify-center items-center"
                onPress={() => navigation.navigate("RegisterExpertise")}
            >
                <MaterialIcons name="navigate-next" size={24} color="white" />
            </TouchableOpacity>
            <StepIndicator currentStep={3} totalSteps={4} />
        </View>
    );
};

export default RegisterProfileTypeScreen;

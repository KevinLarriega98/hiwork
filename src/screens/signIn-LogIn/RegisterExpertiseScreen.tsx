import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../routes/LoginStackNavigation";
import { MaterialIcons } from "@expo/vector-icons";
import StepIndicator from "../../components/logIn-signIn/StepIndicator";

type RegisterExpertiseScreenNavigationProp = NavigationProp<
    RootStackParamList,
    "RegisterExpertise"
>;

const RegisterExpertiseScreen: React.FC = () => {
    const navigation = useNavigation<RegisterExpertiseScreenNavigationProp>();

    return (
        <View className="flex-1 justify-center items-center bg-white px-6">
            <Text className="text-2xl font-bold mb-2">Tu perfil</Text>
            <Text className="text-base text-gray-600 mb-6">
                ¡Queremos saber de ti!
            </Text>
            <Text className="text-lg mb-4">¿Qué disciplinas eres experto?</Text>
            {[
                "Reducir el meu estrés",
                "Reducir el meu estrés",
                "Reducir el meu estrés",
                "Reducir el meu estrés",
            ].map((item, index) => (
                <TouchableOpacity
                    key={index}
                    className="w-full border border-gray-300 rounded p-2 mb-4"
                    onPress={() => {
                        /* Handle expertise selection */
                    }}
                >
                    <Text>{item}</Text>
                </TouchableOpacity>
            ))}
            <TouchableOpacity
                className="bg-gray-700 w-10 h-10 rounded-full justify-center items-center"
                onPress={() => {
                    /* Handle next action */
                }}
            >
                <MaterialIcons name="navigate-next" size={24} color="white" />
            </TouchableOpacity>
            <StepIndicator currentStep={4} totalSteps={4} />
        </View>
    );
};

export default RegisterExpertiseScreen;

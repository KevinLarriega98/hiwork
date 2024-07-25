import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../routes/LoginStackNavigation";
import { MaterialIcons } from "@expo/vector-icons";
import StepIndicator from "../../components/logIn-signIn/StepIndicator";

type RegisterNameScreenNavigationProp = NavigationProp<
    RootStackParamList,
    "RegisterName"
>;

const RegisterNameScreen: React.FC = () => {
    const navigation = useNavigation<RegisterNameScreenNavigationProp>();

    return (
        <View className="flex-1 justify-center items-center bg-white px-6">
            <Text className="text-2xl font-bold mb-2">Tu perfil</Text>
            <Text className="text-base text-gray-600 mb-6">
                ¡Queremos saber de ti!
            </Text>
            <Text className="text-lg mb-4">¿Cuál es tu nombre?</Text>
            <TextInput
                className="w-full border-b border-gray-300 p-2 mb-4"
                placeholder="Nombre"
                autoCapitalize="none"
            />
            <TouchableOpacity
                className="bg-gray-700 w-10 h-10 rounded-full justify-center items-center"
                onPress={() => navigation.navigate("RegisterProfileType")}
            >
                <MaterialIcons name="navigate-next" size={24} color="white" />
            </TouchableOpacity>
            <StepIndicator currentStep={2} totalSteps={4} />
        </View>
    );
};

export default RegisterNameScreen;

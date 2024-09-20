import React from "react";
import { Pressable, Text, View } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import useUserStore from "../../stores/useRegisterStore";
import { RootStackParamList } from "../../types/navigation";

type RegisterTypeUserScreenNavigationProp = NavigationProp<
    RootStackParamList,
    "RegisterTypeUser"
>;

const RegisterTypeUser = () => {
    const navigation = useNavigation<RegisterTypeUserScreenNavigationProp>();

    const { setProfileType } = useUserStore();

    const handleTypeUser = (type: "Voluntario" | "ONG") => {
        type === "Voluntario"
            ? setProfileType("Voluntario")
            : setProfileType("ONG");

        navigation.navigate("RegisterUserScreens", {
            profileType: type,
        });
    };

    return (
        <View className="flex-1 bg-white px-6 py-11">
            <Text className="text-2xl font-bold mb-2 text-center">
                Tu perfil
            </Text>
            <Text className="text-base text-gray-600 text-center">
                ¡Queremos saber de ti!
            </Text>

            <View className="flex-1 justify-center px-6">
                <Text className="text-center text-black text-xl font-bold mb-6">
                    ¿Qué perfil eres?
                </Text>
                <View className="flex-col items-center gap-2">
                    <Pressable
                        className="bg-[#666666] p-3 rounded-[10px] w-full"
                        onPress={() => handleTypeUser("Voluntario")}
                    >
                        <Text className="text-center text-white font-bold text-sm">
                            Voluntario
                        </Text>
                    </Pressable>
                    <Pressable
                        className="bg-[#666666] p-3 rounded-[10px] w-full"
                        onPress={() => handleTypeUser("ONG")}
                    >
                        <Text className="text-center text-white font-bold text-sm">
                            ONG
                        </Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
};

export default RegisterTypeUser;

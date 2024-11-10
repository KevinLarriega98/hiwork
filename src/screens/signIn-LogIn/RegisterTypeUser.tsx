import React from "react";
import { Text, View } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import useUserStore from "../../stores/useRegisterStore";
import ButtonCustom from "../../components/buttons/ButtonCustom";
import { RootStackParamList } from "../../types/Navigation";

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
            <Text className="text-lg text-gray_2 text-center font-bold">
                ¿Cuál es tu perfil?
            </Text>
            <Text className="text-base text-black text-center mt-2 ">
                Escoge tu camino
            </Text>

            <View className="flex-1 justify-center px-6">
                <View className="flex-col items-center justify-center ">
                    <ButtonCustom
                        functionDirection={() => handleTypeUser("Voluntario")}
                        text="Voluntario"
                        haveBackground={false}
                    />
                    <Text className="text-black text-center text-sm my-3 font-bold">
                        O
                    </Text>

                    <ButtonCustom
                        functionDirection={() => handleTypeUser("ONG")}
                        text="ONG"
                        haveBackground={false}
                    />
                </View>
            </View>
        </View>
    );
};

export default RegisterTypeUser;

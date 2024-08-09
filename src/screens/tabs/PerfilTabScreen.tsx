import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import useAuthStore from "../../context/useAuthStore";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../routes/LoginStackNavigation";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import profileImage from "../../assets/profile-image.jpg";

type HomeScreenNavigationProp = NavigationProp<RootStackParamList, "Home">;

const PerfilTabScreen = () => {
    const { user, currentUser } = useAuthStore();
    const logOut = useAuthStore((state) => state.logout);

    const navigation = useNavigation<HomeScreenNavigationProp>();

    const navigateToHome = () => {
        navigation.navigate("Home");
    };

    const logOutFunction = async () => {
        await logOut(navigateToHome);
    };

    useEffect(() => {});

    return (
        <ScrollView
            contentContainerStyle={{ paddingTop: 0 }}
            className="flex-1"
        >
            <View className="h-[13%] bg-white justify-top items-center relative z-0 mt-3">
                <Text className="text-2xl font-bold text-center">
                    {currentUser?.name}
                </Text>
            </View>

            <View className="absolute inset-x-0 top-[6%] flex items-center z-20">
                <Image
                    source={profileImage}
                    className="w-40 h-40 rounded-full border-4 border-white"
                />

                <TouchableOpacity
                    className="absolute top-[75%] left-[28%]  bg-white w-9 h-9 rounded-full justify-center items-center z-20 border border-gray-200"
                    onPress={() => logOutFunction()}
                >
                    <MaterialCommunityIcons
                        name="logout"
                        size={20}
                        color="#666666"
                    />
                </TouchableOpacity>

                <TouchableOpacity className="absolute top-[75%] left-[63%]  bg-white w-9 h-9 rounded-full justify-center items-center z-20 border border-gray-200">
                    <MaterialCommunityIcons
                        name="pencil"
                        size={20}
                        color="#666666"
                    />
                </TouchableOpacity>
            </View>

            <View className="min-h-full bg-gray-100 pt-24 mb-24 rounded-t-3xl">
                <Text className="text-lg text-center font-bold mb-5">
                    23 trabajos realizados | 22 feedbacks
                </Text>

                <Text className="text-base text-[#666666] mb-5 mx-5">
                    {/* TODO Aqui ira la descripccion del usuario. */}
                    Soy Carolina Díaz, historiadora y estudiante de Diseño UX en
                    Barcelona. Trabajo como freelancer, optimizando mi flujo de
                    trabajo con herramientas digitales. Me apasiona el diseño,
                    la tecnología y el aprendizaje continuo. Disfruto de paseos
                    por la ciudad con mi gato, Luna.
                </Text>
                <Text className="text-xl font-bold mb-2 mx-5">
                    Trabajos en curso
                </Text>
                <View className="mb-5 px-5">
                    <View className="bg-gray-300 w-full h-24 rounded-lg" />
                </View>
                <Text className="text-xl font-bold mb-2 mx-5">
                    Trabajos Anteriores
                </Text>
                {/* TODO Aqui ira una flatList con los trabajos anteriores. */}
                <View className="flex-row flex-wrap justify-between mb-2 px-5 gap-1">
                    <View className="bg-gray-300 w-[48%] h-24 rounded-lg mb-2" />
                    <View className="bg-gray-300 w-[48%] h-24 rounded-lg mb-2" />
                    <View className="bg-gray-300 w-[48%] h-24 rounded-lg mb-2" />
                    <View className="bg-gray-300 w-[48%] h-24 rounded-lg mb-2" />
                </View>
            </View>
        </ScrollView>
    );
};

export default PerfilTabScreen;

import {
    View,
    Text,
    ScrollView,
    Modal,
    Pressable,
    TextInput,
    TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import useAuthStore from "../../context/useAuthStore";
import ProfileImageAndButtons from "./components/PerfileTabScreenComponents/ProfileImageAndButtons";
import ModalInterior from "./components/PerfileTabScreenComponents/ModalInterior";

const PerfilTabScreen = () => {
    const { currentUser } = useAuthStore();

    const [modalVisible, setModalVisible] = useState(false);

    return (
        <ScrollView className="flex-1">
            <View className="h-[13%] bg-white justify-top items-center relative z-0 mt-4">
                <Text className="text-2xl font-bold text-center">
                    {currentUser?.name}
                </Text>
            </View>

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <ModalInterior
                    setModalVisible={setModalVisible}
                    modalVisible={modalVisible}
                />
            </Modal>

            <ProfileImageAndButtons
                setModalVisible={setModalVisible}
                modalVisible={modalVisible}
            />

            <View className="min-h-full bg-gray-100 pt-24 mb-24 rounded-t-3xl">
                <Text className="text-lg text-center font-bold mb-5">
                    23 trabajos realizados | 22 feedbacks
                </Text>

                <Text className="text-base text-[#666666] mb-5 mx-5">
                    {currentUser?.description}
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
                {/* TODO Aquí ira una flatList con los trabajos anteriores. */}
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

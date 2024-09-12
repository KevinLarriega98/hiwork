import { View, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import profileImage from "../../../../assets/profile-image.jpg";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import useAuthStore from "../../../../context/useAuthStore";

const ProfileImageAndButtons = ({ modalVisible, setModalVisible }: any) => {
    const { logout, currentUser } = useAuthStore();

    const logOutFunction = async () => {
        await logout();
    };

    return (
        <View className="absolute inset-x-0 top-[6%] flex items-center z-20 w-full">
            <Image
                source={{
                    uri: currentUser?.image ? currentUser?.image : profileImage,
                }}
                className="w-40 h-40 rounded-full border-4 border-white"
            />

            <View className="absolute flex flex-row justify-between w-40 -bottom-2">
                <TouchableOpacity
                    className="bg-white w-9 h-9 rounded-full justify-center items-center border border-gray-200"
                    onPress={() => logOutFunction()}
                >
                    <MaterialCommunityIcons
                        name="logout"
                        size={20}
                        color="#666666"
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    className="bg-white w-9 h-9 rounded-full justify-center items-center border border-gray-200"
                    onPress={() => setModalVisible(!modalVisible)}
                >
                    <MaterialCommunityIcons
                        name="pencil"
                        size={20}
                        color="#666666"
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ProfileImageAndButtons;

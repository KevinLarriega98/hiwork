import { View, TouchableOpacity } from "react-native";
import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const EditProfileAndLogOut = ({
    modalVisible,
    setModalVisible,
}: {
    modalVisible: boolean;
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    return (
        <View className="flex-1 w-screen h-full">
            <View className="flex flex-row justify-end px-2">
                <TouchableOpacity
                    className={`w-9 h-9 rounded-full justify-center items-center ${
                        modalVisible && "bg-white"
                    }`}
                    onPress={() => setModalVisible(!modalVisible)}
                >
                    <MaterialCommunityIcons
                        name="dots-horizontal"
                        size={25}
                        color="black"
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default EditProfileAndLogOut;

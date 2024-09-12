import {
    View,
    Text,
    Pressable,
    TextInput,
    TouchableOpacity,
    Alert,
    Image,
} from "react-native";
import React, { useState } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import useAuthStore from "../../../../context/useAuthStore";
import {
    updateUserNameAndDescription,
    uploadImage,
} from "../../../../service/api/authService";
import { UserState } from "../../../../types/profile";
import * as ImagePicker from "expo-image-picker";

const ModalInterior = ({
    setModalVisible,
    modalVisible,
}: {
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    modalVisible: boolean;
}) => {
    const { currentUser, setCurrentUser } = useAuthStore();

    const [name, setName] = useState(currentUser?.name);
    const [description, setDescription] = useState(currentUser?.description);

    const [image, setImage] = useState<string>(currentUser?.image);

    const [progress, setProgress] = useState(0);

    const pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            if (!result.canceled) {
                setImage(result.assets[0].uri);
            }
        } catch (error: any) {
            Alert.alert("Error", error.message);
        }
    };

    const handleUpdateUserNameAndDescriptionAndImage = async () => {
        if (image !== currentUser?.image) {
            uploadImage(image, currentUser?.email, (progress: any) =>
                setProgress(progress)
            );
        }

        updateUserNameAndDescription(
            currentUser?.uid,
            currentUser?.profileType,
            name,
            description,
            image
        );

        setCurrentUser({
            ...currentUser,
            name: name,
            description: description,
            image: image,
        } as UserState);
    };

    return (
        <View className="flex-1 items-center top-16">
            <View className="w-[85%] h-[500px] bg-white justify-center items-center rounded-lg shadow-md p-10">
                <View className="absolute top-0 right-0 p-2 rounded-full z-20 ">
                    <Pressable onPress={() => setModalVisible(!modalVisible)}>
                        <MaterialCommunityIcons
                            name="close"
                            color={"#000000"}
                            size={18}
                        />
                    </Pressable>
                </View>
                <Text className="text-xl font-bold mb-4">Editar nombre</Text>
                <TextInput
                    onChange={(e) => setName(e.nativeEvent.text)}
                    placeholder={currentUser?.name}
                    className="border p-2  w-full rounded-lg mb-4"
                />
                <Text className="text-xl font-bold mb-4">
                    Editar descripción
                </Text>
                <TextInput
                    onChange={(e) => setDescription(e.nativeEvent.text)}
                    placeholder={currentUser?.description}
                    className="border p-2  w-full rounded-lg mb-4"
                    multiline
                    numberOfLines={5}
                    textAlignVertical="top"
                />
                <View className=" flex flex-row items-center gap-2 mb-4 justify-around w-full">
                    <TouchableOpacity onPress={() => pickImage()}>
                        <Text>Edit Image</Text>
                    </TouchableOpacity>
                    <View className=" border border-gray-700 rounded-lg p-1  w-[110px] h-[110px]">
                        <Image
                            source={{ uri: image || currentUser?.image }}
                            className=" w-[100px] h-[100px] "
                        />
                    </View>
                </View>

                <TouchableOpacity
                    className="bg-primary items-center mr-2 rounded-xl py-2 px-3"
                    onPress={() => {
                        handleUpdateUserNameAndDescriptionAndImage();
                    }}
                >
                    <Text className="text-white">Save Data</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ModalInterior;

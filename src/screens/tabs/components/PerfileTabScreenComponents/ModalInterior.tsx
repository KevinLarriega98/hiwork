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
import useAuthStore from "../../../../stores/useAuthStore";
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
            uploadImage(image, currentUser?.email);
        }

        updateUserNameAndDescription(
            currentUser?.id,
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
        <View className="flex-1 items-center ">
            <View className=" bg-white w-full min-h-fit">
                <Text className=" text-center text-3xl font-bold py-2">
                    Editar Perfil
                </Text>
                <Pressable
                    onPress={() => setModalVisible(!modalVisible)}
                    className=" absolute top-0 right-0 py-2"
                >
                    <MaterialCommunityIcons
                        name="close"
                        color={"#000000"}
                        size={32}
                    />
                </Pressable>
            </View>
            <View className="w-full h-full bg-white  items-center  shadow-md p-10 ">
                <TouchableOpacity onPress={() => pickImage()}>
                    <Image
                        source={{ uri: image || currentUser?.image }}
                        className=" w-[140px] h-[140px] rounded-full mb-7"
                    />
                    <View className=" border-2 border-black rounded-full mt-[-2.5px] ml-[-2.5px] w-[145px] h-[145px] absolute flex justify-center align-middle items-center ">
                        <MaterialCommunityIcons
                            name="pencil"
                            color={"#000000"}
                            size={32}
                        />
                    </View>
                </TouchableOpacity>
                <View className=" w-full  bg-white  ">
                    <Text className="text-xl font-bold mb-4">Nombre:</Text>
                    <TextInput
                        onChange={(e) => setName(e.nativeEvent.text)}
                        placeholder={currentUser?.name}
                        className="border p-2  w-full rounded-lg mb-4"
                    />
                </View>

                <View className=" w-full  bg-white ">
                    <Text className="text-xl font-bold mb-4">Descripción:</Text>
                    <TextInput
                        onChange={(e) => setDescription(e.nativeEvent.text)}
                        placeholder={currentUser?.description}
                        className="border p-2  w-full rounded-lg mb-4"
                        multiline
                        numberOfLines={5}
                        textAlignVertical="top"
                    />
                </View>
            </View>
            <TouchableOpacity
                className=" w-full bg-red-500 items-center mr-2 rounded-xl py-2 px-3 z-30"
                onPress={() => {
                    handleUpdateUserNameAndDescriptionAndImage();
                }}
            >
                <Text
                    className="text-black border border-gray_3 rounded-lg px-3
                    py-2 text-center"
                >
                    Save Data
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default ModalInterior;

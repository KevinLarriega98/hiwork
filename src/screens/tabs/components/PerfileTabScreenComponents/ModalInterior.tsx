import {
    View,
    Text,
    Pressable,
    TextInput,
    TouchableOpacity,
    Alert,
    Image,
    ImageBackground,
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
import { Asset } from "expo-asset";

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

        updateUserNameAndDescription(currentUser?.id, name, description, image);

        setCurrentUser({
            ...currentUser,
            name: name,
            description: description,
            image: image,
        } as UserState);
    };

    return (
        <View className="flex-1 bg-white flex justify-between">
            <View className="p-4 bg-white">
                <View>
                    <Text className="text-center text-3xl font-bold py-2">
                        Editar Perfil
                    </Text>

                    <Pressable
                        onPress={() => setModalVisible(!modalVisible)}
                        className="absolute top-0 right-0 py-2"
                    >
                        <MaterialCommunityIcons
                            name="close"
                            color={"#004932"}
                            size={34}
                        />
                    </Pressable>
                </View>
                <View>
                    {currentUser?.profileType === "ONG" ? (
                        <ImageBackground
                            source={{
                                uri: Asset.fromModule(
                                    require("../../../../../images/pruebaFondo.png")
                                ).uri,
                            }}
                            resizeMode="cover"
                            imageStyle={{
                                borderRadius: 20,
                            }}
                            className={`w-full items-center ${
                                currentUser?.profileType !== "ONG" &&
                                "bg-green-200 "
                            }`}
                        >
                            <TouchableOpacity
                                className=" absolute right-0 top-0 py-2 px-4"

                                // TODO falta poner un modal que pueda poner la imagen que quiera
                                // onPress={() => pickImage()}
                            >
                                <MaterialCommunityIcons
                                    name="pencil"
                                    color={"#FFFF"}
                                    size={32}
                                />
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => pickImage()}
                                className=" my-5"
                            >
                                <Image
                                    source={{
                                        uri: image || currentUser?.image,
                                    }}
                                    className="w-[140px] h-[140px] rounded-full"
                                />
                                <View className="border-2 border-black rounded-full mt-[-2.5px] ml-[-2.5px] w-[145px] h-[145px] absolute flex justify-center align-middle items-center">
                                    <MaterialCommunityIcons
                                        name="pencil"
                                        color={"#FFFF"}
                                        size={32}
                                    />
                                </View>
                            </TouchableOpacity>
                        </ImageBackground>
                    ) : (
                        // TODO aqui se tiene que hacer la logica del color para que se cargue siempre el que ha guardado el usuario
                        <View className=" items-center bg-red-200 rounded-2xl">
                            <TouchableOpacity
                                className=" absolute right-0 top-0 py-2 px-4"

                                // TODO falta poner un modal con selecciones de colores
                                // onPress={() => pickImage()}
                            >
                                <MaterialCommunityIcons
                                    name="pencil"
                                    color={"#FFFF"}
                                    size={32}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => pickImage()}
                                className=" my-5"
                            >
                                <Image
                                    source={{
                                        uri: image || currentUser?.image,
                                    }}
                                    className="w-[140px] h-[140px] rounded-full"
                                />
                                <View className="border-2 border-black rounded-full mt-[-2.5px] ml-[-2.5px] w-[145px] h-[145px] absolute flex justify-center align-middle items-center">
                                    <MaterialCommunityIcons
                                        name="pencil"
                                        color={"#FFFF"}
                                        size={32}
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
                <View className=" px-4">
                    <View className="w-full bg-white mt-4">
                        <Text className="text-xl font-bold mb-3">Nombre:</Text>
                        <TextInput
                            onChange={(e) => setName(e.nativeEvent.text)}
                            placeholder={currentUser?.name}
                            className="border p-2 w-full rounded-lg mb-4"
                        />
                    </View>

                    <View className="w-full bg-white">
                        <Text className="text-xl font-bold mb-3">
                            Descripción:
                        </Text>
                        <TextInput
                            onChange={(e) => setDescription(e.nativeEvent.text)}
                            placeholder={currentUser?.description}
                            className="border p-2 w-full rounded-lg mb-4"
                            multiline
                            numberOfLines={5}
                            textAlignVertical="top"
                        />
                    </View>
                </View>
            </View>

            <View className="w-full p-4">
                <TouchableOpacity
                    className="w-full bg-verde_claro items-center rounded-full py-4"
                    onPress={() => handleUpdateUserNameAndDescriptionAndImage()}
                >
                    <Text className="text-black text-center font-bold text-lg">
                        Guardar
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ModalInterior;

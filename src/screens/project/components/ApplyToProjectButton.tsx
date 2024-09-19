import React, { useEffect, useState } from "react";
import {
    Text,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
    View,
    Modal,
    Pressable,
    TextInput,
} from "react-native";
import useAuthStore from "../../../context/useAuthStore";
import {
    applyToProject,
    checkIfApplied,
} from "../../../service/api/projectService";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const ApplyToProjectButton = ({ projectID }: { projectID: string }) => {
    const { currentUser, user } = useAuthStore();
    const [hasApplied, setHasApplied] = useState<boolean | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [modalBoolean, setModalBoolean] = useState(false);

    const [formData, setFormData] = useState<string>();

    useEffect(() => {
        const checkApplicationStatus = async () => {
            setLoading(true);
            if (user?.uid) {
                try {
                    const applied = await checkIfApplied(projectID, user.uid);
                    setHasApplied(applied);
                } catch (error) {
                    console.error("Error al verificar la aplicación:", error);
                } finally {
                    setLoading(false);
                }
            }
        };

        checkApplicationStatus();
    }, [projectID, user?.uid]);

    const handleApply = async () => {
        if (hasApplied) {
            Alert.alert("Ya has aplicado", "Ya has aplicado a este proyecto.");
            return;
        }

        setLoading(true);

        try {
            const applicationID = await applyToProject(
                projectID,
                user?.uid,
                currentUser?.name,
                user?.email,
                formData ? formData : currentUser?.description
            );

            console.log("Aplicación ID:", applicationID);
            Alert.alert(
                "Aplicación Enviada",
                "Has aplicado exitosamente al proyecto."
            );
            setHasApplied(true);
        } catch (error) {
            Alert.alert("Error", "Hubo un error al aplicar al proyecto.");
        } finally {
            setLoading(false);
            setModalBoolean(false);
        }
    };

    if (loading || hasApplied === null) {
        return (
            <View className="absolute bottom-5 right-5 rounded-full px-5 bg-gray-700 py-4 justify-center items-center elevation-5 opacity-50">
                <ActivityIndicator size="small" color="white" />
            </View>
        );
    }

    return (
        <>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalBoolean}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalBoolean(!modalBoolean);
                }}
            >
                <View className="flex-1 items-center relative">
                    <View className="w-[75%] h-[60%] bg-gray-100 justify-center items-center rounded-lg absolute top-[19%] shadow-md p-6">
                        <View className="absolute top-0 right-0 p-2 rounded-full z-20">
                            <Pressable
                                onPress={() => setModalBoolean(!modalBoolean)}
                            >
                                <MaterialCommunityIcons
                                    name="close"
                                    color={"#000000"}
                                    size={18}
                                />
                            </Pressable>
                        </View>

                        <View className=" w-full items-center flex gap-4">
                            <Text>Carta de presentación para la ONG</Text>
                            <Text className=" text-xs text-gray-500">
                                Si lo dejas vació enviaremos tu descripción
                            </Text>
                            <TextInput
                                className="w-full p-2 border border-gray-300 rounded h-32 "
                                placeholder={currentUser?.description}
                                onChangeText={(text) => setFormData(text)}
                                multiline
                                numberOfLines={5}
                                textAlignVertical={"top"}
                            />
                            <TouchableOpacity
                                className=" border border-gray-600 rounded-full px-4 py-2 mt-4"
                                onPress={handleApply}
                            >
                                <Text>Enviar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <TouchableOpacity
                className={`absolute bottom-5 right-5  rounded-full px-5 bg-gray-700 py-4 justify-center items-center elevation-5 ${
                    hasApplied ? " opacity-50" : " opacity-100"
                }`}
                onPress={() => setModalBoolean(!modalBoolean)}
                disabled={loading || hasApplied}
            >
                <Text className="text-white text-base font-bold">
                    {hasApplied ? "Ya Aplicado" : "Aplicar"}
                </Text>
            </TouchableOpacity>
        </>
    );
};

export default ApplyToProjectButton;

import {
    View,
    Text,
    Alert,
    Modal,
    Pressable,
    TextInput,
    TouchableOpacity,
} from "react-native";
import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { CalendarEvent, ProjectState } from "../../../types/project";

interface CalendarEditModalProps {
    modalVisible: boolean;
    setModalVisible: (visible: boolean) => void;
    project: ProjectState;
    newData: CalendarEvent;
    setNewData: (data: CalendarEvent) => void;
    handleSaveEvent: () => void;
    eventData: CalendarEvent | null;
}

const CalendarEditModal: React.FC<CalendarEditModalProps> = ({
    modalVisible,
    setModalVisible,
    project,
    newData,
    setNewData,
    handleSaveEvent,
    eventData,
}) => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(false);
            }}
        >
            <View
                className="flex-1 items-center justify-center"
                style={{
                    backgroundColor: "rgba(0,0,0,0.5)",
                }}
            >
                {/* Asegúrate de centrar el modal verticalmente */}
                <View className="w-[80%] bg-white rounded-xl shadow-md pb-4">
                    {/* Elimina h-1/2 para que se ajuste al contenido */}
                    {/* Encabezado del modal */}
                    <View className="absolute top-0 right-0 p-2 rounded-full z-20 flex items-center justify-between w-full flex-row">
                        <Text className="text-base">
                            Hello {project.ongName}!
                        </Text>

                        <TouchableOpacity
                            onPress={() => setModalVisible(false)}
                        >
                            <MaterialCommunityIcons
                                name="close"
                                color={"#000000"}
                                size={32}
                            />
                        </TouchableOpacity>
                    </View>
                    {/* Contenido principal */}
                    <View className="rounded-3xl mt-14 px-8 items-center w-full">
                        <View className="w-full flex items-center p-3 bg-rosa rounded-lg">
                            <Text className="text-xl font-bold">
                                {eventData?.date}
                            </Text>
                        </View>

                        <View className="w-full mt-4">
                            {/* Añadir margen superior para espaciado */}
                            <Text className="mb-1 font-semibold">Título</Text>
                            <TextInput
                                className="border p-2 mb-4 w-full rounded-lg"
                                placeholder={newData.name}
                                value={newData.name}
                                onChangeText={(e) =>
                                    setNewData({ ...newData, name: e })
                                }
                            />
                            <Text className="mb-1 font-semibold">
                                Descripción
                            </Text>
                            <TextInput
                                className="border p-2 mb-4 w-full rounded-lg"
                                placeholder={newData.data}
                                value={newData.data}
                                onChangeText={(e) =>
                                    setNewData({ ...newData, data: e })
                                }
                            />
                            <TouchableOpacity
                                className="bg-verde_claro items-center rounded-lg py-2 px-3"
                                onPress={handleSaveEvent}
                            >
                                <Text className="text-black text-lg font-semibold">
                                    Save Data
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default CalendarEditModal;

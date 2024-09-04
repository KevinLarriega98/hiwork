import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    Alert,
    Pressable,
    TextInput,
} from "react-native";
import React, { useState } from "react";
import { Agenda } from "react-native-calendars";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../../routes/LoginStackNavigation";
import useAuthStore from "../../../context/useAuthStore";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { updateProjectObjectiveTimeline } from "../../../service/api/projectService";
import { CalendarEvent } from "../../../types/project";

type ProjectScreenRouteProp = RouteProp<RootStackParamList, "Project">;

const CalendarScreen: React.FC = () => {
    const { user } = useAuthStore();
    const route = useRoute<ProjectScreenRouteProp>();
    const { project } = route.params;

    const [clickedDate, setClickedDate] = useState<{
        day: any;
        clicked: boolean;
    }>({
        day: null,
        clicked: false,
    });

    const [eventData, setEventData] = useState<CalendarEvent | null>(null);

    const [modalVisible, setModalVisible] = useState(false);

    const [newData, setNewData] = useState<CalendarEvent>({
        name: eventData?.name || "",
        data: eventData?.data || "",
        date: eventData?.date || "",
        height: 0,
        day: "",
    });

    const dates: {
        date: string;
        name: string;
        data: string;
        height: number;
        day: string;
    }[] = project.objectiveTimeline;

    const convertToAgendaItems = (
        events: CalendarEvent[]
    ): { [date: string]: CalendarEvent[] } => {
        const groupedEvents: { [date: string]: CalendarEvent[] } = {};

        events.forEach((event) => {
            if (!groupedEvents[event.date]) {
                groupedEvents[event.date] = [];
            }
            groupedEvents[event.date].push(event);
        });

        return groupedEvents;
    };

    const agendaItems = convertToAgendaItems(dates);

    const firstDate: Date = new Date(dates[0].date);

    const handleDayPress = (day: any) => {
        const selectedDate = day.dateString;
        setClickedDate({ day: day, clicked: true });

        const eventsForDate = agendaItems[selectedDate] || [];
        if (eventsForDate.length > 0) {
            setEventData(eventsForDate[0]);
        } else {
            setEventData({
                date: selectedDate,
                name: "",
                data: "",
                height: 0,
                day: "",
            });
        }

        setModalVisible(true);
    };

    // mirar de hacerlo onSnapshot para que al guardar se actualice
    const handleSaveEvent = async () => {
        if (newData && project?.id) {
            const dateString = clickedDate.day?.dateString || newData.date;
            await updateProjectObjectiveTimeline(project.id, {
                ...newData,
                date: dateString,
            });
            console.log("Saving event data:", newData);
            setModalVisible(false);
        }
    };

    return (
        <View className="flex-1 bg-white px-6">
            <Agenda
                items={agendaItems}
                selected={firstDate}
                renderItem={(item: CalendarEvent) => (
                    <View
                        style={{
                            padding: 20,
                            backgroundColor: "white",
                            alignContent: "center",
                        }}
                    >
                        <Text>{item.name}</Text>
                        <Text>{item.data}</Text>
                    </View>
                )}
                onDayPress={(day: any) => handleDayPress(day)}
            />

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                <View className="flex-1 items-center relative">
                    <View className="w-[75%] h-[70%] bg-white justify-center items-center rounded-lg absolute top-1/4 shadow-md">
                        <View className=" absolute top-0 right-0 p-2 rounded-full z-20">
                            <Pressable
                                onPress={() => setModalVisible(!modalVisible)}
                            >
                                <MaterialCommunityIcons
                                    name="close"
                                    color={"#000000"}
                                    size={18}
                                />
                            </Pressable>
                        </View>

                        <View className="rounded-3xl p-8 items-center flex-1 justify-center w-full gap-4">
                            <Text>Hello {project.ongName}!</Text>
                            <Text>{eventData?.date}</Text>
                            <TextInput
                                className="border p-2 mb-4 w-full"
                                placeholder={eventData?.name}
                                value={newData.name}
                                onChange={(e) =>
                                    setNewData({
                                        ...newData,
                                        name: e.nativeEvent.text,
                                    })
                                }
                            ></TextInput>
                            <TextInput
                                className="border p-2 mb-4 w-full"
                                placeholder={eventData?.data}
                                value={newData.data}
                                onChange={(e) =>
                                    setNewData({
                                        ...newData,
                                        data: e.nativeEvent.text,
                                    })
                                }
                            ></TextInput>
                            <TouchableOpacity
                                className="bg-primary items-center mr-2 rounded-xl py-2 px-3"
                                onPress={() => handleSaveEvent()}
                            >
                                <Text className="text-white">Save Data</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <TouchableOpacity
                className={`absolute bottom-5 right-5  rounded-full px-5 bg-gray-700 py-4 justify-center items-center elevation-5  ${
                    clickedDate.clicked ? " opacity-100" : " opacity-0"
                } ${user?.uid === project.ongID ? "" : " opacity-0"}`}
                onPress={() => {
                    if (clickedDate.day) {
                        handleDayPress(clickedDate.day);
                    }
                }}
            >
                <Text className=" text-white text-base font-bold">
                    Añadir evento
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default CalendarScreen;

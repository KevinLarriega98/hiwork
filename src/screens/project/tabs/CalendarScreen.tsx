import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    Alert,
    Pressable,
    TextInput,
    ActivityIndicator,
} from "react-native";
import React, { useEffect, useState, useMemo } from "react";
import { Agenda } from "react-native-calendars";
import { RouteProp, useRoute } from "@react-navigation/native";
import useAuthStore from "../../../context/useAuthStore";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {
    getObjectiveTimelineProjects,
    updateProjectObjectiveTimeline,
} from "../../../service/api/projectService";
import { CalendarEvent } from "../../../types/project";
import { RootStackParamList } from "../../../types/navigation";

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
        name: "",
        data: "",
        date: "",
        height: 0,
        day: "",
    });

    const [projects, setProjects] = useState<CalendarEvent[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        let isMounted = true;

        const fetchProjects = async () => {
            if (project.id) {
                try {
                    const unsubscribe = getObjectiveTimelineProjects(
                        project.id,
                        (projects) => {
                            if (isMounted) setProjects(projects);
                        }
                    );

                    return unsubscribe;
                } catch (error) {
                    if (isMounted) {
                        Alert.alert(
                            "Error",
                            "No se pudieron cargar los proyectos."
                        );
                    }
                } finally {
                    if (isMounted) setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };

        fetchProjects().then((unsubscribe) => {
            return () => {
                if (unsubscribe) unsubscribe();
            };
        });

        return () => {
            isMounted = false;
        };
    }, [project.id]);

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

    const agendaItems = useMemo(
        () => convertToAgendaItems(projects),
        [projects]
    );

    const firstDate: Date = new Date(
        project.objectiveTimeline[0]?.date || new Date()
    );

    const handleDayPress = (day: any) => {
        const selectedDate = day.dateString;
        setClickedDate({ day: day, clicked: true });

        const eventsForDate = agendaItems[selectedDate] || [];
        const eventData =
            eventsForDate.length > 0
                ? eventsForDate[0]
                : {
                      date: selectedDate,
                      name: "",
                      data: "",
                      height: 0,
                      day: "",
                  };

        setEventData(eventData);
        setNewData(eventData);
    };

    const handleOpenModal = () => {
        setModalVisible(true);
    };

    const handleSaveEvent = async () => {
        if (newData && project?.id) {
            const updatedData = {
                ...newData,
                date: clickedDate.day?.dateString || newData.date,
            };
            await updateProjectObjectiveTimeline(project.id, updatedData);
            console.log("Saving event data:", updatedData);
            setModalVisible(false);
            setNewData({
                name: "",
                data: "",
                date: "",
                height: 0,
                day: "",
            });
        }
    };

    if (loading) {
        return (
            <View className="flex-1 justify-center items-center">
                <ActivityIndicator size="large" color="#808080" />
            </View>
        );
    }

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
                        <View className="absolute top-0 right-0 p-2 rounded-full z-20">
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
                                placeholder="Event Name"
                                value={newData.name}
                                onChange={(e) =>
                                    setNewData({
                                        ...newData,
                                        name: e.nativeEvent.text,
                                    })
                                }
                            />
                            <TextInput
                                className="border p-2 mb-4 w-full"
                                placeholder="Event Data"
                                value={newData.data}
                                onChange={(e) =>
                                    setNewData({
                                        ...newData,
                                        data: e.nativeEvent.text,
                                    })
                                }
                            />
                            <TouchableOpacity
                                className="bg-primary items-center mr-2 rounded-xl py-2 px-3"
                                onPress={handleSaveEvent}
                            >
                                <Text className="text-white">Save Data</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <TouchableOpacity
                className={`absolute bottom-5 right-5 rounded-full px-5 bg-gray-700 py-4 justify-center items-center elevation-5 
                ${
                    clickedDate.clicked && user?.uid === project.ongID
                        ? "opacity-100"
                        : "opacity-0"
                }`}
                onPress={() => {
                    if (clickedDate.day) {
                        handleOpenModal();
                    }
                }}
            >
                <Text className="text-white text-base font-bold">
                    Añadir evento
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default CalendarScreen;

import { View, Alert, ActivityIndicator } from "react-native";
import React, { useEffect, useState, useMemo } from "react";
import { Agenda } from "react-native-calendars";
import { RouteProp, useRoute } from "@react-navigation/native";
import useAuthStore from "../../../stores/useAuthStore";
import {
    getObjectiveTimelineProjects,
    updateProjectObjectiveTimeline,
} from "../../../service/api/projectService";
import { CalendarEvent } from "../../../types/project";
import { RootStackParamList } from "../../../types/navigation";
import ProjectDurationCard from "../components/ProjectDurationCard";
import CalendarEditModal from "../components/CalendarEditModal";

type ProjectScreenRouteProp = RouteProp<RootStackParamList, "Project">;

const CalendarScreen = () => {
    const route = useRoute<ProjectScreenRouteProp>();
    const { project } = route.params;

    const [eventData, setEventData] = useState<CalendarEvent | null>(null);
    const [modalVisible, setModalVisible] = useState(false);

    const [newData, setNewData] = useState<CalendarEvent>({
        name: "",
        data: "",
        date: "",
        height: 0,
        day: "",
        isChecked: false,
    });

    const [projects, setProjects] = useState<CalendarEvent[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchProjects = async () => {
            if (project.id) {
                try {
                    const unsubscribe = getObjectiveTimelineProjects(
                        project.id,
                        (projects) => {
                            setProjects(projects);
                        }
                    );
                    return unsubscribe;
                } catch (error) {
                    Alert.alert(
                        "Error",
                        "No se pudieron cargar los proyectos."
                    );
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchProjects();
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

    const handleDayPress = (itemDay: CalendarEvent) => {
        console.log("Día seleccionado:", itemDay);

        setModalVisible(true);

        const objectSameAsDate = project.objectiveTimeline.find(
            (item) => item.date === itemDay.date
        );

        if (objectSameAsDate) {
            console.log("Evento encontrado para la fecha:", objectSameAsDate);

            setEventData(objectSameAsDate);
            setNewData(objectSameAsDate);
        } else {
            console.error(
                "No hay eventos para la fecha seleccionada:",
                itemDay.date
            );
        }
    };

    const handleSaveEvent = async () => {
        if (newData && project?.id) {
            const updatedData = {
                ...newData,
                date: newData.date,
            };

            setLoading(true);

            await updateProjectObjectiveTimeline(project.id, updatedData)
                .then(() => {
                    setModalVisible(false);
                    setNewData({
                        name: "",
                        data: "",
                        date: "",
                        height: 0,
                        day: "",
                        isChecked: false,
                    });
                })
                .finally(() => {
                    setLoading(false);
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
        <View className="flex-1 bg-white px-6 pt-2">
            <Agenda
                className=" rounded"
                items={agendaItems}
                selected={firstDate}
                renderEmptyData={() => null}
                renderDay={() => null}
                renderItem={(item: CalendarEvent) => (
                    <ProjectDurationCard
                        item={item}
                        handleDayPress={handleDayPress}
                    />
                )}
                theme={{
                    backgroundColor: "#ffffff",
                    calendarBackground: "#F1F1F1",
                    todayTextColor: "#FA0",
                    selectedDayBackgroundColor: "#7F35E9",
                    selectedDayTextColor: "#ffffff",
                    dayTextColor: "#222323",
                    monthTextColor: "#004932",
                    textDayFontSize: 16,
                    textMonthFontSize: 16,
                    textDayHeaderFontSize: 14,
                    agendaKnobColor: "#7F35E9",
                }}
            />

            <CalendarEditModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                project={project}
                eventData={eventData}
                handleSaveEvent={handleSaveEvent}
                setNewData={setNewData}
                newData={newData}
            />
        </View>
    );
};

export default CalendarScreen;

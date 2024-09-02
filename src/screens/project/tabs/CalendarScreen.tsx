import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Agenda, AgendaEntry } from "react-native-calendars";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../../routes/LoginStackNavigation";

type ProjectScreenRouteProp = RouteProp<RootStackParamList, "Project">;

interface CalendarEvent extends AgendaEntry {
    name: string;
    data: string;
}

type AgendaItems = {
    [date: string]: CalendarEvent[];
};

const CalendarScreen: React.FC = () => {
    const route = useRoute<ProjectScreenRouteProp>();
    const { project } = route.params;
    const [clickedDate, setClickedDate] = useState<{
        day: any;
        clicked: boolean;
    }>({
        day: null,
        clicked: false,
    });

    const dates: string[] = project.objectiveTimeline;

    const items: AgendaItems = dates.reduce(
        (acc: AgendaItems, date: string) => {
            acc[date] = [
                {
                    name: `Event on ${date}`,
                    data: "lorem ipsum dolor sit amet",
                    height: 0,
                    day: "",
                },
            ];
            return acc;
        },
        {}
    );

    const firstDate: string = dates[0];

    return (
        <View className="flex-1 bg-white px-6">
            <Agenda
                items={items}
                selected={firstDate}
                renderItem={(item: CalendarEvent) => (
                    <View style={{ padding: 20, backgroundColor: "white" }}>
                        <Text>{item.name}</Text>
                        <Text>{item.data}</Text>
                    </View>
                )}
                onDayPress={(day: any) => {
                    setClickedDate({ day: day, clicked: true });
                    console.log("day pressed");
                }}
            />

            {/* aqui en el on press abrir un modal para añadir evento */}
            <TouchableOpacity
                className={`absolute bottom-5 right-5  rounded-full px-5 bg-gray-700 py-4 justify-center items-center elevation-5  ${
                    clickedDate.clicked ? " opacity-100" : " opacity-0"
                }`}
                // onPress={handleApply}
            >
                <Text className=" text-white text-base font-bold">
                    Añadir evento
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default CalendarScreen;

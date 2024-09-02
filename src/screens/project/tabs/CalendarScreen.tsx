import { View } from "react-native";
import React from "react";
import { Agenda } from "react-native-calendars";

const CalendarScreen = () => {
    return (
        <View className=" flex-1 bg-white px-6">
            <Agenda
                items={{
                    "2017-05-08": [
                        {
                            name: "Item for 2017-05-08 #0",
                            data: "lorem ipsum dolor sit amet",
                        },
                    ],
                }}
            />
        </View>
    );
};

export default CalendarScreen;

import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
} from "react-native";
import React, { useState } from "react";
import { Calendar } from "react-native-calendars";

type ProjectData = {
    title: string;
    description: string;
    roles: string[];
    objectiveTimeline: MarkedDatesType[];
};

type MarkedDatesType = {
    [key: string]: {
        color: string;
        textColor: string;
        startingDay?: boolean;
        endingDay?: boolean;
    };
};

const CreateNewProject = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [inputValue, setInputValue] = useState("");
    const [isValid, setIsValid] = useState(false);

    const [newProjectData, setNewProjectData] = useState<ProjectData>({
        title: "",
        description: "",
        roles: [],
        objectiveTimeline: [],
    });

    const [objectiveTimeline, setObjectiveTimeline] = useState<string[]>([]);

    const [startDate, setStartDate] = useState<string>("");

    const [isStartDatePicked, setIsStartDatePicked] = useState<boolean>(false);
    const [markedDates, setMarkedDates] = useState<MarkedDatesType>({});

    const CreateNewProjectSteps = [
        {
            key: "1",
            step: "Paso 1",
            question: "Ponle un título a tu proyecto:",
            placeholder: "Escribe un título",
            type: "input",
            data: "title",
        },
        {
            key: "2",
            step: "Paso 2",
            question: "Describe tu proyecto:",
            placeholder: "Describe tu proyecto es lo que verán los voluntarios",
            type: "inputBig",
            data: "description",
        },
        {
            key: "3",
            step: "Paso 3",
            question: "Que cargos necesitas:",
            options: ["Desarrollador", "Diseñador", "Traductor", "Marketing"],
            type: "options",
        },
        {
            key: "4",
            step: "Paso 4",
            question: "Para cuando debe de estar:",
            type: "dates",
        },
        {
            key: "5",
            step: "Paso 5",
            question: "Revisa tu información antes de finalizar",
            type: "review",
        },
    ];

    const nextStep = () => {
        if (isValid && currentStep < CreateNewProjectSteps.length - 1) {
            setCurrentStep(currentStep + 1);
            setInputValue("");
            setIsValid(false);
        }
    };

    const previousStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleInputChange = (text: string, data: string | undefined) => {
        setNewProjectData({ ...newProjectData, [data!]: text });
        setIsValid(text.length > 0);
    };

    const handleOptionsChange = (text: string) => {
        setInputValue(text);

        setNewProjectData((prevData: ProjectData) => {
            const updatedRoles = prevData.roles.includes(text)
                ? prevData.roles.filter((role) => role !== text)
                : [...prevData.roles, text];

            setIsValid(updatedRoles.length > 0);
            return { ...prevData, roles: updatedRoles };
        });
    };

    const onDayPress = (day: any) => {
        if (!isStartDatePicked) {
            setIsStartDatePicked(true);
            setStartDate(day.dateString);
            setMarkedDates({
                [day.dateString]: {
                    startingDay: true,
                    color: "blue",
                    textColor: "white",
                },
            });
        } else {
            const endDate = day.dateString;
            const range = getDateRange(startDate, endDate);

            const rangeObject = range.reduce<MarkedDatesType>(
                (acc, date, index) => {
                    acc[date] = {
                        color: "blue",
                        textColor: "white",
                        startingDay: index === 0,
                        endingDay: index === range.length - 1,
                    };
                    return acc;
                },
                {}
            );

            setNewProjectData({
                ...newProjectData,
                objectiveTimeline: rangeObject,
            });

            setMarkedDates(rangeObject);
            setObjectiveTimeline(range);
            setIsStartDatePicked(false);
        }
    };

    const getDateRange = (start: string, end: string): string[] => {
        const range: string[] = [];
        let current = new Date(start);
        const endDate = new Date(end);

        while (current <= endDate) {
            range.push(current.toISOString().split("T")[0]);
            current.setDate(current.getDate() + 1);
        }

        return range;
    };

    console.log(newProjectData);

    return (
        <View className="flex-1 p-4 bg-white justify-center">
            <View className="flex-row justify-between mb-4 bg-gray-300 rounded-full max-w-screen">
                {CreateNewProjectSteps.map((step, index) => (
                    <View key={step.key} className="items-center w-fit">
                        <Text
                            className={`px-4 py-2 rounded-full text-center ${
                                currentStep === index
                                    ? "bg-gray-700 text-white"
                                    : "bg-gray-300 text-gray-700"
                            }`}
                        >
                            {step.step}
                        </Text>
                    </View>
                ))}
            </View>

            <View className="flex-1 justify-center">
                <Text className="text-xl font-bold mb-4">
                    {CreateNewProjectSteps[currentStep].question}
                </Text>

                {CreateNewProjectSteps[currentStep].type === "input" && (
                    <>
                        <TextInput
                            className="border border-gray_3 p-3 rounded-md mb-4"
                            placeholder={
                                CreateNewProjectSteps[currentStep].placeholder
                            }
                            value={newProjectData.title}
                            onChangeText={(text) =>
                                handleInputChange(
                                    text,
                                    CreateNewProjectSteps[currentStep].data
                                )
                            }
                            maxLength={200}
                        />
                        <Text className="text-right text-gray-500 px-3">
                            {inputValue.length}/200
                        </Text>
                    </>
                )}

                {CreateNewProjectSteps[currentStep].type === "inputBig" && (
                    <>
                        <TextInput
                            className="border border-gray_3 p-3 rounded-md mb-4 "
                            placeholder={
                                CreateNewProjectSteps[currentStep].placeholder
                            }
                            value={newProjectData.description}
                            onChangeText={(text) =>
                                handleInputChange(
                                    text,
                                    CreateNewProjectSteps[currentStep].data
                                )
                            }
                            maxLength={500}
                            numberOfLines={18}
                            textAlignVertical="top"
                        />
                        <Text className="text-right text-gray-500 px-3">
                            {inputValue.length}/500
                        </Text>
                    </>
                )}

                {CreateNewProjectSteps[currentStep].type === "options" && (
                    <FlatList
                        data={CreateNewProjectSteps[currentStep].options}
                        renderItem={({ item }) => (
                            <View className=" flex-1 items-center">
                                <TouchableOpacity
                                    onPress={() => handleOptionsChange(item)}
                                    className={`w-full py-5 bg-gray_5 rounded-2xl mb-3 items-center ${
                                        newProjectData.roles.includes(item) &&
                                        "bg-gray_2"
                                    }`}
                                >
                                    <Text>{item}</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    />
                )}

                {CreateNewProjectSteps[currentStep].type === "dates" && (
                    <View className="flex-1">
                        <Calendar
                            markingType={"period"}
                            markedDates={markedDates}
                            onDayPress={onDayPress}
                        />
                    </View>
                )}
            </View>

            {/* Botones de navegación */}
            <View className="flex-row justify-between mt-4">
                {currentStep > 0 && (
                    <TouchableOpacity
                        className="bg-gray_3 px-4 py-3 rounded-full flex-1 mr-2 items-center"
                        onPress={previousStep}
                    >
                        <Text className="text-white font-bold">Anterior</Text>
                    </TouchableOpacity>
                )}
                <TouchableOpacity
                    className={`px-4 py-3 rounded-full flex-1 items-center ${
                        isValid ? "bg-gray_3" : "bg-gray-300"
                    }`}
                    onPress={nextStep}
                    disabled={!isValid} // Deshabilita el botón si no es válido
                >
                    <Text className="text-white font-bold">Siguiente</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default CreateNewProject;

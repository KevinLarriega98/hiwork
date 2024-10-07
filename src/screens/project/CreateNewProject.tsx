import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Calendar } from "react-native-calendars";
import useProjectStore from "../../stores/useProjectStore";
import useAuthStore from "../../stores/useAuthStore";
import pruebaHide from "../../stores/pruebaHide";

type MarkedDatesType = {
    [key: string]: {
        color: string;
        textColor: string;
        startingDay?: boolean;
        endingDay?: boolean;
    };
};

type ProjectData = {
    title: string;
    description: string;
    roles: string[];
    objectiveTimeline: string[];
};

const CreateNewProject = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [isValid, setIsValid] = useState(false);

    const { createProject } = useProjectStore((state) => ({
        createProject: state.createProject,
    }));

    const { currentUser } = useAuthStore();

    const [markedDates, setMarkedDates] = useState<MarkedDatesType>({});
    const [objectiveTimeline, setObjectiveTimeline] = useState<string[]>([]);
    const [newProjectData, setNewProjectData] = useState<ProjectData>({
        title: "",
        description: "",
        roles: [],
        objectiveTimeline: objectiveTimeline,
    });

    const [startDate, setStartDate] = useState<string>("");
    const [isStartDatePicked, setIsStartDatePicked] = useState<boolean>(false);

    console.log("this is marked", markedDates);

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

    const validateCurrentStep = () => {
        if (currentStep === 0) {
            setIsValid(newProjectData.title.length > 0);
        } else if (currentStep === 1) {
            setIsValid(newProjectData.description.length > 0);
        } else if (currentStep === 2) {
            setIsValid(newProjectData.roles.length > 0);
        } else if (currentStep === 3) {
            setIsValid(
                Object.keys(newProjectData.objectiveTimeline).length > 0
            );
        } else {
            setIsValid(true);
        }
    };

    useEffect(() => {
        validateCurrentStep();
    }, [currentStep, newProjectData]);

    const nextStep = () => {
        if (isValid && currentStep < CreateNewProjectSteps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const previousStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleInputChange = (text: string, data: string | undefined) => {
        setNewProjectData({ ...newProjectData, [data!]: text });
    };

    const handleOptionsChange = (text: string) => {
        setNewProjectData((prevData: ProjectData) => {
            const updatedRoles = prevData.roles.includes(text)
                ? prevData.roles.filter((role) => role !== text)
                : [...prevData.roles, text];
            return { ...prevData, roles: updatedRoles };
        });
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

            console.log("this is range", range);

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

            setMarkedDates(rangeObject);
            setNewProjectData({
                ...newProjectData,
                objectiveTimeline: range,
            });
            setObjectiveTimeline(range);
            setIsStartDatePicked(false);
        }
    };

    const projectDuration = () => {
        const firstDay = objectiveTimeline[0];
        const lastDay = objectiveTimeline[objectiveTimeline.length - 1];

        const formatDate = (dateString: string) => {
            const options: Intl.DateTimeFormatOptions = {
                year: "numeric",
                month: "long",
                day: "numeric",
            };
            return new Date(dateString).toLocaleDateString("es-ES", options);
        };

        const startDateFormatted = formatDate(firstDay);
        const endDateFormatted = formatDate(lastDay);

        const startDate = new Date(firstDay);
        const endDate = new Date(lastDay);

        const timeDiff = endDate.getTime() - startDate.getTime();

        const daysDiff = timeDiff / (1000 * 3600 * 24) + 1;

        const hoursPerDay = 8;
        const totalHours = daysDiff * hoursPerDay;

        return (
            <>
                <Text>
                    El proyecto iniciará el {startDateFormatted} y finalizará el{" "}
                    {endDateFormatted}.
                </Text>
                <Text>Aproximadamente {totalHours}h.</Text>
            </>
        );
    };

    const convertToObject = (array: string[]) => {
        return array.map((date) => ({
            date: date,
            name: "Evento",
            data: "lorem ipsum dolor sit amet",
            height: 0,
            day: "",
        }));
    };

    const handleCreateProject = async () => {
        const { title, description, roles, objectiveTimeline } = newProjectData;

        let objectiveTimelineObjects = convertToObject(objectiveTimeline);

        try {
            await createProject(
                currentUser?.id,
                currentUser?.name,
                title,
                description,
                roles,
                objectiveTimelineObjects
            );
        } catch (error) {
            Alert.alert("Error", "Failed to create project.");
            console.error("Error creating project:", error);
        }
    };

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
                            {newProjectData.title.length}/200
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
                            {newProjectData.description.length}/500
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

                {CreateNewProjectSteps[currentStep].type === "review" && (
                    <View className="flex-1">
                        <Text className=" font-bold text-xl">
                            {newProjectData.title}
                        </Text>
                        <Text className="text-gray-500 text-sm">
                            {newProjectData.description}
                        </Text>
                        <View>
                            <Text className=" font-bold text-lg">
                                Profesionales solicitados:
                            </Text>
                            {newProjectData.roles.map((role, index) => (
                                <Text
                                    key={index}
                                    className="text-gray-500 text-sm"
                                >
                                    {role}
                                </Text>
                            ))}
                        </View>
                        <Text className=" font-bold text-lg">Duración:</Text>

                        <View>{projectDuration()}</View>
                    </View>
                )}
            </View>

            {CreateNewProjectSteps[currentStep].type !== "review" ? (
                <View className="flex-row justify-between mt-4">
                    {currentStep > 0 && (
                        <TouchableOpacity
                            className="bg-gray_3 px-4 py-3 rounded-full flex-1 mr-2 items-center"
                            onPress={previousStep}
                        >
                            <Text className="text-white font-bold">
                                Anterior
                            </Text>
                        </TouchableOpacity>
                    )}
                    <TouchableOpacity
                        className={`px-4 py-3 rounded-full flex-1 items-center ${
                            isValid ? "bg-gray_3" : "bg-gray-300"
                        }`}
                        onPress={nextStep}
                        disabled={!isValid}
                    >
                        <Text className="text-white font-bold">Siguiente</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View className="flex-row justify-between mt-4">
                    {currentStep > 0 && (
                        <TouchableOpacity
                            className="bg-gray_3 px-4 py-3 rounded-full flex-1 mr-2 items-center"
                            onPress={previousStep}
                        >
                            <Text className="text-white font-bold">
                                Anterior
                            </Text>
                        </TouchableOpacity>
                    )}
                    <TouchableOpacity
                        className="bg-gray_3 px-4 py-3 rounded-full flex-1 mr-2 items-center"
                        onPress={handleCreateProject}
                    >
                        <Text className="text-white font-bold">
                            Crear proyecto
                        </Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

export default CreateNewProject;

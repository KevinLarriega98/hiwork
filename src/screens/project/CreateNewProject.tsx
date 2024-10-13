import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Calendar } from "react-native-calendars";
import useProjectStore from "../../stores/useProjectStore";
import useAuthStore from "../../stores/useAuthStore";
import { NavigationProp, useNavigation } from "@react-navigation/native";

import { RootStackParamList } from "../../types/navigation";
import CollapsibleType from "./components/CollapsibleType";
import ProjectDurationCard from "./components/ProjectDurationCard";

type MarkedDatesType = {
    [key: string]: {
        color: string;
        textColor: string;
        startingDay?: boolean;
        endingDay?: boolean;
    };
};

type RoleData = {
    role: string;
    count: number;
};

type ProjectData = {
    title: string;
    description: string;
    roles: RoleData[];
    objectiveTimeline: string[];
};

type RegisterScreenNavigationProp = NavigationProp<
    RootStackParamList,
    "TabsBottom"
>;

const CreateNewProject = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [isValid, setIsValid] = useState(false);

    const navigation = useNavigation<RegisterScreenNavigationProp>();

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

    console.log(objectiveTimeline);

    const [startDate, setStartDate] = useState<string>("");
    const [isStartDatePicked, setIsStartDatePicked] = useState<boolean>(false);

    console.log("this is marked", markedDates);

    const CreateNewProjectSteps = [
        {
            key: "1",
            step: "Paso 1",
            question: [
                "Ponle un título a tu proyecto:",
                "Describe tu proyecto:",
            ],
            placeholder: [
                "Escribe un título",
                "Describe tu proyecto es lo que verán los voluntarios",
            ],
            type: "input",
            data: ["title", "description"],
        },
        {
            key: "2",
            step: "Paso 2",
            question: "Que cargos necesitas:",
            options: ["Desarrollador", "Diseñador", "Traductor", "Marketing"],
            type: "options",
        },
        {
            key: "3",
            step: "Paso 3",
            question: "Para cuando debe de estar:",
            type: "dates",
        },
        {
            key: "4",
            step: "Paso 4",
            question: "Revisa tu información antes de finalizar",
            type: "review",
        },
    ];

    const validateCurrentStep = () => {
        if (currentStep === 0) {
            setIsValid(
                newProjectData.title.length > 0 &&
                    newProjectData.description.length > 0
            );
        } else if (currentStep === 1) {
            setIsValid(newProjectData.roles.length > 0);
        } else if (currentStep === 2) {
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

    const handleOptionsChange = (role: string, change: number) => {
        setNewProjectData((prevData: ProjectData) => {
            const currentCount =
                prevData.roles.find((r) => r.role === role)?.count || 0;

            const newCount = Math.max(0, currentCount + change);

            const updatedRoles = prevData.roles.filter((r) => r.role !== role);

            if (newCount > 0) {
                updatedRoles.push({ role, count: newCount });
            }

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
            ).then((res) => navigation.navigate("TabsBottom"));
        } catch (error) {
            Alert.alert("Error", "Failed to create project.");
            console.error("Error creating project:", error);
        }
    };

    return (
        <View className="flex-1 p-4 bg-white justify-center">
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View className="flex-row justify-between mb-4 bg-verde_claro rounded-full max-w-screen">
                        {CreateNewProjectSteps.map((step, index) => (
                            <View key={step.key} className="flex-1 ">
                                <Text
                                    className={`rounded-full text-center w-full py-3 ${
                                        currentStep === index
                                            ? "bg-verde_oscuro text-verde_claro"
                                            : "bg-verde_claro text-verde_oscuro"
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

                        {CreateNewProjectSteps[currentStep].type ===
                            "input" && (
                            <>
                                <TextInput
                                    className="border border-gray_3 p-3 rounded-md mb-4"
                                    placeholder={
                                        CreateNewProjectSteps[currentStep]
                                            ?.placeholder?.[0]
                                    }
                                    value={newProjectData.title}
                                    onChangeText={(text) =>
                                        handleInputChange(
                                            text,
                                            CreateNewProjectSteps[currentStep]
                                                .data?.[0]
                                        )
                                    }
                                    maxLength={200}
                                />
                                <Text className="text-right text-gray-500 px-3">
                                    {newProjectData.title.length}/200
                                </Text>
                                <Text className="text-xl font-bold mb-4">
                                    Describe tu proyecto:
                                </Text>
                                <TextInput
                                    className="border border-gray_3 p-3 rounded-md mb-4 "
                                    placeholder={
                                        CreateNewProjectSteps[currentStep]
                                            ?.placeholder?.[1]
                                    }
                                    value={newProjectData.description}
                                    onChangeText={(text) =>
                                        handleInputChange(
                                            text,
                                            CreateNewProjectSteps[currentStep]
                                                .data?.[1]
                                        )
                                    }
                                    maxLength={800}
                                    numberOfLines={18}
                                    multiline
                                    textAlignVertical="top"
                                />
                                <Text className="text-right text-gray-500 px-3">
                                    {newProjectData.description.length}/800
                                </Text>
                            </>
                        )}

                        {CreateNewProjectSteps[currentStep].type ===
                            "options" && (
                            <CollapsibleType
                                handleOptionsChange={handleOptionsChange}
                                newProjectDataRoles={newProjectData.roles}
                            />
                        )}

                        {CreateNewProjectSteps[currentStep].type ===
                            "dates" && (
                            <View className="flex-1">
                                <Calendar
                                    markingType={"period"}
                                    markedDates={markedDates}
                                    onDayPress={onDayPress}
                                />

                                {objectiveTimeline.length > 0 && (
                                    <ProjectDurationCard
                                        startDate={objectiveTimeline[0]}
                                        endDate={
                                            objectiveTimeline[
                                                objectiveTimeline.length - 1
                                            ]
                                        }
                                        description="Calendarización de 3 posts semanales, para este Julio."
                                    />
                                )}
                            </View>
                        )}

                        {CreateNewProjectSteps[currentStep].type ===
                            "review" && (
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
                                            className="text-gray_3 text-sm"
                                        >
                                            {role.role} : {role.count}{" "}
                                            {role.count > 1
                                                ? "professionals"
                                                : "professional"}
                                        </Text>
                                    ))}
                                </View>
                                <Text className=" font-bold text-lg">
                                    Duración:
                                </Text>

                                <View>{projectDuration()}</View>
                            </View>
                        )}
                    </View>

                    {CreateNewProjectSteps[currentStep].type !== "review" ? (
                        <View className="flex-row justify-between mt-4 gap-2">
                            {currentStep > 0 && (
                                <TouchableOpacity
                                    className=" py-4 rounded-full flex-1 items-center border border-cta_secondary "
                                    onPress={previousStep}
                                >
                                    <Text className="text-cta_secondary font-bold uppercase">
                                        Anterior
                                    </Text>
                                </TouchableOpacity>
                            )}
                            <TouchableOpacity
                                className={` py-4 rounded-full flex-1 items-center ${
                                    isValid
                                        ? "bg-cta_primary"
                                        : "bg-cta_primary opacity-30"
                                }`}
                                onPress={nextStep}
                                disabled={!isValid}
                            >
                                <Text
                                    className={`font-bold uppercase text-cta_secondary`}
                                >
                                    Siguiente
                                </Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View className="flex-row justify-between mt-4">
                            {currentStep > 0 && (
                                <TouchableOpacity
                                    className=" border border-verde_oscuro  py-4 rounded-full flex-1 mr-2 items-center  "
                                    onPress={previousStep}
                                >
                                    <Text className="text-verde_oscuro font-bold">
                                        Anterior
                                    </Text>
                                </TouchableOpacity>
                            )}
                            <TouchableOpacity
                                className="bg-verde_oscuro  py-4 rounded-full flex-1 mr-2 items-center"
                                onPress={handleCreateProject}
                            >
                                <Text className="text-verde_claro font-bold">
                                    Crear proyecto
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
};

export default CreateNewProject;

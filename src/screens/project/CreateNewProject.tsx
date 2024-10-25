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
    Modal,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Calendar } from "react-native-calendars";
import useProjectStore from "../../stores/useProjectStore";
import useAuthStore from "../../stores/useAuthStore";
import { NavigationProp, useNavigation } from "@react-navigation/native";

import { RootStackParamList } from "../../types/navigation";
import CollapsibleType from "./components/CollapsibleType";
import ProjectDurationCard from "./components/ProjectDurationCard";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { CalendarEvent } from "../../types/project";

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
    const convertToObject = (array: string[]) => {
        return array.map((date) => ({
            date: date,
            name: "Evento",
            data: "Haz clic para editar",
            height: 0,
            day: "",
        }));
    };
    const [currentStep, setCurrentStep] = useState(0);
    const [isValid, setIsValid] = useState(false);

    const navigation = useNavigation<RegisterScreenNavigationProp>();

    const { createProject } = useProjectStore((state) => ({
        createProject: state.createProject,
    }));

    const { currentUser } = useAuthStore();

    const [markedDates, setMarkedDates] = useState<MarkedDatesType>({});
    const [objectiveTimeline, setObjectiveTimeline] = useState<string[]>([]);
    const [objectiveTimelineDates, setObjectiveTimelineDates] = useState<any[]>(
        [convertToObject(objectiveTimeline)]
    );
    const [newProjectData, setNewProjectData] = useState<ProjectData>({
        title: "",
        description: "",
        roles: [],
        objectiveTimeline: objectiveTimeline,
    });

    const [startDate, setStartDate] = useState<string>("");
    const [isStartDatePicked, setIsStartDatePicked] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [dataDayPress, setDataDayPress] = useState<CalendarEvent>();

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
            question: "Este sera tu nuevo proyecto:",
            type: "review",
        },
    ];

    const handleDayPress = (date: any) => {
        setShowModal(true);
        let objectSameAsDate = objectiveTimelineDates.find(
            (item) => item.date === date
        );

        setDataDayPress(objectSameAsDate);
    };

    const handleDateChange = (newData: string) => {
        setDataDayPress((prevData) => {
            return {
                ...(prevData ?? {
                    date: "",
                    name: "Evento",
                    height: 0,
                    day: "",
                }),
                data: newData,
            };
        });

        setObjectiveTimelineDates((prevDates) => {
            const index = prevDates.findIndex(
                (item) => item.date === dataDayPress?.date
            );

            if (index !== -1) {
                const updatedDates = [...prevDates];
                updatedDates[index] = {
                    ...updatedDates[index],
                    data: newData,
                };
                return updatedDates;
            }

            return prevDates;
        });
    };

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
                    color: "#7F35E9",
                    textColor: "white",
                },
            });
        } else {
            const endDate = day.dateString;
            const range = getDateRange(startDate, endDate);

            // console.log("this is range", range);

            const rangeObject = range.reduce<MarkedDatesType>(
                (acc, date, index) => {
                    acc[date] = {
                        color: "#7F35E9",
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
            const prueba = convertToObject(range);
            setObjectiveTimelineDates(prueba);
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
            <View className="flex flex-col mt-3">
                <Text className=" text-base">
                    El proyecto iniciará el {startDateFormatted} y finalizará el{" "}
                    {endDateFormatted}.
                </Text>
                <Text className=" text-base">
                    Aproximadamente {totalHours}h.
                </Text>
            </View>
        );
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
            ).then((res) => navigation.navigate("Home"));
        } catch (error) {
            Alert.alert("Error", "Failed to create project.");
            console.error("Error creating project:", error);
        }
    };

    return (
        <View className="flex-1 p-4 bg-white justify-center">
            <Modal
                animationType="slide"
                transparent={true}
                visible={showModal}
                onRequestClose={() => {
                    setShowModal(!showModal);
                }}
            >
                <View className="flex-1 items-center justify-end ">
                    <View className="w-[90%] h-[50%] items-center justify-center bg-rosa rounded-lg p-9">
                        <View className="absolute top-0 right-0 p-2 rounded-full z-20">
                            <TouchableOpacity
                                onPress={() => setShowModal(!showModal)}
                            >
                                <MaterialCommunityIcons
                                    name="close"
                                    color={"#000000"}
                                    size={22}
                                />
                            </TouchableOpacity>
                        </View>
                        <Text className=" text-3xl">
                            Day {dataDayPress?.date.split("-")[2]}
                        </Text>
                        <Text className=" text-gray-500 text-lg mt-5">
                            Cambia la data del input para poder explicar la
                            tarea para el dia {dataDayPress?.date.split("-")[2]}
                        </Text>
                        <TextInput
                            placeholder={dataDayPress?.data}
                            value={dataDayPress?.data}
                            onChangeText={(e) => handleDateChange(e)}
                            className=" border px-4 py-2 rounded-md mt-4 w-full"
                        />
                    </View>
                </View>
            </Modal>

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
                                <Text className=" text-xl font-bold mb-3">
                                    Duración del proyecto
                                </Text>
                                {objectiveTimeline.length > 0 && (
                                    <FlatList
                                        data={objectiveTimelineDates}
                                        renderItem={(item) => (
                                            <ProjectDurationCard
                                                item={item}
                                                handleDayPress={handleDayPress}
                                                length={
                                                    objectiveTimeline.length
                                                }
                                                newProjectData={newProjectData}
                                                setNewProjectData={
                                                    setNewProjectData
                                                }
                                            />
                                        )}
                                        keyExtractor={(item) =>
                                            "aa-" +
                                            item.index +
                                            "--" +
                                            item.date
                                        }
                                        className=" max-h-[190px]"
                                    />
                                )}
                            </View>
                        )}

                        {CreateNewProjectSteps[currentStep].type ===
                            "review" && (
                            <View className="flex-1">
                                <Text className="  text-lg ">
                                    Revisa que este todo correcto antes de
                                    crearlo definitivamente.
                                </Text>
                                <Text className=" text-xl font-bold mt-3 mb-1">
                                    Titulo de proyecto
                                </Text>
                                <Text className=" text-xl">
                                    {newProjectData.title}
                                </Text>
                                <Text className=" text-xl font-bold mt-3 mb-1">
                                    Descripción del proyecto
                                </Text>
                                <Text className="text-gray-500 text-base">
                                    {newProjectData.description}
                                </Text>
                                <View>
                                    <Text className=" font-bold text-xl mt-3 mb-1">
                                        Profesionales solicitados:
                                    </Text>
                                    {newProjectData.roles.map((role, index) => (
                                        <View className=" flex flex-row justify-between items-center">
                                            <Text
                                                key={index}
                                                className="text-gray_3 text-base"
                                            >
                                                {role.role}
                                            </Text>
                                            <Text className=" text-base">
                                                {role.count}{" "}
                                                {role.count > 1
                                                    ? "professionals"
                                                    : "professional"}
                                            </Text>
                                        </View>
                                    ))}
                                </View>
                                <Text className=" font-bold text-xl mt-3 mb-1">
                                    Duración:
                                </Text>

                                <Text className=" text-base">
                                    {projectDuration()}
                                </Text>
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
                                className="py-4 rounded-full flex-1 items-center bg-cta_primary"
                                onPress={handleCreateProject}
                            >
                                <Text className="font-bold uppercase text-cta_secondary">
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

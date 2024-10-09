import React from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    FlatList,
} from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";

export const REGISTRATION_STEPS_VOLUNTARIO = [
    {
        key: "1",
        question: "¿Cuál es tu nombre? Voluntario",
        placeholder: "Nombre",
        type: "input",
    },
    {
        key: "2",
        question: "¿Qué disciplinas eres experto?",
        options: ["Reducir mi estrés3", "Reducir mi estrés4"],
        type: "options",
    },
    {
        key: "3",
        question: "Selecciona en qué tipo de proyectos te gustaría participar",
        options: ["Reducir mi estrés1", "Reducir mi estrés2"],
        type: "options",
    },
    {
        key: "4",
        message: "Danos un poco de información sobre ti",
        type: "input",
    },
    {
        key: "5",
        message: "Escoge un avatar",
        type: "image",
    },
    {
        key: "6",
        message: "Ya está tu perfil creado.\n¡A buscar proyectos!",
        type: "message",
    },
];

export const REGISTRATION_STEPS_ONG = [
    {
        key: "1",
        question: "¿Cuál es tu nombre? ONG",
        placeholder: "Nombre",
        type: "input",
    },
    {
        key: "2",
        question: "¿Qué disciplinas eres experto?",
        options: ["Reducir el meu estrés", "Reducir el meu estrés"],
        type: "options",
    },
    {
        key: "3",
        question: "Selecciona en qué tipo de proyectos te gustaría participar",
        options: ["Reducir mi estrés1", "Reducir mi estrés2"],
        type: "options",
    },
    {
        key: "4",
        message: "Danos un poco de información sobre ti",
        type: "input",
    },
    {
        key: "5",
        message: "Escoge un avatar",
        type: "image",
    },
    {
        key: "6",
        message: "Ya está tu perfil creado.\n¡A buscar proyectos!",
        type: "message",
    },
];

export const StepItem = {
    REGISTRATION_STEPS_VOLUNTARIO,
    REGISTRATION_STEPS_ONG,
};

export const renderItem = (
    { item }: { item: any },
    width: number,
    formData: { [key: string]: string },
    selectedOptions: { [key: string]: string },
    setFormData: (data: { [key: string]: string }) => void,
    setSelectedOptions: (data: { [key: string]: string }) => void,
    pickImage: () => void,
    image: string | null,
    progress: number
) => {
    console.log(selectedOptions);

    return (
        <View
            className="justify-center items-center p-6 mt-10 mx-10 rounded-2xl"
            style={{ width: width - 80 }}
        >
            <Text className="text-lg font-bold mb-4 text-center">
                {item.question || item.message}
            </Text>

            {item.type === "description" && (
                <Text className="text-base text-gray-600 text-center">
                    {item.message}
                </Text>
            )}

            {item.type === "image" && (
                <>
                    <TouchableOpacity
                        onPress={pickImage}
                        className="border border-gray-700 py-2 px-4 rounded mb-3"
                    >
                        <Text>Escoge un avatar de tu galería</Text>
                    </TouchableOpacity>
                    {image && (
                        <View className=" border border-gray-700 rounded-lg p-1 ">
                            <Image
                                source={{ uri: image }}
                                className=" w-[200px] h-[200px] "
                            />
                        </View>
                    )}
                </>
            )}
            {item.type === "message" || (
                <AnimatedCircularProgress
                    size={200}
                    width={4}
                    fill={progress}
                />
            )}
            {item.type === "input" && (
                <TextInput
                    className={`w-full p-2 border border-gray-300 rounded ${
                        item.key === "4" ? "h-32" : "h-12"
                    }`}
                    placeholder={item.placeholder}
                    value={formData[item.key] || ""}
                    onChangeText={(text) =>
                        setFormData({ ...formData, [item.key]: text })
                    }
                    multiline={item.key === "4"}
                    numberOfLines={item.key === "4" ? 5 : 1}
                    textAlignVertical={item.key === "4" ? "top" : "center"}
                />
            )}

            {item.type === "options" &&
                item.options.map((option: string, index: React.Key) => (
                    <TouchableOpacity
                        key={index}
                        className={`${
                            selectedOptions[item.key]?.includes(option) &&
                            "bg-verde_claro"
                        }
            w-full p-3 border border-gray-300 rounded mb-2 items-center
            `}
                        onPress={() => {
                            setSelectedOptions((prevSelectedOptions: any) => {
                                const currentOptions =
                                    prevSelectedOptions[item.key] || [];

                                const updatedOptions = currentOptions.includes(
                                    option
                                )
                                    ? currentOptions.filter(
                                          (opt: string) => opt !== option
                                      )
                                    : [...currentOptions, option];

                                return {
                                    ...prevSelectedOptions,
                                    [item.key]: updatedOptions,
                                };
                            });
                        }}
                    >
                        <Text className="text-black">{option}</Text>
                    </TouchableOpacity>
                ))}
        </View>
    );
};

export const isNextDisabled = (
    activeIndex: number,
    REGISTRATION_STEPS: any[],
    formData: { [key: string]: string },
    selectedOptions: { [key: string]: string },
    image: string | null
) => {
    const step = REGISTRATION_STEPS[activeIndex];
    if (step.type === "input" && !formData[step.key]) {
        return true;
    }
    if (step.type === "options" && !selectedOptions[step.key]) {
        return true;
    }

    if (step.type === "image" && !image) {
        return true;
    }
    return false;
};

export const handleNext = (
    activeIndex: number,
    flatListRef: React.RefObject<FlatList<any>>,
    setActiveIndex: (index: number) => void
) => {
    flatListRef.current?.scrollToIndex({ index: activeIndex + 1 });
    setActiveIndex(activeIndex + 1);
};

export const handlePrev = (
    activeIndex: number,
    flatListRef: React.RefObject<FlatList<any>>,
    setActiveIndex: (index: number) => void
) => {
    flatListRef.current?.scrollToIndex({ index: activeIndex - 1 });
    setActiveIndex(activeIndex - 1);
};

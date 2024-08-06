import React from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
} from "react-native";

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
        options: ["Reducir mi estrés", "Reducir mi estrés"],
        type: "options",
    },
    {
        key: "3",
        question: "Selecciona en qué tipo de proyectos te gustaría participar",
        options: ["Reducir mi estrés", "Reducir mi estrés"],
        type: "options",
    },
    {
        key: "4",
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
        options: ["Reducir mi estrés", "Reducir mi estrés"],
        type: "options",
    },
    {
        key: "4",
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
    setSelectedOptions: (data: { [key: string]: string }) => void
) => {
    return (
        <View
            className="justify-center items-center p-6 mt-10 mx-10 rounded-2xl"
            style={{ width: width - 80 }}
        >
            <Text className="text-lg font-bold mb-4 text-center">
                {item.question || item.message}
            </Text>
            {item.type === "input" && (
                <TextInput
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder={item.placeholder}
                    value={formData[item.key] || ""}
                    onChangeText={(text) =>
                        setFormData({ ...formData, [item.key]: text })
                    }
                />
            )}
            {item.type === "options" &&
                item.options.map((option: string, index: React.Key) => (
                    <TouchableOpacity
                        key={index}
                        className="w-full p-3 border border-gray-300 rounded mb-2 items-center"
                        onPress={() =>
                            setSelectedOptions({
                                ...selectedOptions,
                                [item.key]: option,
                            })
                        }
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
    selectedOptions: { [key: string]: string }
) => {
    const step = REGISTRATION_STEPS[activeIndex];
    if (step.type === "input" && !formData[step.key]) {
        return true;
    }
    if (step.type === "options" && !selectedOptions[step.key]) {
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

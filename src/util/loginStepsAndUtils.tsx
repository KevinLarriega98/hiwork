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
        options: ["Diseño", "Marketing", "Desarrollo y Tecnología", "Otros"],
        type: "options",
    },
    {
        key: "3",
        question: "¿Que herramientas dominas?",
        options: {
            Diseño: [
                "Diseño Gráfico",
                "Diseño Web",
                "UX/UI",
                "Diseño Editorial",
                "Branding",
                "Ilustración",
                "Animación",
                "Storyboard",
            ],
            Marketing: [
                "Marketing de Contenidos",
                "SEO",
                "SEM",
                "Social Media Marketing",
                "Email Marketing",
                "Influencer Marketing",
                "Analítica de Marketing",
                "Gestión de Proyectos",
                "Project Management",
                "Gestión de Equipos Creativos",
            ],
            "Desarrollo y Tecnología": [
                "Desarrollo Frontend",
                "Desarrollo Backend",
                "Full Stack",
                "Desarrollo de Aplicaciones",
                "Desarrollo Web",
                "Desarrollo de Videojuegos",
                "Inteligencia Artificial",
                "Realidad Aumentada",
                "Realidad Virtual",
                "Modelado 3D",
            ],
            Otros: [
                "Fotografía",
                "Video",
                "Edición de Vídeo",
                "Podcasting",
                "Copywriting",
                "Redacción de Contenidos",
                "UX Writing",
            ],
        },
        type: "herramientas",
    },
    {
        key: "4",
        message: "Danos un poco de información sobre ti",
        placeholder:
            "Danos un poco mas de info sobre ti es lo que vera la gente",
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
        question: "¿Cuál El nombre de la organización?",
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
    console.log(formData);

    const selectedDiscipline = selectedOptions["2"];

    return (
        <View className="flex mx-10 rounded-2xl " style={{ width: width - 80 }}>
            <Text className="text-lg font-bold text-center ">
                {item.question || item.message}
            </Text>

            {item.type === "description" && (
                <Text className="text-base text-gray-600 text-center  ">
                    {item.message}
                </Text>
            )}

            {item.type === "image" && (
                <View className=" justify-center items-center h-full">
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
                </View>
            )}

            {item.type === "message" && (
                <View className="flex items-center justify-center  h-full">
                    <Text className=" text-xl mb-2">Hola {formData["1"]}</Text>
                    <Text className="text-base text-gray-600 text-center ">
                        Muchas gracias por elegir Volu a por la búsqueda de
                        proyectos
                    </Text>

                    <AnimatedCircularProgress
                        size={200}
                        width={4}
                        fill={progress}
                    />
                </View>
            )}

            {item.type === "input" && (
                <View className=" flex items-center justify-center  h-full">
                    <TextInput
                        className={`w-full px-2 border border-gray-300 rounded  ${
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
                </View>
            )}
            {item.type === "options" && (
                <View className="flex items-center align-middle justify-center h-full">
                    {item.options.map((option: string, index: React.Key) => (
                        <TouchableOpacity
                            key={index}
                            className={`w-full p-3 border border-gray-300 rounded mb-2 items-center ${
                                Array.isArray(selectedOptions[item.key]) &&
                                selectedOptions[item.key]?.includes(option)
                                    ? "bg-verde_claro"
                                    : ""
                            }`}
                            onPress={() => {
                                setSelectedOptions((prevSelectedOptions) => {
                                    const currentOptions = Array.isArray(
                                        prevSelectedOptions[item.key]
                                    )
                                        ? prevSelectedOptions[item.key]
                                        : [];

                                    const updatedOptions =
                                        currentOptions.includes(option)
                                            ? currentOptions.filter(
                                                  (opt: string) =>
                                                      opt !== option
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
            )}

            <View className=" flex justify-center w-full h-full">
                {item.type === "herramientas" && selectedDiscipline && (
                    <>
                        <Text className="text-base text-gray-600 text-center mb-4">
                            ¿Qué herramientas dominas en {selectedDiscipline}?
                        </Text>

                        {REGISTRATION_STEPS_VOLUNTARIO[2].options[
                            selectedDiscipline
                        ]?.map((tool: string, index: React.Key) => (
                            <TouchableOpacity
                                key={index}
                                className={`${
                                    selectedOptions[item.key]?.includes(tool) &&
                                    "bg-verde_claro"
                                }
                w-full p-3 border border-gray-300 rounded mb-2 items-center
                `}
                                onPress={() => {
                                    setSelectedOptions(
                                        (prevSelectedOptions) => {
                                            const currentTools =
                                                prevSelectedOptions[item.key] ||
                                                [];

                                            const updatedTools =
                                                currentTools.includes(tool)
                                                    ? currentTools.filter(
                                                          (t: string) =>
                                                              t !== tool
                                                      )
                                                    : [...currentTools, tool];

                                            return {
                                                ...prevSelectedOptions,
                                                [item.key]: updatedTools,
                                            };
                                        }
                                    );
                                }}
                            >
                                <Text className="text-black">{tool}</Text>
                            </TouchableOpacity>
                        ))}
                    </>
                )}
            </View>
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

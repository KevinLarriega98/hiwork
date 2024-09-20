import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
} from "react-native";
import React, { useState } from "react";
import { styled } from "nativewind"; // Para usar Tailwind con React Native

const CreateNewProject = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [inputValue, setInputValue] = useState(""); // Para almacenar el valor del input
    const [isValid, setIsValid] = useState(false); // Para validar si se puede pasar al siguiente paso

    // Definir los pasos
    const CreateNewProjectSteps = [
        {
            key: "1",
            step: "Paso 1",
            question: "Ponle un título a tu proyecto:",
            placeholder: "Escribe un título",
            type: "input",
        },
        {
            key: "2",
            step: "Paso 2",
            question: "Describe tu proyecto:",
            placeholder: "Describe tu proyecto es lo que verán los voluntarios",
            type: "inputBig",
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
            question: "Revisa tu información antes de finalizar",
            type: "review",
        },
    ];

    // Función para avanzar al siguiente paso
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

    const handleInputChange = (text: string) => {
        setInputValue(text);
        setIsValid(text.length > 0);
    };

    return (
        <View className="flex-1 p-5 bg-white">
            <View className="flex-row justify-between mb-4 bg-gray-300 rounded-full">
                {CreateNewProjectSteps.map((step, index) => (
                    <View key={step.key} className="items-center">
                        <Text
                            className={`px-6 py-2 rounded-full text-center ${
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
                <Text className="text-lg mb-4">
                    {CreateNewProjectSteps[currentStep].question}
                </Text>

                {CreateNewProjectSteps[currentStep].type === "input" && (
                    <>
                        <TextInput
                            className="border border-gray_3 p-3 rounded-md mb-4"
                            placeholder={
                                CreateNewProjectSteps[currentStep].placeholder
                            }
                            value={inputValue}
                            onChangeText={handleInputChange} // Validación en tiempo real
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
                            className="border border-gray_3 p-3 rounded-md mb-4"
                            placeholder={
                                CreateNewProjectSteps[currentStep].placeholder
                            }
                            value={inputValue}
                            onChangeText={handleInputChange} // Validación en tiempo real
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
                                <TouchableOpacity>
                                    <Text>{item}</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    />
                )}
            </View>

            {/* Botones de navegación */}
            <View className="flex-row justify-between mt-4">
                {currentStep > 0 && (
                    <TouchableOpacity
                        className="bg-purple-600 px-4 py-3 rounded-full flex-1 mr-2 items-center"
                        onPress={previousStep}
                    >
                        <Text className="text-white font-bold">Anterior</Text>
                    </TouchableOpacity>
                )}
                <TouchableOpacity
                    className={`px-4 py-3 rounded-full flex-1 items-center ${
                        isValid ? "bg-yellow-500" : "bg-gray-300"
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

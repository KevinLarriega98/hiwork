import React from "react";
import { View } from "react-native";

interface StepIndicatorProps {
    currentStep: number;
    totalSteps: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({
    currentStep,
    totalSteps,
}) => {
    const steps = Array.from({ length: totalSteps }, (_, index) => index + 1);

    return (
        <View className="absolute bottom-10 flex-row justify-center items-center w-full">
            {steps.map((step) => (
                <View
                    key={step}
                    className={`h-2 w-2 rounded-full mx-1 ${
                        step === currentStep ? "bg-black" : "bg-gray-300"
                    }`}
                />
            ))}
        </View>
    );
};

export default StepIndicator;

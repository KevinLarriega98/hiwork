import React from "react";
import { Text, View, TextInput, StyleSheet } from "react-native";

interface InputProps {
    label?: string;
    placeHolder: string;
    value?: string;
    onChange: React.Dispatch<React.SetStateAction<string>>;
}

export const RegisterInput = ({
    label,
    placeHolder,
    value,
    onChange,
}: InputProps) => {
    return (
        <View style={InputStyle.container}>
            {label && <Text>{label}:</Text>}
            <TextInput
                style={InputStyle.input}
                placeholder={placeHolder}
                value={value}
                onChangeText={onChange}
            />
        </View>
    );
};

const InputStyle = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        paddingVertical: 8,
    },
    fontColor: {
        color: "#000",
    },
    input: {
        width: "100%",
        borderColor: "#a5a0a0",
        borderWidth: 1,
        height: 35,
        padding: 5,
        borderRadius: 5,
        shadowColor: "inset 0 5 5 #a5a0a0",
    },
    label: {
        width: "100%",
    },
});

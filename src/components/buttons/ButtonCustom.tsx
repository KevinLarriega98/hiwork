import React from "react";
import { Text, GestureResponderEvent, TouchableOpacity } from "react-native";

interface ButtonCustomProps {
    functionDirection: (event: GestureResponderEvent) => void;
    text: string;
    haveBackground: boolean;
    customStyle?: string;
}

const ButtonCustom: React.FC<ButtonCustomProps> = ({
    functionDirection,
    text,
    haveBackground,
    customStyle = "",
}) => (
    <TouchableOpacity
        onPress={functionDirection}
        className={`${customStyle} w-full py-4 rounded-full ${
            haveBackground ? "bg-[#D7FF3C]" : "border border-black"
        }`}
    >
        <Text className="text-center text-black font-bold">{text}</Text>
    </TouchableOpacity>
);

export default ButtonCustom;

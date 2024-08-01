import { View, Text } from "react-native";
import React from "react";
import useUserStore from "../../context/useRegisterStore";
const { auth } = require("firebase/auth");

const PerfilTabScreen = () => {
    console.log(auth);
    const { currentUser } = useUserStore();

    return (
        <View>
            <Text>Perfil</Text>
            <Text>{JSON.stringify(currentUser)}</Text>
        </View>
    );
};

export default PerfilTabScreen;

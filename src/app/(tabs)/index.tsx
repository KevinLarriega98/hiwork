import { View } from "react-native";
import { Link } from "expo-router";
import React from "react";
import AuthComponent from "../../components/AuthComponent";

export default function Index() {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                marginHorizontal: 20,
            }}
        >
            <AuthComponent />
            <Link
                href="/details"
                style={{
                    backgroundColor: "red",
                    marginTop: 20,
                    alignSelf: "center",
                    padding: 10,
                }}
            >
                Go details
            </Link>
        </View>
    );
}

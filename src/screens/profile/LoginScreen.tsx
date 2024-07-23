import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    Pressable,
} from "react-native";
import useAuthStore from "../../context/useAuthStore";
import { useNavigation } from "@react-navigation/native";
import { RootStackParams } from "../../routes/LoginStackNavigation";
import { GoogleButtonAcces } from "../../service/auth/GoogleButtonAcces";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const LoginScreen = () => {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation<RootStackParams>();

    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [password, setPassword] = useState("");
    const [type, setType] = useState("volunteer");
    const { user, isAuthenticated, login, register, logout, initializeAuth } =
        useAuthStore();

    useEffect(() => {
        initializeAuth();
    }, [initializeAuth]);

    const handleLogin = async () => {
        try {
            await login(email, password);
            console.log("Logged in successfully");
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
                console.error("Login failed:", error.message);
            } else {
                setError("An unknown error occurred");
                console.error("Login failed:", error);
            }
            setTimeout(() => setError(""), 3000);
        }
    };

    const handleRegister = async () => {
        try {
            await register(email, password, type);
            console.log("Registered successfully");
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
                console.error("Registration failed:", error.message);
            } else {
                setError("An unknown error occurred");
                console.error("Registration failed:", error);
            }
            setTimeout(() => setError(""), 3000);
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
            console.log("Logged out successfully");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <View
            style={{
                paddingBottom: insets.bottom,
                paddingTop: insets.top,
                paddingLeft: insets.left,
                paddingRight: insets.right,
            }}
        >
            <Text style={styles.title}>Authentication</Text>
            <Text>Type: {type}</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <View
                style={{
                    display: "flex",
                    gap: 10,
                    flexDirection: "row",
                    justifyContent: "center",
                    marginBottom: 16,
                }}
            >
                <Button
                    title="Volunteer"
                    onPress={() => setType("volunteer")}
                    color={"red"}
                />
                <Button
                    title="ONG"
                    onPress={() => setType("ong")}
                    color={"red"}
                />
            </View>
            <View style={{ display: "flex", gap: 10 }}>
                <Button title="Login" onPress={handleLogin} />
                <Button title="Register" onPress={handleRegister} />
                <Pressable
                    onPress={() => navigation.navigate("RegisterScreen")}
                >
                    <Text>REGISTRARSE</Text>
                </Pressable>
                <Pressable
                    onPress={() => navigation.navigate("TabsScreen")}
                >
                    <Text>Acceso a las tabs de prueba</Text>
                </Pressable>
                <GoogleButtonAcces />
                {isAuthenticated && (
                    <Button title="Logout" onPress={handleLogout} />
                )}
                {error && (
                    <Text style={{ color: "red", textAlign: "center" }}>
                        {error}
                    </Text>
                )}
                {user && (
                    <Text style={{ color: "green", textAlign: "center" }}>
                        Welcome, {user.email}
                    </Text>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        marginBottom: 16,
        textAlign: "center",
    },
    input: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 8,
    },
});

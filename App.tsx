import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import AuthComponent from "./src/components/AuthComponent";

const App = () => {
    return (
        <View style={{ flex: 1 }}>
            <Text>Hello World!!</Text>
            <AuthComponent />
        </View>
    );
};

export default App;

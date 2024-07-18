import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import Main from "./src/components/Main";
import { SafeAreaProvider } from "react-native-safe-area-context";

const App = () => {
    return (
        <SafeAreaProvider>
            <StatusBar style="auto" />
            <Main />
        </SafeAreaProvider>
    );
};

export default App;

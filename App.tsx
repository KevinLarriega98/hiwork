import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import Main from "./src/components/Main";
import { SafeAreaProvider } from "react-native-safe-area-context";

const App = () => {
  return (
    <SafeAreaProvider>
      <View>
        <StatusBar style="auto" />
        <Main />
      </View>
    </SafeAreaProvider>
  );
};

export default App;

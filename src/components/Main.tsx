import "react-native-gesture-handler";
import React from "react";
import { Text, View } from "react-native";
import AuthComponent from "./AuthComponent";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Main = () => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        flex: 1,
        paddingBottom: insets.bottom,
        paddingTop: insets.top,
      }}
    >
      <Text>Hello World!!</Text>
      <AuthComponent />
    </View>
  );
};

export default Main;

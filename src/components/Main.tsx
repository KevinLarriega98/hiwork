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
        paddingBottom: insets.bottom,
        paddingTop: insets.top,
        paddingHorizontal: 20,
      }}
    >
      <AuthComponent />
    </View>
  );
};

export default Main;

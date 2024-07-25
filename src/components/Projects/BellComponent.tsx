import { Text, View } from "react-native";
import React, { Component } from "react";
import BellSVG from "./svg/BellSVG";

export class BellComponent extends Component {
    render() {
        return (
            <View className="flex flex-row items-center justify-end mt-1">
                <View className="pl-4 pr-6 py-2 bg-[#e6e6e6] rounded-tl-full rounded-bl-full justify-end items-center flex align-bottom">
                    <BellSVG />
                </View>
            </View>
        );
    }
}

export default BellComponent;

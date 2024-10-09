import React, { useState } from "react";
import { Dimensions, View, Text } from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import TabBarCustomProfile from "../../components/profile/TabBarCustomProfile";

const ProyectosTabScreen = () => {
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: "lista", title: "Lista" },
        { key: "calendario", title: "Calendario" },
    ]);

    const ListaScreen = () => (
        <View className="flex-1 px-6">
            <Text>Proyectos</Text>
        </View>
    );

    const CalendarioScreen = () => (
        <View className="flex-1 items-center">
            <Text>Calendario</Text>
        </View>
    );

    const initialLayout = { width: Dimensions.get("window").width };

    const renderScene = SceneMap({
        lista: ListaScreen,
        calendario: CalendarioScreen,
    });

    return (
        <View className="flex-1 my-2">
            <Text className=" text-2xl text-center">Proyectos</Text>
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={initialLayout}
                renderTabBar={(props) => <TabBarCustomProfile {...props} />}
            />
        </View>
    );
};

export default ProyectosTabScreen;

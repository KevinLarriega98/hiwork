import React, { useState, useCallback, useEffect } from "react";
import {
    Dimensions,
    View,
    Text,
    FlatList,
    ActivityIndicator,
    ImageBackground,
} from "react-native";
import { TabView } from "react-native-tab-view";
import TabBarCustomProfile from "../../components/profile/TabBarCustomProfile";
import useAuthStore from "../../stores/useAuthStore";
import withSafeArea from "../../util/withSafeArea";
import { getProjectsByOngId } from "../../service/api/projectService";
import CardProject from "./components/CardProject";
import loader from "../../util/loader";

const ProyectosONGTabScreen = () => {
    const backgroundImg = require("../../assets/backgroundVolu.png");

    const [index, setIndex] = useState(0);
    const { currentUser } = useAuthStore();
    const [routes] = useState([
        { key: "lista", title: "Lista" },
        { key: "calendario", title: "Calendario" },
    ]);

    const [projects, setProjects] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProjects = async () => {
            setLoading(true);
            setError(null); // Resetear el error
            try {
                const data = await getProjectsByOngId(currentUser?.id);
                setProjects(data);
            } catch (err) {
                console.error("Error fetching projects:", err);
                setError(
                    "No se pudieron cargar los proyectos. Inténtalo de nuevo más tarde."
                );
            } finally {
                setLoading(false);
            }
        };

        if (currentUser?.id) {
            fetchProjects();
        }
    }, [currentUser?.id]);

    const renderListaScreen = useCallback(
        () => (
            <View className="flex-1 px-6 mt-2">
                {loading ? (
                    loader("Cargando...")
                ) : error ? (
                    <Text className="text-red-600 text-center">{error}</Text>
                ) : projects.length > 0 ? (
                    <FlatList
                        data={projects}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => <CardProject item={item} />}
                        contentContainerStyle={{ paddingBottom: 20 }}
                    />
                ) : (
                    <Text className="text-base text-center">
                        No hay proyectos disponibles.
                    </Text>
                )}
            </View>
        ),
        [loading, error, projects]
    );

    const renderCalendarioScreen = useCallback(
        () => (
            <View className="flex-1 items-center">
                <Text className="text-lg mt-4">Calendario</Text>
            </View>
        ),
        []
    );

    const initialLayout = { width: Dimensions.get("window").width };

    const renderScene = ({ route }: { route: any }) => {
        switch (route.key) {
            case "lista":
                return renderListaScreen();
            case "calendario":
                return renderCalendarioScreen();
            default:
                return null;
        }
    };

    return (
        <ImageBackground className="flex-1" source={backgroundImg}>
            <View className="flex-1 my-2">
                <Text className="text-2xl text-center mb-4">
                    Proyectos de la ONG
                </Text>
                <TabView
                    navigationState={{ index, routes }}
                    renderScene={renderScene}
                    onIndexChange={setIndex}
                    initialLayout={initialLayout}
                    renderTabBar={(props) => <TabBarCustomProfile {...props} />}
                    lazy={true}
                    lazyPreloadDistance={1}
                />
            </View>
        </ImageBackground>
    );
};

export default withSafeArea(ProyectosONGTabScreen);

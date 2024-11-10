import React, { useState, useCallback, useEffect } from "react";
import {
    Dimensions,
    View,
    Text,
    FlatList,
    ImageBackground,
} from "react-native";
import { TabView } from "react-native-tab-view";
import TabBarCustomProfile from "../../components/profile/TabBarCustomProfile";
import useAuthStore from "../../stores/useAuthStore";
import withSafeArea from "../../util/withSafeArea";
import { getProjectsByOngId } from "../../service/api/projectService";
import CardProject from "./components/CardProject";
import loader from "../../util/loader";
import { Calendar, DateData } from "react-native-calendars";

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
    const [calendarDates, setCalendarDates] = useState<any>({});
    const [activeProject, setActiveProject] = useState<any>(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        if (currentUser?.uid) {
            const unsubscribe = getProjectsByOngId(
                currentUser.uid,
                (updatedProjects) => {
                    setProjects(updatedProjects);
                    setLoading(false);

                    const active = updatedProjects[0] || null;
                    setActiveProject(active);

                    if (active?.objectiveTimeline) {
                        const dates = active.objectiveTimeline.reduce(
                            (acc: { [key: string]: any }, event) => {
                                acc[event.date] = {
                                    marked: true,
                                    dotColor: event.isChecked
                                        ? "#004932"
                                        : "#FFB2E2",
                                    selected: event.isChecked,
                                    selectedColor: event.isChecked
                                        ? "green"
                                        : "red",
                                };
                                return acc;
                            },
                            {}
                        );
                        setCalendarDates(dates);
                    }
                },
                (err) => {
                    console.error("Error en la suscripción de proyectos:", err);
                    setError(
                        "No se pudieron cargar los proyectos. Inténtalo de nuevo más tarde."
                    );
                    setLoading(false);
                }
            );

            return () => {
                unsubscribe && unsubscribe();
            };
        } else {
            setLoading(false);
        }
    }, [currentUser?.uid]);

    const renderListaScreen = useCallback(
        () => (
            <View className="flex-1 px-6 mt-2">
                {loading ? (
                    loader("Cargando...")
                ) : error ? (
                    <Text className="text-red-600 text-center">{error}</Text>
                ) : projects.length > 0 ? (
                    <View className="flex-1">
                        <Text className=" text-xl  mb-1">Mis Proyectos</Text>
                        <FlatList
                            data={projects}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <CardProject item={item} />
                            )}
                            contentContainerStyle={{ paddingBottom: 20 }}
                        />
                    </View>
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
            <View className="flex-1 px-6">
                <Text className="text-2xl mb-4 text-center">Calendario</Text>
                {activeProject ? (
                    <View>
                        <Calendar
                            markedDates={calendarDates}
                            onDayPress={(day: DateData) => {
                                const event =
                                    activeProject.objectiveTimeline.find(
                                        (ev: { date: string }) =>
                                            ev.date === day.dateString
                                    );
                                if (event) {
                                    console.log(
                                        "Evento:",
                                        event.name,
                                        event.data
                                    );
                                } else {
                                    console.log(
                                        "No hay eventos en esta fecha."
                                    );
                                }
                            }}
                        />

                        {/* Leyenda ajustada a su contenido */}
                        <View className="flex flex-col items-left mt-2 ">
                            <View className="flex flex-row items-center px-2 py-1">
                                <View className="w-4 h-4 rounded-full bg-verde_oscuro mr-2 border" />
                                <Text>Evento completado</Text>
                            </View>
                            <View className="flex flex-row items-center px-2 py-1">
                                <View className="w-4 h-4 rounded-full bg-rosa mr-2 border" />
                                <Text>Evento pendiente</Text>
                            </View>
                        </View>
                    </View>
                ) : (
                    <Text>
                        No hay proyectos activos para mostrar en el calendario.
                    </Text>
                )}
            </View>
        ),
        [calendarDates, activeProject]
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

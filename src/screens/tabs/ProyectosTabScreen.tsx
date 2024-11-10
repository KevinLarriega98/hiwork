import React, { useEffect, useState, useCallback, useRef } from "react";
import {
    Dimensions,
    View,
    Text,
    FlatList,
    ImageBackground,
} from "react-native";
import { TabView } from "react-native-tab-view";
import { Calendar, DateData } from "react-native-calendars";
import TabBarCustomProfile from "../../components/profile/TabBarCustomProfile";
import useAuthStore from "../../stores/useAuthStore";

import CardProject from "./components/CardProject";
import loader from "../../util/loader";
import withSafeArea from "../../util/withSafeArea";
import { getProjects } from "../../service/api/projectService";
import { Project } from "../../types/Project";

const ProyectosTabScreen = () => {
    const backgroundImg = require("../../assets/backgroundVolu.png");

    const [index, setIndex] = useState(0);
    const { currentUser } = useAuthStore();
    const [routes] = useState([
        { key: "lista", title: "Lista" },
        { key: "calendario", title: "Calendario" },
    ]);
    const [localProjects, setLocalProjects] = useState<Project[]>([]);
    const [activeProject, setActiveProject] = useState<Project | null>(null);
    const [appliedProjects, setAppliedProjects] = useState<Project[]>([]);
    const [savedProjects, setSavedProjects] = useState<Project[]>([]);
    const [calendarDates, setCalendarDates] = useState({});
    const [loading, setLoading] = useState<boolean>(true);

    const unsubscribeRef = useRef<() => void | undefined>();

    useEffect(() => {
        setLoading(true);

        const unsubscribe = getProjects((projects) => {
            if (currentUser?.profileType === "Voluntario") {
                const active = projects.find((project) =>
                    project.applications.some(
                        (app) =>
                            app.volunteerID === currentUser.uid &&
                            app.status === "accepted"
                    )
                );

                const applied = projects.filter((project) =>
                    project.applications.some(
                        (app) =>
                            app.volunteerID === currentUser.uid &&
                            app.status === "pending"
                    )
                );

                setActiveProject(active || null);
                setAppliedProjects(applied);

                // Configurar las fechas del calendario a partir del objectiveTimeline del proyecto activo
                if (active?.objectiveTimeline) {
                    const dates = active.objectiveTimeline.reduce(
                        (
                            acc: {
                                [key: string]: {
                                    marked: boolean;
                                    dotColor: string;
                                    selected: boolean;
                                    selectedColor: string;
                                };
                            },
                            event
                        ) => {
                            acc[event.date] = {
                                marked: true,
                                dotColor: event.isChecked ? "green" : "red",
                                selected: event.isChecked,
                                selectedColor: event.isChecked
                                    ? "green"
                                    : "red",
                            };
                            return acc;
                        },
                        {} as {
                            [key: string]: {
                                marked: boolean;
                                dotColor: string;
                                selected: boolean;
                                selectedColor: string;
                            };
                        }
                    );
                    setCalendarDates(dates);
                }
            }
            setLocalProjects(projects);
            setLoading(false);
        });

        unsubscribeRef.current = unsubscribe;

        return () => {
            if (unsubscribeRef.current) {
                unsubscribeRef.current();
            }
        };
    }, [currentUser]);

    const renderListaScreen = useCallback(
        () => (
            <View className="flex-1 px-6">
                <View className=" max-h-1/2 min-h-[200px]">
                    <Text className=" text-2xl my-3">Proyecto Activo</Text>

                    {loading ? (
                        loader("Cargando...")
                    ) : activeProject ? (
                        <CardProject item={activeProject} />
                    ) : (
                        <Text>No hay proyectos activos.</Text>
                    )}
                </View>

                <View className=" max-h-1/2 min-h-[200px]">
                    <Text className=" text-2xl my-3">Proyectos Aplicados</Text>
                    {appliedProjects.length > 0 ? (
                        loading ? (
                            loader("Cargando...")
                        ) : (
                            <FlatList
                                data={appliedProjects}
                                keyExtractor={(item) => item.id}
                                renderItem={({ item }) => (
                                    <CardProject item={item} />
                                )}
                            />
                        )
                    ) : (
                        <Text className=" text-base text-center">
                            Aún no tienes proyectos aplicados.
                        </Text>
                    )}
                </View>
            </View>
        ),
        [appliedProjects, activeProject, savedProjects, loading]
    );

    // Renderizar la pantalla del calendario con las fechas del proyecto activo
    const renderCalendarioScreen = useCallback(
        () => (
            <View className="flex-1 items-center">
                <Text className="text-2xl mb-4">Calendario</Text>
                {activeProject ? (
                    <Calendar
                        markedDates={calendarDates}
                        onDayPress={(day: DateData) => {
                            const event = activeProject.objectiveTimeline.find(
                                (ev) => ev.date === day.dateString
                            );
                            if (event) {
                                console.log("Evento:", event.name, event.data);
                            } else {
                                console.log("No hay eventos en esta fecha.");
                            }
                        }}
                    />
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
                <Text className=" text-2xl text-center">Proyectos</Text>
                <TabView
                    navigationState={{ index, routes }}
                    renderScene={renderScene}
                    onIndexChange={setIndex}
                    initialLayout={initialLayout}
                    renderTabBar={(props) => <TabBarCustomProfile {...props} />}
                />
            </View>
        </ImageBackground>
    );
};

export default withSafeArea(ProyectosTabScreen);

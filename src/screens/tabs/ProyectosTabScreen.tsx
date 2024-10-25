import React, { useEffect, useState, useCallback } from "react";
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
import {
    getProjectsByIds,
    getApplications,
} from "../../service/api/projectService"; // Importa la nueva función
import CardProject from "./components/CardProject";
import loader from "../../util/loader";
import withSafeArea from "../../util/withSafeArea";

const ProyectosTabScreen = () => {
    const backgroundImg = require("../../assets/backgroundVolu.png");

    const [index, setIndex] = useState(0);
    const { currentUser } = useAuthStore();
    const [routes] = useState([
        { key: "lista", title: "Lista" },
        { key: "calendario", title: "Calendario" },
    ]);
    const [projects, setProjects] = useState<any>([]);
    const [activeProject, setActiveProject] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (currentUser?.proyectosAplicados) {
            const fetchProjectsAndListenApplications = async () => {
                setLoading(true);
                try {
                    const projectsData = await getProjectsByIds(
                        currentUser.proyectosAplicados
                    );

                    // Para cada proyecto, escucha su subcolección de aplicaciones
                    const unsubscribeArray = projectsData.map((project: any) =>
                        getApplications(project.id, (applications) => {
                            // Encontrar la aplicación de este usuario
                            const userApplication = applications.find(
                                (application: any) =>
                                    application.volunteerID === currentUser.id
                            );

                            if (userApplication) {
                                project.status = userApplication.status;
                            }

                            const activeProj = projectsData.find(
                                (proj: any) => proj.status === "accepted"
                            );
                            setActiveProject(activeProj || null);

                            const appliedProjects = projectsData.filter(
                                (proj: any) => proj.status !== "accepted"
                            );

                            setProjects(appliedProjects);
                        })
                    );

                    setLoading(false);

                    // Limpia las suscripciones al desmontar el componente
                    return () =>
                        unsubscribeArray.forEach((unsubscribe) =>
                            unsubscribe()
                        );
                } catch (error) {
                    console.error("Error fetching projects:", error);
                    setLoading(false);
                }
            };

            fetchProjectsAndListenApplications();
        }
    }, [currentUser?.proyectosAplicados]);

    // Lista de proyectos activos y aplicados
    const renderListaScreen = useCallback(
        () => (
            <View className="flex-1 px-6">
                {/* Sección de Proyecto Activo */}
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

                {/* Sección de Proyectos Aplicados */}
                <View className=" max-h-1/2 min-h-[200px]">
                    <Text className=" text-2xl my-3">Proyectos Aplicados</Text>
                    {projects.length > 0 ? (
                        loading ? (
                            loader("Cargando...")
                        ) : (
                            <FlatList
                                data={projects}
                                keyExtractor={(item) => item.id}
                                renderItem={(item) => (
                                    <CardProject item={item.item} />
                                )}
                            />
                        )
                    ) : (
                        <Text className=" text-base text-center">
                            Aun no tienes proyectos aplicados
                        </Text>
                    )}
                </View>
            </View>
        ),
        [projects, activeProject, loading]
    );

    const renderCalendarioScreen = useCallback(
        () => (
            <View className="flex-1 items-center">
                <Text>Calendario</Text>
            </View>
        ),
        []
    );

    const initialLayout = { width: Dimensions.get("window").width };

    // Crear una función personalizada para renderizar escenas
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
                    lazy={true}
                    lazyPreloadDistance={1}
                />
            </View>
        </ImageBackground>
    );
};

export default withSafeArea(ProyectosTabScreen);

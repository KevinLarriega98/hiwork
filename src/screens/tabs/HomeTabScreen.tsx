import {
    View,
    Text,
    FlatList,
    RefreshControl,
    TouchableOpacity,
    ImageBackground,
} from "react-native";
import React, { useEffect, useState, useCallback, useRef } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import InfoSVG from "../../components/Projects/svg/InfoSVG";
import { getProjects } from "../../service/api/projectService";
import loader from "../../util/loader";
import { useNavigation } from "@react-navigation/native";
import useAuthStore from "../../stores/useAuthStore";
import CardProject from "./components/CardProject";
import withSafeArea from "../../util/withSafeArea";
import CardProjectActual from "./components/CardProjectActual";
import { BlurView } from "expo-blur";
import { Project } from "../../types/Project";

const HomeTabScreen = () => {
    const backgroundImg = require("../../assets/backgroundVolu.png");
    const navigation2 = useNavigation<any>();
    const { currentUser } = useAuthStore();

    const [localProjects, setLocalProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const unsubscribeRef = useRef<() => void | undefined>();

    useEffect(() => {
        setLoading(true);

        const unsubscribe = getProjects((projects) => {
            setLocalProjects(projects);
            setLoading(false);
        });

        unsubscribeRef.current = unsubscribe;

        return () => {
            if (unsubscribeRef.current) {
                unsubscribeRef.current();
            }
        };
    }, []);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        try {
            if (unsubscribeRef.current) {
                unsubscribeRef.current();
            }
            const unsubscribe = getProjects((projects) => {
                setLocalProjects(projects);
                setRefreshing(false);
            });

            unsubscribeRef.current = unsubscribe;
        } catch (error) {
            console.error("Error refreshing projects:", error);
            setRefreshing(false);
        }
    }, []);

    const handleCreateProject = () => {
        navigation2.navigate("CreateNewProject");
    };

    // Filtrar proyectos para la ONG (la ONG ve todos los proyectos que ha creado)
    const localProjectsOng: Project[] = localProjects.filter(
        (project: Project) => project.ongID === currentUser?.uid
    );

    // Filtrar proyectos en los que el voluntario ha aplicado, y sus estados
    const localProjectsWhiteOutMyProjects = localProjects.filter(
        (project: Project) => project.ongID !== currentUser?.uid
    );

    // Para el voluntario: Filtrar los proyectos "aceptados" y "otros" proyectos.
    const volunteerAcceptedProjects = localProjectsWhiteOutMyProjects.filter(
        (project: Project) =>
            project.applications?.some(
                (application: any) =>
                    application.volunteerID === currentUser?.uid &&
                    application.status === "accepted"
            )
    );

    const volunteerOtherProjects = localProjectsWhiteOutMyProjects.filter(
        (project: Project) =>
            !project.applications?.some(
                (application: any) =>
                    application.volunteerID === currentUser?.uid &&
                    application.status === "accepted"
            )
    );

    return (
        <ImageBackground className="flex-1" source={backgroundImg}>
            <View className="flex-1 px-4 pt-4">
                <Text className="text-xl font-bold mb-4 px-2">
                    Hola, {currentUser?.name}
                </Text>

                {/* Proyectos Activos para el voluntario (aceptados) */}
                {currentUser?.profileType === "Voluntario" &&
                volunteerAcceptedProjects.length > 0 ? (
                    <View>
                        <Text className="text-xl font-bold mb-4">
                            Proyectos Activos
                        </Text>
                        <FlatList
                            data={volunteerAcceptedProjects}
                            renderItem={(item) => (
                                <CardProjectActual item={item.item} />
                            )}
                            keyExtractor={(item) => item.id!}
                            refreshControl={
                                <RefreshControl
                                    refreshing={refreshing}
                                    onRefresh={onRefresh}
                                />
                            }
                        />
                    </View>
                ) : (
                    currentUser?.profileType === "Voluntario" && (
                        <View className="bg-gray_1 p-4 rounded-2xl mb-4 flex flex-row items-center justify-evenly">
                            <InfoSVG />
                            <Text className="text-text_black text-center text-base">
                                No tienes proyectos activos
                            </Text>
                        </View>
                    )
                )}

                {/* Crear proyecto solo si es una ONG */}
                {currentUser?.profileType === "ONG" && (
                    <TouchableOpacity
                        onPress={handleCreateProject}
                        className="mb-4"
                    >
                        <BlurView
                            intensity={15}
                            tint="dark"
                            className="rounded-lg overflow-hidden"
                        >
                            <View className="p-4 flex flex-row items-center">
                                <MaterialCommunityIcons
                                    name="pencil-outline"
                                    color={"#000000"}
                                    size={18}
                                />
                                <Text className="text-text_black text-center text-base ml-3">
                                    Crear un proyecto
                                </Text>
                            </View>
                        </BlurView>
                    </TouchableOpacity>
                )}

                {/* Proyectos para la ONG */}
                {currentUser?.profileType === "ONG" && (
                    <View>
                        <Text className="text-xl font-bold mb-1">
                            Mis Proyectos
                        </Text>
                        <Text className="text-base mb-4">
                            Aquí puedes gestionar tus proyectos y ver los
                            voluntarios aplicados.
                        </Text>
                        {localProjectsOng.length > 0 ? (
                            <FlatList
                                data={localProjectsOng}
                                renderItem={(item) => (
                                    <CardProjectActual item={item.item} />
                                )}
                                keyExtractor={(item) => item.id!}
                                refreshControl={
                                    <RefreshControl
                                        refreshing={refreshing}
                                        onRefresh={onRefresh}
                                    />
                                }
                            />
                        ) : (
                            <View className="bg-gray_1 px-4 rounded-2xl mb-4 flex flex-row items-center justify-evenly py-4">
                                <InfoSVG />
                                <Text className="text-text_black text-center text-base">
                                    No tienes proyectos activos
                                </Text>
                            </View>
                        )}
                    </View>
                )}

                {/* Proyectos Generales (sin aplicados) */}
                {currentUser?.profileType === "Voluntario" ? (
                    <>
                        <Text className="text-xl font-bold mb-1">
                            Recomendados
                        </Text>
                        <Text className="text-base mb-4">
                            Aquí tienes algunos proyectos que creemos que te
                            podrían interesar...
                        </Text>
                    </>
                ) : (
                    <>
                        <Text className="text-xl font-bold mb-1">
                            Inspírate con proyectos de otras ONGs
                        </Text>
                        <Text className="text-base mb-4">
                            Aquí tienes algunos proyectos que creemos que te
                            podrían interesar...
                        </Text>
                    </>
                )}

                {loading ? (
                    loader("Cargando proyectos...")
                ) : localProjects.length <= 0 ? (
                    <Text className="text-xl text-center">
                        No existen proyectos aún
                    </Text>
                ) : (
                    <FlatList
                        data={volunteerOtherProjects}
                        renderItem={(item) => <CardProject item={item.item} />}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item) => item.id!}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />
                        }
                    />
                )}
            </View>
        </ImageBackground>
    );
};

export default withSafeArea(HomeTabScreen);

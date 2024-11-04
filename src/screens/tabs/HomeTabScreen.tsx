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
import {
    getProjects,
    getSavedProjects,
} from "../../service/api/projectService";
import loader from "../../util/loader";
import { ProjectState } from "../../types/project";
import { useNavigation } from "@react-navigation/native";
import useAuthStore from "../../stores/useAuthStore";
import CardProject from "./components/CardProject";
import withSafeArea from "../../util/withSafeArea";
import CardProjectActual from "./components/CardProjectActual";
import { BlurView } from "expo-blur";

const HomeTabScreen = () => {
    const backgroundImg = require("../../assets/backgroundVolu.png");
    const navigation = useNavigation<any>();
    const navigation2 = useNavigation<any>();
    const { currentUser, setSavedProjects } = useAuthStore();

    const [localProjects, setLocalProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const unsubscribeRef = useRef<() => void | undefined>();

    useEffect(() => {
        setLoading(true);

        const fetchSavedProjects = async () => {
            try {
                const unsubscribe = await getSavedProjects(
                    currentUser?.id,
                    (savedProjects) => {
                        setSavedProjects(savedProjects);
                        setLoading(false);
                    }
                );

                unsubscribeRef.current = unsubscribe;
            } catch (error) {
                console.error("Error fetching saved projects:", error);
                setLoading(false);
            }
        };

        fetchSavedProjects();

        return () => {
            if (unsubscribeRef.current) {
                unsubscribeRef.current();
            }
        };
    }, [currentUser?.id]);

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

    const localProjectsOng: ProjectState[] = localProjects.filter(
        (project: ProjectState) => project.ongID === currentUser?.id
    );

    const localProjectsWhiteOutMyProjects = localProjects.filter(
        (project: ProjectState) => project.ongID !== currentUser?.id
    );

    return (
        <ImageBackground className="flex-1" source={backgroundImg}>
            <View className="flex-1  px-4 pt-4">
                <Text className="text-xl font-bold mb-4 px-2">
                    Hola, {currentUser?.name}
                </Text>
                <View>
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
                        <View className="bg-gray_1 p-4 rounded-2xl mb-4 flex flex-row items-center justify-evenly">
                            <InfoSVG />
                            <Text className="text-text_black text-center text-base">
                                No tienes ningún proyecto activo
                            </Text>
                        </View>
                    )}
                </View>

                {currentUser?.profileType === "ONG" && (
                    <TouchableOpacity
                        onPress={() => handleCreateProject()}
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

                {currentUser?.profileType === "ONG" ? (
                    <>
                        <Text className=" text-xl font-bold mb-1">
                            Inspírate con proyectos de otras ONGs
                        </Text>
                        <Text className="text-base  mb-4">
                            Aquí tienes algunos proyectos que creemos que te
                            podrían interesar...
                        </Text>
                    </>
                ) : (
                    <>
                        <Text className=" text-xl font-bold mb-1">
                            Recomendados
                        </Text>
                        <Text className="text-base  mb-4">
                            Aquí tienes algunos proyectos que creemos que te
                            podrían interesar...
                        </Text>
                    </>
                )}

                {loading ? (
                    loader("Cargando proyectos...")
                ) : localProjects.length <= 0 ? (
                    <Text className=" text-xl text-center">
                        No existen proyectos aún
                    </Text>
                ) : (
                    <FlatList
                        data={localProjectsWhiteOutMyProjects}
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

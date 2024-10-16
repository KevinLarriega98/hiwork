import {
    View,
    Text,
    FlatList,
    RefreshControl,
    TouchableOpacity,
} from "react-native";
import React, { useEffect, useState, useCallback, useRef } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import InfoSVG from "../../components/Projects/svg/InfoSVG";
import {
    getProjects,
    getSavedProjects,
    saveProjectUser,
} from "../../service/api/projectService";
import loader from "../../util/loader";
import { ProjectState } from "../../types/project";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import useAuthStore from "../../stores/useAuthStore";
import { RootStackParamList } from "../../types/navigation";
import { calculateWeeksRange } from "../../util/calculateWeeksRange";

type ProjectDetailScreenNavigationProp = NavigationProp<
    RootStackParamList,
    "Project"
>;

const HomeTabScreen = () => {
    const navigation = useNavigation<any>();
    const navigation2 = useNavigation<any>();
    const { currentUser } = useAuthStore();

    const [localProjects, setLocalProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const unsubscribeRef = useRef<() => void | undefined>();

    const [savedProjects, setSavedProjects] = useState<string[]>([]);

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

    const handleProjectPress = (project: ProjectState) => {
        navigation.navigate("Project", { project });
    };

    const handleCreateProject = () => {
        navigation2.navigate("CreateNewProject");
    };

    const renderItem = ({ item }: { item: ProjectState }) => {
        const weeksRange = item.objectiveTimeline
            ? calculateWeeksRange(item.objectiveTimeline)
            : "No dates available";

        return (
            <TouchableOpacity
                className="bg-gray_1 p-4 rounded-2xl mb-4 w-full"
                onPress={() => handleProjectPress(item)}
            >
                <View className="flex flex-row justify-between items-start mb-2">
                    <View className="flex-1 flex flex-row gap-1 flex-wrap">
                        {item.roles.map((role, index) => (
                            <View className="px-2 py-1 bg-gray_2 rounded-full justify-center items-center">
                                <Text className="text-gray_1 text-xs font-normal leading-none">
                                    {role.role}
                                </Text>
                            </View>
                        ))}
                    </View>

                    <TouchableOpacity
                        className="flex flex-row gap-1 items-center  z-30"
                        onPress={() =>
                            saveProjectUser(
                                item.id!,
                                currentUser?.id,
                                savedProjects
                            )
                        }
                    >
                        {savedProjects.includes(item.id!) ? (
                            <MaterialCommunityIcons
                                name="bookmark"
                                color={"black"}
                                size={24}
                            />
                        ) : (
                            <MaterialCommunityIcons
                                name="bookmark-outline"
                                color={"black"}
                                size={24}
                            />
                        )}
                    </TouchableOpacity>
                </View>
                <Text className="text-xl font-medium mb-1 text-text_black">
                    {item.title}
                </Text>

                <View className="flex flex-row gap-1 mb-1">
                    <MaterialCommunityIcons
                        name="checkbox-blank-circle"
                        color={"black"}
                        size={18}
                    />
                    <Text className="text-text_black">{item.ongName}</Text>
                </View>
                <View className="flex flex-col items-start mb-1">
                    <View className="flex flex-row items-center mb-1">
                        <MaterialCommunityIcons
                            name="square-rounded"
                            color={"#7f7f7f"}
                            size={18}
                        />
                        <Text className="text-text_black mr-2">
                            {weeksRange}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View className="flex-1 bg-background px-4 pt-4">
            <Text className="text-xl font-bold mb-4">
                Hola, {currentUser?.name}
            </Text>
            {/* TODO quitar el hardcode y hacer la lógica de mirar si tienes algún proyecto activo o no */}
            <View className="bg-gray_1 p-4 rounded-2xl mb-4 flex flex-row items-center justify-evenly">
                <InfoSVG />
                <Text className="text-text_black text-center text-base">
                    No tienes ningún proyecto activo
                </Text>
            </View>

            {currentUser?.profileType === "ONG" && (
                <TouchableOpacity
                    onPress={() => handleCreateProject()}
                    className="bg-gray_1 p-4 rounded-lg mb-4 flex flex-row items-center "
                >
                    <MaterialCommunityIcons
                        name="pencil-outline"
                        color={"#000000"}
                        size={18}
                    />
                    <Text className="text-text_black text-center text-base ml-3">
                        Crear un proyecto
                    </Text>
                </TouchableOpacity>
            )}

            <Text className=" text-xl font-bold mb-1">Recomendados</Text>
            <Text className="text-base  mb-4">
                Aquí tienes algunos proyectos que creemos que te podrían
                interesar...
            </Text>
            {loading ? (
                loader("Cargando proyectos...")
            ) : localProjects.length <= 0 ? (
                <Text className=" text-xl text-center">
                    No existen proyectos aún
                </Text>
            ) : (
                <FlatList
                    data={localProjects}
                    renderItem={renderItem}
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
    );
};

export default HomeTabScreen;

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
import BellComponent from "../../components/Projects/BellComponent";
import {
    getProjects,
    getSavedProjects,
    saveProjectUser,
} from "../../service/api/projectService";
import loader from "../../util/loader";
import { ProjectState } from "../../types/project";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import useAuthStore from "../../context/useAuthStore";
import { RootStackParamList } from "../../types/navigation";
import { calculateWeeksRange } from "../../util/calculateWeeksRange";

type ProjectDetailScreenNavigationProp = NavigationProp<
    RootStackParamList,
    "Project"
>;

const ProyectosTabScreen = () => {
    const navigation = useNavigation<ProjectDetailScreenNavigationProp>();
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
                    currentUser?.uid,
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
    }, [currentUser?.uid]);

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

    const renderItem = ({ item }: { item: any }) => {
        const weeksRange = item.objectiveTimeline
            ? calculateWeeksRange(item.objectiveTimeline)
            : "No dates available";

        return (
            <TouchableOpacity
                className="bg-gray_1 p-4 rounded-2xl mb-4 w-[48%]"
                onPress={() => handleProjectPress(item)}
            >
                <View className="flex flex-row justify-between items-center mb-2">
                    <View className="px-2 py-1 bg-gray_2 rounded-full justify-center items-center">
                        <Text className="text-gray_1 text-xs font-normal leading-none">
                            Design ux/ui
                        </Text>
                    </View>
                    <TouchableOpacity
                        className="flex flex-row gap-1 items-center mb-2 z-30"
                        onPress={() =>
                            saveProjectUser(
                                item.id,
                                currentUser?.uid,
                                savedProjects
                            )
                        }
                    >
                        {savedProjects.includes(item.id) ? (
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
                    <View className="flex flex-row items-center mb-1">
                        <MaterialCommunityIcons
                            name="square-rounded"
                            color={"#7f7f7f"}
                            size={18}
                        />
                        <Text className="text-text_black">
                            {item.remote ? "Remote" : "Local"}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View className="flex-1 bg-background">
            <BellComponent />
            <View className="px-4 flex-1">
                <Text className="text-xl font-bold mb-4">Hola, hiDoer!</Text>
                {/* TODO quitar el hardcode y hacer la lógica de mirar si tienes algún proyecto activo o no */}
                <View className="bg-gray_1 p-4 rounded-lg mb-4 flex flex-row items-center justify-evenly">
                    <InfoSVG />
                    <Text className="text-text_black text-center text-base">
                        No tienes ningún proyecto activo
                    </Text>
                </View>
                <Text className="text-lg font-semibold mb-4">
                    Aquí tienes algunos proyectos que creemos que te podrían
                    interesar...
                </Text>
                {loading ? (
                    loader("Cargando proyectos...")
                ) : (
                    <FlatList
                        data={localProjects}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                        numColumns={2}
                        columnWrapperStyle={{
                            justifyContent: "space-between",
                        }}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />
                        }
                    />
                )}
            </View>
        </View>
    );
};

export default ProyectosTabScreen;

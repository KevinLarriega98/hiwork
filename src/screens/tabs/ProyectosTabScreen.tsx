import {
    View,
    Text,
    FlatList,
    ActivityIndicator,
    StyleSheet,
    RefreshControl,
} from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import BookMarkSVG from "../../components/Projects/svg/BookMarkSVG";
import InfoSVG from "../../components/Projects/svg/InfoSVG";
import BellComponent from "../../components/Projects/BellComponent";
import useProjectStore from "../../context/useProjectStore";

const ProyectosTabScreen = () => {
    const { fetchProjects } = useProjectStore((state) => ({
        fetchProjects: state.fetchProjects,
    }));

    const [localProjects, setLocalProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        const loadProjects = async () => {
            setLoading(true);
            try {
                const fetchedProjects = await fetchProjects();
                setLocalProjects(fetchedProjects || []);
            } catch (error) {
                console.error("Error fetching projects:", error);
                setLocalProjects([]);
            } finally {
                setLoading(false);
            }
        };

        loadProjects();
    }, [fetchProjects]);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        try {
            const fetchedProjects = await fetchProjects();
            setLocalProjects(fetchedProjects || []);
        } catch (error) {
            console.error("Error refreshing projects:", error);
            setLocalProjects([]);
        } finally {
            setRefreshing(false);
        }
    }, [fetchProjects]);

    const renderItem = ({ item }: { item: any }) => {
        return (
            <View className="bg-[#e6e6e6] p-4 rounded-2xl mb-4 w-[48%]">
                <View className="flex flex-row justify-between items-center mb-2">
                    <View className="px-2 py-1 bg-[#7f7f7f] rounded-full justify-center items-center">
                        <Text className="text-[#e6e6e6] text-xs font-normal leading-none">
                            Design ux/ui
                        </Text>
                    </View>
                    <BookMarkSVG />
                </View>
                <Text className="text-xl font-medium mb-1 text-black">
                    {item.title}
                </Text>
                <View className="flex flex-row gap-1 items-center mb-2">
                    <MaterialCommunityIcons
                        name="checkbox-blank-circle"
                        color={"black"}
                        size={18}
                    />
                    <Text className="text-gray-500">{item.ongName}</Text>
                </View>
                <View className="flex flex-col items-start mb-1">
                    <View className="flex flex-row items-center mb-1">
                        <MaterialCommunityIcons
                            name="square-rounded"
                            color={"#7f7f7f"}
                            size={18}
                        />
                        <Text className="text-gray-500 mr-2">
                            {item.objectiveTimeline}
                        </Text>
                    </View>
                    <View className="flex flex-row items-center mb-1">
                        <MaterialCommunityIcons
                            name="square-rounded"
                            color={"#7f7f7f"}
                            size={18}
                        />
                        <Text className="text-gray-500">
                            {item.remote ? "Remote" : "Local"}
                        </Text>
                    </View>
                </View>
            </View>
        );
    };

    return (
        <View className="flex-1 bg-white">
            <BellComponent />
            <View className="px-4 flex-1">
                <Text className="text-xl font-bold mb-4">Hola, hiDoer!</Text>
                {/* TODO quitar el hardcode y hacer la lógica de mirar si tienes algún proyecto activo o no */}
                <View className="bg-gray-200 p-4 rounded-lg mb-4 flex flex-row items-center justify-evenly">
                    <InfoSVG />
                    <Text className="text-gray-600 text-center text-base">
                        No tienes ningún proyecto activo
                    </Text>
                </View>
                <Text className="text-lg font-semibold mb-4">
                    Aquí tienes algunos proyectos que creemos que te podrían
                    interesar...
                </Text>
                {loading ? (
                    <View className="flex-1 items-center justify-center">
                        <ActivityIndicator size="large" color="#000" />
                        <Text className="text-gray-600 text-center text-base mt-2">
                            Cargando proyectos...
                        </Text>
                    </View>
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

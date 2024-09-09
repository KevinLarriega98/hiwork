import {
    View,
    Text,
    FlatList,
    RefreshControl,
    TouchableOpacity,
} from "react-native";
import React, { useEffect, useState, useCallback, useRef } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import BookMarkSVG from "../../components/Projects/svg/BookMarkSVG";
import InfoSVG from "../../components/Projects/svg/InfoSVG";
import BellComponent from "../../components/Projects/BellComponent";
import { getProjects, saveProjectUser } from "../../service/api/projectService";
import loader from "../../util/loader";
import { ProjectState } from "../../types/project";
import { RootStackParamList } from "../../routes/LoginStackNavigation";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import useAuthStore from "../../context/useAuthStore";

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

    useEffect(() => {
        console.log("333333333333333333");
    }, []);
    useEffect(() => {
        setLoading(true);

        const unsubscribe = getProjects((projects) => {
            console.log(11111111111);
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

    const calculateWeeksRange = (
        datesArray: {
            date: string;
            name: string;
            data: string;
            height: number;
            day: string;
        }[]
    ) => {
        if (Array.isArray(datesArray) && datesArray.length > 0) {
            try {
                const dates = datesArray.map(
                    (dateObj) => new Date(dateObj.date)
                );

                // Filter valid dates
                const validDates = dates.filter(
                    (date) => !isNaN(date.getTime())
                );

                if (validDates.length > 0) {
                    const firstDate = validDates[0];
                    const lastDate = validDates[validDates.length - 1];

                    // Calculate the difference in weeks
                    const timeDiff = lastDate.getTime() - firstDate.getTime();
                    const diffWeeks = Math.ceil(
                        timeDiff / (1000 * 60 * 60 * 24 * 7)
                    );

                    const minWeeks = 1;
                    const maxWeeks = Math.max(minWeeks, diffWeeks);
                    return `${minWeeks}-${maxWeeks} weeks`;
                }
            } catch (error) {
                console.error("Error calculating weeks range:", error);
            }
        }
        return "No valid dates";
    };

    const renderItem = ({ item }: { item: any }) => {
        const weeksRange = item.objectiveTimeline
            ? calculateWeeksRange(item.objectiveTimeline)
            : "No dates available";

        return (
            <TouchableOpacity
                className="bg-[#e6e6e6] p-4 rounded-2xl mb-4 w-[48%]"
                onPress={() => handleProjectPress(item)}
            >
                <View className="flex flex-row justify-between items-center mb-2">
                    <View className="px-2 py-1 bg-[#7f7f7f] rounded-full justify-center items-center">
                        <Text className="text-[#e6e6e6] text-xs font-normal leading-none">
                            Design ux/ui
                        </Text>
                    </View>
                    <TouchableOpacity
                        //FIXME de momento esta disabled que nose que hacer con el pero algo voy a hacer en el futuro

                        className="flex flex-row gap-1 items-center mb-2 z-30"
                        onPress={() =>
                            saveProjectUser(item.id, currentUser?.uid)
                        }
                    >
                        <BookMarkSVG />
                    </TouchableOpacity>
                </View>
                <Text className="text-xl font-medium mb-1 text-black">
                    {item.title}
                </Text>

                <View className="flex flex-row gap-1 mb-1">
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
                        <Text className="text-gray-500 mr-2">{weeksRange}</Text>
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
            </TouchableOpacity>
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

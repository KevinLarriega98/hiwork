import {
    View,
    Text,
    ActivityIndicator,
    FlatList,
    Pressable,
    TouchableOpacity,
    Alert,
    RefreshControl,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { getApplications } from "../../../service/api/projectService";
import useAuthStore from "../../../context/useAuthStore";
import {
    RouteProp,
    useIsFocused,
    useNavigation,
    useRoute,
} from "@react-navigation/native";
import { RootStackParamList } from "../../../types/navigation";
import { StackNavigationProp } from "@react-navigation/stack";

type ProjectScreenRouteProp = RouteProp<RootStackParamList, "Project">;
type ApplicatorProfileScreenRouteProp = StackNavigationProp<
    RootStackParamList,
    "ApplicatorProfile"
>;

const ApplicatorsTab = () => {
    const navigation = useNavigation<ApplicatorProfileScreenRouteProp>();
    const route = useRoute<ProjectScreenRouteProp>();
    const { project } = route.params;
    const { userType, currentUser } = useAuthStore();
    const [applications, setApplications] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [refreshing, setRefreshing] = useState(false);

    const isFocused = useIsFocused();

    const fetchApplications = async () => {
        if (
            userType === "ONG" &&
            currentUser?.uid === project.ongID &&
            project.id
        ) {
            try {
                return getApplications(project.id, (apps) => {
                    setApplications(apps);
                });
            } catch (error) {
                Alert.alert("Error", "No se pudieron cargar las aplicaciones.");
            } finally {
                setLoading(false);
            }
        } else {
            setLoading(false);
        }
    };

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        try {
            await fetchApplications();
            setRefreshing(false);
        } catch (error) {
            console.error("Error refreshing projects:", error);
            setRefreshing(false);
        }
    }, []);

    useEffect(() => {
        fetchApplications();
    }, [project.id, userType, currentUser?.uid, project.ongID]);

    return (
        <View className="flex-1 p-6 bg-white">
            {loading ? (
                <ActivityIndicator size="large" color="#808080" />
            ) : (
                <FlatList
                    data={applications}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <Pressable
                            onPress={() =>
                                navigation.navigate("ApplicatorProfile", {
                                    item,
                                    project,
                                })
                            }
                            className="p-4 border border-red-600"
                        >
                            <View className="flex-row items-center justify-between">
                                <View className="flex-row items-center gap-2">
                                    <Text>{item.volunteerName}</Text>
                                    <Text>{item.status}</Text>
                                </View>
                            </View>
                        </Pressable>
                    )}
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

export default ApplicatorsTab;

import React, { useEffect, useState, useRef } from "react";
import {
    View,
    Text,
    ActivityIndicator,
    FlatList,
    Pressable,
} from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../types/Navigation";
import { getProjects } from "../../../service/api/projectService";

type ProjectScreenRouteProp = RouteProp<RootStackParamList, "Project">;
type ApplicatorProfileScreenRouteProp = StackNavigationProp<
    RootStackParamList,
    "ApplicatorProfile"
>;

const ApplicatorsTab = () => {
    const navigation = useNavigation<ApplicatorProfileScreenRouteProp>();
    const route = useRoute<ProjectScreenRouteProp>();
    const { project } = route.params; // Proyecto actual

    const [loading, setLoading] = useState<boolean>(false);
    const [applications, setApplications] = useState<any[]>([]);

    const unsubscribeRef = useRef<() => void | undefined>();

    // Obtener y aplanar las aplicaciones de todos los proyectos
    useEffect(() => {
        setLoading(true);

        // Llamamos al servicio para obtener los proyectos
        const unsubscribe = getProjects((projects) => {
            // Filtrar las aplicaciones solo para el proyecto actual
            const projectApplications = projects
                .filter((proj) => proj.id === project.id) // Filtrar por el ID del proyecto actual
                .flatMap((proj) => proj.applications); // Obtener las aplicaciones del proyecto filtrado

            setApplications(projectApplications); // Actualizamos las aplicaciones
            setLoading(false);
        });

        unsubscribeRef.current = unsubscribe;

        // Limpiamos la suscripción cuando el componente se desmonte
        return () => {
            if (unsubscribeRef.current) {
                unsubscribeRef.current();
            }
        };
    }, [project.id]); // Re-ejecutamos cuando el proyecto cambie

    console.log("Aplicaciones para este proyecto", applications);

    return (
        <View className="flex-1 p-6 bg-white">
            {loading ? (
                <ActivityIndicator size="large" color="#808080" />
            ) : applications.length === 0 ? (
                <Text className="text-center text-xl">
                    Aún no hay aplicaciones para este proyecto
                </Text>
            ) : (
                <FlatList
                    data={applications} // Usamos el array de aplicaciones filtrado
                    renderItem={({ item }) => (
                        <Pressable
                            onPress={() =>
                                navigation.navigate("ApplicatorProfile", {
                                    item,
                                    project,
                                })
                            }
                            className="p-4 bg-gray_5 rounded mb-3"
                        >
                            <View className="flex-row items-center justify-between">
                                <View className="flex-row items-center justify-around w-full">
                                    <Text className="font-bold">
                                        {item.volunteerName}
                                    </Text>
                                    <Text className="uppercase font-semibold bg-slate-50 rounded-xl px-2 py-1">
                                        {item.status}
                                    </Text>
                                </View>
                            </View>
                        </Pressable>
                    )}
                />
            )}
        </View>
    );
};

export default ApplicatorsTab;

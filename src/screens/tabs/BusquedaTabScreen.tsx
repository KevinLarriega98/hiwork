import {
    View,
    Text,
    FlatList,
    TextInput,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Modal,
    ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import useProjectStore from "../../stores/useProjectStore";

import { NavigationProp, useNavigation } from "@react-navigation/native";
import { ProjectState } from "../../types/project";
import { RootStackParamList } from "../../types/navigation";
import { REGISTRATION_STEPS_VOLUNTARIO } from "../../util/loginStepsAndUtils";

type ProjectDetailScreenNavigationProp = NavigationProp<
    RootStackParamList,
    "Project"
>;

const BusquedaTabScreen = () => {
    const navigation = useNavigation<ProjectDetailScreenNavigationProp>();

    const [volunteerValue, setVolunteerValue] = useState<string[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [searchText, setSearchText] = useState("");

    const { projects, fetchProjects } = useProjectStore((state) => ({
        projects: state.projects,
        fetchProjects: state.fetchProjects,
    }));

    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);

    const calculateWeeksDifference = (startDate: Date, endDate: Date) => {
        const diffInMs = startDate.getTime() - endDate.getTime();
        const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
        const diffInWeeks = diffInDays / 7;

        if (diffInWeeks < 1) return "Less than 1 week";
        else if (diffInWeeks < 2) return "1-2 weeks";
        else if (diffInWeeks < 3) return "2-3 weeks";
        else return `${Math.floor(diffInWeeks)}+ weeks`;
    };

    const filteredProjects = projects.filter((project: ProjectState) => {
        const matchesVolunteer =
            volunteerValue.length === 0 ||
            project.roles.some((role) => volunteerValue.includes(role.role));
        return matchesVolunteer;
    });

    console.log(filteredProjects);

    const handleProjectPress = (project: ProjectState) => {
        navigation.navigate("Project", { project });
    };

    const renderItem = ({ item }: { item: ProjectState }) => {
        const firstDate = new Date(item.objectiveTimeline[0].date);
        const lastDate = new Date(
            item.objectiveTimeline[item.objectiveTimeline.length - 1].date
        );

        return (
            <TouchableOpacity
                className={`bg-[#E6E6E6] p-3 rounded-lg mb-4 flex-1 mx-1 min-h-fit`}
                onPress={() => handleProjectPress(item)}
            >
                <View className="flex flex-row w-full flex-wrap gap-1">
                    {item.roles.map((role, index) => (
                        <View
                            key={index}
                            className="flex flex-row px-2 py-1 bg-gray_2 rounded-full justify-center items-center mb-2"
                        >
                            <Text className="text-gray_1 text-xs font-normal leading-none">
                                {role.role}
                            </Text>
                        </View>
                    ))}
                </View>
                <Text className="text-lg mb-1 font-bold ml-1">
                    {item.title}
                </Text>
                <View className="flex flex-row gap-1 items-center mb-1">
                    <MaterialCommunityIcons
                        name="checkbox-blank-circle"
                        color={"black"}
                        size={18}
                    />
                    <Text className="text-black text-base">{item.ongName}</Text>
                </View>
                <View className="flex flex-row items-start mb-1 w-full">
                    <MaterialCommunityIcons
                        name="square-rounded"
                        color={"#7f7f7f"}
                        size={18}
                    />
                    <Text className="text-gray-500 mr-2">
                        {calculateWeeksDifference(firstDate, lastDate)}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };

    const toggleVolunteerValue = (herramienta: string) => {
        setVolunteerValue((prev) =>
            prev.includes(herramienta)
                ? prev.filter((item) => item !== herramienta)
                : [...prev, herramienta]
        );
    };

    return (
        <TouchableWithoutFeedback>
            <View
                className="flex-1 bg-white"
                onStartShouldSetResponder={() => true}
            >
                <View className="px-6 pt-4 ">
                    <View className="flex-row items-center justify-between">
                        <View className="flex flex-row flex-wrap relative">
                            <TextInput
                                className="bg-gray_1 p-2 min-w-[85%] rounded-full"
                                placeholder="Buscar..."
                                value={searchText}
                                onChangeText={setSearchText}
                                inlineImageLeft="search"
                            />
                            <View className="absolute right-3 top-3 flex items-center h-full">
                                <MaterialCommunityIcons
                                    name="magnify"
                                    size={24}
                                    className="rounded-lg"
                                />
                            </View>
                        </View>
                        <View>
                            <TouchableOpacity
                                className="bg-naranja_oscuro p-2 rounded-full"
                                onPress={() => setModalOpen(!modalOpen)}
                            >
                                <MaterialCommunityIcons
                                    name="tune-vertical"
                                    size={24}
                                    color={"white"}
                                    className="rounded-lg"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {volunteerValue.length > 0 && (
                        <View className="flex flex-row items-center mt-2">
                            <Text className="text-gray_1 text-sm">
                                {volunteerValue.length} proyectos
                            </Text>
                            <MaterialCommunityIcons
                                name="close"
                                size={24}
                                color={"#7F35E9"}
                                className="ml-2 cursor-pointer"
                                onPress={() => setVolunteerValue([])}
                            />
                        </View>
                    )}

                    <Modal
                        animationType="slide"
                        visible={modalOpen}
                        onRequestClose={() => setModalOpen(false)}
                    >
                        <View className="flex-1 p-6 gap-3">
                            <View>
                                <Text className="text-center text-2xl">
                                    Filtros
                                </Text>
                                <TouchableOpacity
                                    onPress={() => setModalOpen(!modalOpen)}
                                    className="absolute top-0 right-0"
                                >
                                    <MaterialCommunityIcons
                                        name="close"
                                        color={"#004932"}
                                        size={34}
                                    />
                                </TouchableOpacity>
                            </View>

                            <ScrollView>
                                <Text className="text-xl font-semibold">
                                    Disciplinas
                                </Text>
                                <View className="flex flex-row flex-wrap mt-2">
                                    {REGISTRATION_STEPS_VOLUNTARIO[2]
                                        ?.options &&
                                        Object.entries(
                                            REGISTRATION_STEPS_VOLUNTARIO[2]
                                                .options
                                        ).map(
                                            ([key, herramientas]: [
                                                string,
                                                string[]
                                            ]) =>
                                                herramientas.map(
                                                    (herramienta, idx) => (
                                                        <TouchableOpacity
                                                            onPress={() =>
                                                                toggleVolunteerValue(
                                                                    herramienta
                                                                )
                                                            }
                                                            key={`${key}-${idx}`}
                                                            className={`border rounded-full px-4 py-2 m-1 ${
                                                                key === "Diseño"
                                                                    ? "border-green-400"
                                                                    : key ===
                                                                      "Desarrollo y Tecnología"
                                                                    ? "border-purple-400"
                                                                    : key ===
                                                                      "Otros"
                                                                    ? "border-pink-400"
                                                                    : "border-yellow-400"
                                                            }`}
                                                        >
                                                            <Text
                                                                className={`${
                                                                    key ===
                                                                    "Diseño"
                                                                        ? "text-green-500"
                                                                        : key ===
                                                                          "Desarrollo y Tecnología"
                                                                        ? "text-purple-500"
                                                                        : key ===
                                                                          "Otros"
                                                                        ? "text-pink-500"
                                                                        : "text-yellow-500"
                                                                }`}
                                                            >
                                                                {herramienta}
                                                            </Text>
                                                        </TouchableOpacity>
                                                    )
                                                )
                                        )}
                                </View>
                            </ScrollView>
                        </View>
                    </Modal>

                    {filteredProjects.length === 0 ? (
                        <Text className="text-xl text-center">
                            No existen proyectos aún
                        </Text>
                    ) : (
                        <FlatList
                            className="mt-3"
                            data={filteredProjects}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.id!}
                        />
                    )}
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default BusquedaTabScreen;

import {
    View,
    Text,
    FlatList,
    TextInput,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Modal,
    ScrollView,
    ImageBackground,
} from "react-native";
import React, { useEffect, useState } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import useProjectStore from "../../stores/useProjectStore";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { REGISTRATION_STEPS_VOLUNTARIO } from "../../util/loginStepsAndUtils";
import withSafeArea from "../../util/withSafeArea";
import { RootStackParamList } from "../../types/Navigation";
import { Project } from "../../types/Project";

type ProjectDetailScreenNavigationProp = NavigationProp<
    RootStackParamList,
    "Project"
>;

const BusquedaTabScreen = () => {
    const backgroundImg = require("../../assets/backgroundVolu.png");

    const navigation = useNavigation<ProjectDetailScreenNavigationProp>();

    const [volunteerValue, setVolunteerValue] = useState<{}[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [searchText, setSearchText] = useState("");

    const { projects, fetchProjects } = useProjectStore();

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

    const filteredProjects = projects.filter((project: Project) => {
        if (volunteerValue.length === 0) {
            return true;
        }

        const matchesAllFilters = volunteerValue.every((filter) =>
            project.roles.some((role) => role === filter)
        );

        return matchesAllFilters;
    });

    const handleProjectPress = (project: Project) => {
        navigation.navigate("Project", { project });
    };

    const renderItem = ({ item }: { item: Project }) => {
        if (
            !item.roles ||
            item.roles.length === 0 ||
            !item.objectiveTimeline ||
            item.objectiveTimeline.length === 0
        ) {
            return null;
        }

        const firstDate = new Date(item.objectiveTimeline[0].date);
        const lastDate = new Date(
            item.objectiveTimeline[item.objectiveTimeline.length - 1].date
        );

        const displayedRoles = item.roles.slice(0, 2);
        const hasMoreRoles = item.roles.length > 2;

        return (
            <TouchableOpacity
                className="bg-[#E6E6E6] p-4 rounded-2xl mb-4 "
                onPress={() => handleProjectPress(item)}
            >
                <View className="flex flex-row w-full flex-wrap gap-1">
                    {displayedRoles.map((role, index) => (
                        <View
                            key={index}
                            className="flex flex-row px-2 py-1 bg-gray_2 rounded-full justify-center items-center mb-2"
                        >
                            <Text className="text-gray_1 text-xs font-normal leading-none">
                                {role.role}
                            </Text>
                        </View>
                    ))}

                    {hasMoreRoles && (
                        <View className="flex flex-row px-2 py-1 bg-gray_2 rounded-full justify-center items-center mb-2">
                            <Text className="text-gray_1 text-xs font-normal leading-none">
                                ...
                            </Text>
                        </View>
                    )}
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

    // FIXME mirar de arreglar que no se actualize al hacer tab

    const toggleVolunteerValue = (herramienta: string) => {
        setVolunteerValue((prev) =>
            prev.includes(herramienta)
                ? prev.filter((item) => item !== herramienta)
                : [...prev, herramienta]
        );
    };

    return (
        <ImageBackground className="flex-1" source={backgroundImg}>
            <TouchableWithoutFeedback>
                <View onStartShouldSetResponder={() => true}>
                    <View className="p-4">
                        <View className="flex-row items-center justify-between">
                            <View className="flex flex-row flex-wrap relative">
                                <TextInput
                                    className="bg-gray_1 p-2 pl-4 min-w-[85%] rounded-full"
                                    placeholder="Buscar..."
                                    value={searchText}
                                    onChangeText={setSearchText}
                                />
                                <View className="absolute right-2 top-1.5 flex items-center h-full">
                                    <MaterialCommunityIcons
                                        name="magnify"
                                        size={32}
                                        className="rounded-lg"
                                        color="#808080"
                                    />
                                </View>
                            </View>
                            <View>
                                <TouchableOpacity
                                    className={` ${
                                        volunteerValue.length > 0
                                            ? "bg-naranja_oscuro"
                                            : "border border-naranja_oscuro"
                                    } p-2 rounded-full `}
                                    onPress={() => setModalOpen(!modalOpen)}
                                >
                                    <MaterialCommunityIcons
                                        name="tune-vertical"
                                        size={24}
                                        color={
                                            volunteerValue.length > 0
                                                ? "white"
                                                : "orange"
                                        }
                                        className="rounded-lg"
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

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
                                                                    volunteerValue.includes(
                                                                        herramienta
                                                                    )
                                                                        ? key ===
                                                                          "Diseño"
                                                                            ? "bg-green-400 border-green-400"
                                                                            : key ===
                                                                              "Desarrollo y Tecnología"
                                                                            ? "bg-purple-400 border-purple-400"
                                                                            : key ===
                                                                              "Otros"
                                                                            ? "bg-pink-400 border-pink-400"
                                                                            : "bg-yellow-400 border-yellow-400"
                                                                        : key ===
                                                                          "Diseño"
                                                                        ? "bg-white border-green-400"
                                                                        : key ===
                                                                          "Desarrollo y Tecnología"
                                                                        ? "bg-white border-purple-400"
                                                                        : key ===
                                                                          "Otros"
                                                                        ? "bg-white border-pink-400"
                                                                        : "bg-white border-yellow-400"
                                                                }`}
                                                            >
                                                                <Text
                                                                    className={`${
                                                                        volunteerValue.includes(
                                                                            herramienta
                                                                        )
                                                                            ? "text-white"
                                                                            : key ===
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
                                                                    {
                                                                        herramienta
                                                                    }
                                                                </Text>
                                                            </TouchableOpacity>
                                                        )
                                                    )
                                            )}
                                    </View>
                                </ScrollView>
                            </View>
                        </Modal>

                        <View className="flex flex-row flex-wrap items-center my-3 rounded-full">
                            {volunteerValue.length > 0 &&
                                volunteerValue.map((item, index) => {
                                    const category = Object.entries(
                                        REGISTRATION_STEPS_VOLUNTARIO[2]
                                            ?.options || {}
                                    ).find(([key, herramientas]) =>
                                        herramientas.includes(item)
                                    );

                                    let backgroundColor;
                                    if (category) {
                                        const [key] = category;
                                        switch (key) {
                                            case "Diseño":
                                                backgroundColor =
                                                    "bg-green-400";
                                                break;
                                            case "Desarrollo y Tecnología":
                                                backgroundColor =
                                                    "bg-purple-500";
                                                break;
                                            case "Marketing":
                                                backgroundColor =
                                                    "bg-yellow-400";
                                                break;
                                            case "Otros":
                                                backgroundColor = "bg-pink-400";
                                                break;
                                            default:
                                                backgroundColor =
                                                    "bg-green-500";
                                        }
                                    } else {
                                        backgroundColor = "bg-gray-500";
                                    }

                                    return (
                                        <TouchableOpacity
                                            key={index}
                                            className={`rounded-full px-4 py-2 m-1 ${backgroundColor}`}
                                            onPress={() =>
                                                setVolunteerValue(
                                                    volunteerValue.filter(
                                                        (v) => v !== item
                                                    )
                                                )
                                            }
                                        >
                                            <Text className="text-white text-sm">
                                                {item as string}
                                            </Text>
                                        </TouchableOpacity>
                                    );
                                })}
                        </View>

                        <Text className="text-lg  font-semibold ">
                            Tu búsqueda ha resultado en los siguientes
                            proyectos:
                        </Text>

                        {filteredProjects.length === 0 ? (
                            <Text className="text-xl text-center">
                                No existen proyectos aún
                            </Text>
                        ) : (
                            <FlatList
                                className="mt-3 "
                                data={filteredProjects}
                                showsVerticalScrollIndicator={false}
                                renderItem={renderItem}
                                keyExtractor={(item) => item.id!}
                            />
                        )}
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </ImageBackground>
    );
};

export default withSafeArea(BusquedaTabScreen);

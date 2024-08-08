import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TextInput,
    TouchableWithoutFeedback,
} from "react-native";
import React, { useEffect, useState } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import DropDownPicker from "react-native-dropdown-picker";
import BellComponent from "../../components/Projects/BellComponent";
import useProjectStore from "../../context/useProjectStore";
import {
    formatItemsData,
    locationItemsData,
    volunteerItemsData,
} from "../../data/dropdownData";

const BusquedaTabScreen = () => {
    const [volunteerItems, setVolunteerItems] = useState(volunteerItemsData);
    const [formatItems, setFormatItems] = useState(formatItemsData);
    const [locationItems, setLocationItems] = useState(locationItemsData);

    const [volunteerOpen, setVolunteerOpen] = useState(false);
    const [volunteerValue, setVolunteerValue] = useState(
        volunteerItems[0].value
    );

    const [formatOpen, setFormatOpen] = useState(false);
    const [formatValue, setFormatValue] = useState(formatItems[0].value);

    const [locationOpen, setLocationOpen] = useState(false);
    const [locationValue, setLocationValue] = useState(locationItems[0].value);

    const [searchText, setSearchText] = useState("");

    const { projects, fetchProjects } = useProjectStore((state) => ({
        projects: state.projects,
        fetchProjects: state.fetchProjects,
    }));

    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);

    const closeDropdowns = () => {
        setVolunteerOpen(false);
        setFormatOpen(false);
        setLocationOpen(false);
    };

    const filteredProjects = projects.filter((project) => {
        const matchesVolunteer =
            volunteerValue === "all" ||
            project.volunteerType === volunteerValue;
        const matchesFormat =
            formatValue === "all" || project.format === formatValue;
        const matchesLocation =
            locationValue === "all" || project.location === locationValue;
        const matchesSearchText = project.title
            .toLowerCase()
            .includes(searchText.toLowerCase());

        return (
            matchesVolunteer &&
            matchesFormat &&
            matchesLocation &&
            matchesSearchText
        );
    });

    const renderItem = ({ item }: { item: any }) => {
        return (
            <View className={`bg-[#d9d9d9] p-4 rounded-lg mb-4 flex-1 mx-1 `}>
                <Text className="text-xl font-bold mb-1">{item.title}</Text>

                <View className="flex flex-row gap-1 items-center mb-1">
                    <MaterialCommunityIcons
                        name="set-none"
                        color={"black"}
                        size={26}
                    />
                    <Text className="text-gray-500">{item.ongName}</Text>
                </View>
                <View className="flex flex-row items-start mb-1 w-full">
                    <Text className="text-gray-500 mr-2">
                        ⏹️ {item.objectiveTimeline}
                    </Text>
                    <Text className="text-gray-500">
                        ⏹️ {item.remote ? "Remote" : "Local"}
                    </Text>
                </View>
                <Text className="text-gray-500">{item.description}</Text>
            </View>
        );
    };

    return (
        <TouchableWithoutFeedback onPress={closeDropdowns}>
            <View
                className="flex-1 bg-white"
                onStartShouldSetResponder={() => true}
            >
                <BellComponent />
                <View className="p-4 ">
                    <View style={styles.searchContainer}>
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Buscar..."
                            value={searchText}
                            onChangeText={setSearchText}
                        />
                        <MaterialCommunityIcons
                            name="magnify"
                            size={24}
                            style={styles.searchIcon}
                        />
                    </View>

                    <View className="items-center">
                        <View style={styles.column}>
                            <Text style={styles.firstText}>
                                Quiero ver voluntarios de
                            </Text>
                            <DropDownPicker
                                open={volunteerOpen}
                                value={volunteerValue}
                                items={volunteerItems}
                                setOpen={setVolunteerOpen}
                                setValue={setVolunteerValue}
                                setItems={setVolunteerItems}
                                theme="DARK"
                                style={styles.firstSelectPicker}
                                containerStyle={
                                    styles.firstSelectPickerInnerContainer
                                }
                                textStyle={styles.dropdownText}
                                dropDownContainerStyle={
                                    styles.dropdownContainer
                                }
                            />
                        </View>
                        <View style={styles.column}>
                            <Text style={styles.text}>en formato</Text>
                            <DropDownPicker
                                open={formatOpen}
                                value={formatValue}
                                items={formatItems}
                                setOpen={setFormatOpen}
                                setValue={setFormatValue}
                                setItems={setFormatItems}
                                theme="DARK"
                                style={styles.picker}
                                containerStyle={styles.pickerInnerContainer}
                                textStyle={styles.dropdownText}
                                dropDownContainerStyle={
                                    styles.dropdownContainer
                                }
                            />
                            <Text className="ml-1" style={styles.text}>
                                en
                            </Text>
                            <DropDownPicker
                                open={locationOpen}
                                value={locationValue}
                                items={locationItems}
                                setOpen={setLocationOpen}
                                setValue={setLocationValue}
                                setItems={setLocationItems}
                                theme="DARK"
                                style={styles.picker}
                                containerStyle={styles.pickerInnerContainer}
                                textStyle={styles.dropdownText}
                                dropDownContainerStyle={
                                    styles.dropdownContainer
                                }
                            />
                        </View>
                    </View>
                    <FlatList
                        data={filteredProjects}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                    />
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    column: {
        flexDirection: "row",
    },
    firstSelectPicker: {
        width: 137,
        minHeight: 20,
        borderRadius: 20,
    },
    firstSelectPickerInnerContainer: {
        width: 137,
        zIndex: 2,
        marginTop: -2,
    },
    picker: {
        width: 118,
        minHeight: 20,
        borderRadius: 20,
    },
    pickerInnerContainer: {
        width: 118,
        marginBottom: 40,
        zIndex: 1,
        marginTop: 7,
    },
    dropdownContainer: {
        position: "absolute",
        zIndex: 1,
    },
    dropdownText: {
        fontSize: 12,
    },
    firstText: {
        fontSize: 14,
        marginRight: 5,
        fontWeight: "600",
    },
    text: {
        fontSize: 14,
        marginRight: 5,
        fontWeight: "600",
        marginTop: 10,
    },
    searchContainer: {
        position: "relative",
        backgroundColor: "gray",
        flexDirection: "row",
        alignItems: "center",
        padding: 2,
        borderRadius: 20,
        marginBottom: 16,
    },
    searchInput: {
        backgroundColor: "white",
        padding: 8,
        borderRadius: 20,
        fontSize: 16,
        flex: 1,
    },
    searchIcon: {
        right: 12,
        position: "absolute",
    },
});

export default BusquedaTabScreen;

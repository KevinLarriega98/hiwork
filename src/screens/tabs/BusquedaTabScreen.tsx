import { View, Text, FlatList, StyleSheet, TextInput } from "react-native";
import React, { useState } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import DropDownPicker from "react-native-dropdown-picker";

const data = [
  {
    id: "1",
    title: "JOB 1",
    org: "ONG HELDSN",
    duration: "2-4 weeks",
    type: "Virtual",
  },
  {
    id: "2",
    title: "JOB 2",
    org: "ONG HELDSN",
    duration: "2-4 weeks",
    type: "Virtual",
  },
  {
    id: "3",
    title: "JOB 3",
    org: "ONG HELDSN",
    duration: "2-4 weeks",
    type: "Virtual",
  },
  // Puedes agregar más elementos aquí
];

const BusquedaTabScreen = () => {
  const [volunteerItems, setVolunteerItems] = useState([
    { label: "Design UX/UI", value: "designuxui" },
    { label: "Marketing", value: "marketing" },
    { label: "Programación", value: "programacion" },
  ]);
  const [volunteerOpen, setVolunteerOpen] = useState(false);
  const [volunteerValue, setVolunteerValue] = useState(volunteerItems[0].value);

  const [formatItems, setFormatItems] = useState([
    { label: "Presencial", value: "presencial" },
    { label: "Híbrido", value: "hibrido" },
    { label: "Remoto", value: "remoto" },
  ]);
  const [formatOpen, setFormatOpen] = useState(false);
  const [formatValue, setFormatValue] = useState(formatItems[0].value);

  const [locationItems, setLocationItems] = useState([
    { label: "Barcelona", value: "barcelona" },
    { label: "Madrid", value: "madrid" },
  ]);
  const [locationOpen, setLocationOpen] = useState(false);
  const [locationValue, setLocationValue] = useState(locationItems[0].value);

  const renderItem = ({ item, index }: { item: any; index: number }) => {
    return (
      <View className={`bg-[#d9d9d9] p-4 rounded-lg mb-4 flex-1 mx-1`}>
        {/* TODO: Esto seria el tipo de proyecto */}
        <Text className="text-xl font-bold mb-1">{item.title}</Text>

        <View className="flex flex-row gap-1 items-center mb-2">
          <MaterialCommunityIcons name="set-none" color={"black"} size={26} />
          <Text className="text-gray-500">{item.org}</Text>
        </View>
        <View className="flex flex-row items-left mb-2">
          <Text className="text-gray-500 mr-2">{item.duration}</Text>
          <Text className="text-gray-500">{item.type}</Text>
        </View>

        <Text className="text-gray-500">Lorem Ipsum is simply dummy text.</Text>
      </View>
    );
  };

  return (
    <View className="flex-1 p-4 bg-white mt-3">
      {/* Aqui va el nombre del account logueado */}
      <View style={styles.headerContainer}>
        <View style={styles.headerContent}>
          <MaterialCommunityIcons
            name="bell-outline"
            size={24}
          />
        </View>
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
        />
        <MaterialCommunityIcons
          name="magnify"
          size={24}
          style={styles.searchIcon}
        />
      </View>
      <View style={styles.column}>
        <Text style={styles.firstText}>Quiero ver voluntarios de</Text>
        <DropDownPicker
          open={volunteerOpen}
          value={volunteerValue}
          items={volunteerItems}
          setOpen={setVolunteerOpen}
          setValue={setVolunteerValue}
          setItems={setVolunteerItems}
          theme="DARK"
          style={styles.firstSelectPicker}
          containerStyle={styles.firstSelectPickerInnerContainer}
          textStyle={styles.dropdownText}
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
        />
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  column: {
    flexDirection: "row",
  },
  firstSelectPicker: {
    width: 137,
    minHeight: 20,
    borderRadius: 20
  },
  firstSelectPickerInnerContainer: {
    width: 137,
    zIndex: 2,
    marginTop: -2
  },
  picker: {
    width: 118,
    minHeight: 20,
    borderRadius: 20
  },
  pickerInnerContainer: {
    width: 118,
    marginBottom: 40,
    zIndex: 1,
    marginTop: 7
  },
  dropdownText: {
    fontSize: 12,
  },
  firstText: {
    fontSize: 14,
    marginRight: 5,
    fontWeight: "600"
  },
  text: {
    fontSize: 14,
    marginRight: 5,
    fontWeight: "600",
    marginTop: 10,
  },
  searchContainer: {
    position: 'relative',
    backgroundColor: 'gray',
    flexDirection: "row",
    alignItems: "center",
    padding: 2,
    borderRadius: 20,
    marginBottom: 16,
  },
  searchInput: {
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 20,
    fontSize: 16,
    flex: 1,
  },
  searchIcon: {
    right: 12,
    position: 'absolute',
  },
  headerContainer: {
    backgroundColor: 'lightgray',
    height: 40,
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderRadius: 20,
    marginBottom: 30,
    left: 300,
  },
  headerContent: {
    paddingHorizontal: 16
  }
});

export default BusquedaTabScreen;

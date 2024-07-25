// import React, { useState } from 'react';

// import { View, Text, StyleSheet } from 'react-native';

// import DropDownPicker from 'react-native-dropdown-picker';

// export default function App() {
//   const [open, setOpen] = useState(false);
//   const [value, setValue] = useState([
//     'italy',
//     'spain',
//     'barcelona',
//     'finland',
//   ]);
//   const [items, setItems] = useState([
//     { label: 'Spain', value: 'spain' },
//     { label: 'Madrid', value: 'madrid', parent: 'spain' },
//     { label: 'Barcelona', value: 'barcelona', parent: 'spain' },

//     { label: 'Italy', value: 'italy' },
//     { label: 'Rome', value: 'rome', parent: 'italy' },

//     { label: 'Finland', value: 'finland' },
//   ]);

//   const [volunteerOpen, setVolunteerOpen] = useState(false);
//   const [volunteerValue, setVolunteerValue] = useState(null);
//   const [volunteerItems, setVolunteerItems] = useState([
//     { label: 'Design UX/UI', value: 'opcion1' },
//     { label: 'Opción 2', value: 'opcion2' },
//   ]);

//   const [formatOpen, setFormatOpen] = useState(false);
//   const [formatValue, setFormatValue] = useState(null);
//   const [formatItems, setFormatItems] = useState([
//     { label: 'Opción A', value: 'opcionA' },
//     { label: 'Opción B', value: 'opcionB' },
//   ]);

//   const [locationOpen, setLocationOpen] = useState(false);
//   const [locationValue, setLocationValue] = useState(null);
//   const [locationItems, setLocationItems] = useState([
//     { label: 'Lugar 1', value: 'lugar1' },
//     { label: 'Lugar 2', value: 'lugar2' },
//   ]);

//   return (
//     <View>
//       <View style={styles.column}>
//         <Text style={styles.interestText}>Quiero ver voluntarios de</Text>
//         <DropDownPicker
//           open={volunteerOpen}
//           value={volunteerValue}
//           items={volunteerItems}
//           setOpen={setVolunteerOpen}
//           setValue={setVolunteerValue}
//           setItems={setVolunteerItems}
//           theme='DARK'
//           placeholder="Seleccionar"
//           style={styles.picker}
//           containerStyle={styles.pickerInnerContainer}
//         />
//       </View>
//       <View style={styles.column}>
//         <Text style={styles.interestText}>en formato</Text>
//         <DropDownPicker
//           open={formatOpen}
//           value={formatValue}
//           items={formatItems}
//           setOpen={setFormatOpen}
//           setValue={setFormatValue}
//           setItems={setFormatItems}
//           theme='DARK'
//           placeholder="Seleccionar"
//           style={styles.picker}
//           containerStyle={styles.pickerInnerContainer}
//         />
//         <Text style={styles.interestText}>en</Text>
//         <DropDownPicker
//           open={locationOpen}
//           value={locationValue}
//           items={locationItems}
//           setOpen={setLocationOpen}
//           setValue={setLocationValue}
//           setItems={setLocationItems}
//           theme='DARK'
//           placeholder="Seleccionar"
//           style={styles.picker}
//           containerStyle={styles.pickerInnerContainer}
//         />
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   interestText: {
//     fontWeight: '600',
//     color: 'white',
//   },
//   column: {
//     flexDirection: 'row',
//     backgroundColor: 'blue',
//   },
//   picker: {
//     width: 120,
//     height: 20, 
//   },
//   pickerInnerContainer: {
//     width: 120,
//     marginHorizontal: 4,
//   },
// });


import { View, Text, FlatList, Dimensions } from "react-native";
import React from "react";
import SvgComponent from "../../components/svg/SvgComponent";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

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
    const renderItem = ({ item, index }: { item: any; index: number }) => {
        return (
            <View
                className={`bg-[#d9d9d9] p-4 rounded-lg mb-4 flex-1 mx-1`}
            >
                {/* TODO: Esto seria el tipo de proyecto */}
                <Text className="text-xl font-bold mb-1">{item.title}</Text>

                <View className="flex flex-row gap-1 items-center mb-2">
                    <MaterialCommunityIcons
                        name="set-none"
                        color={"black"}
                        size={26}
                    />
                    <Text className="text-gray-500">{item.org}</Text>
                </View>
                <View className="flex flex-row items-left mb-2">
                    <Text className="text-gray-500 mr-2">{item.duration}</Text>
                    <Text className="text-gray-500">{item.type}</Text>
                </View>

                <Text className="text-gray-500">
                    Lorem Ipsum is simply dummy text.
                </Text>
            </View>
        );
    };

    return (
        <View className="flex-1 p-4 bg-white mt-3">
            {/* Aqui va el nombre del account logueado */}
            <Text className="text-xl font-bold mb-4">Hola, hiDoer!</Text>
            <View className="bg-gray-200 p-4 rounded-lg mb-4">
                <Text className="text-gray-600 text-center">
                    No tienes ningún proyecto activo
                </Text>
            </View>
            <Text className="text-lg font-semibold mb-4">
                Quiero ver voluntarios de (aquí va un select) en formato (aquí va el segundo select) en (aquí va el tercer select)
            </Text>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
};

export default BusquedaTabScreen;

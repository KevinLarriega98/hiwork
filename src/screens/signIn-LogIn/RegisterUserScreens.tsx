import React, { useState, useRef, useCallback } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Animated,
    FlatList,
    useWindowDimensions,
    StyleSheet,
} from "react-native";
import { ExpandingDot } from "react-native-animated-pagination-dots";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../routes/LoginStackNavigation";

type LoginScreenNavigationProp = NavigationProp<RootStackParamList, "Login">;

const REGISTRATION_STEPS = [
    {
        key: "1",
        question: "¿Cuál es tu nombre?",
        placeholder: "Nombre",
        type: "input",
    },
    {
        key: "2",
        question: "¿Qué disciplinas eres experto?",
        options: [
            "Reducir el meu estrès",
            "Reducir el meu estrès",
            "Reducir el meu estrès",
            "Reducir el meu estrès",
            "Reducir el meu estrès",
        ],
        type: "options",
    },
    {
        key: "3",
        question: "Selecciona en qué tipo de proyectos te gustaría participar",
        options: [
            "Reducir el meu estrès",
            "Reducir el meu estrès",
            "Reducir el meu estrès",
            "Reducir el meu estrès",
            "Reducir el meu estrès",
        ],
        type: "options",
    },
    {
        key: "4",
        message: "Ya está tu perfil creado.\n¡A buscar proyectos!",
        type: "message",
    },
];

const RegistrationApp: React.FC = () => {
    const navigation = useNavigation<LoginScreenNavigationProp>();

    const { width } = useWindowDimensions();
    const scrollX = useRef(new Animated.Value(0)).current;
    const flatListRef = useRef<FlatList<any>>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [formData, setFormData] = useState<{ [key: string]: string }>({});
    const [selectedOptions, setSelectedOptions] = useState<{
        [key: string]: string;
    }>({});

    const handleInputChange = (key: string, value: string) => {
        setFormData({ ...formData, [key]: value });
    };

    const handleOptionSelect = (key: string, option: string) => {
        setSelectedOptions({ ...selectedOptions, [key]: option });
    };

    const isNextDisabled = () => {
        const step = REGISTRATION_STEPS[activeIndex];
        if (step.type === "input" && !formData[step.key]) {
            return true;
        }
        if (step.type === "options" && !selectedOptions[step.key]) {
            return true;
        }
        return false;
    };

    const renderItem = useCallback(
        ({ item }: { item: any }) => {
            return (
                <View
                    className="justify-center items-center p-10 mt-10 mx-10 rounded-2xl"
                    style={{ width: width - 80 }}
                >
                    <Text className="text-lg font-bold mb-4 text-center">
                        {item.question || item.message}
                    </Text>
                    {item.type === "input" && (
                        <TextInput
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder={item.placeholder}
                            value={formData[item.key] || ""}
                            onChangeText={(text) =>
                                handleInputChange(item.key, text)
                            }
                        />
                    )}
                    {item.type === "options" &&
                        item.options.map((option: string, index: React.Key) => (
                            <TouchableOpacity
                                key={index}
                                className="w-full p-3 border border-gray-300 rounded mb-2 items-center"
                                onPress={() =>
                                    handleOptionSelect(item.key, option)
                                }
                            >
                                <Text className="text-black">{option}</Text>
                            </TouchableOpacity>
                        ))}
                </View>
            );
        },
        [width, formData, selectedOptions]
    );

    const keyExtractor = useCallback((item: { key: any }) => item.key, []);

    const handleNext = () => {
        if (activeIndex < REGISTRATION_STEPS.length - 1 && !isNextDisabled()) {
            flatListRef.current?.scrollToIndex({ index: activeIndex + 1 });
            setActiveIndex(activeIndex + 1);
        }
    };

    const handlePrev = () => {
        if (activeIndex > 0) {
            flatListRef.current?.scrollToIndex({ index: activeIndex - 1 });
            setActiveIndex(activeIndex - 1);
        }
    };

    return (
        <View className="flex-1 bg-white">
            <Text className=" text-center text-[32px] font-bold mt-4">
                Tu perfil
            </Text>
            <FlatList
                data={REGISTRATION_STEPS}
                keyExtractor={keyExtractor}
                showsHorizontalScrollIndicator={false}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    {
                        useNativeDriver: false,
                    }
                )}
                className="flex-1"
                pagingEnabled
                horizontal
                decelerationRate={"normal"}
                scrollEventThrottle={16}
                renderItem={renderItem}
                ref={flatListRef}
                onMomentumScrollEnd={(event) => {
                    const index = Math.round(
                        event.nativeEvent.contentOffset.x / width
                    );
                    setActiveIndex(index);
                }}
            />
            <View className="items-center mb-7">
                <ExpandingDot
                    data={REGISTRATION_STEPS}
                    expandingDotWidth={30}
                    scrollX={scrollX}
                    inActiveDotColor={"#666666"}
                    activeDotColor={"#666666"}
                    inActiveDotOpacity={0.5}
                    dotStyle={styles.dotStyles}
                    containerStyle={styles.containerStyles}
                />
            </View>
            <View className="flex-row p-5 justify-between">
                {activeIndex < REGISTRATION_STEPS.length - 1 ? (
                    <>
                        {activeIndex > 0 && (
                            <TouchableOpacity
                                className={`p-2 rounded-full w-12 h-12 justify-center items-center ${
                                    activeIndex === 0
                                        ? "bg-gray-400"
                                        : "bg-primary"
                                }`}
                                onPress={handlePrev}
                                disabled={activeIndex === 0}
                            >
                                <MaterialIcons
                                    name="arrow-back"
                                    size={24}
                                    color="white"
                                />
                            </TouchableOpacity>
                        )}

                        <TouchableOpacity
                            className={`p-2 rounded-full w-12 h-12 justify-center items-center ${
                                isNextDisabled() ? "bg-gray-400" : "bg-primary"
                            }`}
                            onPress={handleNext}
                            disabled={isNextDisabled()}
                        >
                            <MaterialIcons
                                name="arrow-forward"
                                size={24}
                                color="white"
                            />
                        </TouchableOpacity>
                    </>
                ) : (
                    <>
                        <View></View>
                        <TouchableOpacity
                            className="p-2 bg-primary rounded-full w-12 h-12 justify-center items-center"
                            onPress={() => navigation.navigate("TabsBottom")}
                        >
                            <MaterialCommunityIcons
                                name="check"
                                size={24}
                                color="white"
                            />
                        </TouchableOpacity>
                    </>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    dotStyles: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 3,
    },
    containerStyles: {
        top: 30,
    },
    itemContainer: {
        justifyContent: "center",
        alignItems: "center",
        padding: 40,
        marginTop: 40,
        marginHorizontal: 40,
        borderRadius: 20,
    },
});

export default RegistrationApp;

import React, { useState, useRef, useCallback } from "react";
import {
    View,
    Text,
    FlatList,
    Animated,
    useWindowDimensions,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import { ExpandingDot } from "react-native-animated-pagination-dots";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import {
    useNavigation,
    RouteProp,
    useRoute,
    NavigationProp,
} from "@react-navigation/native";
import { RootStackParamList } from "../../routes/LoginStackNavigation";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import {
    StepItem,
    renderItem,
    handlePrev,
    isNextDisabled,
    handleNext,
} from "../../util/loginStepsAndUtils";

type TabsBottomScreenNavigationProp = NavigationProp<
    RootStackParamList,
    "TabsBottom"
>;

type RegistrationAppRouteProp = RouteProp<
    RootStackParamList,
    "RegisterUserScreens"
>;

const RegistrationApp: React.FC = () => {
    const route = useRoute<RegistrationAppRouteProp>();
    const { profileType } = route.params;
    const navigation = useNavigation<TabsBottomScreenNavigationProp>();

    const { width } = useWindowDimensions();
    const scrollX = useRef(new Animated.Value(0)).current;
    const flatListRef = useRef<FlatList<any>>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [formData, setFormData] = useState<{ [key: string]: string }>({});
    const [selectedOptions, setSelectedOptions] = useState<{
        [key: string]: string;
    }>({});

    const REGISTRATION_STEPS =
        profileType === "Voluntario"
            ? StepItem.REGISTRATION_STEPS_VOLUNTARIO
            : StepItem.REGISTRATION_STEPS_ONG;

    const keyExtractor = useCallback((item: { key: any }) => item.key, []);

    return (
        <View className="flex-1 bg-white">
            <Text className="text-center text-[32px] font-bold mt-4">
                Tu perfil
            </Text>
            <Text className="text-center text-black text-sm font-normal">
                ¡Queremos saber de ti!
            </Text>
            <FlatList
                data={REGISTRATION_STEPS}
                keyExtractor={keyExtractor}
                showsHorizontalScrollIndicator={false}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: false }
                )}
                scrollEnabled={
                    !isNextDisabled(
                        activeIndex,
                        REGISTRATION_STEPS,
                        formData,
                        selectedOptions
                    )
                }
                className="flex-1"
                pagingEnabled
                horizontal
                decelerationRate={"normal"}
                scrollEventThrottle={16}
                renderItem={(item) =>
                    renderItem(
                        item,
                        width,
                        formData,
                        selectedOptions,
                        setFormData,
                        setSelectedOptions
                    )
                }
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
            <View className="flex-row p-5 justify-between items-center">
                <TouchableOpacity
                    className={`${
                        activeIndex === 0 ? "invisible" : "bg-primary"
                    } p-2 rounded-full w-12 h-12 justify-center items-center`}
                    onPress={() =>
                        handlePrev(activeIndex, flatListRef, setActiveIndex)
                    }
                    disabled={activeIndex === 0}
                >
                    <MaterialIcons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <View className="flex-row">
                    {activeIndex < REGISTRATION_STEPS.length - 1 ? (
                        <TouchableOpacity
                            className={`p-2 rounded-full w-[42px] h-[42px] justify-center items-center ${
                                isNextDisabled(
                                    activeIndex,
                                    REGISTRATION_STEPS,
                                    formData,
                                    selectedOptions
                                )
                                    ? "bg-gray-400"
                                    : "bg-primary"
                            }`}
                            onPress={() =>
                                handleNext(
                                    activeIndex,
                                    flatListRef,
                                    setActiveIndex
                                )
                            }
                            disabled={isNextDisabled(
                                activeIndex,
                                REGISTRATION_STEPS,
                                formData,
                                selectedOptions
                            )}
                        >
                            <AnimatedCircularProgress
                                size={58}
                                width={4}
                                fill={
                                    (activeIndex + 1) *
                                    (100 / REGISTRATION_STEPS.length + 1)
                                }
                                tintColor="#666"
                                backgroundColor="#bbb8b8d6"
                            >
                                {() => (
                                    <MaterialIcons
                                        name="arrow-forward"
                                        size={24}
                                        color="white"
                                    />
                                )}
                            </AnimatedCircularProgress>
                        </TouchableOpacity>
                    ) : (
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
                    )}
                </View>
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
});

export default RegistrationApp;

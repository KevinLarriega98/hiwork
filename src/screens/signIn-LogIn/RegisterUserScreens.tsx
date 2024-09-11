// RegisterUserScreens.tsx
import React, { useState, useRef, useCallback } from "react";
import {
    View,
    Text,
    FlatList,
    Animated,
    useWindowDimensions,
    StyleSheet,
    TouchableOpacity,
    Alert,
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
import useUserStore from "../../context/useRegisterStore";
import useAuthStore from "../../context/useAuthStore";
import * as ImagePicker from "expo-image-picker";
import { uploadImage } from "../../service/api/authService";

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
    const [image, setImage] = useState<string | null>(null);
    const [formData, setFormData] = useState<{ [key: string]: string }>({});
    const [selectedOptions, setSelectedOptions] = useState<{
        [key: string]: string;
    }>({});
    const [error, setError] = useState<string>("");

    const [progress, setProgress] = useState(0);

    const { setName, setDiscipline, setTypeOfProjects, clearSensitiveData } =
        useUserStore();
    const register = useAuthStore((state) => state.register);

    const pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            if (!result.canceled) {
                setImage(result.assets[0].uri);
            }
        } catch (error: any) {
            Alert.alert("Error", error.message);
        }
    };

    const REGISTRATION_STEPS =
        profileType === "Voluntario"
            ? StepItem.REGISTRATION_STEPS_VOLUNTARIO
            : StepItem.REGISTRATION_STEPS_ONG;

    const keyExtractor = useCallback((item: { key: any }) => item.key, []);

    const handleNextStep = () => {
        const step = REGISTRATION_STEPS[activeIndex];
        if (step.key === "1") {
            setName(formData[step.key] || "");
        } else if (step.key === "2") {
            setDiscipline(selectedOptions[step.key] || "");
        } else if (step.key === "3") {
            setTypeOfProjects(selectedOptions[step.key] || "");
        }
        handleNext(activeIndex, flatListRef, setActiveIndex);
    };

    const handleRegister = async () => {
        try {
            const {
                email,
                password,
                profileType: type,
                name,
                discipline,
                typeOfProjects,
            } = useUserStore.getState();

            const uploadedImageData: any = await uploadImage(
                image ? image : "",
                email,
                (progress: any) => setProgress(progress)
            );

            const user = await register(
                email,
                password,
                type,
                name,
                discipline,
                typeOfProjects,
                uploadedImageData.downloadURL
            );

            if (user) {
                console.log("Registered successfully", user);
                navigation.navigate("TabsBottom");
                clearSensitiveData();
            } else {
                throw new Error("Unknown error occurred during registration.");
            }
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
                console.error("Registration failed:", error.message);
            } else {
                setError("An unknown error occurred");
                console.error("Registration failed:", error);
            }
            setTimeout(() => setError(""), 3000);
        }
    };

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
                        setSelectedOptions,
                        pickImage,
                        image,
                        progress
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
            {error && (
                <Text className="text-red-500 text-xl text-center">
                    {error}
                </Text>
            )}
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
                            onPress={handleNextStep}
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
                            onPress={() => handleRegister()}
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

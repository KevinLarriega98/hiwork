import React, { useState } from "react";
import {
    Dimensions,
    View,
    Text,
    Image,
    Linking,
    TouchableOpacity,
    Modal,
    TouchableWithoutFeedback,
    ImageBackground,
} from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import Prueba from "../../components/profile/TabBarCustomProfile";
import profileImage from "../../assets/profile-image.jpg"; // Imagen de perfil por defecto
import useAuthStore from "../../stores/useAuthStore";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import EditProfileAndLogOut from "./components/PerfileTabScreenComponents/EditProfileAndLogOut";
import ModalInterior from "./components/PerfileTabScreenComponents/ModalInterior";

import withSafeArea from "../../util/withSafeArea";

const PerfilTabScreen = () => {
    const backgroundImg = require("../../assets/backgroundVolu.png");

    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: "perfil", title: "Perfil" },
        { key: "proyectos", title: "Proyectos App" },
    ]);

    const [modalUpdateProfileVisible, setModalUpdateProfileVisible] =
        useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const { currentUser, logout } = useAuthStore();

    const openLink = (url: string) => {
        Linking.openURL(url).catch((err) =>
            console.error("Error al abrir enlace", err)
        );
    };

    const logOutFunction = async () => {
        await logout();
    };

    const PerfilScreen = () => (
        <View className="flex-1 px-6">
            <Text numberOfLines={14}>{currentUser?.description}</Text>
            <TouchableOpacity
                onPress={() =>
                    openLink("https://www.linkedin.com/in/marcgonzaleztarrio/")
                }
                className="flex flex-row items-center mt-2"
            >
                <MaterialCommunityIcons
                    name="linkedin"
                    color={"black"}
                    size={26}
                />
                <Text className="ml-2">marcgonzaleztarrio</Text>
            </TouchableOpacity>
        </View>
    );

    const ProyectosScreen = () => (
        <View className="flex-1 items-center">
            <Text>23 trabajos realizados</Text>
        </View>
    );

    const initialLayout = { width: Dimensions.get("window").width };

    const renderScene = SceneMap({
        perfil: PerfilScreen,
        proyectos: ProyectosScreen,
    });

    return (
        <ImageBackground className="flex-1" source={backgroundImg}>
            <View className="flex-1 ">
                {currentUser?.profileType === "ONG" ? (
                    <ImageBackground
                        source={{
                            uri: currentUser.backgroundImage
                                ? currentUser.backgroundImage
                                : "https://firebasestorage.googleapis.com/v0/b/hiwork-43f78.appspot.com/o/profileImage%2FProjectCard.jpg?alt=media&token=6ccef7bd-888c-40bf-bbd5-8c5c5a7deb2e",
                        }}
                        className="w-full"
                        resizeMode="cover"
                        imageStyle={{
                            borderBottomLeftRadius: 20,
                            borderBottomRightRadius: 20,
                        }}
                        blurRadius={6}
                    >
                        <View className="flex flex-col items-center p-4 rounded-b-3xl">
                            <EditProfileAndLogOut
                                setModalVisible={setModalVisible}
                                modalVisible={modalVisible}
                            />

                            <Modal
                                animationType="fade"
                                transparent={true}
                                visible={modalUpdateProfileVisible}
                                onRequestClose={() =>
                                    setModalUpdateProfileVisible(false)
                                }
                            >
                                <ModalInterior
                                    setModalVisible={
                                        setModalUpdateProfileVisible
                                    }
                                    modalVisible={modalUpdateProfileVisible}
                                />
                            </Modal>

                            <Modal
                                animationType="fade"
                                transparent={true}
                                visible={modalVisible}
                                onRequestClose={() => setModalVisible(false)}
                            >
                                <TouchableWithoutFeedback
                                    onPress={() => setModalVisible(false)}
                                >
                                    <View
                                        style={{
                                            backgroundColor: "rgba(0,0,0,0.5)",
                                        }}
                                        className="flex-1 justify-end"
                                    >
                                        <TouchableWithoutFeedback>
                                            <View className="w-full bg-white p-4 rounded-t-lg">
                                                <TouchableOpacity
                                                    onPress={() =>
                                                        setModalUpdateProfileVisible(
                                                            true
                                                        )
                                                    }
                                                    className=""
                                                >
                                                    <Text className="text-xl font-bold mb-4">
                                                        Editar Perfil
                                                    </Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    onPress={() =>
                                                        logOutFunction()
                                                    }
                                                >
                                                    <Text className="text-xl font-bold">
                                                        Cerrar Sesión
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>
                                        </TouchableWithoutFeedback>
                                    </View>
                                </TouchableWithoutFeedback>
                            </Modal>

                            <Image
                                source={{
                                    uri: currentUser?.image || profileImage,
                                }}
                                className="w-40 h-40 rounded-full border-4 border-white"
                            />
                            <Text className="text-2xl font-bold text-center mt-2">
                                {currentUser?.name}
                            </Text>
                            <View className="flex flex-row justify-center items-center mt-1">
                                <Text className="text-black text-sm">
                                    <MaterialCommunityIcons
                                        name="google-maps"
                                        color={"black"}
                                        size={20}
                                    />{" "}
                                    Barcelona
                                </Text>
                                <Text className="text-black text-sm mx-1">
                                    |
                                </Text>
                                <Text className="text-black text-sm">
                                    <MaterialCommunityIcons
                                        name="account-voice"
                                        color={"black"}
                                        size={20}
                                    />{" "}
                                    Catalan, Castellano
                                </Text>
                            </View>
                        </View>
                    </ImageBackground>
                ) : (
                    <View className="flex flex-col items-center p-4 rounded-b-3xl bg-red-200">
                        <EditProfileAndLogOut
                            setModalVisible={setModalVisible}
                            modalVisible={modalVisible}
                        />

                        <Modal
                            animationType="fade"
                            transparent={true}
                            visible={modalUpdateProfileVisible}
                            onRequestClose={() =>
                                setModalUpdateProfileVisible(false)
                            }
                        >
                            <ModalInterior
                                setModalVisible={setModalUpdateProfileVisible}
                                modalVisible={modalUpdateProfileVisible}
                            />
                        </Modal>

                        <Modal
                            animationType="fade"
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => setModalVisible(false)}
                        >
                            <TouchableWithoutFeedback
                                onPress={() => setModalVisible(false)}
                            >
                                <View
                                    style={{
                                        backgroundColor: "rgba(0,0,0,0.5)",
                                    }}
                                    className="flex-1 justify-end"
                                >
                                    <TouchableWithoutFeedback>
                                        <View className="w-full bg-white p-4 rounded-t-lg">
                                            <TouchableOpacity
                                                onPress={() =>
                                                    setModalUpdateProfileVisible(
                                                        true
                                                    )
                                                }
                                            >
                                                <Text className="text-xl font-bold mb-4">
                                                    Editar Perfil
                                                </Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                onPress={() => logOutFunction()}
                                            >
                                                <Text className="text-xl font-bold">
                                                    Cerrar Sesión
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>
                            </TouchableWithoutFeedback>
                        </Modal>

                        <Image
                            source={{ uri: currentUser?.image || profileImage }}
                            className="w-40 h-40 rounded-full border-4 border-white"
                        />
                        <Text className="text-2xl font-bold text-center mt-2">
                            {currentUser?.name}
                        </Text>
                        <View className="flex flex-row justify-center items-center mt-1">
                            <Text className="text-black text-sm">
                                <MaterialCommunityIcons
                                    name="google-maps"
                                    color={"black"}
                                    size={20}
                                />{" "}
                                Barcelona
                            </Text>
                            <Text className="text-black text-sm mx-1">|</Text>
                            <Text className="text-black text-sm">
                                <MaterialCommunityIcons
                                    name="account-voice"
                                    color={"black"}
                                    size={20}
                                />{" "}
                                Catalan, Castellano
                            </Text>
                        </View>
                    </View>
                )}

                <TabView
                    navigationState={{ index, routes }}
                    renderScene={renderScene}
                    onIndexChange={setIndex}
                    initialLayout={initialLayout}
                    renderTabBar={(props) => <Prueba {...props} />}
                />
            </View>
        </ImageBackground>
    );
};

export default withSafeArea(PerfilTabScreen);

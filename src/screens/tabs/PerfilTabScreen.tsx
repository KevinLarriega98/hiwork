import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import useAuthStore from "../../context/useAuthStore";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../routes/LoginStackNavigation";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import profileImage from "../../../assets/profile-image.jpg";

type HomeScreenNavigationProp = NavigationProp<RootStackParamList, "Home">;

const PerfilTabScreen = () => {
  const { user, currentUser } = useAuthStore();
  const logOut = useAuthStore((state) => state.logout);

  const navigation = useNavigation<HomeScreenNavigationProp>();

  const navigateToHome = () => {
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.topBackground}>
          <Text style={styles.name}>Carolina Díaz</Text>
        </View>

        <View style={styles.imageWrapper}>
          <Image source={profileImage} style={styles.profileImage} />
        </View>

        <TouchableOpacity style={styles.editButton}>
          <MaterialCommunityIcons name="pencil" size={20} color="#666666" />
        </TouchableOpacity>

        <View style={styles.bottomBackground}>
          <Text style={styles.stats}>
            23 trabajos realizados | 22 feedbacks
          </Text>
          <Text style={styles.description}>
            Soy Carolina Díaz, historiadora y estudiante de Diseño UX en
            Barcelona. Trabajo como freelancer, optimizando mi flujo de trabajo
            con herramientas digitales. Me apasiona el diseño, la tecnología y
            el aprendizaje continuo. Disfruto de paseos por la ciudad con mi
            gato, Luna.
          </Text>
          <Text style={styles.sectionTitle}>Trabajos en curso</Text>
          <View style={styles.currentWorks}>
            <View style={styles.currentWorksItem} />
          </View>
          <Text style={styles.sectionTitle}>Trabajos Anteriores</Text>
          <View style={styles.previousWorks}>
            <View style={styles.workItem} />
            <View style={styles.workItem} />
            <View style={styles.workItem} />
            <View style={styles.workItem} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBackground: {
    height: "25%",
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 0,
  },
  bottomBackground: {
    minHeight: "100%",
    backgroundColor: "#E6E6E6",
    paddingTop: 90,
    marginBottom: 200,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },
  imageWrapper: {
    position: "absolute",
    top: "25%",
    left: "50%",
    transform: [{ translateX: -75 }, { translateY: -75 }],
    zIndex: 1,
    overflow: "hidden",
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  profileImage: {
    width: 300,
    height: 300,
    transform: [{ scale: 1 }],
    position: "absolute",
    top: "-7%",
    left: "-50%",
  },
  editButton: {
    position: 'absolute',
    top: '31.3%', // Ajusta la posición para que el botón quede parcialmente en la imagen y parcialmente en el fondo gris
    left: '53.7%',
    transform: [{ translateX: 30 }, { translateY: -15 }], // Ajusta la posición horizontal y vertical
    backgroundColor: '#FFFFFF',
    width: 36,
    height: 36,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2, // Asegura que el botón esté por encima de la imagen y el fondo
    borderWidth: 1,
    borderColor: '#E6E6E6',
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    zIndex: 1,
  },
  stats: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    color: "#666666",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    marginLeft: 20,
  },
  currentWorks: {
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  currentWorksItem: {
    backgroundColor: "#B3B3B3",
    width: "100%",
    height: 100,
    borderRadius: 10,
  },
  previousWorks: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  workItem: {
    backgroundColor: "#B3B3B3",
    width: "48%",
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  scrollViewContent: {
    paddingTop: 0,
  },
});

export default PerfilTabScreen;

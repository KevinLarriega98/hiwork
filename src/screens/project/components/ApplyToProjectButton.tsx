import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, Alert } from "react-native";
import useAuthStore from "../../../context/useAuthStore";
import {
    applyToProject,
    checkIfApplied,
} from "../../../service/api/projectService";

const ApplyToProjectButton = ({ projectID }: { projectID: string }) => {
    const { currentUser, user } = useAuthStore();
    const [hasApplied, setHasApplied] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const checkApplicationStatus = async () => {
            if (user?.uid) {
                try {
                    const applied = await checkIfApplied(projectID, user.uid);
                    setHasApplied(applied);
                } catch (error) {
                    console.error("Error al verificar la aplicación:", error);
                }
            }
        };

        checkApplicationStatus();
    }, [projectID, user?.uid]);

    const handleApply = async () => {
        if (hasApplied) {
            Alert.alert("Ya has aplicado", "Ya has aplicado a este proyecto.");
            return;
        }

        setLoading(true);

        try {
            const applicationID = await applyToProject(
                projectID,
                user?.uid,
                currentUser?.name,
                user?.email,
                "Esta es mi carta de presentación para el proyecto."
            );

            console.log("Aplicación ID:", applicationID);
            Alert.alert(
                "Aplicación Enviada",
                "Has aplicado exitosamente al proyecto."
            );
            setHasApplied(true);
        } catch (error) {
            Alert.alert("Error", "Hubo un error al aplicar al proyecto.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <TouchableOpacity
            className={`absolute bottom-5 right-5  rounded-full px-5 bg-gray-700 py-4 justify-center items-center elevation-5 ${
                hasApplied ? " opacity-50" : " opacity-100"
            }`}
            onPress={handleApply}
            disabled={loading || hasApplied}
        >
            <Text className=" text-white text-base font-bold">
                {hasApplied ? "Ya Aplicado" : "Aplicar"}
            </Text>
        </TouchableOpacity>
    );
};

export default ApplyToProjectButton;

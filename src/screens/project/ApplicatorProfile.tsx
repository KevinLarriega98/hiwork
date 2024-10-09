import { RouteProp, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { RootStackParamList } from "../../types/navigation";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { UserState } from "../../types/profile";
import { updateStatusApplicator } from "../../service/api/projectService";
import { getUserDataFromFirestore } from "../../service/api/authService";

type ProjectScreenRouteProp = RouteProp<
    RootStackParamList,
    "ApplicatorProfile"
>;

const ApplicatorProfile = () => {
    const route = useRoute<ProjectScreenRouteProp>();
    const { item, project } = route.params;

    const [volunteer, setVolunteer] = useState<UserState>();

    useEffect(() => {
        getUserDataFromFirestore(item.volunteerID).then((volunteer) => {
            setVolunteer(volunteer as UserState);
        });
    }, [item.id]);

    return (
        <View className="flex-1 p-6">
            <View className=" bg-[#D9D9D9] flex-1 rounded-lg p-6">
                <View className=" flex-row gap-3 items-center">
                    <Image
                        source={{
                            uri: volunteer?.image!,
                        }}
                        className="w-16 h-16 rounded-full border-4 border-white"
                    />
                    <View>
                        <Text>{volunteer?.name}</Text>
                        <Text>{volunteer?.email}</Text>
                    </View>
                </View>
                <View className="flex-1 p-6 bg-white rounded-lg mt-3">
                    <Text className="text-lg font-bold"> Description </Text>
                    <Text>{volunteer?.description}</Text>
                    <Text className="text-lg font-bold">Discipline</Text>
                    <Text>{volunteer?.discipline}</Text>
                    <Text className="text-lg font-bold">Type of Projects</Text>
                    <Text>{volunteer?.typeOfProjects}</Text>
                    <Text className="text-lg font-bold">Cover Letter</Text>
                    <Text>{item.coverLetter}</Text>
                    <Text className="text-lg font-bold">Status</Text>
                    <Text>{item.status}</Text>
                    <View className="absolute flex bottom-0 left-0 right-0 flex-row gap-2 items-center justify-around p-4">
                        <TouchableOpacity
                            onPress={() =>
                                updateStatusApplicator(
                                    project.id!,
                                    item.volunteerID,
                                    "accepted"
                                )
                            }
                            className=" bg-gray_2 rounded-full px-6 py-3"
                        >
                            <Text className="text-white">Aceptar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() =>
                                updateStatusApplicator(
                                    project.id!,
                                    item.volunteerID,
                                    "rejected"
                                )
                            }
                            className=" bg-gray_2 rounded-full px-6 py-3"
                        >
                            <Text className="text-white">Rechazar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default ApplicatorProfile;

import { RouteProp, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { RootStackParamList } from "../../types/navigation";
import { Text, View, Image } from "react-native";
import { getVolunteerDataFromFirestore } from "../../service/api/authService";
import { UserState } from "../../types/profile";

type ProjectScreenRouteProp = RouteProp<
    RootStackParamList,
    "ApplicatorProfile"
>;

const ApplicatorProfile = () => {
    const route = useRoute<ProjectScreenRouteProp>();
    const { item, project } = route.params;

    const [volunteer, setVolunteer] = useState<UserState>();

    console.log(volunteer);

    useEffect(() => {
        getVolunteerDataFromFirestore(item.volunteerID).then((volunteer) => {
            setVolunteer(volunteer as UserState);
        });
    }, [item.id]);

    console.log(volunteer?.image);

    return (
        <View className="flex-1 p-6">
            <View className=" bg-[#D9D9D9] flex-1 rounded-lg p-2">
                <View className=" flex-row gap-3 items-center">
                    <Image
                        source={{
                            uri: volunteer?.image ? volunteer?.image : "",
                        }}
                        className="w-16 h-16 rounded-full border-4 border-white"
                    />
                    <View>
                        <Text>{volunteer?.name}</Text>
                        <Text>{volunteer?.email}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default ApplicatorProfile;

import { View, Text, TextInput, Button, Alert, Switch } from "react-native";
import React, { useState } from "react";
import useAuthStore from "../../context/useAuthStore";
import useProjectStore from "../../context/useProjectStore";
import BellComponent from "../../components/Projects/BellComponent";

const HomeTabScreen = () => {
    const { user } = useAuthStore();
    const { createProject } = useProjectStore((state) => ({
        createProject: state.createProject,
        fetchProjects: state.fetchProjects,
    }));

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [objectiveTimeline, setObjectiveTimeline] = useState("");
    const [remote, setRemote] = useState(false);

    const typeOfUser = user?.currentUser?.profileType;

    const handleCreateProject = async () => {
        if (!title || !description || !objectiveTimeline) {
            Alert.alert("Error", "Please fill out all fields.");
            return;
        }

        try {
            await createProject(
                user?.uid,
                title,
                description,
                objectiveTimeline,
                remote
            );
            Alert.alert("Success", "Project created successfully.");
            setTitle("");
            setDescription("");
            setObjectiveTimeline("");
            setRemote(false);
        } catch (error) {
            Alert.alert("Error", "Failed to create project.");
            console.error("Error creating project:", error);
        }
    };

    return (
        <View className="flex-1 bg-white">
            <BellComponent />
            <View className="px-4 flex-1">
                {typeOfUser === "Voluntario" ? (
                    <Text>VOLUNTARIO</Text>
                ) : (
                    <View>
                        <Text className="text-xl font-bold mb-4">
                            Create New Project
                        </Text>
                        <TextInput
                            className="border p-2 mb-4"
                            placeholder="Title"
                            value={title}
                            onChangeText={setTitle}
                        />
                        <TextInput
                            className="border p-2 mb-4"
                            placeholder="Description"
                            value={description}
                            onChangeText={setDescription}
                        />
                        <TextInput
                            className="border p-2 mb-4"
                            placeholder="Objective Timeline"
                            value={objectiveTimeline}
                            onChangeText={setObjectiveTimeline}
                        />
                        <View className="flex-row items-center mb-4">
                            <Text className="mr-2">Remote:</Text>
                            <Switch value={remote} onValueChange={setRemote} />
                        </View>
                        <Button
                            title="Create Project"
                            onPress={handleCreateProject}
                        />
                    </View>
                )}
                <Text className="mt-4">
                    {user && JSON.stringify(user.currentUser.profileType)}
                </Text>
            </View>
        </View>
    );
};

export default HomeTabScreen;

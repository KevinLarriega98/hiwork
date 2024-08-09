import { View, Text, TextInput, Switch, Button, Alert } from "react-native";
import React, { useState } from "react";
import useAuthStore from "../../context/useAuthStore";
import useProjectStore from "../../context/useProjectStore";

const NewProjectONG = () => {
    const { user, currentUser } = useAuthStore();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [objectiveTimeline, setObjectiveTimeline] = useState("");
    const [remote, setRemote] = useState(false);

    const { createProject } = useProjectStore((state) => ({
        createProject: state.createProject,
        fetchProjects: state.fetchProjects,
    }));

    const handleCreateProject = async () => {
        if (!title || !description || !objectiveTimeline) {
            Alert.alert("Error", "Please fill out all fields.");
            return;
        }

        try {
            await createProject(
                user?.uid,
                currentUser?.name,
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
        <View>
            <Text className="text-xl font-bold mb-4">Create New Project</Text>
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
            <Button title="Create Project" onPress={handleCreateProject} />
        </View>
    );
};

export default NewProjectONG;

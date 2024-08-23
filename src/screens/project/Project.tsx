import { RouteProp, useRoute } from "@react-navigation/native";
import React from "react";
import { RootStackParamList } from "../../routes/LoginStackNavigation";
import ProjectTabsNavigation from "../../routes/ProjectTabsNavigation";

type ProjectScreenRouteProp = RouteProp<RootStackParamList, "Project">;

const Project = () => {
    const route = useRoute<ProjectScreenRouteProp>();
    const { project } = route.params;

    return <ProjectTabsNavigation project={project} />;
};

export default Project;

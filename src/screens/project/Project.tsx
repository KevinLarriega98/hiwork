import { RouteProp, useRoute } from "@react-navigation/native";
import React from "react";
import ProjectTabsNavigation from "../../routes/ProjectTabsNavigation";
import { RootStackParamList } from "../../types/Navigation";

type ProjectScreenRouteProp = RouteProp<RootStackParamList, "Project">;

const Project = () => {
    const route = useRoute<ProjectScreenRouteProp>();
    const { project } = route.params;

    return <ProjectTabsNavigation project={project} />;
};

export default Project;

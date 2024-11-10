import { Timestamp } from "firebase/firestore";
import { Project, CalendarEvent } from "./Project";
import { RoleData } from "./ProjectState";

export interface ProjectActions {
    setProjects: (projects: Project[]) => void;
    setOng: (ongName: string) => void;
    setTitle: (title: string) => void;
    setDescription: (description: string) => void;
    setObjectiveTimeline: (objectiveTimeline: CalendarEvent[]) => void;
    setCreatedAt: (createdAt: Timestamp | null) => void;
    setUpdatedAt: (updatedAt: Timestamp | null) => void;

    createProject: (
        ongID: string,
        ongName: string,
        title: string,
        description: string,
        roles: RoleData[],
        objectiveTimeline: CalendarEvent[]
    ) => Promise<Project>;

    fetchProjects: () => Promise<Project[] | void>;
}

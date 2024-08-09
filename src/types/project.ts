import { Timestamp } from "firebase/firestore";

export interface ProjectState {
    projects: any[];
    ongName: string;
    title: string;
    description: string;
    objectiveTimeline: string;
    createdAt: Timestamp | null;
    updatedAt: Timestamp | null;
    remote: boolean;
}

export interface ProjectActions {
    setProjects: (projects: any[]) => void;
    setOng: (ong: string) => void;
    setTitle: (title: string) => void;
    setDescription: (description: string) => void;
    setObjectiveTimeline: (objectiveTimeline: string) => void;
    setCreatedAt: (createdAt: Timestamp | null) => void;
    setUpdatedAt: (updatedAt: Timestamp | null) => void;
    setRemote: (remote: boolean) => void;
    createProject: (
        ongID: string,
        ongName: string,
        title: string,
        description: string,
        objectiveTimeline: string,
        remote: boolean
    ) => Promise<any>;
    fetchProjects: () => Promise<{ id: string }[] | undefined>;
}

export interface ProjectState {
    projects: any[];
    ong: string;
    title: string;
    description: string;
    objectiveTimeline: string;
    createdAt: string;
    updatedAt: string | null;
    remote: boolean;
}

export interface ProjectActions {
    setProjects: (projects: any[]) => void;
    setOng: (ong: string) => void;
    setTitle: (title: string) => void;
    setDescription: (description: string) => void;
    setObjectiveTimeline: (objectiveTimeline: string) => void;
    setCreatedAt: (createdAt: string) => void;
    setUpdatedAt: (updatedAt: string) => void;
    setRemote: (remote: boolean) => void;
    createProject: (
        ong: string,
        title: string,
        description: string,
        objectiveTimeline: string,
        remote: boolean
    ) => Promise<any>;
    fetchProjects: () => Promise<void>;
}

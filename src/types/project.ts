export interface ProjectState {
    ongs: any[];
    projects: any[];
    actualProject: any | null;
}

export interface ProjectActions {
    setOngs: (ongs: any[]) => void;
    setProject: (projects: any[]) => void;
    setActualProject: (projects: any) => void;
}

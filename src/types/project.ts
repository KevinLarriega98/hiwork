import { Timestamp } from "firebase/firestore";

export interface ProjectState {
    id?: string;
    ongID?: string;
    projects: any[];
    ongName: string;
    title: string;
    description: string;
    roles: any[];
    objectiveTimeline: CalendarEvent[];
    createdAt: Timestamp | null;
    updatedAt: Timestamp | null;
}

export interface ProjectActions {
    setProjects: (projects: any[]) => void;
    setOng: (ong: string) => void;
    setTitle: (title: string) => void;
    setDescription: (description: string) => void;
    setObjectiveTimeline: (
        objectiveTimeline: {
            date: string;
            name: string;
            data: string;
            height: number;
            day: string;
        }[]
    ) => void;
    setCreatedAt: (createdAt: Timestamp | null) => void;
    setUpdatedAt: (updatedAt: Timestamp | null) => void;
    createProject: (
        ongID: string,
        ongName: string,
        title: string,
        description: string,
        roles: any[],
        objectiveTimeline: {
            date: string;
            name: string;
            data: string;
            height: number;
            day: string;
        }[]
    ) => Promise<any>;
    fetchProjects: () => Promise<{ id: string }[] | undefined>;
}

export interface CalendarEvent {
    date: string;
    name: string;
    data: string;
    height: number;
    day: string;
    isChecked: boolean;
}

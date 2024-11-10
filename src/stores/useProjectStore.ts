import { create } from "zustand";
import { createProject as createProjectService } from "../service/api/projectService";
import { collection, getDocs, Timestamp } from "firebase/firestore";
import { db } from "../service/api/firebase";
import { Project, CalendarEvent } from "../types/Project";
import { ProjectActions } from "../types/ProjectActions";
import { ProjectState, RoleData } from "../types/ProjectState";

const useProjectStore = create<ProjectActions & ProjectState>((set) => ({
    projects: [],
    ongName: "",
    title: "",
    description: "",
    roles: [],
    objectiveTimeline: [],
    createdAt: null,
    updatedAt: null,

    setProjects: (projects: Project[]) => set({ projects }),
    setOng: (ongName: string) => set({ ongName }),
    setTitle: (title: string) => set({ title }),
    setDescription: (description: string) => set({ description }),
    setObjectiveTimeline: (objectiveTimeline: CalendarEvent[]) =>
        set({ objectiveTimeline }),
    setCreatedAt: (createdAt: Timestamp | null) => set({ createdAt }),
    setUpdatedAt: (updatedAt: Timestamp | null) => set({ updatedAt }),

    createProject: async (
        ongID: string,
        ongName: string,
        title: string,
        description: string,
        roles: RoleData[],
        objectiveTimeline: CalendarEvent[]
    ) => {
        try {
            const project = await createProjectService(
                ongID,
                ongName,
                title,
                description,
                roles,
                objectiveTimeline
            );
            set((state: ProjectState) => ({
                projects: [...state.projects, project],
            }));
            return project;
        } catch (error) {
            console.error("Error creating project:", error);
            throw error;
        }
    },

    fetchProjects: async () => {
        try {
            const colRef = collection(db, "projects");
            const querySnapshot = await getDocs(colRef);
            const projects = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as Project[];
            set({ projects });
            return projects;
        } catch (error) {
            console.error("Error fetching projects:", error);
        }
    },
}));

export default useProjectStore;

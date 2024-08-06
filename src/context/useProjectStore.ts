import { create } from "zustand";
import { ProjectActions, ProjectState } from "../types/project";
import { createProject as createProjectService } from "../service/api/projectService";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../service/api/firebase";

const useProjectStore = create<ProjectActions & ProjectState>((set) => ({
    projects: [],
    ong: "",
    title: "",
    description: "",
    objectiveTimeline: "",
    createdAt: "",
    updatedAt: null,
    remote: false,

    setProjects: (projects) => set({ projects }),
    setOng: (ong) => set({ ong }),
    setTitle: (title) => set({ title }),
    setDescription: (description) => set({ description }),
    setObjectiveTimeline: (objectiveTimeline) => set({ objectiveTimeline }),
    setCreatedAt: (createdAt) => set({ createdAt }),
    setUpdatedAt: (updatedAt) => set({ updatedAt }),
    setRemote: (remote) => set({ remote }),

    createProject: async (
        ongID: string,
        ongName: string,
        title: string,
        description: string,
        objectiveTimeline: string,
        remote: boolean
    ) => {
        try {
            const project = await createProjectService(
                ongID,
                ongName,
                title,
                description,
                objectiveTimeline,
                remote
            );
            set((state) => ({
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
            }));
            set({ projects });
            return projects;
        } catch (error) {
            console.error("Error fetching projects:", error);
        }
    },
}));

export default useProjectStore;

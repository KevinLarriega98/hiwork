import { create } from "zustand";
import { ProjectState, ProjectActions } from "../types/project";

const useProjectStore = create<ProjectState & ProjectActions>((set) => ({
  ongs: [],
  projects: [],
  actualProject: null,
  setOngs: (ongs) => set({ ongs }),
  setProject: (projects) => set({ projects: projects }),
  setActualProject: (project) => set({ actualProject: project }),
}));

export default useProjectStore;

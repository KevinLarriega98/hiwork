import { create } from "zustand";
import { ProjectState, ProjectActions } from "../types/project";

const useProjectStore = create<ProjectState & ProjectActions>((set) => ({
    ongs: [],
    projects: [],
    proyectoActual: null,
    setOngs: (ongs) => set({ ongs }),
    setProyectos: (proyectos) => set({ projects: proyectos }),
    setProyectoActual: (proyecto) => set({ proyectoActual: proyecto }),
}));

export default useProjectStore;

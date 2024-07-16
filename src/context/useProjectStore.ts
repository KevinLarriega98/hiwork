import { create } from "zustand";
import { ProjectState, ProjectActions } from "../types/project";

const useProjectStore = create<ProjectState & ProjectActions>((set) => ({
    ongs: [],
    proyectos: [],
    proyectoActual: null,
    setOngs: (ongs) => set({ ongs }),
    setProyectos: (proyectos) => set({ proyectos }),
    setProyectoActual: (proyecto) => set({ proyectoActual: proyecto }),
}));

export default useProjectStore;

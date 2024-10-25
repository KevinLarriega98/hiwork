import { create } from "zustand";
import { RegisterState, UserActions } from "../types/profile";

const useUserStore = create<UserActions & RegisterState>((set) => ({
    email: "",
    password: "",
    profileType: "Voluntario",
    name: "",
    discipline: "",
    typeOfProjects: "",
    tools: [],
    description: "",
    setEmail: (email) => set({ email }),
    setProyectosAplicados: (proyectosAplicados) => set({ proyectosAplicados }),
    setPassword: (password) => set({ password }),
    setProfileType: (profileType) => set({ profileType }),
    setName: (name) => set({ name }),
    setDiscipline: (discipline) => set({ discipline }),
    setTypeOfProjects: (typeOfProjects) => set({ typeOfProjects }),
    setTools: (tools) => set({ tools }),
    clearSensitiveData: () =>
        set({
            email: "",
            password: "",
            name: "",
            discipline: "",
            typeOfProjects: "",
            description: "",
        }),
    setDescription: (description) => set({ description }),
}));

export default useUserStore;

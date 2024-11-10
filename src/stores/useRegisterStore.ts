// useUserStore.ts

import { create } from "zustand";
import { RegisterState } from "../types/RegisterState";
import { RegisterActions } from "../types/RegisterActions";

const useUserStore = create<RegisterActions & RegisterState>((set) => ({
    email: "",
    password: "",
    profileType: "Voluntario",
    name: "",
    discipline: "",
    typeOfProjects: [],
    tools: [],
    description: "",
    proyectosAplicados: [],

    setEmail: (email: string) => set({ email }),
    setPassword: (password: string) => set({ password }),
    setProfileType: (profileType: "ONG" | "Voluntario") => set({ profileType }),
    setName: (name: string) => set({ name }),
    setDiscipline: (discipline: string) => set({ discipline }),
    setTypeOfProjects: (typeOfProjects: string[]) => set({ typeOfProjects }),
    setTools: (tools: string[]) => set({ tools }),
    setProyectosAplicados: (proyectosAplicados: string[]) =>
        set({ proyectosAplicados }),
    setDescription: (description: string) => set({ description }),

    clearSensitiveData: () =>
        set({
            email: "",
            password: "",
            name: "",
            discipline: "",
            typeOfProjects: [],
            description: "",
        }),
}));

export default useUserStore;

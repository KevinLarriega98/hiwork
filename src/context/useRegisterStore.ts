import { create } from "zustand";
import { RegisterState, UserActions } from "../types/profile";

const useUserStore = create<UserActions & RegisterState>((set) => ({
    email: "",
    password: "",
    profileType: "Voluntario",
    name: "",
    discipline: "",
    typeOfProjects: "",
    setEmail: (email) => set({ email }),
    setPassword: (password) => set({ password }),
    setProfileType: (profileType) => set({ profileType }),
    setName: (name) => set({ name }),
    setDiscipline: (discipline) => set({ discipline }),
    setTypeOfProjects: (typeOfProjects) => set({ typeOfProjects }),
    clearSensitiveData: () => set({ password: "" }),
}));

export default useUserStore;

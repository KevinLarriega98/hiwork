import { create } from "zustand";
import { UserProfile } from "../types/profile";

const useUserStore = create<UserProfile>((set) => ({
    email: "",
    password: "",
    profileType: "Voluntario",
    name: "",
    discipline: "",
    typeOfProjects: "",
    currentUser: null,
    setEmail: (email) => set({ email }),
    setPassword: (password) => set({ password }),
    setProfileType: (profileType) => set({ profileType }),
    setName: (name) => set({ name }),
    setDiscipline: (discipline) => set({ discipline }),
    setTypeOfProjects: (typeOfProjects) => set({ typeOfProjects }),
    clearSensitiveData: () => set({ password: "" }),
    setCurrentUser: (currentUser) => set({ currentUser }),
}));

export default useUserStore;

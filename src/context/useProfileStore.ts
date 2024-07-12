import { create } from "zustand";
import { ProfileState, ProfileActions } from "../types/profile";

const useProfileStore = create<ProfileState & ProfileActions>((set) => ({
    perfil: {},
    setPerfil: (perfil) => set({ perfil }),
}));

export default useProfileStore;

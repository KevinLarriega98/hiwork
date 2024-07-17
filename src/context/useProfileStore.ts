import { create } from "zustand";
import { ProfileState, ProfileActions } from "../types/profile";

const useProfileStore = create<ProfileState & ProfileActions>((set) => ({
  profile: {},
  setProfile: (profile) => set({ profile }),
}));

export default useProfileStore;

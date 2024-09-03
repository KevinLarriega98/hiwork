import { create } from "zustand"

type Store = {
  userId: string | null;
  rollName: string | null;  
  setUserId: (id: string | null) => void;
  setRollName: (roll: string | null) => void;
}
export const useChatDataStore = create<Store>()((set) => ({
  userId: "",
  rollName: "",
  setUserId: (id) => set( () => ({userId: id})),
  setRollName: (roll) => set( () => ({rollName: roll})),
}))
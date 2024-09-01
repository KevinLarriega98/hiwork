import { create } from "zustand"

type Store = {
  idToken: string | null;
  isRegister: boolean;
  profileTypeGoogle: string;
  emailProvider: string | null,
  nameProvider: string | null,
  setIsRegister: (value: boolean) => void;
  setProfileTypeGoogle: (value: string) => void;
  setEmailProvider: (email: string | null) => void;
  setNameProvider: (name: string | null) => void
  setIdToken: (token: string | null) => void;
}
export const useAuthState = create<Store>()((set) => ({
  idToken: "",
  emailProvider: "",
  nameProvider: "",
  isRegister: false,
  profileTypeGoogle: "",
  setIsRegister: (value) => set( () => ({isRegister: value})),
  setProfileTypeGoogle: (value: string) => set(() => ({profileTypeGoogle: value})),
  setEmailProvider: (email) => set( () => ({emailProvider: email})),
  setNameProvider: (name) => set( () => ({nameProvider: name})),
  setIdToken: (token) => set( () => ({idToken: token})),
}))
import { create } from "zustand";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { AuthState, AuthActions } from "../types/auth";
import { auth } from "../service/api/firebase";

const useAuthStore = create<AuthState & AuthActions>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  setToken: (token) => set({ token }),

  logout: async () => {
    await signOut(auth);
    set({ user: null, token: null, isAuthenticated: false });
  },

  login: async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    set({ user: userCredential.user, isAuthenticated: true });
  },

  register: async (email, password) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    set({ user: userCredential.user, isAuthenticated: true });
  },

  initializeAuth: () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        set({ user: user, isAuthenticated: true });
      } else {
        set({ user: null, isAuthenticated: false });
      }
    });
  },
}));

export default useAuthStore;

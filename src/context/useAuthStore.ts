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
    usuario: null,
    token: null,
    isAuthenticated: false,
    setUsuario: (usuario) => set({ usuario, isAuthenticated: !!usuario }),
    setToken: (token) => set({ token }),

    logout: async () => {
        await signOut(auth);
        set({ usuario: null, token: null, isAuthenticated: false });
    },

    login: async (email, password) => {
        const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );
        set({ usuario: userCredential.user, isAuthenticated: true });
    },

    register: async (email, password) => {
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        set({ usuario: userCredential.user, isAuthenticated: true });
    },

    initializeAuth: () => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                set({ usuario: user, isAuthenticated: true });
            } else {
                set({ usuario: null, isAuthenticated: false });
            }
        });
    },
}));

export default useAuthStore;

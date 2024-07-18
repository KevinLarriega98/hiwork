// useAuthStore.ts
import { create } from "zustand";
import {
    login,
    register,
    logout,
    initializeAuth,
} from "../service/api/authService";
import { AuthState, AuthActions } from "../types/auth";
import { User } from "firebase/auth";

const useAuthStore = create<AuthState & AuthActions>((set) => ({
    user: null,
    token: null,
    isAuthenticated: false,
    setUser: (user: User | null) => set({ user, isAuthenticated: !!user }),
    setToken: (token: string | null) => set({ token }),

    logout: async () => {
        await logout();
        set({ user: null, token: null, isAuthenticated: false });
    },

    login: async (email: string, password: string) => {
        const user = await login(email, password);
        set({ user, isAuthenticated: true });
    },

    register: async (email: string, password: string) => {
        const user = await register(email, password);
        set({ user, isAuthenticated: true });
    },

    initializeAuth: () => {
        initializeAuth((user) => {
            if (user) {
                set({ user, isAuthenticated: true });
            } else {
                set({ user: null, isAuthenticated: false });
            }
        });
    },
}));

export default useAuthStore;

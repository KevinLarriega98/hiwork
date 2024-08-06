// useAuthStore.ts
import { create } from "zustand";
import {
    login,
    register,
    logout,
    initializeAuth,
    getUserDataFromFirestore,
} from "../service/api/authService";
import { AuthState, AuthActions } from "../types/auth";
import { UserActions } from "../types/profile";

const useAuthStore = create<AuthState & AuthActions>((set) => ({
    user: null,
    token: null,
    isAuthenticated: false,
    userType: null as "Voluntario" | "ONG" | null,
    setUser: (user: UserActions | null) =>
        set({ user, isAuthenticated: !!user }),
    setToken: (token: string | null) => set({ token }),
    setUserType: (userType: "Voluntario" | "ONG" | null) => set({ userType }),

    logout: async (navigateToHome: () => void) => {
        await logout();
        navigateToHome();
        set({ user: null, token: null, isAuthenticated: false });
    },

    login: async (email: string, password: string) => {
        try {
            const user = await login(email, password);
            if (user) {
                const userData = await getUserDataFromFirestore(user);

                console.log(userData);
                set({
                    user: { currentUser: userData, ...user },
                    isAuthenticated: !!user,
                    userType: userData.profileType,
                });
            }
            return user;
        } catch (error) {
            console.error(error);
            return null;
        }
    },
    register: async (
        email: string,
        password: string,
        profileType: string,
        name: string,
        discipline: string,
        typeOfProjects: string
    ) => {
        try {
            const user = await register(
                email,
                password,
                profileType,
                name,
                discipline,
                typeOfProjects
            );
            if (user) {
                const userData = await getUserDataFromFirestore(user);

                console.log(userData);
                set({
                    user: { currentUser: userData, ...user },
                    isAuthenticated: !!user,
                    userType: userData.profileType,
                });
            }
            return user;
        } catch (error) {
            console.error(error);
            return null;
        }
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

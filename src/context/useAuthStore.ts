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
import { UserActions, UserState } from "../types/profile";

const useAuthStore = create<AuthState & AuthActions>((set) => ({
    user: null,
    token: null,
    isAuthenticated: false,
    userType: null as "Voluntario" | "ONG" | null,
    currentUser: null,
    setUser: (user: UserActions | null) =>
        set({ user, isAuthenticated: !!user }),
    setToken: (token: string | null) => set({ token }),
    setUserType: (userType: "Voluntario" | "ONG" | null) => set({ userType }),
    setCurrentUser: (currentUser: UserState | null) => set({ currentUser }),

    logout: async () => {
        try {
            await logout();
            set({
                user: null,
                token: null,
                isAuthenticated: false,
                currentUser: null,
            });
            console.log("Sesión cerrada con éxito.");
        } catch (error) {
            console.log("Error cerrando sesión:", error);
        }
    },

    login: async (email: string, password: string) => {
        try {
            const user = await login(email, password);
            if (user) {
                const userData = await getUserDataFromFirestore(user);

                set({
                    user: { ...user },
                    isAuthenticated: !!user,
                    userType: userData.profileType,
                    currentUser: { ...userData, uid: user.uid },
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

                set({
                    user: { ...user },
                    isAuthenticated: !!user,
                    userType: userData.profileType,
                    currentUser: { ...userData, uid: user.uid },
                });

                return user;
            }
            return null;
        } catch (error) {
            set({
                isAuthenticated: false,
                user: null,
            });

            throw error;
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

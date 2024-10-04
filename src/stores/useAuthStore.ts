// useAuthStore.ts
import { create } from "zustand";
import {
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
    currentUser: null,
    setUser: (user: UserActions | null) =>
        set({ user, isAuthenticated: !!user }),
    setToken: (token: string | null) => set({ token }),
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

    register: async (
        email: string,
        password: string,
        profileType: string,
        name: string,
        discipline: string,
        typeOfProjects: string,
        downloadURL: string,
        description: string
    ) => {
        try {
            const user = await register(
                email,
                password,
                profileType,
                name,
                discipline,
                typeOfProjects,
                downloadURL,
                description
            );

            if (user) {
                const userData = await getUserDataFromFirestore(user);

                set({
                    user: { ...user },
                    isAuthenticated: !!user,
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
                getUserDataFromFirestore(user).then((userDataDB) => {
                    set({
                        user,
                        isAuthenticated: true,
                        currentUser: userDataDB,
                    });
                });
            } else {
                set({ user: null, isAuthenticated: false, currentUser: null });
            }
        });
    },
}));

export default useAuthStore;

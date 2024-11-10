import { create } from "zustand";
import {
    register,
    logout,
    initializeAuth,
    getUserDataFromFirestore,
} from "../service/api/authService";
import { User } from "../types/User";
import { User as UserFirebase } from "firebase/auth";
import { AuthActions, AuthState } from "../types/Auth";

const useAuthStore = create<AuthState & AuthActions>((set) => ({
    user: null,
    token: null,
    isAuthenticated: false,
    currentUser: null,
    setUser: (user: UserFirebase | null) =>
        set({ user, isAuthenticated: !!user }),
    setToken: (token: string | null) => set({ token }),
    setCurrentUser: (currentUser: User | null) => set({ currentUser }),

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
        typeOfProjects: string[],
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
                const userData = await getUserDataFromFirestore(user.uid);

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
        initializeAuth(
            (user) => {
                if (user) {
                    set({ user, isAuthenticated: true });
                } else {
                    set({
                        user: null,
                        isAuthenticated: false,
                        currentUser: null,
                    });
                }
            },
            (userDataDB) => {
                set({ currentUser: userDataDB });
                console.log("Información actualizada del usuario:", userDataDB);
            }
        );
    },
}));

export default useAuthStore;

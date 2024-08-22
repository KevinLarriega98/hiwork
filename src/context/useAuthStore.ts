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
import auth from '@react-native-firebase/auth';
import { User } from "firebase/auth";

const useAuthStore = create<AuthState & AuthActions>()((set) => ({
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

    logout: async (navigateToHome: () => void) => {
        await logout();
        navigateToHome();
        set({ user: null, token: null, isAuthenticated: false });
    },

    login: async (email, password, idToken) => {
        
        if (idToken) {
            try {
                const googleCredential = auth.GoogleAuthProvider.credential(idToken)
                const userAuth = auth().signInWithCredential(googleCredential)
                set({
                    user: { ...userAuth },
                    isAuthenticated: !!userAuth,
                });
                return userAuth as unknown as User
            } catch (error) {
                console.error(error);
                return null
            }
            
        }
        
        try {
            const user = await login(email, password);
            console.log("esta es la login con password and email",user) 
                       
            if (user) {
                console.log("esta se envia a firebase ya logeado",user)
                const userData = await getUserDataFromFirestore(user);

                console.log(userData);
                set({
                    user: { ...user },
                    isAuthenticated: !!user,
                    userType: userData.profileType,
                    currentUser: userData,
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
                    user: { ...user },
                    isAuthenticated: !!user,
                    userType: userData.profileType,
                    currentUser: userData,
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

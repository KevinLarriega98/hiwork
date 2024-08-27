// useAuthStore.ts
import { create } from "zustand";
import {
    login,
    register,
    logout,
    initializeAuth,
    getUserDataFromFirestore,
    registerProvider,
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
    registerRequired: false,
    currentUser: null,
    setUser: (user: UserActions | null) =>
        set({ user, isAuthenticated: !!user }),
    setToken: (token: string | null) => set({ token }),
    setUserType: (userType: "Voluntario" | "ONG" | null) => set({ userType }),
    setCurrentUser: (currentUser: UserState | null) => set({ currentUser }),
    setIsAuthenticated: (value: boolean) => set({isAuthenticated: value}),

    logout: async (navigateToHome: () => void) => {
        await logout();
        navigateToHome();
        set({ user: null, token: null, isAuthenticated: false });
    },

    login: async (email, password, isProvider) => {
        
        if (isProvider) {
            try {
                const userAuth = auth().currentUser
                const userData = await getUserDataFromFirestore(userAuth as unknown as User);
                set({
                    user: { ...userAuth },
                    isAuthenticated: !!userAuth,
                    userType: userData.profileType,
                    currentUser: userData,
                });
                return userAuth
            } catch (error) {
                return null
            }
            
        }
        
        try {
            const user = await login(email, password);
                       
            if (user) {
                console.log("esta se envia a firebase ya logeado",user)
                const userData = await getUserDataFromFirestore(user);

               
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
        typeOfProjects: string,
        isProvider?: boolean,
    ) => {
        try {
            if (isProvider) {

                const user = await registerProvider(
                    email,
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
                
            } else {
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
            }
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

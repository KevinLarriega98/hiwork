import { User } from "firebase/auth";
import { DocumentData } from "firebase/firestore";
import { UserActions, UserState } from "./profile";

export interface AuthState {
    user: UserState | DocumentData | null;
    token: string | null;
    isAuthenticated: boolean;
    userType: "Voluntario" | "ONG" | null;
    currentUser: UserState | null | DocumentData;
}

export interface AuthActions {
    setUser: (user: UserActions | null) => void;
    setToken: (token: string | null) => void;
    logout: (navigateToHome: () => void) => Promise<void>;
    login: (email: string, password: string, idToken?: string | null) => Promise<User | null>;
    register: (
        email: string,
        password: string,
        profileType: string,
        name: string,
        discipline: string,
        typeOfProjects: string
    ) => Promise<User | null>;
    initializeAuth: () => void;
    setUserType: (userType: "Voluntario" | "ONG" | null) => void;
    setCurrentUser: (currentUser: UserState | null) => void;
}

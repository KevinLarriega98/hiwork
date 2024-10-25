import { User } from "firebase/auth";
import { DocumentData } from "firebase/firestore";
import { CurrentUser, UserActions, UserState } from "./profile";

export interface AuthState {
    user: UserState | DocumentData | null;
    token: string | null;
    isAuthenticated: boolean;
    currentUser: CurrentUser | DocumentData;
}

export interface AuthActions {
    setUser: (user: UserActions | null) => void;
    setToken: (token: string | null) => void;
    logout: () => Promise<void>;
    register: (
        email: string,
        password: string,
        profileType: string,
        name: string,
        discipline: string,
        typeOfProjects: string,
        downloadURL: string,
        description: string
    ) => Promise<User | null | Error>;
    initializeAuth: () => void;
    setSavedProjects: (savedProjects: string[] | null) => void;
    setCurrentUser: (currentUser: UserState | null) => void;
}

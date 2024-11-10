import { User } from "./User";
import { User as UserFirebase } from "firebase/auth";

export interface AuthState {
    user: UserFirebase | null; // Información básica del usuario autenticado
    token: string | null; // Token de autenticación
    isAuthenticated: boolean; // Estado de autenticación
    currentUser: User | null; // Información detallada del usuario actual
}

export interface AuthActions {
    setUser: (user: UserFirebase | null) => void; // Establecer el usuario actual
    setToken: (token: string | null) => void; // Establecer el token
    setCurrentUser: (currentUser: User | null) => void; // Establecer información detallada del usuario
    logout: () => Promise<void>; // Cerrar sesión del usuario
    register: (
        email: string,
        password: string,
        profileType: string,
        name: string,
        discipline: string,
        typeOfProjects: string[],
        downloadURL: string,
        description: string
    ) => Promise<UserFirebase | null>; // Registrar un nuevo usuario
    initializeAuth: () => (() => void) | void;
}

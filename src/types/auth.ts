import { User } from "firebase/auth";

export interface AuthState {
    usuario: User | null;
    token: string | null;
    isAuthenticated: boolean;
}

export interface AuthActions {
    setUsuario: (usuario: User | null) => void;
    setToken: (token: string | null) => void;
    logout: () => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string) => Promise<void>;
    initializeAuth: () => void;
}

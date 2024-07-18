// authService.ts
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    User,
} from "firebase/auth";
import { auth } from "./firebase";

export const login = async (email: string, password: string): Promise<User> => {
    const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
    );
    return userCredential.user;
};

export const register = async (
    email: string,
    password: string
): Promise<User> => {
    const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
    );
    return userCredential.user;
};

export const logout = async (): Promise<void> => {
    await signOut(auth);
};

export const initializeAuth = (callback: (user: User | null) => void): void => {
    onAuthStateChanged(auth, callback);
};

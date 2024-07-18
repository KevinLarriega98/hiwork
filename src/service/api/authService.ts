// authService.ts
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    User,
} from "firebase/auth";
import {
    collection,
    addDoc,
} from "firebase/firestore";
import { auth, db } from "./firebase";

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
    password: string,
    type: string
): Promise<User> => {
    const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
    );

    console.log('email', email)
    console.log('password', password)
    console.log('type', type)

    const colRef = collection(db, type);
    console.log('colRef', colRef)
    await addDoc(colRef, { email: email, password: password, type: type });
    // console.log('addDoc', addDoc)

    return userCredential.user;
};

export const logout = async (): Promise<void> => {
    await signOut(auth);
};

export const initializeAuth = (callback: (user: User | null) => void): void => {
    onAuthStateChanged(auth, callback);
};

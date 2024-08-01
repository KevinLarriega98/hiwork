// authService.ts
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    User,
} from "firebase/auth";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "./firebase";
import useUserStore from "../../context/useRegisterStore";
import { UserProfile } from "../../types/profile";

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
    type: string,
    name: string,
    discipline: string,
    typeOfProjects: string
): Promise<User> => {
    const { setCurrentUser } = useUserStore.getState();

    const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
    );

    const colRef = collection(db, type + "s");
    await addDoc(colRef, {
        email: email,
        type: type,
        name: name,
        discipline: discipline,
        typeOfProjects: typeOfProjects,
    });

    const userQuery = query(colRef, where("email", "==", email));
    const querySnapshot = await getDocs(userQuery);
    let userData = null;
    querySnapshot.forEach((doc) => {
        userData = doc.data() as UserProfile["currentUser"];
    });

    if (userData) {
        setCurrentUser(userData);
    }

    return userCredential.user;
};

export const logout = async (): Promise<void> => {
    await signOut(auth);
};

export const initializeAuth = (callback: (user: User | null) => void): void => {
    onAuthStateChanged(auth, callback);
};

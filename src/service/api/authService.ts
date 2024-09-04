import {
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateProfile,
    User,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebase";

export const getUserDataFromFirestore = async (user: User) => {
    const collections = ["Voluntarios", "ONGs"];
    for (const collectionName of collections) {
        const docRef = doc(db, collectionName, user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data();
        }
    }
    throw new Error("No data found for the user.");
};

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
    profileType: string,
    name: string,
    discipline: string,
    typeOfProjects: string
): Promise<User | null> => {
    try {
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );

        const user = userCredential.user;

        await updateProfile(user, {
            displayName: name,
        });

        const docRef = doc(db, profileType + "s", user.uid);
        await setDoc(docRef, {
            id: user.uid,
            email: email,
            profileType: profileType,
            name: name,
            discipline: discipline,
            typeOfProjects: typeOfProjects,
        });

        return user;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const logout = async (): Promise<void> => {
    await signOut(auth);
};

export const initializeAuth = (callback: (user: User | null) => void): void => {
    onAuthStateChanged(auth, callback);
};

export const sendPasswordResetEmailAuth = async (
    email: string
): Promise<void> => {
    try {
        await sendPasswordResetEmail(auth, email);
    } catch (error) {
        console.log(error);
    }
};

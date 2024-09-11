import {
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateProfile,
    User,
} from "firebase/auth";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "./firebase";
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from "firebase/storage";

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
    typeOfProjects: string,
    downloadURL: string,
    description: string
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
            image: downloadURL,
            description: description,
        });

        return user;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const logout = async (): Promise<void> => {
    try {
        await signOut(auth);
        console.log("Usuario deslogueado:", auth.currentUser);
    } catch (error) {
        console.error("Error al hacer logout:", error);
    }
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

export const uploadImage = async (
    uri: string,
    fileName: string,
    onProgress?: (progress: any) => void
) => {
    const fetchResponse = await fetch(uri);

    console.log(fetchResponse);

    const blob = await fetchResponse.blob();

    console.log(blob);

    const imageRef = ref(getStorage(), `images/${fileName}`);
    const uploadTask = uploadBytesResumable(imageRef, blob);

    return new Promise((resolve, reject) => {
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                onProgress && onProgress(progress);
            },
            (error) => {},
            async () => {
                const downloadURL = await getDownloadURL(
                    uploadTask.snapshot.ref
                );
                resolve({
                    downloadURL,
                    metadata: uploadTask.snapshot.metadata,
                });
            }
        );
    });
};

export const updateUserNameAndDescription = async (
    userID: string,
    userType: "Voluntario" | "ONG",
    name: string,
    description: string
): Promise<void> => {
    try {
        const user = auth.currentUser;

        console.log(user?.providerData);

        const userDocRef = doc(db, userType + "s", userID);

        const prueba = await updateDoc(userDocRef, {
            name: name,
            description: description,
        });

        return prueba;
    } catch (error) {
        console.log(error);
    }
};

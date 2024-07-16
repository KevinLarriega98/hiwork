import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAPniDZiM4LjWlFDC5RSUxHkvWoEsIN9Y0",
    authDomain: "hiwork-43f78.firebaseapp.com",
    projectId: "hiwork-43f78",
    storageBucket: "hiwork-43f78.appspot.com",
    messagingSenderId: "645110135985",
    appId: "1:645110135985:web:5c321abc783bed6638f690",
    measurementId: "G-T4DLV7KX0F",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

export const createProject = async (
    ongID: string,
    ongName: string,
    title: string,
    description: string,
    objectiveTimeline: string,
    remote: boolean
): Promise<any> => {
    const project = {
        ongID: ongID,
        ongName: ongName,
        title: title,
        description: description,
        objectiveTimeline: objectiveTimeline,
        createdAt: serverTimestamp(),
        updatedAt: null,
        remote: remote,
    };
    try {
        const colRef = collection(db, "projects");
        const docRef = await addDoc(colRef, project);
        const projectWithId = { id: docRef.id, ...project };

        console.log("Proyecto creado exitosamente:", projectWithId);
        return projectWithId;
    } catch (error) {
        console.error("Error al crear el proyecto: ", error);
        throw error;
    }
};
